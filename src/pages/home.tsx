import React from "react"
import { Header } from "../components"
import { BracketSchema } from "./bracket"
import { BracketService } from "../utils"
import { useNavigate } from "react-router-dom"
import assert from "assert"

export function Home() {
  const brackets = BracketService.getAllBrackets()
  assert.ok(brackets, "brackets are required")

  const navigate = useNavigate()

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

      <div className="flex w-screen items-center justify-center">
        <ul className="w-96">
          {brackets.map((bracket: BracketSchema) => (
            <li
              className="m-2 inline-flex w-full justify-between rounded bg-white p-5 text-gray-800 shadow-md"
              key={bracket.id}>
              {bracket.name}
              <button
                className="cursor-pointer rounded bg-purple-400 py-0.5 px-5 text-gray-800 shadow-md"
                type="button"
                onClick={() => navigate(`/teams/${bracket.id}`)}>
                Open
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
