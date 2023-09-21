import React from "react";
import styles from '@/styles/question.module.css'

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