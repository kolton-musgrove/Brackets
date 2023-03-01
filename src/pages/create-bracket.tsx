import React from "react"
import { Header } from "../components"
import { v4 as uuidv4 } from "uuid"

export function CreateBracket() {
  const id = uuidv4()

  return (
    <>
      <Header
        title="Create Bracket"
        leftIcon={{
          link: "/",
          alt: "back",
          icon: "home"
        }}
        rightIcon={{
          link: `/bracket/${id}`,
          alt: "create bracket",
          icon: "plus"
        }}
      />
    </>
  )
}
