import React from "react"
import '../styles/waiting.css'

export default function Waiting(props,{vps}){
  return(
      <div className="waitingDiv">
          {/* <h1 className="waiting">Evaluation of your company is {parseFloat(vps)*100}</h1> */}
          <h1 className="waiting">Waiting for other Teams to complete</h1>
          <button onClick={()=>props.onProceed()}>Proceed</button>    
      </div>
  )
}
