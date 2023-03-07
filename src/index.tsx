import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
<<<<<<< Updated upstream
    <App />
=======
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brackets/:id" element={<Bracket />} />
        <Route path="/brackets/create" element={<CreateBracket />} />
      </Routes>
    </Router>
>>>>>>> Stashed changes
  </React.StrictMode>
)
