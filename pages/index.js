import Abc from '@/components/abc'
import SectorEntry from '@/components/SectorEntry'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamDetails from '@/components/TeamDetails'
import Cities from '@/components/Cities'
import Waiting from '@/components/waiting'
import End from '@/components/End'
import Investors from '@/components/InvestorInfo'
import InvestorInfo from '@/components/InvestorInfo'
import InvestmentInfo from '@/components/inverstmentInfo'

export default function Home() {

  const { data: session, status } = useSession()

  const [cityName, setCityName] = useState("DELHI")
  const [industryName, setIndustryName] = useState("FASHION")

  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const [stage, setStage] = useState("cities")

  const teamName = "Asdf";
  const teamNumber = "1234";
  const leaderEmail = "abc@vitstudent.ac.in";

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
                {stage == "cities" && <Cities onProceed={() => { setStage("sectors") }} />}
                {stage == "sectors" && <SectorEntry cityName={cityName} industryName={industryName} onProceed={()=>{setStage("wait")}} />}
                {stage == "wait" && <Waiting onProceed={()=>{setStage("investorsInfo")}} />}
                {stage == "investorsInfo" && <InvestorInfo onProceed={() => { setStage("investmentInfo") }} />}
                {stage == "investmentInfo" && <InvestmentInfo onProceed={() => { setStage("end") }} />}
                {stage == "end" && <End />}

                <button onClick={() => signOut()}>Log Out</button>
              </div>
            </div>
            :
            <div>
              <TeamDetails onNext={() => setHasTeamDetails(true)} />
            </div>
        }
      </div>
        :
        <button onClick={() => signIn('google')}>Get Started</button>
      }
    </div>

  )
}
