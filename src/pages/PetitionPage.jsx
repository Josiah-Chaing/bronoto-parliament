import { useState } from 'react';
import { ArrowUp, CheckCircle, FileText, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PetitionPage() {
  const [step, setStep] = useState('form'); // form | submitted
  const [form, setForm] = useState({ name: '', email: '', subject: '', body: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.subject.trim()) e.subject = 'Required';
    if (!form.body.trim() || form.body.length < 50) e.body = 'Minimum 50 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setStep('submitted');
  };

  if (step === 'submitted') {
    return (
      <>
        <div className="page-header"><div className="page-header-inner"><h1>Petition Submitted</h1></div></div>
        <section className="page-section white">
          <div className="section-inner" style={{textAlign:'center',padding:'var(--space-4xl) 0'}}>
            <div className="petition-success-icon"><CheckCircle size={64} /></div>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'2rem',fontWeight:800,marginTop:'var(--space-xl)',color:'var(--near-black)'}}>Your Petition Has Been Received</h2>
            <p style={{color:'var(--text-secondary)',maxWidth:600,margin:'var(--space-lg) auto',lineHeight:1.8}}>
              The Parliamentary Petitions Committee will review your submission within 30 working days.
              You will receive a confirmation at <strong>{form.email}</strong> with your petition reference number.
            </p>
            <div style={{background:'var(--blue-pale)',borderRadius:'var(--radius-lg)',padding:'var(--space-xl)',maxWidth:500,margin:'var(--space-2xl) auto',textAlign:'left'}}>
              <div style={{fontFamily:'var(--font-ui)',fontSize:'.8rem',color:'var(--text-muted)',marginBottom:'var(--space-sm)'}}>REFERENCE</div>
              <div style={{fontFamily:'var(--font-ui)',fontSize:'1.3rem',fontWeight:700,letterSpacing:'-.02em',color:'var(--blue-deep)'}}>PT-{String(Date.now()).slice(-8)}-BRN</div>
              <div style={{marginTop:'var(--space-lg)',fontSize:'.85rem',color:'var(--text-secondary)'}}>
                <div><strong>Subject:</strong> {form.subject}</div>
                <div style={{marginTop:'var(--space-sm)'}}><strong>Submitted:</strong> {new Date().toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'})}</div>
              </div>
            </div>
            <div style={{display:'flex',gap:'var(--space-md)',justifyContent:'center',marginTop:'var(--space-xl)'}}>
              <Link to="/petition" className="btn-outline" onClick={()=>{setStep('form');setForm({name:'',email:'',subject:'',body:''})}}>Submit Another</Link>
              <Link to="/" className="btn-primary">Return Home</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>Constitutional Petition</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-3xl)',marginBottom:'var(--space-2xl)'}}>
            <div>
              <div className="section-label">Right of Petition</div>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'1.8rem',fontWeight:800,letterSpacing:'-.04em',lineHeight:1.2,marginBottom:'var(--space-lg)',color:'var(--near-black)'}}>
                Every Citizen May Petition Parliament
              </h2>
              <p style={{fontSize:'.9rem',color:'var(--text-secondary)',lineHeight:1.9,marginBottom:'var(--space-lg)'}}>
                Article 17 of the Provisional Constitution guarantees every citizen the right to petition Parliament.
                Modeled on the German <em>Verfassungsbeschwerde</em> (constitutional complaint), any individual who believes
                their fundamental rights have been violated by public authority may lodge a petition directly with Parliament.
              </p>
              <p style={{fontSize:'.9rem',color:'var(--text-secondary)',lineHeight:1.9,marginBottom:'var(--space-lg)'}}>
                The Petitions Committee reviews all admissible submissions and may:
              </p>
              <ul style={{fontSize:'.9rem',color:'var(--text-secondary)',lineHeight:2,paddingLeft:'var(--space-lg)'}}>
                <li>Request a government response within 60 days</li>
                <li>Refer the matter to the relevant standing committee</li>
                <li>Initiate a formal parliamentary inquiry</li>
                <li>Recommend legislative amendment</li>
              </ul>
            </div>
            <div>
              <div style={{background:'var(--white)',border:'1px solid var(--border-color)',borderRadius:'var(--radius-lg)',padding:'var(--space-2xl)'}}>
                <div style={{display:'flex',alignItems:'center',gap:'var(--space-sm)',marginBottom:'var(--space-xl)'}}>
                  <FileText size={20} /><span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.1rem'}}>Submit a Petition</span>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="petition-field">
                    <label>Full Name</label>
                    <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Your full legal name" />
                    {errors.name && <span className="field-error">{errors.name}</span>}
                  </div>
                  <div className="petition-field">
                    <label>Email Address</label>
                    <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="your@email.com" />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>
                  <div className="petition-field">
                    <label>Subject</label>
                    <input type="text" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} placeholder="Brief subject of your petition" />
                    {errors.subject && <span className="field-error">{errors.subject}</span>}
                  </div>
                  <div className="petition-field">
                    <label>Petition Body</label>
                    <textarea value={form.body} onChange={e=>setForm({...form,body:e.target.value})} rows={8} placeholder="Describe the grounds for your petition in detail. Include relevant facts, the rights you believe have been affected, and the remedy you seek. Minimum 50 characters." />
                    <span style={{fontSize:'.75rem',color:form.body.length>=50?'var(--text-muted)':'var(--gold)'}}>{form.body.length}/50 minimum</span>
                    {errors.body && <span className="field-error">{errors.body}</span>}
                  </div>
                  <button type="submit" className="petition-submit-btn">
                    <Send size={16} /> Submit Petition
                  </button>
                  <p style={{fontSize:'.75rem',color:'var(--text-muted)',marginTop:'var(--space-md)',lineHeight:1.6}}>
                    By submitting, you confirm the information provided is true to the best of your knowledge.
                    Your personal data is protected under the Personal Data Protection Act.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
