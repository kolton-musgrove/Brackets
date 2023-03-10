import { BracketSchema } from "../pages/bracket"
import assert from "assert"
import { TeamSchema } from "../pages/teams"
import { instantFns } from "iso-fns2"
import { BracketListService } from "./crud-bracket-list"

function createBracket(newBracket: BracketSchema) {
  localStorage.setItem(newBracket.id, JSON.stringify(newBracket))
}

function getBracket(id: string): BracketSchema | undefined {
  let unparsedBracket: string | null

  try {
    // if the bracket exists, return it
    unparsedBracket = localStorage.getItem(id)
    assert.ok(unparsedBracket, "no bracket exists")

    const bracket: BracketSchema = JSON.parse(unparsedBracket) as BracketSchema
    return bracket
  } catch (error) {
    // if the bracket doesn't exist, return undefined
    console.log(error)
    return undefined
  }
}

function getAllBrackets(): BracketSchema[] | undefined {
  const bracketIdList = BracketListService.getBracketList()

  if (bracketIdList && bracketIdList.length > 0) {
    // @ts-ignore ts isn't smart enough to know that in this case bracketIdList is not undefined
    const brackets: BracketSchema[] = bracketIdList.map(
      (id: BracketSchema["id"]) => {
        const bracket = getBracket(id)
        return bracket
      }
    )

    return brackets.length > 0 ? brackets : undefined
  } else {
    return []
  }
}

function getTeamInfo(teamId: string): TeamSchema | undefined {
  const brackets = getAllBrackets()

  if (brackets) {
    const team = brackets
      .map((b) => b.teams)
      .flat()
      .find((t) => t.id === teamId)

    return team
  } else {
    return undefined
  }
}

function updateBracket(newBracket: Partial<BracketSchema>): void {
  assert.ok(newBracket.id, "no bracket id provided")
  let unparsedBracket: string | null

  try {
    // if the bracket exists, update it
    unparsedBracket = localStorage.getItem(newBracket.id)
    assert.ok(unparsedBracket, "no bracket exists")

    // parse the bracket
    const currentBracket: BracketSchema = JSON.parse(
      unparsedBracket
    ) as BracketSchema

    // update the bracket
    localStorage.setItem(
      newBracket.id,
      JSON.stringify({ ...currentBracket, ...newBracket })
    )
  } catch (error) {
    console.log(error)
    // if the bracket doesn't exist, create it
    localStorage.setItem(newBracket.id, JSON.stringify(newBracket))
  }
}

function deleteBracket(id: string): void {
  localStorage.removeItem(id)
}

function updateTeam(bracketId: string, team: Partial<TeamSchema>): void {
  assert.ok(bracketId, "no bracket id provided")
  assert.ok(team.id, "no team id provided")

  const bracket = getBracket(bracketId)

  if (bracket) {
    const updatedBracket = {
      ...bracket,
      teams: bracket.teams.map((t) => {
        if (t.id === team.id) {
          return {
            ...t,
            ...team,
            lastModifiedDate: instantFns.now()
          }
        }
        return t
      })
    }
    updateBracket(updatedBracket)
  }
}

export const BracketService = {
  createBracket,
  getBracket,
  getAllBrackets,
  getTeamInfo,
  updateBracket,
  deleteBracket,
  updateTeam
}
