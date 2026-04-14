import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate, Link } from 'react-router-dom'
import '../css/Login.css' // 👈 CSS 연결!

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      alert('로그인 실패: ' + error.message)
      console.error(error.message)
    } else {
      alert('반갑습니다! 기아 타이거즈 응원 게시판입니다. ⚾️')
      navigate('/') 
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-logo">KIA TIGERS</h2>
        <p className="login-subtitle">팬 로그인을 진행해주세요.</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
              required
            />
          </div>

          <button type="submit" className="btn-login-submit">
            로그인
          </button>
        </form>

        <div className="signup-link-wrapper">
          <span className="signup-text">아직 회원이 아니신가요? </span>
          <Link to="/signup" className="signup-link">회원가입 하기</Link>
        </div>
      </div>
    </div>
  )
}

export default Login