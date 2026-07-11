import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig, newsArticles, laws } from '../data/mockData';
import { Users, Scale, FileText, Search, ArrowUp, Sparkles, Paperclip, Mic } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function QuickLinks() {
  const items = [
    { to: '/members', icon: Users, title: 'Members', desc: '500 Members of Parliament representing 21 million citizens.' },
    { to: '/laws', icon: Scale, title: 'Legislation', desc: 'Browse enacted laws and pending bills.' },
    { to: '#', icon: FileText, title: 'Attend', desc: 'Apply to observe Parliamentary sessions.' },
    { to: '/petition', icon: Search, title: 'Petition', desc: 'Submit a constitutional petition to Parliament.' },
  ];
  return (
    <div className="quick-links">
      {items.map((item, i) => (
        <Link key={i} to={item.to} className="quick-link" data-reveal="reveal-up"><item.icon className="quick-link-icon" /><h3>{item.title}</h3><p>{item.desc}</p></Link>
      ))}
    </div>
  );
}

const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function HomePage() {
  const headlineRef = useRef(null);
  const badgeRef = useRef(null);
  const subtitleRef = useRef(null);
  const searchRef = useRef(null);
  const recentNews = newsArticles.slice(0, 4);
  const recentLaws = laws.filter(l => l.status === 'passed').slice(0, 3);
  const ctxRef = useRef(null);

  useEffect(() => {
    if (prefersReduced) return;

    // Opening animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: .8 } });
    tl.fromTo(badgeRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 })
      .fromTo(headlineRef.current, { y: 80, opacity: 0, scale: 1.05 }, { y: 0, opacity: 1, scale: 1, duration: 1.2 }, '-=0.4')
      .fromTo(subtitleRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.6')
      .fromTo(searchRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1 }, '-=0.4');

    // Scroll reveals - scoped to homepage only
    const ctx = gsap.context(() => {
      document.querySelectorAll('[data-reveal]').forEach(el => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => { el.classList.add('revealed'); el.style.transition = 'transform 1s cubic-bezier(.19,1,.22,1), opacity .8s ease'; },
        });
      });

      document.querySelectorAll('.section-headline').forEach(el => {
        ScrollTrigger.create({ trigger: el, start: 'top 80%', once: true, onEnter: () => el.classList.add('visible') });
      });

      // Cards stagger - only target elements within stagger-cards containers
      document.querySelectorAll('.stagger-cards').forEach(container => {
        const cards = container.querySelectorAll(':scope > .card, :scope > .news-card, :scope > .law-card, :scope > .quick-link');
        cards.forEach((card, i) => {
          gsap.fromTo(card, { y: 60, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
            delay: i * 0.08,
          });
        });
      });
    });

    ctxRef.current = ctx;
    return () => { ctx.revert(); };
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge-group" ref={badgeRef}>
            <span className="hero-badge-dark"><Sparkles size={12} /> M6</span>
            <span className="hero-badge-light">Bronoto Parliament</span>
          </div>
          <h1 className="hero-headline" ref={headlineRef}>Power Flows<br/>Like Water</h1>
          <p className="hero-subtitle" ref={subtitleRef}>
            {siteConfig.tagline}<br/>The supreme legislative body of the people.<br/>
自四月二十七日決議以來，白東選擇了憲政民主為舟，法治為岸。<br/>
Since the April 27 Resolution, Bronoto has chosen constitutional democracy as its vessel and the rule of law as its shore.
          </p>
          <div className="hero-search" ref={searchRef}>
            <div className="hero-search-outer">
              <div className="hero-search-meta"><span>{siteConfig.totalBudget} <span className="hero-search-upgrade">M6 BUDGET</span></span><span className="hero-search-powered"><Sparkles size={10} /> {siteConfig.currentSession}</span></div>
              <div className="hero-search-input-row"><input type="text" placeholder="Search bills, members, records…" /><button className="hero-search-submit" aria-label="Search"><ArrowUp size={16} /></button></div>
              <div className="hero-search-actions"><div className="hero-search-actions-left"><button className="hero-search-action-btn"><Paperclip size={12} /> Attach</button><button className="hero-search-action-btn"><Mic size={12} /> Voice</button><button className="hero-search-action-btn"><Search size={12} /> Prompts</button></div><span className="hero-search-count">0/3,000</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-section white"><div className="section-inner"><div className="section-label">Services</div><h2 className="section-headline"><span className="reveal-line"><span>Navigate Parliament</span></span></h2><QuickLinks /></div></section>

      <section className="page-section"><div className="section-inner stagger-cards">
        <div style={{display:'grid',gridTemplateColumns:'3fr 2fr',gap:'var(--space-2xl)'}}>
          <div><div className="section-label">Latest</div><h2 className="section-headline"><span className="reveal-line"><span>News &amp; Updates</span></span></h2>
            <div style={{display:'flex',flexDirection:'column',gap:'var(--space-md)'}}>
              {recentNews.map(item=>(<Link to="/news" key={item.id} className="card news-card"><span className="news-category">{item.category}</span><div className="news-date">{item.date}</div><div className="news-title">{item.title}</div><div className="news-summary">{item.summary}</div></Link>))}
            </div>
            <Link to="/news" style={{display:'inline-block',marginTop:'var(--space-xl)',fontFamily:'var(--font-ui)',fontSize:'.85rem',fontWeight:600,letterSpacing:'-.01em'}}>All news <ArrowUp size={14} style={{transform:'rotate(90deg)',verticalAlign:'middle'}} /></Link>
          </div>
          <div><div className="section-label">Legislation</div><h2 className="section-headline"><span className="reveal-line"><span>Enacted Laws</span></span></h2>
            <div style={{display:'flex',flexDirection:'column'}}>
              {recentLaws.map(law=>(<Link to="/laws" key={law.id} className="law-card"><span className="law-number">{law.number}</span><span className="law-title">{law.title}</span><span className="law-status status-passed">{law.statusLabel}</span></Link>))}
            </div>
            <div style={{marginTop:'var(--space-xl)',padding:'var(--space-xl)',background:'var(--white)',border:'1px solid var(--border-color)',borderRadius:'var(--radius-lg)'}}>
              <h4 style={{fontFamily:'var(--font-display)',fontSize:'1.1rem',fontWeight:700,marginBottom:'var(--space-sm)',color:'var(--near-black)'}}>{siteConfig.currentSession}</h4>
              <p style={{fontSize:'.85rem',color:'var(--text-secondary)',lineHeight:1.7}}>{siteConfig.sessionStart} – {siteConfig.sessionEnd}<br/>Bills in review: {siteConfig.billsInReview} · Enacted: {siteConfig.billsPassed}<br/>Annual budget: {siteConfig.totalBudget}</p>
            </div>
          </div>
        </div>
      </div></section>
    </>
  );
}
