export default function Questions(props){
    return(
        <div className='questionList'>
            <div className='question'>
                Which location is better to set up the cafe ?
            </div>
            <div className='options'>
                <button className='locationA'>Location A</button>
                <button className='locationB'>location B</button>
            </div>
            <button onClick={()=>props.onProceed()}>Proceed</button>
        </div> 
    )
}