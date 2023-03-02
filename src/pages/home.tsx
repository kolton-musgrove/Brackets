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
        <div className="flex w-full h-full justify-center text-center">
          <h1 className="text-2xl font-bold font-sans pt-6">
            No brackets found. <br />
            Click the plus icon to create a new bracket.
          </h1>
        </div>
      )}

      <div className="flex flex-col items-center justify-center w-full h-full">
        {brackets.map((bracket: BracketSchema) => (
          <div
            key={bracket.id}
            className="flex flex-col items-center justify-center w-full h-full">
            <h1 className="text-2xl font-bold">{bracket.name}</h1>
          </div>
        ))}
      </div>
    </>
  )
}
