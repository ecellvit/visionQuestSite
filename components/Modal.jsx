import React, { useState } from "react";
import '../styles/modal.css'

function Modal({
  isOpen,
  onClose,
  sector,
  basePrice,
  values,
  setValues,
  setVps,
  vps,
  setAtleastInvest,
  setCount,
  count,
}) {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [remove, setRemove] = useState(false);

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
          if(Object.keys(values).includes(sector)){
            setVps((prev)=>parseFloat(prev)+parseFloat(values[sector])-parseFloat(inputValue))
            setValues((prev) => {
              return { ...prev, [sector]: inputValue };
            })
          }
          else{
            setValues((prev) => {
              return { ...prev, [sector]: inputValue };
            })
          setVps((prev) => parseFloat(prev) - parseFloat(inputValue));}
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
              if(Object.keys(values).includes(sector)){
                console.log("present")
                console.log(sector)
                setVps((prev)=>parseFloat(prev)+parseFloat(values[sector]))
                delete values[sector]
                alert("Removed successfully")
                onClose();
              }
              else{
                setErrorMessage("not present")
              }
            }}
          >
            Remove
          </button>
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
