import assert from "assert"
import { Iso } from "iso-fns2"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../components"
import { Matchup, MatchupSchema } from "../components/matchup"
import { TeamSchema } from "./teams"

export type BracketSchema = {
  id: string
  name: string
  teams: TeamSchema[]
  rounds: Round[]
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

type Round = {
  matchups: MatchupSchema[]
}

export function Bracket() {
  const { id } = useParams()
  assert.ok(id, "id is required")
  const navigate = useNavigate()

  const [bracket, setBracket] = useState<BracketSchema>(
    JSON.parse(localStorage.getItem(id) as string) as BracketSchema
  )

  function handleBracketChange(newBracket: BracketSchema) {
    setBracket(newBracket)
  }

  const findNumberOfRounds = (num: number): { i: number; power: number } => {
    let i = 1
    while (num > 2 ** i) {
      i++
    }
    return { i, power: 2 ** i }
  }

  const teamsCount = bracket.teams.length
  const roundInfo = findNumberOfRounds(teamsCount)

  const generateRound0Matchups = (): MatchupSchema[] => {
    let numByes = roundInfo.power - teamsCount
    let teamIndex = 0
    const matchups: MatchupSchema[] = []

    while (numByes > 0) {
      matchups.push({
        team1Id: bracket.teams[teamIndex].id,
        team2Id: "Bye",
        winningTeamId: null
      })
      numByes--
      teamIndex++
    }

    while (teamIndex < teamsCount - 1) {
      matchups.push({
        team1Id: bracket.teams[teamIndex].id,
        team2Id: bracket.teams[teamIndex + 1].id,
        winningTeamId: null
      })
      teamIndex += 2
    }
    return matchups
  }

  const roundOneMatchups = generateRound0Matchups()

  // const toggleWin = () => {
  //   return
  // }

  // const handleNonzeroRound = () => {}

  return (
    <>
      <Header
        title="Bracket"
        leftIcon={{
          link: "/",
          alt: "back",
          icon: "home"
        }}
        rightIcon={{
          link: "",
          alt: "share bracket",
          icon: "share"
        }}
      />
      {/* bracket round selector */}
      <div>
        {[...Array(findNumberOfRounds(teamsCount))].map((item, index) => {
          return (
            <button
              onClick={() => navigate(`/brackets/${id}/${index}`)}
              className="rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
              Round {index}
            </button>
          )
        })}
      </div>
      {/* round matchups */}
      <div>
        {roundOneMatchups.map((matchup: MatchupSchema) => {
          return (
            <>
              <Matchup onChange={handleBracketChange} matchup={matchup} />
            </>
          )
        })}

        {/* matchup */}
        <div>
          {/* team 1 */}
          <div></div>
          {/* team 2 */}
          <div></div>
        </div>
      </div>
    </>
  )
}
