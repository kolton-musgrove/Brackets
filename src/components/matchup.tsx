import { useState } from "react"
import { TeamSchema } from "./team"

export type MatchupSchema = {
  team1Id: TeamSchema["id"]
  team2Id: TeamSchema["id"]
  winningTeamId: TeamSchema["id"] | null
}

export function Matchup(props: any) {
  const [winningTeamId, setWinningTeamId] =
    useState<MatchupSchema["winningTeamId"]>(null)

  const toggleWinningTeam = (teamId: string) => {
    setWinningTeamId(teamId)
    props.onChange({...props.matchup, winningTeamId})
  }


  return (
    <div>
      <button
        onClick={() => toggleWinningTeam(props.team1.id)}
        key={props.team1.id}
        style={{color:winningTeamId == props.team1.id ? "black" : "red"}}
      >
        {props.team1.name}
      </button>
      <button
      id={props.team2.id}
        onClick={() => toggleWinningTeam(props.team2.id)}
        key={props.team2.id}
        style={{color:winningTeamId == props.team2.id ? "black" : "red"}}
      >
        {props.team2.name}
      </button>
    </div>
  )
}
