import { Inter } from 'next/font/google'
import Abc from '@/components/abc'
import Def from '@/components/def'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import TeamForm from '@/components/teamform'
import NextPage from '@/components/nextpage'


export default function Home() {

  const { data: session, status } = useSession()

  console.log(session, status)

  const pages = [
    <TeamForm />,
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
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {session ? <div>
        <p>Logged in, {session.user.name}</p>
        <button onClick={() => signOut()}>Log Out</button>
      </div>
        :
        <button onClick={() => signIn()}>Login</button>
      }
      Vision Quest
      {currentPage}
      <button onClick={() => { NextButtonClick() }}>Next</button>
    </main>
  )
}
