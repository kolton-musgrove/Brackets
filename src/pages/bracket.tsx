import React from "react"
import { Header } from "../components"
import { useParams } from "react-router-dom"
import { Iso } from "iso-fns2"
import { TeamSchema } from "../components/team"
import assert from "assert"

export type BracketSchema = {
  id: string
  name: string
  teams: TeamSchema[]
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

export function Bracket({ match, location, history }: any) {
  const { id } = useParams()
  assert.ok(id, "id is required")

  const bracket = JSON.parse(
    localStorage.getItem(id) as string
  ) as BracketSchema
  assert.ok(bracket, "bracket does not exist")

  const teamsCount = bracket.teams.length

  const findNumberOfRounds = (num: number): number => {
    let i = 1
    while (num > 2 ** i) {
      i++
    }
    return i
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
      {/* bracket round selector */}
      <div>
        {[...Array(findNumberOfRounds(teamsCount))].map((item) => {
          return <div>test</div>
        })}
      </div>
      {/* round matchups */}
      <div>
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
