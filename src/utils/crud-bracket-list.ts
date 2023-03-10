import { BracketSchema } from "../pages/bracket"
import assert from "assert"

// returns the status of updating the bracket list
function createOrUpdateBracketList(newBracket: BracketSchema) {
  let unparsedBracketList: string | null

  try {
    // if the bracket list exists, add the new bracket to the list
    unparsedBracketList = localStorage.getItem("bracket-list")
    assert.ok(unparsedBracketList, "no bracket list exists")

    // parse the bracket list
    const currentBracketList: string[] = JSON.parse(
      unparsedBracketList
    ) as string[]

    // add the new bracket to the list
    localStorage.setItem(
      "bracket-list",
      JSON.stringify([...currentBracketList, newBracket.id])
    )
  } catch (error) {
    // if the bracket list doesn't exist, create it
    localStorage.setItem("bracket-list", JSON.stringify([newBracket.id]))
  }
}

function getBracketList() {
  const bracketList = localStorage.getItem("bracket-list")
  return bracketList
}

function deleteBracketList() {
  localStorage.removeItem("bracket-list")
}

export const BracketListService = {
  createOrUpdateBracketList,
  getBracketList,
  deleteBracketList
}
