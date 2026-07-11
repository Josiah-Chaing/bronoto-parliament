import { useState, useMemo } from 'react';
import { congressMembers } from '../data/mockData';

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [partyFilter, setPartyFilter] = useState('all');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const parties = [...new Set(congressMembers.map(m => m.party))];
  const committees = [...new Set(congressMembers.map(m => m.committee))];
  const filtered = useMemo(() => {
    return congressMembers.filter(m => {
      if (partyFilter !== 'all' && m.party !== partyFilter) return false;
      if (committeeFilter !== 'all' && m.committee !== committeeFilter) return false;
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.district.includes(search)) return false;
      return true;
    });
  }, [search, partyFilter, committeeFilter]);

  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>Members of Parliament</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <p style={{color:'var(--text-secondary)',marginBottom:'var(--space-xl)',fontSize:'.9rem',maxWidth:800}}>
            The Parliament of the Republic of Bronoto consists of seven directly elected members serving four-year terms.
            The Prime Minister is the leader of the majority party and serves concurrently as a Member of Parliament.
          </p>
          <div className="search-bar" style={{marginBottom:'var(--space-xl)'}}><input type="text" placeholder="Search by name or district…" value={search} onChange={e => setSearch(e.target.value)} /></div>
          <div className="chip-group">
            <button className={`chip${partyFilter==='all'?' active':''}`} onClick={()=>setPartyFilter('all')}>All Parties</button>
            {parties.map(p=>(<button key={p} className={`chip${partyFilter===p?' active':''}`} onClick={()=>setPartyFilter(p)}>{p}</button>))}
          </div>
          <div className="chip-group">
            <button className={`chip${committeeFilter==='all'?' active':''}`} onClick={()=>setCommitteeFilter('all')}>All Committees</button>
            {committees.map(c=>(<button key={c} className={`chip${committeeFilter===c?' active':''}`} onClick={()=>setCommitteeFilter(c)}>{c}</button>))}
          </div>
          <p style={{fontSize:'.85rem',color:'var(--text-muted)',marginBottom:'var(--space-xl)'}}>{filtered.length} members · 自由共和黨 4 · 民主黨 3</p>
          <div className="grid-2 stagger-cards">
            {filtered.map(member=>(
              <div key={member.id} className="member-card" onClick={()=>setSelected(selected===member.id?null:member.id)} style={selected===member.id?{borderColor:'var(--blue-mid)',boxShadow:'var(--shadow)'}:{}}>
                <div className="member-avatar">{member.name.charAt(0)}</div>
                <div className="member-info">
                  <div className="member-name">
                    {member.name}
                    {member.role==='民國府總理'&&<span className="pm-badge">PRIME MINISTER</span>}
                  </div>
                  <span className={`member-party ${member.party==='自由共和黨'?'party-frp':'party-dp'}`}>{member.party}</span>
                  <div className="member-detail">{member.district}</div>
                  <div className="member-detail">{member.committee} · {member.role}</div>
                  {selected===member.id&&(
                    <div style={{marginTop:'var(--space-md)',paddingTop:'var(--space-md)',borderTop:'1px solid var(--border-color)'}}>
                      <div className="member-detail">Email: {member.email}</div>
                      <div className="member-detail">Since: {member.since}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {filtered.length===0&&<div className="empty-state">No members found.</div>}
        </div>
      </section>
    </>
  );
}
