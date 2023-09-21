import SectorEntry from '@/components/SectorEntry'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamDetails from '@/components/TeamDetails'
import Questions from '@/components/Questions'
import Cities from '@/components/Cities'
import Waiting from '@/components/Waiting'
import End from '@/components/End'
import InvestorInfo from '@/components/InvestorInfo'
import InvestmentInfo from '@/components/InverstmentInfo'
import '@/styles/index.css'

export default function Home() {

  const backendUrl = process.env.NEXT_PUBLIC_SERVER

  const { data: session, status } = useSession()


  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const [stage, setStage] = useState()
  const [vps, setVps] = useState()
  const [teamName, setTeamName] = useState()
  const [teamNumber, setTeamNumber] = useState()
  const [leaderName, setLeaderName] = useState()
  const [city, setCity] = useState()
  const [industry, setIndustry] = useState()

  useEffect(() => {
    console.log(session)
    // initial fetch
    if (session) {
      console.log("fetching")
      fetch(backendUrl + "/team/getTeam/", {
        content: "application/json",
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.accessTokenBackend}`,
          'Access-Control-Allow-Origin': '*',
        },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data.team);
          
          let currentRound = data.team.currentRound;
          currentRound = "cities";

          setHasTeamDetails(true);
          setVps(data.team.vps)
          setTeamName(data.team.teamName)
          setTeamNumber(data.team.teamNumber)
          setLeaderName(data.team.leaderName)
          setIndustry(data.team?.industry?.toUpperCase() ?? "-")
          setCity(data.team?.city?.toUpperCase() ?? "-")
          if (currentRound == "sectors" && data.team.hasSubmittedSectors) {
            setStage("sectorWait")
          } else {
            setStage(currentRound);
          }
        }).catch(err => {
          console.log("no team found");
          setHasTeamDetails(false);
          console.log(err)
        })
    }
  }, [session])

  return (
    <div className='indexPage'>
      {session ? <div>
        {
          hasTeamDetails ?
            <div id="teamDetailsFilled" className="teamDetailsFilled">
              {/* <p>Logged in, {session.user.name}</p> */}
              <div id="nav" className="navBar">
                <img src="vg.svg" alt="visionQuestLogo" className="image"></img>
                <img src="ecellLogo.png" alt="visionQuestLogo" className="image"></img>
              </div>
              <div class="horizontal-line"></div>
              <div id="header" className="header">
                <div className="detail">TeamName: {teamName}</div>
                <div className="detail">TeamNumber: {teamNumber}</div>
                <div className="detail">Industry: {industry}</div>
                <div className="detail">City: {city}</div>
                <div className="detail">VPS: {vps}</div>
                {/* <div className="fourth">LeaderName: {leaderName}</div> */}
              </div>

              <div id="Content">
                {stage == "Not Started" && <Waiting onProceed={() => { location.reload() }} />}
                {/* {stage == "started" && <Details onProceed={() => { location.reload() }} />} */}
                {stage == "questions" && <Questions onProceed={()=>{location.reload()}}/>}
                {(stage == "cities" || stage == "started") && <Cities onProceed={() => { location.reload() }} />}
                {stage == "sectors" && <SectorEntry cityName={city} industryName={industry} setVps={setVps} vps={vps} onProceed={() => { location.reload() }} />}
                {stage == "sectorWait" && <Waiting vps={vps} onProceed={() => { location.reload() }} />}
                {stage == "investorsInfo" && <InvestorInfo onProceed={() => { location.reload() }} />}
                {stage == "investmentInfo" && <InvestmentInfo onProceed={() => { location.reload() }} />}
                {stage == "end" && <End />}
              </div>

              <div className="log"><button onClick={() => signOut()}>Log Out</button></div>
            </div>
            :
            <div id="teamDetailsNotFilled">
              <TeamDetails onNext={() => setHasTeamDetails(true)} />
            </div>
        }
      </div>
        :
        <div id="getStarted" class="getStarted">
          <button onClick={() => signIn('google')}>Get Started</button>
        </div>
      }
    </div>

  )
}

"not-started"
"cities"
"sectors"
"investorsInfo"
"investmentInfo"
"end"