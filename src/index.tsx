import React from "react"
import ReactDOM from "react-dom/client"
import { Home, Bracket, CreateBracket, EditBracket } from "./pages"
import "./index.css"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/brackets",
    element: <Home />
  },
  {
    path: "/brackets/:id",
    element: <Bracket />
  },
  {
    path: "/brackets/create",
    element: <CreateBracket />
  }
])

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
