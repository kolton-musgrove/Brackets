import React from "react"
import { Header } from "../components"

export function Home() {
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
    </>
  )
}
