import { useState, useMemo } from 'react';
import { newsArticles } from '../data/mockData';

export default function NewsPage() {
  const [category, setCategory] = useState('all');
  const categories = ['all',...new Set(newsArticles.map(n=>n.category))];
  const filtered = useMemo(()=>category==='all'?newsArticles:newsArticles.filter(n=>n.category===category),[category]);
  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>News</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <div className="chip-group">{categories.map(c=>(<button key={c} className={`chip${category===c?' active':''}`} onClick={()=>setCategory(c)}>{c==='all'?'All':c}</button>))}</div>
          <div className="stagger-cards" style={{display:'flex',flexDirection:'column',gap:'var(--space-md)'}}>
            {filtered.map(item=>(<div key={item.id} className="card news-card"><span className="news-category">{item.category}</span><div className="news-date">{item.date}</div><div className="news-title">{item.title}</div><div className="news-summary">{item.summary}</div></div>))}
          </div>
          <div style={{marginTop:'var(--space-2xl)',padding:'var(--space-2xl)',background:'var(--white)',border:'1px solid var(--border-color)',borderRadius:'var(--radius-lg)',textAlign:'center'}}>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:700,marginBottom:'var(--space-sm)',color:'var(--near-black)'}}>Subscribe</h3>
            <p style={{fontSize:'.85rem',color:'var(--text-secondary)',marginBottom:'var(--space-lg)'}}>Receive updates via email or RSS.</p>
            <div style={{display:'flex',gap:'var(--space-md)',justifyContent:'center'}}>
              <a href="#" style={{padding:'var(--space-sm) var(--space-2xl)',background:'var(--near-black)',color:'var(--white)',borderRadius:'var(--radius)',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.85rem'}}>Email</a>
              <a href="#" style={{padding:'var(--space-sm) var(--space-2xl)',border:'1px solid var(--border-color)',borderRadius:'var(--radius)',fontFamily:'var(--font-ui)',fontWeight:600,fontSize:'.85rem',color:'var(--text-secondary)'}}>RSS</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
