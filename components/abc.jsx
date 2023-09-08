import { useEffect } from "react"

export default function Abc(){

  useEffect(()=>{

  }, [])

  function hitApi(){
    const backendUrl = "http://localhost:3000/api/"
    let id = 1

    fetch(backendUrl+"/abc", {
      content: "application/json",
      method: "GET",
      // body: JSON.stringify({
      //   abc: "sample data"
      // })
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
    });

  }

  return (
    <div>
      <h1>This is the ABC component</h1>
      <button onClick={()=>{hitApi()}}>Hit API</button>
    </div>
  )
}

// GET fetching/reading
// POST creating/writing
// PATCH editing/updating
// DELETE deleting/removing