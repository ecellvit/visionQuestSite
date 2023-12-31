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
import LeaderBoard from '@/components/LeaderBoard'

import styles from '@/styles/index.module.css'

export default function Home() {

  const backendUrl = process.env.NEXT_PUBLIC_SERVER

  const { data: session, status } = useSession()


  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const [stage, setStage] = useState()
  const [vps, setVps] = useState(15000)
  const [teamName, setTeamName] = useState()
  const [teamNumber, setTeamNumber] = useState()
  const [leaderName, setLeaderName] = useState()
  const [city, setCity] = useState()
  const [industry, setIndustry] = useState()
  const [qualified, setQualified] = useState()

  useEffect(() => {
    console.log(session)
    // initial fetch
    if (session) {
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
          console.log(data);

          let currentRound = data.team.currentRound;
          // currentRound ="investorsInfo";

          setHasTeamDetails(true);
          setVps(data.team.vps)
          setTeamName(data.team.teamName)
          setTeamNumber(data.team.teamNumber)
          setLeaderName(data.team.leaderName)
          setIndustry(data.team?.industry?.toUpperCase() ?? "-")
          setCity(data.team?.city?.toUpperCase() ?? "-")
          setQualified(data?.team?.isQualified)
          if (currentRound == "sectors" && data.team.hasSubmittedSectors) {
            setStage("sectorWait");
          } else {
            setStage(currentRound);
          }
        }).catch(err => {
          console.log("no team found");
          setHasTeamDetails(false);
          console.log(err);
        })
    }
  }, [session])

  return (
    <div className='indexPage'>
      {session ? <div>
        {
          hasTeamDetails ?
            <div id="teamDetailsFilled" className={styles.teamDetailsFilled}>
              {/* <p>Logged in, {session.user.name}</p> */}
              <div id="nav" className={styles.navBar}>
                <img src="visionquest.png" alt="visionQuestLogo" className={styles.image}></img>
                <img src="ecell.png" alt="visionQuestLogo" className={styles.image}></img>
              </div>
              <div class="horizontal-line"></div>
              <div id="header" className={styles.header}>
                <div className={styles.detail}>TeamName: {teamName}</div>
                <div className={styles.detail}>TeamNumber: {teamNumber}</div>
                <div className={styles.detail}>Industry: {industry}</div>
                <div className={styles.detail}>City: {city}</div>
                <div className={styles.detail}>VPS: {vps}</div>
                {/* <div className={styles.fourth}>LeaderName: {leaderName}</div> */}
              </div>

              <div id="Content" className={styles.mainContent}>
                {(qualified!==undefined && !qualified) ? <Waiting text="You have been eliminated" onProceed={() => { location.reload() }} />
                  :
                  <>
                    {/* {stage} */}
                    {stage == "Not Started" && <Waiting text="Waiting for other players..." onProceed={() => { location.reload() }} />}
                    {/* {stage == "started" && <Details onProceed={() => { location.reload() }} />} */}
                    {(stage == "cities" || stage == "started") && <Cities onProceed={() => { location.reload() }} />}
                    {stage == "sectors" && <SectorEntry cityName={city} industryName={industry} setVps={setVps} vps={vps} onProceed={() => { location.reload() }} />}
                    {stage == "sectorWait" && <Waiting text="Waiting for other players..." vps={vps} onProceed={() => { location.reload() }} />}
                    {stage == "investorsInfo" && <InvestorInfo onProceed={() => { location.reload() }} />}
                    {/* {stage == "investmentInfo" && <InvestmentInfo onProceed={() => { location.reload() }} />} */}
                    {stage == "industryLeader" && <LeaderBoard indVise={true} industry={industry} onProceed={() => { location.reload() }} />}
                    {stage == "allLeader" && <LeaderBoard indVise={false} industry={industry} onProceed={() => { location.reload() }} />}
                    {stage == "end" && <End />}
                  </>
                }

              </div>

              {/* <div className={styles.log}><button onClick={() => signOut()}>Log Out</button></div> */}
            </div>
            :
            <div id="teamDetailsNotFilled">
              <TeamDetails onNext={() => location.reload()} />
              <button onClick={() => signOut()}>Logout</button>
            </div>
        }
      </div>
        :
        <div id="getStarted" className={styles.getStarted}>
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