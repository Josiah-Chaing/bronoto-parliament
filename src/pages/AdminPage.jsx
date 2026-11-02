import { useEffect, useMemo, useState } from 'react';
import './admin.css';

const STORAGE_KEY = 'bronoto-admin-settings';
const DRAFT_KEY = 'bronoto-admin-draft';
const DEFAULT_REPO = 'Josiah-Chaing/bronoto-parliament';
const DEFAULT_BRANCH = 'main';
const CONTENT_PATH = 'src/data/content.json';

function utf8ToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode.apply(null, bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function base64ToUtf8(b64) {
  const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function readSettings() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

function FieldInput({ field, value, onChange }) {
  if (field.type === 'textarea') {
    return <textarea className="a-textarea" value={value} onChange={(e) => onChange(e.target.value)} placeholder={field.placeholder} />;
  }
  if (field.type === 'select') {
    return (
      <select className="a-select" value={value} onChange={(e) => onChange(e.target.value)}>
        {field.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    );
  }
  return (
    <input
      className="a-input"
      type={field.type === 'number' ? 'number' : 'text'}
      value={value}
      onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
      placeholder={field.placeholder}
    />
  );
}

function displayValue(field, item) {
  const value = item[field.key];
  if (value === '' || value === undefined || value === null) return '—';
  const text = String(value);
  return text.length > 54 ? text.slice(0, 54) + '…' : text;
}

function TableEditor({ items, fields, columns, createItem, onUpdate, onAdd, onDelete, onMove }) {
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const cols = columns || fields.slice(0, 4);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((it) => fields.some((f) => String(it[f.key] ?? '').toLowerCase().includes(q)));
  }, [items, query, fields]);

  const openEdit = (item) => {
    const index = items.indexOf(item);
    setEditing({ index, draft: { ...item } });
  };

  const openAdd = () => setEditing({ index: -1, draft: createItem() });

  const save = () => {
    if (!editing) return;
    if (editing.index >= 0) onUpdate(editing.index, editing.draft);
    else onAdd(editing.draft);
    setEditing(null);
  };

  const remove = (item) => {
    const index = items.indexOf(item);
    if (index >= 0 && window.confirm('確定要刪除這一筆嗎？')) onDelete(index);
  };

  return (
    <div className="admin-card">
      <div className="a-toolbar">
        <input className="a-input" type="text" placeholder="搜尋…" value={query} onChange={(e) => setQuery(e.target.value)} />
        <span className="a-badge">{items.length} 筆</span>
        <div style={{ marginLeft: 'auto' }}>
          <button className="a-btn a-btn-primary" onClick={openAdd}>＋ 新增</button>
        </div>
      </div>
      <div className="a-table-wrap">
        <table className="a-table">
          <thead>
            <tr>
              {cols.map((f) => <th key={f.key}>{f.label}</th>)}
              <th style={{ width: 120, textAlign: 'right' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => {
              const index = items.indexOf(item);
              return (
                <tr key={item.id ?? items.indexOf(item)}>
                  {cols.map((f) => <td key={f.key}>{displayValue(f, item)}</td>)}
                  <td>
                    <div className="a-actions">
                      {onMove && <button className="a-btn" title="上移" onClick={() => onMove(index, -1)}>↑</button>}
                      {onMove && <button className="a-btn" title="下移" onClick={() => onMove(index, 1)}>↓</button>}
                      <button className="a-btn" onClick={() => openEdit(item)}>編輯</button>
                      <button className="a-btn a-btn-danger" onClick={() => remove(item)}>刪除</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="a-empty">沒有符合的資料</div>}
      </div>

      {editing && (
        <div className="a-modal-backdrop" onClick={() => setEditing(null)}>
          <div className="a-modal" onClick={(e) => e.stopPropagation()}>
            <h3>{editing.index >= 0 ? '編輯' : '新增'}</h3>
            <div className="admin-grid">
              {fields.map((f) => (
                <div className="admin-field" key={f.key}>
                  <label>{f.label}</label>
                  <FieldInput
                    field={f}
                    value={editing.draft[f.key] ?? ''}
                    onChange={(v) => setEditing({ ...editing, draft: { ...editing.draft, [f.key]: v } })}
                  />
                </div>
              ))}
            </div>
            <div className="a-modal-actions">
              <button className="a-btn" onClick={() => setEditing(null)}>取消</button>
              <button className="a-btn a-btn-primary" onClick={save}>儲存</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Login({ settings, setSettings, onConnect, busy, error }) {
  const set = (key, value) => setSettings({ ...settings, [key]: value });
  return (
    <div className="admin-root">
      <div className="admin-topbar">
        <span className="admin-topbar-title">Bronoto Parliament</span>
        <span className="admin-topbar-sub">內容管理後台</span>
      </div>
      <div className="admin-card a-login">
        <h1 className="admin-h1">連接 GitHub 內容檔</h1>
        <p className="admin-hint">後台直接編輯網站的內容 JSON 檔，儲存後 Cloudflare Pages 會自動重新部署。</p>
        <div className="admin-field">
          <label>GitHub 存取權杖（Personal Access Token）</label>
          <input className="a-input" type="password" value={settings.token} onChange={(e) => set('token', e.target.value)} placeholder="ghp_… 或 github_pat_…" />
        </div>
        <div className="admin-field">
          <label>儲存庫</label>
          <input className="a-input" value={settings.repo} onChange={(e) => set('repo', e.target.value)} placeholder="owner/repo" />
        </div>
        <div className="admin-field">
          <label>分支</label>
          <input className="a-input" value={settings.branch} onChange={(e) => set('branch', e.target.value)} />
        </div>
        <p className="a-note">權杖只需要「讀取與寫入這個儲存庫的 Contents」權限。權杖只會存在你這台裝置的瀏覽器 localStorage，不會上傳到其他伺服器。</p>
        <div className="a-modal-actions" style={{ justifyContent: 'flex-start' }}>
          <button className="a-btn a-btn-primary" disabled={busy || !settings.token || !settings.repo} onClick={onConnect}>{busy ? '連接中…' : '連接並載入'}</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [settings, setSettings] = useState(() => ({ token: '', repo: DEFAULT_REPO, branch: DEFAULT_BRANCH, ...readSettings() }));
  const [data, setData] = useState(null);
  const [sha, setSha] = useState('');
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState('site');
  const [status, setStatus] = useState(null);
  const [hasDraft, setHasDraft] = useState(false);

  useEffect(() => {
    setHasDraft(!!localStorage.getItem(DRAFT_KEY));
    if (settings.token && settings.repo) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && dirty) localStorage.setItem(DRAFT_KEY, JSON.stringify(data));
  }, [data, dirty]);

  const showStatus = (type, text) => {
    setStatus({ type, text });
    window.setTimeout(() => setStatus(null), 6000);
  };

  const api = async (method, url, body) => {
    const res = await fetch(url, {
      method,
      headers: {
        Authorization: 'Bearer ' + settings.token,
        Accept: 'application/vnd.github+json',
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = json.message || res.statusText || '未知錯誤';
      throw new Error(msg);
    }
    return json;
  };

  const load = async () => {
    setBusy(true);
    try {
      const url = 'https://api.github.com/repos/' + settings.repo + '/contents/' + CONTENT_PATH + '?ref=' + settings.branch;
      const json = await api('GET', url);
      const parsed = JSON.parse(base64ToUtf8(json.content));
      setData(parsed);
      setSha(json.sha);
      setDirty(false);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
      showStatus('success', '已從 GitHub 載入最新內容。');
    } catch (err) {
      showStatus('error', '載入失敗：' + err.message);
    } finally {
      setBusy(false);
    }
  };

  const connect = () => load();

  const publish = async () => {
    if (!data) return;
    if (!window.confirm('確定要發佈這些修改嗎？發佈後 Cloudflare 會自動重新部署網站。')) return;
    setBusy(true);
    try {
      const content = utf8ToBase64(JSON.stringify(data, null, 2) + '\n');
      const body = {
        message: '後台更新網站內容',
        content,
        branch: settings.branch,
      };
      if (sha) body.sha = sha;
      const url = 'https://api.github.com/repos/' + settings.repo + '/contents/' + CONTENT_PATH;
      const json = await api('PUT', url, body);
      setSha(json.content && json.content.sha ? json.content.sha : sha);
      setDirty(false);
      localStorage.removeItem(DRAFT_KEY);
      setHasDraft(false);
      showStatus('success', '已發佈，Cloudflare 正在重新部署（約 1 至 3 分鐘生效）。');
    } catch (err) {
      showStatus('error', '發佈失敗：' + err.message);
    } finally {
      setBusy(false);
    }
  };

  const loadDraft = () => {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY));
      if (draft) {
        setData(draft);
        setDirty(true);
        showStatus('info', '已載入本機未發佈草稿。');
      }
    } catch {
      showStatus('error', '草稿格式錯誤，無法載入。');
    }
  };

  const reset = () => {
    if (!window.confirm('確定要清除連接設定並登出嗎？未發佈草稿會保留。')) return;
    localStorage.removeItem(STORAGE_KEY);
    setSettings({ token: '', repo: DEFAULT_REPO, branch: DEFAULT_BRANCH });
    setData(null);
    setSha('');
    setDirty(false);
  };

  const updateItem = (section, index, patch) => {
    setData((prev) => {
      const arr = prev[section].map((it, i) => {
        if (i !== index) return it;
        const next = { ...it, ...patch };
        if (section === 'laws') next.statusLabel = next.status === 'passed' ? '生效' : '制定中';
        return next;
      });
      return { ...prev, [section]: arr };
    });
    setDirty(true);
  };

  const addItem = (section, item) => {
    setData((prev) => ({ ...prev, [section]: [...prev[section], item] }));
    setDirty(true);
  };

  const deleteItem = (section, index) => {
    setData((prev) => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
    setDirty(true);
  };

  const moveItem = (section, index, dir) => {
    setData((prev) => {
      const arr = [...prev[section]];
      const to = index + dir;
      if (to < 0 || to >= arr.length) return prev;
      const tmp = arr[index];
      arr[index] = arr[to];
      arr[to] = tmp;
      return { ...prev, [section]: arr };
    });
    setDirty(true);
  };

  const nextId = (arr) => (arr.length ? Math.max(...arr.map((x) => Number(x.id) || 0)) + 1 : 1);

  const memberFields = [
    { key: 'name', label: '姓名', type: 'text' },
    { key: 'party', label: '黨派', type: 'select', options: ['自由共和黨', '民主黨', '社會團結黨', '無黨籍'].map((p) => ({ value: p, label: p })) },
    { key: 'district', label: '選區', type: 'text' },
    { key: 'committee', label: '委員會', type: 'select', options: [{ value: '—', label: '無委員會任職' }, ...(data?.committees || []).map((c) => ({ value: c.name, label: c.name }))] },
    { key: 'role', label: '職務', type: 'text' },
    { key: 'since', label: '就任年份', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
  ];

  const lawFields = [
    { key: 'title', label: '名稱', type: 'text' },
    { key: 'status', label: '狀態', type: 'select', options: [{ value: 'passed', label: '生效' }, { value: 'review', label: '制定中' }] },
  ];

  const newsFields = [
    { key: 'date', label: '日期', type: 'text', placeholder: '例：6年8月24日' },
    { key: 'category', label: '分類', type: 'text' },
    { key: 'title', label: '標題', type: 'text' },
    { key: 'summary', label: '摘要', type: 'textarea' },
  ];

  const committeeFields = [
    { key: 'name', label: '名稱', type: 'text' },
    { key: 'chair', label: '主席', type: 'text' },
    { key: 'members', label: '人數', type: 'number' },
    { key: 'description', label: '說明', type: 'textarea' },
  ];

  const officialFields = [
    { key: 'name', label: '姓名', type: 'text' },
    { key: 'title', label: '職稱', type: 'text' },
    { key: 'note', label: '備註', type: 'textarea' },
  ];

  const siteFields = [
    { key: 'name', label: '中文名稱', type: 'text' },
    { key: 'nameEn', label: '英文名稱', type: 'text' },
    { key: 'shortName', label: '簡稱', type: 'text' },
    { key: 'tagline', label: '標語（中文）', type: 'text' },
    { key: 'address', label: '地址', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'currentSession', label: '現行會期', type: 'text' },
    { key: 'sessionStart', label: '會期開始', type: 'text' },
    { key: 'sessionEnd', label: '會期結束', type: 'text' },
    { key: 'billsInReview', label: '審查中法案數', type: 'number' },
    { key: 'billsPassed', label: '已通過法案數', type: 'number' },
    { key: 'totalBudget', label: '年度預算', type: 'text' },
  ];

  if (!settings.token) {
    return <Login settings={settings} setSettings={setSettings} onConnect={connect} busy={busy} error={status} />;
  }

  const nav = [
    { id: 'site', label: '網站設定' },
    { id: 'laws', label: '法律' },
    { id: 'news', label: '新聞' },
    { id: 'committees', label: '委員會' },
    { id: 'officials', label: '其他官員' },
    { id: 'members', label: '國會議員' },
  ];

  return (
    <div className="admin-root">
      <div className="admin-topbar">
        <span className="admin-topbar-title">Bronoto Parliament</span>
        <span className="admin-topbar-sub">內容管理後台</span>
        <div className="admin-topbar-actions">
          {hasDraft && !dirty && <button className="a-btn" onClick={loadDraft}>載入草稿</button>}
          <button className="a-btn" onClick={load} disabled={busy}>{busy ? '讀取中…' : '重新讀取'}</button>
          <button className="a-btn a-btn-gold" onClick={publish} disabled={busy || !data || !dirty}>{busy ? '發佈中…' : '發佈更新'}</button>
          <button className="a-btn" onClick={reset}>登出</button>
        </div>
      </div>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          {nav.map((n) => (
            <button key={n.id} className={'admin-nav-item' + (active === n.id ? ' active' : '')} onClick={() => setActive(n.id)}>{n.label}</button>
          ))}
        </aside>
        <main className="admin-content">
          {status && <div className={'a-status show ' + status.type}>{status.text}</div>}
          {!data && <div className="admin-card"><p className="admin-hint">{busy ? '正在載入…' : '尚未載入內容'}</p></div>}

          {data && active === 'site' && (
            <div className="admin-card">
              <h1 className="admin-h1">網站設定</h1>
              <p className="admin-hint">首頁標語、會期、預算等資訊。</p>
              <div className="admin-grid">
                {siteFields.map((f) => (
                  <div className="admin-field" key={f.key}>
                    <label>{f.label}</label>
                    <FieldInput field={f} value={data.siteConfig[f.key] ?? ''} onChange={(v) => { setData((p) => ({ ...p, siteConfig: { ...p.siteConfig, [f.key]: v } })); setDirty(true); }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {data && active === 'laws' && (
            <>
              <h1 className="admin-h1">法律與法案</h1>
              <p className="admin-hint">狀態分為「生效」與「制定中」，網站會自動顯示對應標籤。</p>
              <TableEditor items={data.laws} fields={lawFields} createItem={() => ({ id: nextId(data.laws), title: '', status: 'review', statusLabel: '制定中' })} onUpdate={(i, p) => updateItem('laws', i, p)} onAdd={(item) => addItem('laws', item)} onDelete={(i) => deleteItem('laws', i)} />
            </>
          )}

          {data && active === 'news' && (
            <>
              <h1 className="admin-h1">新聞</h1>
              <p className="admin-hint">用上下箭頭調整順序，最新一則放在最上面。</p>
              <TableEditor items={data.newsArticles} fields={newsFields} columns={[newsFields[0], newsFields[2], newsFields[1]]} createItem={() => ({ id: nextId(data.newsArticles), date: '', category: '', title: '', summary: '' })} onUpdate={(i, p) => updateItem('newsArticles', i, p)} onAdd={(item) => addItem('newsArticles', item)} onDelete={(i) => deleteItem('newsArticles', i)} onMove={(i, d) => moveItem('newsArticles', i, d)} />
            </>
          )}

          {data && active === 'committees' && (
            <>
              <h1 className="admin-h1">委員會</h1>
              <p className="admin-hint">名稱、主席、人數與職掌說明。</p>
              <TableEditor items={data.committees} fields={committeeFields} createItem={() => ({ id: nextId(data.committees), name: '', chair: '—', members: 0, description: '' })} onUpdate={(i, p) => updateItem('committees', i, p)} onAdd={(item) => addItem('committees', item)} onDelete={(i) => deleteItem('committees', i)} />
            </>
          )}

          {data && active === 'officials' && (
            <>
              <h1 className="admin-h1">其他官員</h1>
              <p className="admin-hint">監察院、司法等非議員職位。</p>
              <TableEditor items={data.otherOfficials} fields={officialFields} createItem={() => ({ name: '', title: '', note: '' })} onUpdate={(i, p) => updateItem('otherOfficials', i, p)} onAdd={(item) => addItem('otherOfficials', item)} onDelete={(i) => deleteItem('otherOfficials', i)} />
            </>
          )}

          {data && active === 'members' && (
            <>
              <h1 className="admin-h1">國會議員</h1>
              <p className="admin-hint">共 {data.parliamentMembers.length} 位。可搜尋後編輯單筆資料。</p>
              <TableEditor items={data.parliamentMembers} fields={memberFields} columns={[memberFields[0], memberFields[2], memberFields[1], memberFields[3]]} createItem={() => ({ id: nextId(data.parliamentMembers), name: '', party: '自由共和黨', district: '', committee: '—', role: '—', since: '', email: '' })} onUpdate={(i, p) => updateItem('parliamentMembers', i, p)} onAdd={(item) => addItem('parliamentMembers', item)} onDelete={(i) => deleteItem('parliamentMembers', i)} />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

