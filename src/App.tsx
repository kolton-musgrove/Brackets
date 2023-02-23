import React from "react"
import { Header } from "./components/header"
import { AiFillPlusCircle } from "react-icons/ai";


function App() {
  return (<><Header rightIcon={{link: "", icon:AiFillPlusCircle}}/> <AiFillPlusCircle></AiFillPlusCircle></>)
}

export default App
