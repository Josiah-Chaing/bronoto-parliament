import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/members', label: 'Members' },
    { path: '/committees', label: 'Committees' },
    { path: '/laws', label: 'Laws' },
    { path: '/news', label: 'News' },
  ];

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="brand">
          <svg className="brand-emblem" viewBox="0 0 48 48" width="32" height="32" aria-hidden="true">
            <circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" strokeWidth="2"/>
            <circle cx="24" cy="24" r="12" fill="none" stroke="currentColor" strokeWidth="1.2"/>
            <circle cx="24" cy="24" r="4" fill="currentColor"/>
            <path d="M2 24 Q16 34 24 24 Q32 14 46 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span class="brand-text">Bronoto Parliament<span class="brand-sub">白東民國國會</span></span>
        </Link>
        <button className="mobile-nav-toggle" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? '\u2715' : '\u2630'}</button>
        <nav>
          <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
            {navItems.map(item => (
              <li key={item.path}>
                <Link to={item.path} className={location.pathname === item.path ? 'active' : ''} onClick={() => setMenuOpen(false)}>{item.label}</Link>
              </li>
            ))}
            <li><button className="nav-cta-signup" onClick={() => {}}>EN</button></li>
            <li><button className="nav-cta-login" onClick={() => {}}>白語</button></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
