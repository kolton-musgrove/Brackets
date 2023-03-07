import React from "react"
import { Header } from "../components"
import { BracketSchema } from "./bracket"

export function Home() {
  const brackets: BracketSchema[] = localStorage.getItem("brackets")
    ? JSON.parse(localStorage.getItem("brackets")!)
    : []

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
            <h1 className="text-2xl font-bold">{bracket.name}</h1>
          </div>
        ))}
      </div>
    </>
  )
}
