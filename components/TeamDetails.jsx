import React, { useState } from 'react';
import '@/styles/basic.css';

function TeamDetails(props) {
  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');

  const handleNextClick = (event) => {
    event.preventDefault()
    if(teamName==""||teamNumber==""||leaderEmail==""){
      alert("Fill all values");
    }
    else{
      
        const backendUrl = "http://localhost:3000/api/"
        let id = 1
    
        fetch(backendUrl+"/register", {
          content: "application/json",
          method: "POST",
          body: JSON.stringify(
            {
              "teamName":teamName, 
              "teamNumber":teamNumber,
              "teamLeaderMail":leaderEmail,
            }
           )
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          props.onNext();
        });
      }
    
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
        <input  type="submit" value="submit" className="next-button" onClick={(event)=>{handleNextClick(event)}}>
        </input>
      </form>
    </div>
  );
}

export default TeamDetails;
