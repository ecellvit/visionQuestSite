export default function InvestorInfo(props){
  // static page for displaying round 2 information

  return (
    <div>
      <h1>Investors</h1>
      <div>List of Inverstors.</div>
      <button onClick={()=>{props.onProceed()}}>Proceed</button>
    </div>
  )
}