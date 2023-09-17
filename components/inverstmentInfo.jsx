export default function InvestmentInfo(props){
  return (
    <div>
      <h1>Investment Info</h1>
      <div>
        Which investor invested how much, for how much equity, and at what valuation
      </div>
      <button onClick={()=>{props.onProceed()}}>Proceed</button>
    </div>
  )
}