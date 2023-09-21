import React from "react"
<<<<<<< HEAD
import '@/styles/waiting.module.css'
=======
import styles from  '../styles/waiting.module.css'
>>>>>>> 1c0ba8fe0b63e494744116d21f24cb5da5d90228

export default function Waiting(props,{vps}){
  return(
      <div className={styles.waitingDiv}>
          {/* <h1 className={styles.waiting}>Evaluation of your company is {parseFloat(vps)*100}</h1> */}
          <h1 className={styles.waiting}>Waiting for other Teams to complete</h1>
          <button onClick={()=>props.onProceed()}>Proceed</button>    
      </div>
  )
}
