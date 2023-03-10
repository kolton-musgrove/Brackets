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
    props.onChange({ ...props.matchup, winningTeamId })
  }

  const team1 = BracketService.getTeamInfo(props.matchup.team1Id) as TeamSchema
  const team2 = BracketService.getTeamInfo(props.matchup.team2Id) as TeamSchema

  return (
    <div>
      <button
        onClick={() => toggleWinningTeam(team1.id)}
        key={props.matchup.team1Id}
        style={{ color: winningTeamId === team1.id ? "green" : "black" }}>
        {team1.name}
      </button>
      <button
        onClick={() => toggleWinningTeam(team2.id)}
        key={team2.id}
        style={{ color: winningTeamId === team2.id ? "green" : "black" }}>
        {team2.name}
      </button>
    </div>
  )
}
