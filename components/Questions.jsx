import React from "react";
<<<<<<< HEAD
import '@/styles/question.module.css'
=======
import styles from '../styles/question.module.css'
>>>>>>> 1c0ba8fe0b63e494744116d21f24cb5da5d90228

export default function Questions(props){
    return(
        <div className={styles.questionList}>
            <div className={styles.question}>
                Which location is better to set up the cafe ?
            </div>
            <div className={styles.options}>
                <button className={styles.locationA}>Location A</button>
                <button className={styles.locationB}>location B</button>
            </div>
            <button onClick={()=>props.onProceed()}>Proceed</button>
        </div> 
    )
}