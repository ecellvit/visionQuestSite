import { Inter } from 'next/font/google'
import Abc from '@/components/abc'
import Def from '@/components/def'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamForm from '@/components/teamform'
import NextPage from '@/components/nextpage'


export default function Home() {

  const { data: session, status } = useSession()

  const [hasTeamDetails, setHasTeamDetails] = useState(true)
  const [currentRound, setCurrentRound] = useState("Round 1")

  const teamName = "Asdf";
  const teamNumber = "1234";
  const leaderEmail = "abc@vitstudent.ac.in";

  const pages = [
    // <TeamForm />,
    <Abc />,
    <Def />,
    <NextPage />,

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
              {/* <p>Logged in, {session.user.name}</p> */}
              Vision Quest
              {/* {currentPage} */}
              <span>TeamName: {teamName}</span>
              <span>TeamNumber: {teamNumber}</span>
              <span>LeaderEmail: {leaderEmail}</span>
              <span>{currentRound}</span>
              <button onClick={() => signOut()}>Log Out</button>
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
