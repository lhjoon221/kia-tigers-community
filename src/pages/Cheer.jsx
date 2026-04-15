import React from 'react';
import '../css/Cheer.css';

function Cheer() {
  const songs = [
    { 
      name: "김도영", 
      title: "김도영 힘차게 날려라~ 기아의 승리를 위하여! 워어워어오오오 날려라!", 
      videoId: "mcbKTiUAkdc",
      desc: "삼진보다 무서운 안타, 타이거즈의 보물 김도영!"
    },
    { 
      name: "나성범", 
      title: "타이거즈 나성범 안타 안타 날려라 날려라 나성범!", 
      videoId: "zdV8elHHqds",
      desc: "승리를 위해 부르는 나스타의 웅장한 외침!"
    },
    { 
      name: "소크라테스", 
      title: "타이거즈 소크라테스~ 워우워어어어어어~ 쏙! 끄! 라! 테! 스!", 
      videoId: "QvZv1qFnVTM",
      desc: "전 국민이 다 아는 테스형의 중독성 넘치는 응원가!"
    },
    { 
      name: "박찬호", 
      title: "박~찬호! 박~찬호! 안타를 날려버려라~ 기아의 박찬호!", 
      videoId: "66tG87WSYtE",
      desc: "타이거즈의 야전사령관, 든든한 유격수 박찬호!"
    }
  ];

  return (
    <div className="cheer-container">
      <header className="cheer-header">
        <h2 className="cheer-main-title">📢 2026 TIGERS CHEER</h2>
        <p className="cheer-sub-title">선수 사진을 클릭하면 유튜브 응원가로 연결됩니다! 🐯</p>
      </header>

      <div className="cheer-grid">
        {songs.map((song, index) => (
          <div key={index} className="cheer-card">
            <a href={`https://www.youtube.com/watch?v=${song.videoId}`} target="_blank" rel="noopener noreferrer" className="thumbnail-link">
              <div className="thumbnail-wrapper">
                <img 
                  src={`https://img.youtube.com/vi/${song.videoId}/mqdefault.jpg`} 
                  alt={song.name} 
                  className="thumbnail-img"
                />
                <div className="play-overlay">
                  재생하기 ▶
                </div>
              </div>
            </a>

            <div className="cheer-info">
              <h3 className="player-name">{song.name}</h3>
              <div className="lyrics-box">
                <p className="lyrics-text">{song.title}</p>
              </div>
              <p className="player-desc">{song.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cheer;