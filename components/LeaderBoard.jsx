// src/components/Leaderboard.js

import React, { useState, useEffect } from 'react';
import '../styles/leaderBoard.css'

export default function LeaderBoard() {
  const [players, setPlayers] = useState([
    { id: 1, name: 'Player 1', score: 100 },
    { id: 2, name: 'Player 2', score: 80 },
    { id: 3, name: 'Player 3', score: 120 },
    // Add more players as needed
  ]);

  useEffect(() => {
    // Sort players by score
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    setPlayers(sortedPlayers);
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player, index) => (
            <tr key={player.id}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


