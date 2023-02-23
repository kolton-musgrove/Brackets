import React from "react"
import { Header } from "./components/header"

function App() {
  return (
    <>
      <Header
        title="Brackets"
        rightIcon={{
          link: "",
          alt: "create bracket",
          icon: "plus"
        }}
      />
    </>
  )
}

export default App
