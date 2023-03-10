import React from "react"
import { Header } from "../components"
import { BracketSchema } from "./bracket"

export function Home() {
  const bracketIdList: BracketSchema["id"][] = localStorage.getItem(
    "bracket-list"
  )
    ? JSON.parse(localStorage.getItem("bracket-list")!)
    : []

  const brackets = bracketIdList.map((id: BracketSchema["id"]) => {
    const bracket = localStorage.getItem(id)
    return bracket ? JSON.parse(bracket) : null
  })

  return (
    <>
      <Header
        title="Brackets"
        rightIcon={{
          link: "/brackets/create",
          alt: "create bracket",
          icon: "plus"
        }}
      />

      {brackets.length === 0 && (
        <div className="flex h-full w-full justify-center text-center">
          <h1 className="pt-6 font-sans text-2xl font-bold">
            No brackets found. <br />
            Click the plus icon to create a new bracket.
          </h1>
        </div>
      )}

      <div className="flex h-full w-full flex-col items-center justify-center">
        {brackets.map((bracket: BracketSchema) => (
          <div
            key={bracket.id}
            className="flex h-full w-full flex-col items-center justify-center">
            <a href={`/teams/${bracket.id}`}>
              <h1 className="text-2xl font-bold">{bracket.name}</h1>
            </a>
          </div>
        ))}
      </div>
    </>
  )
}
