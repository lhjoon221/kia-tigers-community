import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'
import '../css/Home.css' 

function Home() {
  const [posts, setPosts] = useState([])
  const [matchLikes, setMatchLikes] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [user, setUser] = useState(null)
  const postsPerPage = 5
  const navigate = useNavigate()

  const fetchData = async () => {
    const { data: userData } = await supabase.auth.getUser()
    if (userData?.user) setUser(userData.user)

    const from = (currentPage - 1) * postsPerPage
    const to = from + postsPerPage - 1
    const { data, count, error } = await supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (!error) {
      setPosts(data)
      setTotalCount(count)
    }
  }

  const fetchMatchLikes = async () => {
    const { data } = await supabase.from('matchup_likes').select('count').eq('id', '20260414').single()
    if (data) setMatchLikes(data.count)
  }

  useEffect(() => {
    fetchData()
    fetchMatchLikes()
  }, [currentPage])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    alert('로그아웃 되었습니다. 또 오세요! 🐯')
    window.location.reload()
  }

  const handleMatchLike = async () => {
    const { error } = await supabase.from('matchup_likes').update({ count: matchLikes + 1 }).eq('id', '20260414')
    if (!error) setMatchLikes(prev => prev + 1)
  }

  const totalPages = Math.ceil(totalCount / postsPerPage)

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="user-menu">
          {user ? (
            <>
              <span className="nickname">{user.user_metadata?.nickname}님 🐯</span>
              <button onClick={handleLogout} className="btn-auth-header">로그아웃</button>
            </>
          ) : (
            <button onClick={() => navigate('/login')} className="btn-auth-header">로그인</button>
          )}
        </div>

        <h1 className="main-title">KIA TIGERS</h1>
        <p className="sub-title">최강기아 팬 응원 게시판</p>
      </header>
      
      <section className="matchup-card-white">
        <div className="matchup-header">
          <span className="baseball-icon">⚾️</span>
          <h2 className="matchup-title">오늘의 매치업 (04. 14)</h2>
        </div>

        <div className="team-row">
          <div className="team-box">
            <strong className="team-name-kia">KIA</strong>
            <p className="pitcher-name">선발: 네일</p>
          </div>
          
          <div className="vs-info">
            <span className="vs-badge-news">VS</span>
            <p className="match-info-text">키움 히어로즈</p>
          </div>

          <div className="team-box kiwoom">
            <strong className="team-name-kiwoom">키움</strong>
            <p className="pitcher-name">선발: 헤이수스</p>
          </div>
        </div>

        <div className="match-action-area">
          <button onClick={handleMatchLike} className="btn-match-like-news">
            👍 응원해요 {matchLikes}
          </button>
        </div>
      </section>

      <div className="write-btn-wrapper">
        <button onClick={() => navigate('/write')} className="btn-write">📝 응원글 작성</button>
      </div>

      <div className="post-list">
        {posts.map((post, index) => {
          const isNew = currentPage === 1 && index < 3;
          return (
            <div key={post.id} className="post-card" onClick={() => navigate(`/post/${post.id}`)}>
              <h3 className="post-title">
                {post.title}
                {isNew && <span className="new-badge">NEW</span>}
              </h3>
              
              <div className="post-info">
                <span className="post-author">👤 {post.nickname}</span>
                <span className="post-date">📅 {new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pagination-wrapper">
        {Array.from({ length: totalPages }, (_, i) => (
          <button 
            key={i + 1} 
            onClick={() => setCurrentPage(i + 1)} 
            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Home;