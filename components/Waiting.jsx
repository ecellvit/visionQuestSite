import React from "react"
import styles from '@/styles/waiting.module.css'

import buttonStyles from '@/styles/investors.module.css'

export default function Waiting(props){
  return(
      <div className={styles.waitingDiv}>
          {/* <h1 className={styles.waiting}>Evaluation of your company is {parseFloat(vps)*100}</h1> */}
          <h1 className={styles.waiting}>{props.text}</h1>
          <button className={buttonStyles.proceed_button} onClick={()=>props.onProceed()}>Proceed</button>    
      </div>
  )
}
