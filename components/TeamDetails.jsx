import React, { useState } from 'react';
import styles from '@/styles/basic.module.css';
import { useSession } from 'next-auth/react';

function TeamDetails(props) {

  const { data: session, status } = useSession()

  const [teamName, setTeamName] = useState('');
  const [teamNumber, setTeamNumber] = useState('');
  const [leaderEmail, setLeaderEmail] = useState('');
  const [leaderName, setLeaderName] = useState('');

  const handleNextClick = (event) => {
    event.preventDefault()
    if (teamName == "" || teamNumber == "" || leaderEmail == "" || leaderName == "") {
      alert("Fill all values");
    }
    else {
      const backendUrl = process.env.NEXT_PUBLIC_SERVER

      fetch(backendUrl + "/team/createTeam", {
        content: "application/json",
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(
          {
            "teamName": teamName,
            "teamNumber": teamNumber,
            "leaderEmail": leaderEmail,
            "leaderName": leaderName,
          }
        )
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          props.onNext();
        });
    }

  };

  return (
    <div className={styles.form_container}>
      <h1 className={styles.form_title}>Team Registration</h1>
      <form className={styles.input_form}>
        <div className={styles.form_group}>
          <label htmlFor="teamName">Team Name</label>
          <input
            className={styles.form_input}
            type="text"
            id="teamName"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label htmlFor="teamNumber">Team Number</label>
          <input
            className={styles.form_input}
            type="text"
            id="teamNumber"
            value={teamNumber}
            onChange={(e) => setTeamNumber(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="leaderEmail">Leader Mail ID</label>
          <input
            className={styles.form_input}
            type="email"
            id="leaderEmail"
            value={leaderEmail}
            onChange={(e) => setLeaderEmail(e.target.value)}
          />
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label} htmlFor="leaderName">Leader Name</label>
          <input
            className={styles.form_input}
            type="text"
            id="leaderName"
            value={leaderName}
            onChange={(e) => setLeaderName(e.target.value)}
          />
        </div>
        <input type="submit" value="submit" className={styles.submit_button} onClick={(event) => { handleNextClick(event) }}>
        </input>
      </form>
    </div>
  );
}

export default TeamDetails;
