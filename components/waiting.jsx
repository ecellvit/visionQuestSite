export default function Waiting(props){
    return(
        <div className="waitingDiv">
            <h1 className="waiting">Waiting for other teams to complete</h1>
            <button onClick={()=>props.onProceed()}>Proceed</button>    
        </div>
    )
}