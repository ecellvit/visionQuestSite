import SectorEntry from '@/components/SectorEntry'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamDetails from '@/components/TeamDetails'
import Cities from '@/components/Cities'
import Waiting from '@/components/waiting'
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

  const teamName = "Asdf";
  const teamNumber = "1234";
  const Vps = "1234";

  return (
    <div>
      {session ? <div>
        {
          hasTeamDetails ?
            <div id="teamDetailsFilled" class="teamDetailsFilled">
              {/* <p>Logged in, {session.user.name}</p> */}
              <div id="header" >

                <p class="visionQuest">Vision Quest</p>

                {/* {currentPage} */}
                <div class="info">
                  <span class="first">TeamName: {teamName}</span>
                  <span class="second">TeamNumber: {teamNumber}</span>
                  <span class="third">Vps: {Vps}</span>
                </div>
                <div class="round">{currentRound}</div>
              </div>

              <div id="Content">
                {stage == "cities" && <Cities onProceed={() => { setStage("sectors") }} />}
                {stage == "sectors" && <SectorEntry cityName={cityName} industryName={industryName} onProceed={()=>{setStage("wait")}} />}
                {stage == "wait" && <Waiting onProceed={()=>{setStage("investorsInfo")}} />}
                {stage == "investorsInfo" && <InvestorInfo onProceed={() => { setStage("investmentInfo") }} />}
                {stage == "investmentInfo" && <InvestmentInfo onProceed={() => { setStage("end") }} />}
                {stage == "end" && <End />}
              </div>

              <div class="log"><button onClick={() => signOut()}>Log Out</button></div>
            </div>
            :
            <div id="teamDetailsNotFilled" class="teamDetailsNotFilled">
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
