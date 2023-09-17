import { useEffect } from "react"

export default function Abc(){

  useEffect(()=>{

  }, [])

  function hitApi(){
    const backendUrl = "http://localhost:3000/api/";
    const url = backendUrl+"roundOne/postSector";
    console.log(url)
    fetch(url, {
      // content: "application/json",
      method: "POST",
      body: JSON.stringify({
          "rnd": 2100,
          "inventory": 1500,
          "logistics": 1500,
          "marketing": 1500,
          "connectivity": 1300
        }
      )
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