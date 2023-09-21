import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import sectordetails from "../utils/sectordetails.json";
import "../styles/SectorEntry.css";

export default function SectorEntry({
  cityName,
  industryName,
  onProceed,
  setVps,
  vps,
}) {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [finalSubmission, setFinalSubmission] = useState(true);
  const [atleastInvest, setAtleastInvest] = useState(false);
  const [sectorName, setSectorName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [values, setValues] = useState({});
  const [array,setArray] = useState([]);
  const [count,setCount] = useState(0);
  const sectors = sectordetails[industryName][cityName];
  const url = "http://localhost:3000/api/roundOne/postSector";
  sectors.map(x=>x)
  // const [timeInSeconds, setTimeInSeconds] = useState(600);
  const showHideClassName = showPopup
    ? "popup display-block"
    : "popup display-none";

  // useEffect(() => {
  //   const countdownInterval = setInterval(() => {
  //     if (timeInSeconds > 0) {
  //       setTimeInSeconds(timeInSeconds - 1);
  //     } else {
  //       clearInterval(countdownInterval);
  //       alert("time's up");
  //       // setFinalSubmission(false);
  //       // togglePopup();
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(countdownInterval);
  //   };
  // }, [timeInSeconds]);

  // function formatTime() {
  //   const minutes = Math.floor(timeInSeconds / 60);
  //   const seconds = timeInSeconds % 60;
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // }
  console.log(Object.keys(sectors).map((x)=>setArray((prev)=>(prev,x))))
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
    //Object.keys(sectors).map((x)=>setArray((prev)=>(...prev,sectors[x].sectorname)))
    Object.keys(values).map((x)=>{
      if(array.includes(x)){
        array[array.indexOf(x)]=parseFloat(values[x])
      }
    })
    array.forEach(x=>{
      if(isNaN(x)){
        array[array.indexOf(x)]=0;
      }
    })
    const backendUrl = process.env.NEXT_PUBLIC_SERVER
    
        fetch(backendUrl+"/api/roundOne", {
          content: "application/json",
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session.accessTokenBackend}`,
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify(
            {
              array
            }
           )
        })
        .then(res=>res.json())
        .then(data=>{
          console.log(data);
          props.onProceed();
        });
  }

  return (
    <div className="Sector">
      {/* <header className="time">{formatTime()}</header> */}
      <main className="display-cards">
        {sectors.map((x) => (
          <div
            className="cards"
            key={x.sectorName}
            onClick={() => {
              openModal(x.sectorname);
              setBasePrice(200);
              setCount((prev)=>prev+1)
            }}
          >
            <div className="contentSector">{x.sectorname}</div>
            <div className="contentDetails">{x.details}</div>
          </div>
        ))}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          sector={sectorName}
          setValues={setValues}
          setVps={setVps}
          vps={vps}
          setAtleastInvest={setAtleastInvest}
          values={values}
          basePrice={basePrice}
          count={count}
          setCount={setCount}
        />
      </main>
      <div className="submit">
        <button className="submit-btn" onClick={togglePopup}>
          Submit
        </button>
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
              {atleastInvest && (
                <button
                  onClick={() => {
                    console.log(values);
                    SendSector();
                  }}
                >
                  Invest
                </button>
              )}
              {finalSubmission && <button onClick={togglePopup}>Cancel</button>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
