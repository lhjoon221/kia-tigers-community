import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import '../css/Write.css' // 👈 CSS 연결!

function Write() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userNickname, setUserNickname] = useState('익명 타이거즈 🐯')
  const navigate = useNavigate()

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user && user.user_metadata && user.user_metadata.nickname) {
        setUserNickname(user.user_metadata.nickname)
      }
    }
    checkUser()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!title || !content) {
      return alert('제목과 내용을 모두 입력해주세요! 🐯')
    }

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('posts')
      .insert([{ 
        title, 
        content, 
        nickname: userNickname, 
        user_id: user ? user.id : null 
      }])

    if (error) {
      console.error('Error details:', error)
      alert('글 등록 실패: ' + error.message)
    } else {
      alert('기아 승리를 향한 응원글이 등록되었습니다! ⚾️')
      navigate('/')
    }
  }

  return (
    <div className="write-container">
      <h2 className="write-title">🐯 TIGERS FEED</h2>
      
      <p className="write-author-info">
        작성자: <strong className="author-name">{userNickname}</strong>
      </p>

      <form onSubmit={handleSubmit} className="write-form">
        <div className="input-group">
          <input 
            type="text" 
            placeholder="제목을 입력하세요" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="write-input-title"
          />
        </div>

        <div className="input-group">
          <textarea 
            placeholder="선수들에게 힘이 되는 응원글을 남겨주세요!" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="write-textarea"
          />
        </div>

        <button type="submit" className="btn-submit-post">
          기아의 승리를 위해 등록!
        </button>
      </form>
    </div>
  )
}

export default Write