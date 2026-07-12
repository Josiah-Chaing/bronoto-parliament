import { useState, useMemo, useEffect } from 'react';
import { parliamentMembers } from '../data/mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PAGE_SIZE = 24;

export default function MembersPage() {
  const [search, setSearch] = useState('');
  const [partyFilter, setPartyFilter] = useState('all');
  const [committeeFilter, setCommitteeFilter] = useState('all');
  const [divisionFilter, setDivisionFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState(null);

  const parties = [...new Set(parliamentMembers.map(m => m.party))];
  const committees = [...new Set(parliamentMembers.map(m => m.committee))].filter(c => c !== '—');
  const divisions = [...new Set(parliamentMembers.map(m => m.district.replace(/第.*/, '')))];

  const filtered = useMemo(() => {
    return parliamentMembers.filter(m => {
      if (partyFilter !== 'all' && m.party !== partyFilter) return false;
      if (committeeFilter !== 'all' && m.committee !== committeeFilter) return false;
      if (divisionFilter !== 'all' && !m.district.startsWith(divisionFilter)) return false;
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.district.includes(search)) return false;
      return true;
    });
  }, [search, partyFilter, committeeFilter, divisionFilter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [search, partyFilter, committeeFilter, divisionFilter]);

  const partyCounts = { 自由共和黨: parliamentMembers.filter(m=>m.party==='自由共和黨').length, 民主黨: parliamentMembers.filter(m=>m.party==='民主黨').length, 社會團結黨: parliamentMembers.filter(m=>m.party==='社會團結黨').length, 無黨籍: parliamentMembers.filter(m=>m.party==='無黨籍').length };

  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>Members of Parliament</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <p style={{color:'var(--text-secondary)',marginBottom:'var(--space-lg)',fontSize:'.9rem',maxWidth:800}}>
            The Bronoto Parliament consists of 500 directly elected members serving four-year terms. Seats are allocated by population across seven primary divisions using a parallel voting system of single-seat constituencies and proportional representation, modeled on the Japanese National Diet.
          </p>
          <div className="search-bar" style={{marginBottom:'var(--space-lg)'}}><input type="text" placeholder="Search by name or district…" value={search} onChange={e => setSearch(e.target.value)} /></div>
          
          <div className="chip-group">
            <button className={`chip${partyFilter==='all'?' active':''}`} onClick={()=>setPartyFilter('all')}>All Parties ({parliamentMembers.length})</button>
            {parties.map(p=>(<button key={p} className={`chip${partyFilter===p?' active':''}`} onClick={()=>setPartyFilter(p)}>{p} ({partyCounts[p]||0})</button>))}
          </div>
          <div className="chip-group">
            <button className={`chip${committeeFilter==='all'?' active':''}`} onClick={()=>setCommitteeFilter('all')}>All Committees</button>
            {committees.map(c=>(<button key={c} className={`chip${committeeFilter===c?' active':''}`} onClick={()=>setCommitteeFilter(c)}>{c}</button>))}
          </div>
          <div className="chip-group">
            <button className={`chip${divisionFilter==='all'?' active':''}`} onClick={()=>setDivisionFilter('all')}>All Divisions</button>
            {divisions.map(d=>(<button key={d} className={`chip${divisionFilter===d?' active':''}`} onClick={()=>setDivisionFilter(d)}>{d}</button>))}
          </div>
          
          <p style={{fontSize:'.85rem',color:'var(--text-muted)',marginBottom:'var(--space-lg)'}}>
            {filtered.length} members · 自由共和黨 {partyCounts['自由共和黨']} · 民主黨 {partyCounts['民主黨']} · 社會團結黨 {partyCounts['社會團結黨']} · 無黨籍 {partyCounts['無黨籍']}
            {totalPages > 1 && <span> · Page {page} of {totalPages}</span>}
          </p>
          
          <div className="member-grid stagger-cards">
            {paged.map(member=>(
              <div key={member.id} className="member-card" onClick={()=>setSelected(selected===member.id?null:member.id)} style={selected===member.id?{borderColor:'var(--blue-mid)',boxShadow:'var(--shadow)'}:{}}>
                <div className="member-avatar">{member.name.charAt(0)}</div>
                <div className="member-info">
                  <div className="member-name">
                    {member.name}
                    {member.role==='民國府總理'&&<span className="pm-badge">PRIME MINISTER</span>}
                  </div>
                  <span className={`member-party ${member.party==='自由共和黨'?'party-frp':member.party==='民主黨'?'party-dp':'party-other'}`}>{member.party}</span>
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
          
          {totalPages > 1 && (
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'var(--space-sm)',marginTop:'var(--space-2xl)'}}>
              <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} style={{padding:'8px 16px',border:'1px solid var(--border-color)',borderRadius:'var(--radius)',background:'var(--white)',cursor:page===1?'default':'pointer',opacity:page===1?.4:1}}><ChevronLeft size={16} /></button>
              {Array.from({length:Math.min(totalPages,7)},(_,i)=>{
                let pn;
                if (totalPages<=7) pn=i+1;
                else if (page<=4) pn=i+1;
                else if (page>=totalPages-3) pn=totalPages-6+i;
                else pn=page-3+i;
                return <button key={pn} onClick={()=>setPage(pn)} style={{padding:'6px 14px',border:'1px solid '+(pn===page?'var(--blue-mid)':'var(--border-color)'),borderRadius:'var(--radius)',background:pn===page?'var(--blue-pale)':'var(--white)',fontWeight:pn===page?700:400,cursor:'pointer',fontSize:'.85rem'}}>{pn}</button>;
              })}
              <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} style={{padding:'8px 16px',border:'1px solid var(--border-color)',borderRadius:'var(--radius)',background:'var(--white)',cursor:page===totalPages?'default':'pointer',opacity:page===totalPages?.4:1}}><ChevronRight size={16} /></button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}