import React, { useState } from 'react';
import '@/styles/basic.css';
import { useSession } from 'next-auth/react';

function TeamDetails(props) {

  const { data: session, status } = useSession()

  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderName, setLeaderName] = useState('');

  const handleNextClick = (event) => {
    event.preventDefault()
    if(teamName==""||teamNumber==""||leaderEmail==""||leaderName==""){
      alert("Fill all values");
    }
    else{
        const backendUrl = process.env.NEXT_PUBLIC_SERVER
        let id = 1
    
        fetch(backendUrl+"/team/createTeam", {
          content: "application/json",
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessTokenBackend}`,
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(
            {
              "teamName":teamName, 
              "teamNumber":teamNumber,
              "leaderEmail":leaderEmail,
              "leaderName":leaderName,
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
        <div className="form-group">
          <label htmlFor="leaderName">Leader Name</label>
          <input
            type="text"
            id="leaderName"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
          />
        </div>
        <input  type="submit" value="submit" className="next-button" onClick={(event)=>{handleNextClick(event)}}>
        </input>
      </form>
    </div>
  );
}

export default TeamDetails;
