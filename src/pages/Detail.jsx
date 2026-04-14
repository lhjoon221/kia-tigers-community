import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../api/supabase'
import '../css/Detail.css' // 👈 CSS 연결!

function Detail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchPost = async () => {
        const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        if (error) {
            alert('게시글을 불러올 수 없습니다.')
            navigate(-1)
        } else {
            setPost(data)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPost()
    }, [id])

    const handleLike = async () => {
        if (!post) return
        const { error } = await supabase
            .from('posts')
            .update({ likes: (post.likes || 0) + 1 })
            .eq('id', id)

        if (!error) {
            setPost({ ...post, likes: (post.likes || 0) + 1 })
        }
    }

    const handleDelete = async () => {
        if (window.confirm("정말로 이 응원글을 삭제하시겠습니까? 🐯")) {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (!error) {
                alert("시원하게 날려버렸습니다! 홈으로 이동합니다. ⚾️");
                navigate('/');
            }
        }
    }

    if (loading) return <div className="loading-text">로딩 중...</div>
    if (!post) return null

    return (
        <div className="detail-container">
            <button onClick={() => navigate(-1)} className="back-button">
                ← 목록으로 돌아가기
            </button>

            <div className="post-content-box">
                <h1 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>{post.title}</h1>
                
                <div className="post-header-info">
                    <span>👤 작성자: {post.nickname || '익명 팬'}</span>
                    <span style={{ marginLeft: '15px' }}>📅 {new Date(post.created_at).toLocaleDateString()}</span>
                </div>
                
                <p className="post-body">
                    {post.content}
                </p>

                <div className="action-section">
                    <button onClick={handleLike} className="btn-like">
                        👍 기아 응원하기 {post.likes || 0}
                    </button>
                    
                    <div className="btn-delete-wrapper">
                        <button onClick={handleDelete} className="btn-delete">
                            이 응원글 삭제하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;