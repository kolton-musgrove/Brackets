import { useState } from "react"
import { TeamSchema } from "../pages/teams"
import { BracketService } from "../utils"

export type MatchupSchema = {
  team1Id: TeamSchema["id"]
  team2Id: TeamSchema["id"]
  winningTeamId: TeamSchema["id"] | null
}

export function Matchup(props: { matchup: MatchupSchema; onChange: Function }) {
  const [winningTeamId, setWinningTeamId] =
    useState<MatchupSchema["winningTeamId"]>(null)

  const toggleWinningTeam = (teamId: string) => {
    setWinningTeamId(teamId)
    props.onChange({ ...props.matchup, winningTeamId: teamId })
  }

  const team1 = BracketService.getTeamInfo(props.matchup.team1Id) as TeamSchema
  const team2 = BracketService.getTeamInfo(props.matchup.team2Id) as TeamSchema

  return (
    <div className="flex w-80 flex-col items-center rounded p-5 shadow-md">
      <button
        className="w-1/2 cursor-pointer rounded  py-0.5 px-5 text-2xl text-gray-800 shadow-md transition-all hover:scale-110 active:bg-green-600"
        onClick={() => toggleWinningTeam(team1.id)}
        style={{ color: winningTeamId === team1.id ? "green" : "black" }}>
        {team1.name}
      </button>

      <div className="flex items-center justify-center">
        <span className="text-2xl">vs</span>
      </div>

      <button
        className="w-1/2 cursor-pointer rounded py-0.5 px-5 text-2xl text-gray-800 shadow-md transition-all hover:scale-110 active:bg-green-600"
        onClick={() => toggleWinningTeam(team2.id)}
        style={{ color: winningTeamId === team2.id ? "green" : "black" }}>
        {team2.name}
      </button>
    </div>
  )
}
