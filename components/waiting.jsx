export default function Waiting(props){
    return(
        <div>
            <h1>Waiting for other teams to complete</h1>
            <button onClick={()=>props.onProceed()}>Proceed</button>    
        </div>
    )
}