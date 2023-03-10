import assert from "assert"
import { Iso } from "iso-fns2"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../components"
import { Matchup, MatchupSchema } from "../components/matchup"
import { TeamSchema } from "./teams"
import { BracketService } from "../utils"

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
  const navigate = useNavigate()
  const { id, round } = useParams()
  assert.ok(id, "id is required")
  assert.ok(round, "round is required")

  const [bracket, setBracket] = useState<BracketSchema>(
    JSON.parse(localStorage.getItem(id) as string) as BracketSchema
  )

  function updateMatchupOnBracket(newMatchup: MatchupSchema) {
    const currentRound = Number(round)
    const newBracket = { ...bracket }

    newBracket.rounds[currentRound].matchups = bracket.rounds[
      currentRound
    ].matchups.map((matchup) => {
      if (matchup.team1Id === newMatchup.team1Id) {
        return newMatchup
      }
      return matchup
    })

    setBracket(newBracket)
    BracketService.updateBracket(newBracket)
    assert.ok(id)
    console.log(BracketService.getBracket(id))
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
          return <Matchup onChange={updateMatchupOnBracket} matchup={matchup} />
        })}
      </div>
    </>
  )
}
