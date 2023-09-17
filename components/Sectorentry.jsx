import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import sectordetails from "../utils/sectordetails.json";
import "../styles/SectorEntry.css";

function SectorEntry({ cityName, industryName, onProceed }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [finalSubmission, setFinalSubmission] = useState(true);
  const [sectorName, setSectorName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [values, setValues] = useState({});
  const sectors = sectordetails[industryName][cityName];
  const url = "http://localhost:3000/api/roundOne/postSector";

  const [timeInSeconds, setTimeInSeconds] = useState(600);
  const showHideClassName = showPopup
    ? "popup display-block"
    : "popup display-none";

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      if (timeInSeconds > 0) {
        setTimeInSeconds(timeInSeconds - 1);
      } else {
        clearInterval(countdownInterval);
        alert("time's up");
        // setFinalSubmission(false);
        // togglePopup();
      }
    }, 1000);

    return () => {
      clearInterval(countdownInterval);
    };
  }, [timeInSeconds]);

  function formatTime() {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  function openModal(sectorname) {
    setIsModalOpen(true);
    setSectorName(sectorname);
    console.log(sectorname);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function SendSector() {
    fetch(url, {
      // content: "application/json",
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        onProceed();
      })
  }

  return (
    <div className="Sector">
      <header className="time">{formatTime()}</header>
      <main className="display-cards">
        {sectors.map((x) => (
          <div className={"cards"} key={x.sectorName}>
            <header className="content">
              <div>{x.sectorname}</div><br />
              <div>The base price is 200</div>
            </header>
            <main className="content">{x.details}</main>
            <footer className="content">
              <button className="invest"
                onClick={() => {
                  openModal(x.sectorname);
                  setBasePrice(200);
                }}
              >
                Invest
              </button>
            </footer>
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          sector={sectorName}
          setValues={setValues}
          values={values}
          basePrice={basePrice}  
        />
      </main>
      <footer className="submit">
        <button className="submit-btn" onClick={togglePopup}>Submit</button>
        {showPopup && (
          <div className={showHideClassName}>
            <div className="popup-main">
              <h1>
                <u>Your Portfolio</u>
              </h1>
              <ul>
                {Object.keys(values).map((x) => (
                  <li className="show-value" key={x}>
                    {x}:{values[x]}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  console.log(values);
                  SendSector();
                }}
              >
                Invest
              </button>
              {finalSubmission && <button onClick={togglePopup}>Cancel</button>}
            </div>
          </div>
        )}
      </footer>
    </div>
  );
}

export default SectorEntry;
