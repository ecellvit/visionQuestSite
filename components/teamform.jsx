import React, { useState } from 'react';

function TeamForm() {
  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');

  const handleNextClick = () => {
    // Send data to the backend (not implemented)
    console.log('Data sent to backend:', { teamName, teamNumber, leaderEmail });
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Team Registration</h1>
      <form className="input-form">
        <div className="form-group">
          <label htmlFor="teamName">Team Name</label>
          <input
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="teamNumber">Team Number</label>
          <input
            type="text"
            id="teamNumber"
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="leaderEmail">Leader Mail ID</label>
          <input
            type="email"
            id="leaderEmail"
            value={leaderEmail}
            onChange={(e) => setLeaderEmail(e.target.value)}
          />
        </div>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </form>
    </div>
  );
}

export default TeamForm;
