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
  rounds: RoundSchema[]
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

type RoundSchema = {
  matchups: MatchupSchema[]
}

export function Bracket() {
  const navigate = useNavigate()
  const { id, roundIndex } = useParams()
  assert.ok(id, "id is required")
  assert.ok(roundIndex, "round is required")

  const currentRoundIndex = parseInt(roundIndex)

  const [bracket, setBracket] = useState<BracketSchema>(
    JSON.parse(localStorage.getItem(id) as string) as BracketSchema
  )

  const findNumberOfRounds = (num: number): { i: number; power: number } => {
    let i = 1
    while (num > 2 ** i) {
      i++
    }
    return { i, power: 2 ** i }
  }

  const generateRoundMatchups = (round: number) => {
    // if we're on the first round, we need to generate the first round's matchups
    if (round === 0) {
      const { i, power } = findNumberOfRounds(bracket.teams.length)
      const numByes = power - bracket.teams.length
      const numMatchups = power / 2
      const matchups: MatchupSchema[] = []

      for (let i = 0; i < numMatchups; i++) {
        if (i < numByes) {
          matchups.push({
            team1Id: "bye",
            team2Id: bracket.teams[i].id,
            winningTeamId: null
          })
        } else {
          matchups.push({
            team1Id: bracket.teams[i].id,
            team2Id: bracket.teams[i + 1].id,
            winningTeamId: null
          })
        }
      }

      const newBracket: BracketSchema = { ...bracket, rounds: [{ matchups }] }

      setBracket(newBracket)
      BracketService.updateBracket(newBracket)
    } else {
      const oldWinners = bracket.rounds[round - 1].matchups.map(
        (m) => m.winningTeamId
      )

      console.log(oldWinners)

      const newMatchups: MatchupSchema[] = []

      for (let i = 0; i < oldWinners.length; i += 2) {
        const team1Id = oldWinners[i]
        const team2Id = oldWinners[i + 1]

        assert.ok(team1Id, "team1 is required")
        assert.ok(team2Id, "team2 is required")

        const matchup = { team1Id, team2Id, winningTeamId: null }
        newMatchups.push(matchup)
      }

      console.log(newMatchups)

      const newRounds: RoundSchema[] = [
        ...bracket.rounds,
        { matchups: newMatchups }
      ]
      const newBracket: BracketSchema = { ...bracket, rounds: newRounds }

      setBracket(newBracket)
      BracketService.updateBracket(newBracket)
    }
  }

  const updateMatchupOnBracket = (matchup: MatchupSchema) => {
    const newBracket: BracketSchema = {
      ...bracket,
      rounds: bracket.rounds.map((r, i) => {
        if (i === currentRoundIndex) {
          return {
            matchups: bracket.rounds[currentRoundIndex].matchups.map((m) => {
              return m.team1Id === matchup.team1Id ? matchup : m
            })
          }
        }
        return r
      })
    }

    setBracket(newBracket)
    BracketService.updateBracket(newBracket)
  }

  const canGenerateNextRound = () => {
    const currentRound = bracket.rounds[currentRoundIndex]
    const allMatchupsHaveWinningTeams = currentRound.matchups.every(
      (matchup) => matchup.winningTeamId
    )
    return allMatchupsHaveWinningTeams
  }

  if (currentRoundIndex === 0 && bracket.rounds.length === 0) {
    generateRoundMatchups(0)
  }

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
      <div className="flex w-full flex-col items-center">
        {/* bracket round selector */}
        <div className="p-5">
          {Array.from(
            { length: findNumberOfRounds(bracket.teams.length).i },
            (_, i) => i + 1
          ).map((round, index) => {
            return (
              <button
                style={{
                  opacity: currentRoundIndex === index ? "100%" : "50%"
                }}
                onClick={() => {
                  if (
                    index === currentRoundIndex + 1 &&
                    canGenerateNextRound()
                  ) {
                    generateRoundMatchups(index)
                    navigate(`/brackets/${id}/${index}`)
                  } else if (index <= currentRoundIndex) {
                    navigate(`/brackets/${id}/${index}`)
                  }
                }}
                className="m-2 rounded-full bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
                Round {index}
              </button>
            )
          })}
        </div>
        {/* round matchups */}
        <div>
          {bracket.rounds[currentRoundIndex].matchups.map(
            (matchup: MatchupSchema) => {
              return (
                <Matchup matchup={matchup} onChange={updateMatchupOnBracket} />
              )
            }
          )}
        </div>
      </div>
    </>
  )
}
