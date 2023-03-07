import React from "react"
import {BracketSchema} from "./bracket"
import { TeamSchema } from "../components/team"
import { Header } from "../components"
import { useParams } from "react-router-dom"
import assert from "assert"
import { useNavigate, createSearchParams } from "react-router-dom"

export function Teams() {
    const { id } = useParams()
    assert.ok(id, "id is required")

    const stringifiedBracket = localStorage.getItem(id)
    assert.ok(stringifiedBracket)

    const bracket = JSON.parse(stringifiedBracket) as BracketSchema
    const bracketTeams = bracket.teams.map((team) =>  <li className="flex justify-center items-center box-border h-12 w-80 p-4 border-4 my-4">{team.name}</li>);

    return (
        <>
            <Header
              title={bracket.name}
              leftIcon={{
                link: "/brackets/teams",
                alt: "back",
                icon: "back",
            }}
            />

            <div className="w-screen flex justify-center items-center">
                <ul>{bracketTeams}</ul>
            </div>
            
        </>
    )
}
