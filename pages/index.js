import SectorEntry from '@/components/SectorEntry'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamDetails from '@/components/TeamDetails'
import Cities from '@/components/Cities'
import Waiting from '@/components/Waiting'
import End from '@/components/End'
import InvestorInfo from '@/components/InvestorInfo'
import InvestmentInfo from '@/components/inverstmentInfo'
import '@/styles/index.css'

export default function Home() {

  const { data: session, status } = useSession()

  const [cityName, setCityName] = useState("DELHI")
  const [industryName, setIndustryName] = useState("FASHION")

  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const [stage, setStage] = useState("cities")
  const [vps,setVps] = useState(15000)

  const teamName = "Asdf";
  const teamNumber = "1234";
  //const Vps = "1234";

  return (
    <div>
      {session ? <div>
        {
          hasTeamDetails ?
            <div id="teamDetailsFilled" className="teamDetailsFilled">
              {/* <p>Logged in, {session.user.name}</p> */}
              <div id="header" >

                <p className="visionQuest">Vision Quest</p>

                {/* {currentPage} */}
                <div className="info">
                  <span className="first">TeamName: {teamName}</span>
                  <span className="second">TeamNumber: {teamNumber}</span>
                  <span className="third">Vps: {vps}</span>

                </div>
                <div className="round">{currentRound}</div>
              </div>

              <div id="Content">
                {stage == "cities" && <Cities onProceed={() => { setStage("sectors") }} />}
                {stage == "sectors" && <SectorEntry cityName={cityName} industryName={industryName} setVps={setVps} vps={vps} onProceed={()=>{setStage("wait")}} />}
                {stage == "wait" && <Waiting vps={vps} onProceed={()=>{setStage("investorsInfo")}} />}
                {stage == "investorsInfo" && <InvestorInfo onProceed={() => { setStage("investmentInfo") }} />}
                {stage == "investmentInfo" && <InvestmentInfo onProceed={() => { setStage("end") }} />}
                {stage == "end" && <End />}
              </div>

              <div className="log"><button onClick={() => signOut()}>Log Out</button></div>
              {/* <button onClick={() => { NextButtonClick() }}>Next</button> */}
            </div>
            :
            <div id="teamDetailsNotFilled" className="teamDetailsNotFilled">
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
