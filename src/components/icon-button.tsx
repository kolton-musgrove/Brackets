import React from "react"
import { AiFillPlusCircle, AiFillEdit } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"

export function IconButton(props: any) {
  let icon = props.icon

  switch (props.icon) {
    case "plus":
      icon = <AiFillPlusCircle className="w-8 h-8" />
      break

    case "edit":
      icon = <AiFillEdit className="w-8 h-8" />
      break

    case "back":
      icon = <BiArrowBack className="w-8 h-8" />
      break
  }

  return (
    <button className={props.className} onClick={props.link}>
      {icon}
    </button>
  )
}
