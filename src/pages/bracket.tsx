import assert from "assert"
import { Iso } from "iso-fns2"
import { useNavigate, useParams } from "react-router-dom"
import { Header } from "../components"
import { TeamSchema } from "../components/team"


export type BracketSchema = {
  id: string
  name: string
  teams: TeamSchema[]
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

export function Bracket() {
  const navigate = useNavigate();

  const { id, round } = useParams()
  assert.ok(id, "id is required")

  const bracket = JSON.parse(
    localStorage.getItem(id) as string
  ) as BracketSchema
  assert.ok(bracket, "bracket does not exist")

  const teamsCount = bracket.teams.length

  const findNumberOfRounds = (num: number): { i: number, power: number } => {
    let i = 1
    while (num > 2 ** i) {
      i++
    }
    return { i, power: 2 ** i }
  }

  const roundInfo = findNumberOfRounds(teamsCount)

  const extraGames = teamsCount - roundInfo.power

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
          return <button onClick={() => navigate(`/brackets/${id}/${index}`)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Round {index}</button>
        })}
      </div>
      {[...Array(extraGames)].map(() => {
        {/* round matchups */ }
        <div>
          {/* matchup */}
          <div>
            {/* team 1 */}
            <div></div>
            {/* team 2 */}
            <div></div>
          </div>
        </div>
      })}

    </>
  )
}
