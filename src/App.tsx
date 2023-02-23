import React from "react"
import { Header } from "./components/header"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter()

function App() {
  return <Header />
}

export default App
