export default function Investors(props){
  // static page for displaying round 2 information

  return (
    <div>
      <h1>Investors</h1>
      <button onClick={()=>{props.onProceed()}}>Proceed</button>
    </div>
  )
}