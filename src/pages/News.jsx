import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../api/supabase'
import '../css/News.css' 

function News() {
    const [hotPosts, setHotPosts] = useState([])
    const [matchLikes, setMatchLikes] = useState(0)
    const navigate = useNavigate()

    const fetchData = async () => {
        const { data: postsData } = await supabase
            .from('posts')
            .select('*')
            .order('likes', { ascending: false })
            .limit(3)
        if (postsData) setHotPosts(postsData)

        const { data: likeData } = await supabase
            .from('matchup_likes')
            .select('count')
            .eq('id', '20260414')
            .single()
        if (likeData) setMatchLikes(likeData.count)
    }

    useEffect(() => { fetchData() }, [])

    const handlePostLike = async (e, postId, currentLikes) => {
        e.stopPropagation(); 
        const { error } = await supabase
            .from('posts')
            .update({ likes: (currentLikes || 0) + 1 })
            .eq('id', postId)
        if (!error) {
            setHotPosts(prev => prev.map(post => 
                post.id === postId ? { ...post, likes: (currentLikes || 0) + 1 } : post
            ))
        }
    }

    const handleMatchLike = async () => {
        const { error } = await supabase
            .from('matchup_likes')
            .update({ count: matchLikes + 1 })
            .eq('id', '20260414')
        if (!error) setMatchLikes(prev => prev + 1)
    }

    return (
        <div className="news-container">
            <section>
                <h2 className="section-title">⚾️ 오늘의 매치업 (04. 14)</h2>
                
                <div className="matchup-card-white">
                    <div className="team-row">
                        <div className="team-box">
                            <strong>KIA</strong>
                            <p className="pitcher-name">선발: 네일</p>
                        </div>
                        
                        <div className="vs-info">
                            <span className="vs-badge-news">VS</span>
                            <p className="match-info-text">키움 히어로즈</p>
                        </div>

                        <div className="team-box kiwoom">
                            <strong>키움</strong>
                            <p className="pitcher-name">선발: 헤이수스</p>
                        </div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <button onClick={handleMatchLike} className="btn-match-like-news">
                            👍 응원해요 {matchLikes}
                        </button>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="section-title">🔥 인기 응원글</h2>
                <div className="post-list">
                    {hotPosts.map((post, index) => (
                        <div key={post.id} onClick={() => navigate(`/post/${post.id}`)} className="hot-post-card">
                            <div className="post-top-row">
                                <h3 className="post-title-news">{post.title}</h3>
                                <span className="top-badge">TOP {index + 1}</span>
                            </div>
                            <p className="post-preview">{post.content?.substring(0, 50)}...</p>
                            <div className="post-like-count">
                                <span onClick={(e) => handlePostLike(e, post.id, post.likes)} style={{ cursor: 'pointer' }}>
                                    👍 {post.likes || 0} 응원 중
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default News;