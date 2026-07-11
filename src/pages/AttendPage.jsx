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
                <div style={{background:'var(--silver)',borderRadius:'var(--radius-lg)',overflow:'hidden',minHeight:360,position:'relative'}}>
                  <svg viewBox='0 0 500 360' style={{width:'100%',height:'100%',display:'block'}}>
                    <rect width='500' height='360' fill='#e8ecf1'/>
                    <path d='M0 300 Q100 280 200 290 Q300 300 400 280 Q450 270 500 275 L500 360 L0 360Z' fill='#b8d4e8' opacity='0.5'/>
                    <line x1='0' y1='160' x2='500' y2='160' stroke='#fff' strokeWidth='18' opacity='0.8'/>
                    <line x1='250' y1='0' x2='250' y2='360' stroke='#fff' strokeWidth='14' opacity='0.8'/>
                    <line x1='0' y1='260' x2='500' y2='260' stroke='#fff' strokeWidth='10' opacity='0.7'/>
                    <line x1='140' y1='0' x2='140' y2='360' stroke='#e0e4ea' strokeWidth='8'/>
                    <line x1='360' y1='0' x2='360' y2='360' stroke='#e0e4ea' strokeWidth='8'/>
                    <rect x='280' y='20' width='70' height='70' rx='35' fill='#c5dbb5' opacity='0.6'/>
                    <rect x='60' y='30' width='40' height='40' rx='20' fill='#c5dbb5' opacity='0.5'/>
                    <rect x='160' y='65' width='130' height='85' rx='4' fill='#1a3a5c'/>
                    <rect x='170' y='75' width='110' height='65' rx='2' fill='#254d78'/>
                    <circle cx='225' cy='107' r='20' fill='#c9a96e' opacity='0.7'/>
                    <rect x='195' y='130' width='60' height='12' fill='#8c9096' opacity='0.3'/>
                    <rect x='35' y='180' width='55' height='48' rx='2' fill='#c4c8ce'/><rect x='42' y='188' width='41' height='33' rx='1' fill='#dde1e7'/>
                    <rect x='310' y='95' width='55' height='42' rx='2' fill='#c4c8ce'/><rect x='316' y='101' width='43' height='30' rx='1' fill='#dde1e7'/>
                    <rect x='380' y='100' width='55' height='45' rx='2' fill='#c4c8ce'/><rect x='386' y='107' width='43' height='31' rx='1' fill='#dde1e7'/>
                    <rect x='55' y='280' width='85' height='48' rx='2' fill='#c4c8ce'/><rect x='63' y='288' width='69' height='32' rx='1' fill='#dde1e7'/>
                    <rect x='295' y='280' width='62' height='42' rx='2' fill='#c4c8ce'/><rect x='301' y='287' width='50' height='28' rx='1' fill='#dde1e7'/>
                    <rect x='375' y='275' width='70' height='52' rx='2' fill='#c4c8ce'/><rect x='383' y='283' width='54' height='36' rx='1' fill='#dde1e7'/>
                    <text x='225' y='175' textAnchor='middle' fontSize='9' fontWeight='700' fill='#0e1311' fontFamily='sans-serif'>Parliament House</text>
                    <text x='63' y='245' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>Supreme Court</text>
                    <text x='265' y='245' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>Constitutional Avenue</text>
                    <text x='338' y='152' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>National Library</text>
                    <text x='408' y='160' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>National Archives</text>
                    <text x='98' y='343' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>Fengtian Museum</text>
                    <text x='326' y='337' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>Republic Square</text>
                    <text x='410' y='342' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>Visitors Pavilion</text>
                    <text x='315' y='55' textAnchor='middle' fontSize='7' fill='#505050' fontFamily='sans-serif'>Central Park</text>
                    <text x='435' y='353' textAnchor='middle' fontSize='7' fill='#8c9096' fontFamily='sans-serif'>Ling River</text>
                    <circle cx='225' cy='175' r='5' fill='#c0392b'/>
                    <circle cx='225' cy='175' r='9' fill='none' stroke='#c0392b' strokeWidth='1.5' opacity='0.5'/>
                    <g transform='translate(462,28)'>
                      <circle cx='0' cy='0' r='16' fill='#fff' fillOpacity='0.8' stroke='#c4c8ce' strokeWidth='1'/>
                      <text x='0' y='-6' textAnchor='middle' fontSize='8' fontWeight='700' fill='#1a3a5c' fontFamily='sans-serif'>N</text>
                      <line x1='0' y1='-3' x2='0' y2='3' stroke='#1a3a5c' strokeWidth='1'/>
                      <polygon points='0,-5 -2,-1 2,-1' fill='#1a3a5c'/>
                    </g>
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
