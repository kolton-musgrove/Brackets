import React from "react"
import ReactDOM from "react-dom/client"
import { Home, Bracket, CreateBracket, Teams } from "./pages"
import "./index.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brackets" element={<Bracket />} />
        <Route path="/brackets/create" element={<CreateBracket />} />
        <Route path="/teams/:id" element={<Teams />} />
      </Routes>
    </Router>
  </React.StrictMode>
)
