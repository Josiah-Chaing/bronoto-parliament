import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { laws } from '../data/mockData';

export default function LawsPage() {
  const [tab, setTab] = useState('all');
  const [search, setSearch] = useState('');
  const tabs = [{k:'all',l:'All'},{k:'passed',l:'生效'},{k:'review',l:'制定中'}];
  const filtered = useMemo(()=>laws.filter(l=>(tab==='all'||l.status===tab)&&(!search||l.title.includes(search)||l.number.includes(search))),[tab,search]);
  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>Legislation &amp; Records</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <div className="search-bar" style={{marginBottom:'var(--space-xl)'}}><input type="text" placeholder="Search bills…" value={search} onChange={e=>setSearch(e.target.value)}/></div>
          <div className="chip-group">{tabs.map(t=>(<button key={t.k} className={`chip${tab===t.k?' active':''}`} onClick={()=>setTab(t.k)}>{t.l}</button>))}</div>
          <div style={{background:'var(--white)',border:'1px solid var(--border-color)',borderRadius:'var(--radius-lg)',overflow:'hidden'}}>
            {filtered.map(law=>(<div key={law.id} className="law-card"><span className="law-number"></span><span className="law-title">{law.title}</span><span style={{fontSize:'.78rem',color:'var(--text-muted)',marginRight:'var(--space-md)'}}></span><span className={`law-status status-${law.status}`}>{law.statusLabel}</span></div>))}
            {filtered.length===0&&<div className="empty-state">No matching legislation.</div>}
          </div>
          <div style={{marginTop:'var(--space-2xl)',padding:'var(--space-xl)',background:'var(--white)',border:'1px solid var(--gold-light)',borderRadius:'var(--radius-lg)',borderLeft:'4px solid var(--gold)'}}>
            <h3 style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.1rem',marginBottom:'var(--space-md)',color:'var(--near-black)'}}>Constitutional Documents</h3>
            <div style={{display:'flex',gap:'var(--space-lg)',flexWrap:'wrap',alignItems:'center'}}>
              <Link to="/provisional-constitution" style={{padding:'var(--space-md) var(--space-xl)',background:'var(--blue-pale)',borderRadius:'var(--radius)',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.85rem',display:'flex',alignItems:'center',gap:'var(--space-sm)'}}>
                Provisional Constitution (RY5)
                <span style={{fontSize:'.7rem',padding:'2px 8px',borderRadius:'10px',background:'var(--blue-light)',color:'var(--blue-deep)',fontWeight:500}}>已失效</span>
              </Link>
              <Link to="/constitution" style={{padding:'var(--space-md) var(--space-xl)',background:'var(--blue-pale)',borderRadius:'var(--radius)',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.85rem',display:'flex',alignItems:'center',gap:'var(--space-sm)'}}>
                Constitution of Bronoto
                <span style={{fontSize:'.7rem',padding:'2px 8px',borderRadius:'10px',background:'var(--gold-light)',color:'var(--near-black)',fontWeight:500}}>生效</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
