import React from "react"
import { Header } from "../components"
import { useParams } from "react-router-dom"
import { Iso } from "iso-fns2"
import { TeamSchema } from "../components/team"

export type BracketSchema = {
  id: string
  name: string
  teams: TeamSchema[]
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

export function Bracket({ match, location, history }: any) {
  const { id } = useParams()

  return (
    <>
      <Header
        title={id}
        leftIcon={{
          link: "/",
          alt: "back",
          icon: "home"
        }}
        rightIcon={{
          link: "",
          alt: "edit bracket",
          icon: "edit"
        }}
      />
    </>
  )
}
