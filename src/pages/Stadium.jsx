// src/pages/Stadium.jsx
function Stadium() {
  return (
    <div className="post-card">
      <h2>🏟️ 광주 기아 챔피언스 필드 안내</h2>
      <p style={{ marginBottom: '20px' }}>최강기아의 홈구장, 챔필 방문을 환영합니다!</p>
      
      {/* 지도 영역 */}
      <div style={{ width: '100%', height: '300px', backgroundColor: '#eee', borderRadius: '10px', overflow: 'hidden', marginBottom: '20px' }}>
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3261.646878652435!2d126.8864703763567!3d35.16794625848523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35718c8942008f39%3A0xc3f9479e0019918!2z6rSR7KO8IOq4sOyVhCDssZztlZzsubTsiqQg7ZWE65Oc!5e0!3m2!1sko!2skr!4v1710000000000!5m2!1sko!2skr" 
          width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy">
        </iframe>
      </div>

      <div className="info-box" style={{ background: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
        <h4>📍 주소</h4>
        <p>광주광역시 북구 서림로 10 (임동)</p>
        <h4 style={{ marginTop: '15px' }}>🚗 주차 안내</h4>
        <p>경기 시작 2시간 전부터 만차가 예상되오니 대중교통 이용을 권장합니다.</p>
      </div>
    </div>
  )
}
export default Stadium