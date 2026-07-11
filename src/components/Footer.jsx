import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          <div>
            <span style={{fontFamily:'var(--font-display)',fontSize:'1.3rem',fontWeight:700,color:'var(--white)',letterSpacing:'-.03em'}}>Bronoto Parliament</span>
            <p className="footer-desc">
              白東民國國會<br/>
              1 Constitution Avenue, Central District<br/>
              Fengtian Prefecture<br/>
              Power exercised in sunlight.
            </p>
          </div>
          <div className="footer-col"><h4>Parliament</h4><ul><li><Link to="/about">About</Link></li><li><Link to="/members">Members</Link></li><li><Link to="/committees">Committees</Link></li></ul></div>
          <div className="footer-col"><h4>Records</h4><ul><li><Link to="/laws">Legislation</Link></li><li><Link to="/news">News</Link></li><li><a href="#">Hansard</a></li></ul></div>
          <div className="footer-col"><h4>Language</h4><ul><li><a href="#">白語</a></li><li><a href="#">正體中文</a></li><li><a href="#">English</a></li></ul></div>
        </div>
        <div className="footer-bottom">
          <span>© Republic Year 6 · Parliament of the Republic of Bronoto</span>
          <span>info@parliament.bd</span>
        </div>
      </div>
    </footer>
  );
}
