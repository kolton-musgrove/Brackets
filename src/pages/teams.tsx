import React from "react"
import { BracketSchema } from "./bracket"
import { Header } from "../components"
import { useParams } from "react-router-dom"
import assert from "assert"

export function Teams() {
  const { id } = useParams()
  assert.ok(id, "id is required")

  const stringifiedBracket = localStorage.getItem(id)
  assert.ok(stringifiedBracket)

  const bracket = JSON.parse(stringifiedBracket) as BracketSchema
  const bracketTeams = bracket.teams.map((team) => (
    <li className="my-4 box-border flex h-12 w-80 items-center justify-center border-4 p-4">
      {team.name}
    </li>
  ))

  return (
    <>
      <Header
        title={bracket.name}
        leftIcon={{
          link: "/",
          alt: "back",
          icon: "back"
        }}
        rightIcon={{
          link: `/brackets/${id}/0`,
          alt: "start bracket",
          icon: "play"
        }}
      />

      <div className="flex w-screen items-center justify-center">
        <ul>{bracketTeams}</ul>
      </div>
    </>
  )
}
