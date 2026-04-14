import React from 'react';
import '../css/Ranking.css'; // 👈 CSS 연결!

function Ranking() {
  const standings = [
    { rank: 1, team: 'KIA', game: 15, win: 11, lose: 4, rate: '0.733', streak: '3승', gap: '-' },
    { rank: 2, team: '삼성', game: 15, win: 10, lose: 5, rate: '0.667', streak: '1패', gap: '1.0' },
    { rank: 3, team: 'LG', game: 14, win: 9, lose: 5, rate: '0.643', streak: '2승', gap: '1.5' },
    { rank: 4, team: '두산', game: 15, win: 8, lose: 7, rate: '0.533', streak: '1승', gap: '3.0' },
    { rank: 5, team: 'SSG', game: 15, win: 7, lose: 8, rate: '0.467', streak: '2패', gap: '4.0' },
    { rank: 6, team: 'KT', game: 14, win: 6, lose: 8, rate: '0.429', streak: '1승', gap: '4.5' },
    { rank: 7, team: '한화', game: 15, win: 6, lose: 9, rate: '0.400', streak: '2패', gap: '5.0' },
    { rank: 8, team: '롯데', game: 14, win: 5, lose: 9, rate: '0.357', streak: '3패', gap: '5.5' },
    { rank: 9, team: 'NC', game: 15, win: 5, lose: 10, rate: '0.333', streak: '1승', gap: '6.0' },
    { rank: 10, team: '키움', game: 14, win: 4, lose: 10, rate: '0.286', streak: '1패', gap: '6.5' },
  ];

  return (
    <div className="ranking-container">
      <h2 className="ranking-title">📈 2026 KBO 정규리그 순위</h2>
      <p className="ranking-date">기준일: 2026. 04. 14. 현재</p>

      <div className="table-wrapper">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>순위</th>
              <th>팀명</th>
              <th>경기</th>
              <th>승</th>
              <th>패</th>
              <th>승률</th>
              <th>연속</th>
              <th>게임차</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((s) => (
              <tr key={s.team} className={s.team === 'KIA' ? 'highlight-kia' : ''}>
                <td className="rank-cell">
                  <span className={s.rank <= 5 ? 'top-rank' : 'normal-rank'}>{s.rank}</span>
                </td>
                <td className="team-name">{s.team}</td>
                <td>{s.game}</td>
                <td>{s.win}</td>
                <td>{s.lose}</td>
                <td>{s.rate}</td>
                <td>{s.streak}</td>
                <td>{s.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Ranking;