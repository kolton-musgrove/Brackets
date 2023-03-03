import React from "react"
import {BracketSchema} from "./bracket"
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

    return (
        <>
            <Header
              title={id}
              leftIcon={{
                link: "/brackets/teams",
                alt: "back",
                icon: "back"
            }}
            />


        </>
    )
}
