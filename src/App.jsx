import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoBackground from './components/VideoBackground';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MembersPage from './pages/MembersPage';
import CommitteesPage from './pages/CommitteesPage';
import LawsPage from './pages/LawsPage';
import NewsPage from './pages/NewsPage';
import PetitionPage from './pages/PetitionPage';
import AttendPage from './pages/AttendPage';
import ConstitutionPage from './pages/ConstitutionPage';
import ProvisionalConstitutionPage from './pages/ProvisionalConstitutionPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const isAdmin = location.pathname === '/admin';

  useEffect(() => { window.scrollTo(0, 0); }, [location.pathname]);

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    );
  }

  return (
    <>
      {isHome && <VideoBackground />}
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/members" element={<MembersPage />} />
          <Route path="/committees" element={<CommitteesPage />} />
          <Route path="/laws" element={<LawsPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/petition" element={<PetitionPage />} />
          <Route path="/attend" element={<AttendPage />} />
          <Route path="/constitution" element={<ConstitutionPage />} />
          <Route path="/provisional-constitution" element={<ProvisionalConstitutionPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
