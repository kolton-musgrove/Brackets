import React from "react"
import { AiFillPlusCircle } from "react-icons/ai"

export function IconButton(props: any) {
  // TODO: Add more icons
  let icon = props.icon

  switch (props.icon) {
    case "plus":
      icon = <AiFillPlusCircle className="w-8 h-8" />
      break
  }

  return (
    <button className={props.className} onClick={props.link}>
      {icon}
    </button>
  )
}
