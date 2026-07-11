import { useState } from 'react';
import { CheckCircle, Users, Calendar, MapPin, Clock, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AttendPage() {
  const [step, setStep] = useState('info');
  const [form, setForm] = useState({ name: '', email: '', organization: '', date: '', guests: '1', purpose: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required';
    if (!form.date) e.date = 'Select a date';
    if (!form.purpose.trim() || form.purpose.length < 20) e.purpose = 'Minimum 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) setStep('submitted');
  };

  const infoItems = [
    { icon: Clock, text: 'Sessions typically run Monday through Friday, 9:00 to 17:00. Check the Parliamentary calendar for specific sitting dates.' },
    { icon: MapPin, text: 'Parliament House, 1 Constitutional Avenue, Central District, Fengtian Prefecture. Public entrance via the Visitors Pavilion on the east side.' },
    { icon: Users, text: 'Up to 4 guests per application. Larger groups should contact the Visitors Office directly.' },
    { icon: Shield, text: 'All visitors must pass through security screening. Photo ID is required. Photography and recording are permitted only in designated public galleries.' },
  ];

  const resetForm = () => setForm({ name: '', email: '', organization: '', date: '', guests: '1', purpose: '' });

  if (step === 'submitted') {
    return (
      <>
        <div className="page-header"><div className="page-header-inner"><h1>Application Submitted</h1></div></div>
        <section className="page-section white">
          <div className="section-inner" style={{textAlign:'center',padding:'var(--space-4xl) 0'}}>
            <div className="petition-success-icon"><CheckCircle size={64} /></div>
            <h2 style={{fontFamily:'var(--font-display)',fontSize:'2rem',fontWeight:800,marginTop:'var(--space-xl)',color:'var(--near-black)'}}>Visit Request Received</h2>
            <p style={{color:'var(--text-secondary)',maxWidth:600,margin:'var(--space-lg) auto',lineHeight:1.8}}>
              Your application to observe Parliamentary proceedings has been received. The Visitors Office will confirm availability within 5 working days at <strong>{form.email}</strong>.
            </p>
            <div style={{background:'var(--blue-pale)',borderRadius:'var(--radius-lg)',padding:'var(--space-xl)',maxWidth:500,margin:'var(--space-2xl) auto',textAlign:'left'}}>
              <div style={{fontFamily:'var(--font-ui)',fontSize:'.8rem',color:'var(--text-muted)',marginBottom:'var(--space-sm)'}}>REFERENCE</div>
              <div style={{fontFamily:'var(--font-ui)',fontSize:'1.3rem',fontWeight:700,letterSpacing:'-.02em',color:'var(--blue-deep)'}}>{'VIS-' + String(Date.now()).slice(-8) + '-BRN'}</div>
              <div style={{marginTop:'var(--space-lg)',fontSize:'.85rem',color:'var(--text-secondary)'}}>
                <div><strong>Requested date:</strong> {form.date}</div>
                <div style={{marginTop:'var(--space-sm)'}}><strong>Guests:</strong> {form.guests}</div>
              </div>
            </div>
            <div style={{display:'flex',gap:'var(--space-md)',justifyContent:'center',marginTop:'var(--space-xl)'}}>
              <button className="btn-outline" onClick={()=>{setStep('info');resetForm();}}>New Application</button>
              <Link to="/" className="btn-primary">Return Home</Link>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <div className="page-header"><div className="page-header-inner"><h1>{step === 'form' ? 'Apply to Observe' : 'Visit Parliament'}</h1></div></div>
      <section className="page-section white">
        <div className="section-inner">
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'var(--space-3xl)'}}>
            <div>
              <div className="section-label">Visitor Information</div>
              <h2 style={{fontFamily:'var(--font-display)',fontSize:'1.8rem',fontWeight:800,letterSpacing:'-.04em',lineHeight:1.2,marginBottom:'var(--space-lg)',color:'var(--near-black)'}}>Observe Parliament in Session</h2>
              <div style={{display:'flex',flexDirection:'column',gap:'var(--space-md)',marginBottom:'var(--space-xl)'}}>
                {infoItems.map((item,i)=>(
                  <div key={i} style={{display:'flex',gap:'var(--space-md)',alignItems:'flex-start'}}>
                    <item.icon size={18} style={{color:'var(--blue-mid)',marginTop:2,flexShrink:0}} />
                    <p style={{fontSize:'.88rem',color:'var(--text-secondary)',lineHeight:1.7}}>{item.text}</p>
                  </div>
                ))}
              </div>
              {step === 'info' && (
                <button onClick={()=>setStep('form')} className="petition-submit-btn" style={{width:'auto',display:'inline-flex'}}>
                  <Calendar size={16} /> Apply to Visit
                </button>
              )}
            </div>
            <div>
              {step === 'form' ? (
                <div style={{background:'var(--white)',border:'1px solid var(--border-color)',borderRadius:'var(--radius-lg)',padding:'var(--space-2xl)'}}>
                  <div style={{display:'flex',alignItems:'center',gap:'var(--space-sm)',marginBottom:'var(--space-xl)'}}>
                    <Calendar size={20} /><span style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:'1.1rem'}}>Visitor Application</span>
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
                      <label>Organization (optional)</label>
                      <input type="text" value={form.organization} onChange={e=>setForm({...form,organization:e.target.value})} placeholder="School, media outlet, or leave blank" />
                    </div>
                    <div className="petition-field">
                      <label>Preferred Date</label>
                      <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
                      {errors.date && <span className="field-error">{errors.date}</span>}
                    </div>
                    <div className="petition-field">
                      <label>Number of Guests</label>
                      <select value={form.guests} onChange={e=>setForm({...form,guests:e.target.value})} style={{width:'100%',padding:'var(--space-sm) var(--space-md)',border:'1px solid var(--border-color)',borderRadius:'var(--radius)',fontFamily:'var(--font-body)',fontSize:'.9rem',outline:'none'}}>
                        {['1','2','3','4'].map(n=><option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div className="petition-field">
                      <label>Purpose of Visit</label>
                      <textarea value={form.purpose} onChange={e=>setForm({...form,purpose:e.target.value})} rows={4} placeholder="Briefly describe your interest in observing Parliament. Minimum 20 characters." />
                      <span style={{fontSize:'.75rem',color:form.purpose.length>=20?'var(--text-muted)':'var(--gold)'}}>{form.purpose.length}/20 minimum</span>
                      {errors.purpose && <span className="field-error">{errors.purpose}</span>}
                    </div>
                    <button type="submit" className="petition-submit-btn">
                      <Calendar size={16} /> Submit Application
                    </button>
                    <p style={{fontSize:'.75rem',color:'var(--text-muted)',marginTop:'var(--space-md)',lineHeight:1.6}}>
                      Applications are reviewed within 5 working days. You will receive confirmation and security clearance instructions via email.
                    </p>
                  </form>
                </div>
              ) : (
                <div style={{background:'var(--silver)',borderRadius:'var(--radius-lg)',padding:'var(--space-2xl)',display:'flex',alignItems:'center',justifyContent:'center',minHeight:300}}>
                  <div style={{textAlign:'center',color:'var(--text-muted)'}}>
                    <MapPin size={48} style={{marginBottom:'var(--space-md)',opacity:.3}} />
                    <p style={{fontFamily:'var(--font-display)',fontSize:'1.2rem',fontWeight:700,color:'var(--text-secondary)'}}>Parliament House</p>
                    <p style={{fontSize:'.85rem'}}>Fengtian Prefecture</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
