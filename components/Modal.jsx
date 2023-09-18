import React, { useState } from "react";

function Modal({ isOpen, onClose, sector, basePrice, setValues, setVps, vps ,setAtleastInvest}) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (parseFloat(vps) > parseFloat(inputValue)) {
      if (parseFloat(inputValue) >= parseFloat(basePrice)) {
        if (parseFloat(inputValue) % 50 === 0) {
          alert(`Input Accepted: ${inputValue}`);
          console.log(sector);
          console.log(inputValue);
          setValues((prev) => {
            return { ...prev, [sector]: inputValue };
          });
          setVps((prev) => parseFloat(prev) - parseFloat(inputValue));
          setInputValue("");
          setErrorMessage("");
          setAtleastInvest(true);
          onClose();
        } else {
          setErrorMessage("Amount should be a multiple of 50");
        }
      } else {
        setErrorMessage(`Amount cannot be less than ${basePrice}`);
      }
    } else {
      setErrorMessage(`Sorry you are running out of money`);
    }
  };

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2>{sector}</h2>
        <input
          className="input-amount"
          type="number"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something..."
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button onClick={handleSubmit}>Submit</button>
        <button
          onClick={() => {
            setInputValue("");
            setErrorMessage("");
            onClose();
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
