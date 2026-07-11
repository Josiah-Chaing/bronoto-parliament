import { committees } from '../data/mockData';

export default function CommitteesPage() {
  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>Committees</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <p style={{color:'var(--text-secondary)',marginBottom:'var(--space-xl)',maxWidth:700,fontSize:'.95rem'}}>Seven standing committees review legislation and oversee policy within their respective jurisdictions. Each committee elects a Chair from among its members.</p>
          <div className="grid-2 stagger-cards">
            {committees.map(c=>(
              <div key={c.id} className="card committee-card"><div className="card-title">{c.name}</div><div className="committee-chair">Chair: {c.chair} · {c.members} members</div><p style={{fontSize:'.85rem',color:'var(--text-secondary)',lineHeight:1.7,marginTop:'var(--space-sm)'}}>{c.description}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
