import Abc from '@/components/abc'
import Def from '@/components/def'
import Sectorentry from '@/components/Sectorentry'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamForm from '@/components/teamform'

export default function Home() {

  const { data: session, status } = useSession()
  const [cityName,setCityName]=useState("DELHI")
  const [industryName,setIndustryName] = useState("FASHION")

  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const teamName = "Asdf";
  const teamNumber = "1234";
  const leaderEmail = "abc@vitstudent.ac.in";

  const pages = [
    <Sectorentry cityName={cityName} industryName={industryName}/>,
    <Abc />,
    <Def />
    
  ]

  const [currentPage, setCurrentPage] = useState(pages[0])
  const [i, setI] = useState(0)

  useEffect(() => {
    setCurrentPage(pages[i])
  }, [i])

  function NextButtonClick() {
    // going to the next page
    setI(i + 1)
  }

  return (
    <div>
      {session ? <div>
        {
          hasTeamDetails ?
            <div>
              <div id="Header">

              {/* <p>Logged in, {session.user.name}</p> */}
              Vision Quest
              {/* {currentPage} */}
              <span>TeamName: {teamName}</span>
              <span>TeamNumber: {teamNumber}</span>
              <span>LeaderEmail: {leaderEmail}</span>
              <span>{currentRound}</span>
              </div>
              
              <div id="Content">
              {currentPage}
              <button onClick={() => signOut()}>Log Out</button>
              </div>
              {/* <button onClick={() => { NextButtonClick() }}>Next</button> */}
            </div>
            :
            <div>
              <TeamForm onNext={() => setHasTeamDetails(true)} />
            </div>
        }
      </div>
        :
        <button onClick={() => signIn('google')}>Get Started</button>
      }
    </div>

  )
}
