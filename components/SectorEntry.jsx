import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import sectordetails from "../utils/sectordetails.json";
import style from '@/styles/SectorEntry.module.css'
import { useSession } from "next-auth/react";

export default function SectorEntry({
  cityName,
  industryName,
  onProceed,
  setVps,
  vps,
}) {

  const { data: session, status } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [finalSubmission, setFinalSubmission] = useState(true);
  const [atleastInvest, setAtleastInvest] = useState(false);
  const [sectorName, setSectorName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [values, setValues] = useState({});
  const [array, setArray] = useState([]);
  const [count, setCount] = useState(0);
  const [ind, setInd] = useState();

  const sectors = sectordetails[industryName][cityName];

  // const [timeInSeconds, setTimeInSeconds] = useState(600);

  const showHideClassName = showPopup
    ? `${style.popup} ${style.display_block}`
    : `${style.popup} ${style.display_none}`;

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

    let array = [0,0,0,0,0];
    console.log(values, sectors);

    Object.keys(values).map((x) => {
      array[x-1] = parseFloat(values[x]);
    });

    console.log(array);

    const backendUrl = process.env.NEXT_PUBLIC_SERVER

    fetch(backendUrl + "/roundOne", {
      content: "application/json",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.accessTokenBackend}`,
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(array)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        onProceed()
      }).catch(err => {
        console.log(err)
      })
  }

  return (
    <div className={style.Sector}>
      {/* <header className={style.time}>{formatTime()}</header> */}
      <main className={style.display_cards}>
        {sectors.map((x) => (
          <div
            className={style.cards}
            key={x.sectorName}
            onClick={() => {
              setInd(x.id)
              openModal(x.sectorname);
              setBasePrice(200);
              setCount((prev) => prev + 1)
            }}
          >
            <div className={style.contentSector}>{x.sectorname}</div>
            <div className={style.contentDetails}>{x.details}</div>
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
          ind={ind}
        />
      </main>
      <div className={style.submit}>
        <button className={style.submit_btn} onClick={togglePopup}>
          Submit
        </button>
        {showPopup && (
          <div className={showHideClassName}>
            <div className={style.popup_main}>
              <h1>
                <u>Your Portfolio</u>
              </h1>
              <ul>
                {Object.keys(values).map((x) => (
                  <li className={style.show_value} key={x}>
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
