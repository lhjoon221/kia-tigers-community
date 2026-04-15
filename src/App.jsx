import { Routes, Route, Link, Navigate } from 'react-router-dom' // Navigate 추가
import Home from './pages/Home'
import Write from './pages/Write'
import Detail from './pages/Detail'
import News from './pages/News'       
import Stadium from './pages/Stadium' 
import Ranking from './pages/Ranking'
import Cheer from './pages/Cheer'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import './App.css'

function App() {
  return (
    <div className="container">
      <header className="header">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1>🐯 TIGERS LIVE</h1>
        </Link>
        <nav className="nav-menu">
          <Link to="/">응원게시판</Link>
          <Link to="/news">구단소식</Link>
          <Link to="/stadium">직관가이드</Link>
          <Link to="/ranking">순위표</Link>
          <Link to="/cheer">응원가</Link>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kia-tigers-community" element={<Home />} />

        <Route path="/write" element={<Write />} />
        <Route path="/post/:id" element={<Detail />} />
        <Route path="/news" element={<News />} />
        <Route path="/stadium" element={<Stadium />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/cheer" element={<Cheer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <footer style={{ 
        marginTop: '50px', 
        padding: '20px 0', 
        borderTop: '1px solid #333', 
        textAlign: 'center',
        color: '#999',
        fontSize: '0.8rem'
      }}>
        <p>본 사이트는 비영리 목적의 개인 포트폴리오이며, 사용된 영상 및 데이터의 저작권은 각 원작자 및 KIA 타이거즈에 있습니다.</p>
        <p>© 2026 Lim Hyung-jun. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

export default App