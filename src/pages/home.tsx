import React from "react"
import { Header } from "../components"

export function Home() {
  return (
    <>
      <Header
        title="Brackets"
        rightIcon={{
          link: "/",
          alt: "create bracket",
          icon: "plus"
        }}
      />
    </>
  )
}
