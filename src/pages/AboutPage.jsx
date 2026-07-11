export default function AboutPage() {
  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>About Parliament</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <div className="section-label">History</div>
          <h2 className="section-headline"><span className="reveal-line"><span>The Path to</span></span><span className="reveal-line"><span>Constitutional Democracy</span></span></h2>
          <div className="timeline" style={{marginTop:'var(--space-2xl)'}}>
            <div className="timeline-item"><div className="timeline-year">Imperial Era · The Pure Council</div><div className="timeline-desc">During the late Bronoto Empire, local gentry and water management officials formed the "Pure Council" (清議會), convening regularly along the Ling River to discuss flood control and civic affairs. Though lacking formal legislative power, its deliberative tradition laid the groundwork for parliamentary governance.</div></div>
            <div className="timeline-item"><div className="timeline-year">RY4 · April 27 Resolution</div><div className="timeline-desc">As the authoritarian People's Republic collapsed, representatives from across the nation gathered in Fengtian to pass the historic April 27 Resolution, establishing a parliamentary democracy founded on popular sovereignty. This date is now celebrated as Republic Day.</div></div>
            <div className="timeline-item"><div className="timeline-year">RY5 · Provisional Constitution</div><div className="timeline-desc">The First Parliament enacted the Provisional Constitution of Bronoto, establishing the six-power separation system: Executive, Legislative, Judicial, Constitutional Review, Oversight, and Prosecution. Checks and balances became the bedrock of constitutional order.</div></div>
            <div className="timeline-item"><div className="timeline-year">RY6 · Formal Constitution</div><div className="timeline-desc">After two years of deliberation and nationwide consultation, the formal Constitution was passed by Parliament and ratified by referendum. The Constitution enshrines transparency, due process, and the separation of powers as its guiding principles.</div></div>
          </div>
        </div>
      </section>
      <section className="page-section">
        <div className="section-inner">
          <div className="section-label">Structure</div>
          <h2 className="section-headline"><span className="reveal-line"><span>Six Powers</span></span></h2>
          <p style={{color:'var(--text-secondary)',marginBottom:'var(--space-xl)',maxWidth:700}}>Governance is like water management — guide, do not force. The core principle: never allow any person or institution to wield unchecked power.</p>
          <div className="six-powers">
            {['Executive','Legislative','Judicial','Constitutional Review','Oversight','Prosecution'].map((title,i)=>(
              <div className="power-node" key={i}><div className="power-nb">0{i+1}</div><div className="power-title">{title}</div><div className="power-desc">{['Cabinet, responsible to Parliament','Parliament enacts laws','Courts, independent adjudication','Constitutional Court, guardian of the Constitution','Ethics supervision, audit','Independent public prosecution'][i]}</div></div>
            ))}
          </div>
        </div>
      </section>
      <section className="page-section white">
        <div className="section-inner">
          <div className="section-label">Powers</div>
          <h2 className="section-headline"><span className="reveal-line"><span>Parliamentary</span></span><span className="reveal-line"><span>Authority</span></span></h2>
          <div className="grid-3 stagger-cards" style={{marginTop:'var(--space-xl)'}}>
            {[{t:'Legislation',d:'Enact, amend, and repeal laws. Review constitutional amendments.'},{t:'Budget Review',d:'Review the annual budget submitted by the Cabinet.'},{t:'Treaty Ratification',d:'Review and ratify international treaties and agreements.'},{t:'Interpellation',d:'Question Cabinet officials and require their attendance.'},{t:'Impeachment',d:'Initiate impeachment proceedings against officials.'},{t:'Investigation',d:'Establish investigative committees on matters of public concern.'}].map((item,i)=>(
              <div className="card" key={i}><div className="card-title">{item.t}</div><p style={{fontSize:'.85rem',color:'var(--text-secondary)',lineHeight:1.7}}>{item.d}</p></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
