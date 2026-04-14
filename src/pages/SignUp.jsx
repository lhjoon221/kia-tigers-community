import { useState } from 'react'
import { supabase } from '../supabaseClient'
import { useNavigate } from 'react-router-dom'
import '../css/SignUp.css' // 👈 CSS 연결!

function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          nickname: nickname,
        },
      },
    })

    if (error) {
      alert('회원가입 실패: ' + error.message)
    } else {
      alert('기아 타이거즈 팬이 되신 걸 환영합니다! 로그인을 진행해주세요. 🐯⚾️')
      navigate('/login')
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-logo">SIGN UP</h2>
        <p className="signup-subtitle">최강기아 팬 커뮤니티 가입</p>

        <form onSubmit={handleSignUp}>
          <div className="input-group">
            <label className="input-label">응원 닉네임</label>
            <input
              type="text"
              placeholder="예: 도영맘, 갸동님"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="signup-input"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">이메일 계정</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">비밀번호</label>
            <input
              type="password"
              placeholder="6자리 이상 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="signup-input"
              required
            />
          </div>

          <button type="submit" className="btn-signup-submit">
            타이거즈 팬 등록하기
          </button>
        </form>
        
        <button 
          onClick={() => navigate('/login')}
          className="btn-goto-login"
        >
          이미 계정이 있으신가요? 로그인
        </button>
      </div>
    </div>
  )
}

export default SignUp