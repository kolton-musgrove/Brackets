import React from "react"
import { Header, Team } from "../components"

export function EditBracket() {
  return (
    <>
      <Header
        title="Edit Bracket"
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
      <Team />
    </>
  )
}
