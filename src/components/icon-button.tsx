import React from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { BsFillShareFill, BsFillPlayFill } from "react-icons/bs"
import { HiHome } from "react-icons/hi"

export function IconButton(props: any) {
  let icon = props.icon

  switch (props.icon) {
    case "plus":
      icon = (
        <AiFillPlusCircle className="h-8 w-8 hover:scale-125 hover:text-gray-200" />
      )
      break

    case "share":
      icon = <BsFillShareFill className="h-8 w-8" />
      break

    case "back":
      icon = <BiArrowBack className="h-8 w-8" />
      break

    case "home":
      icon = <HiHome className="white h-8 w-8" />
      break

    case "play":
      icon = <BsFillPlayFill className="white h-8 w-8" />
      break
  }

  return (
    <a href={props.link}>
      <button className={props.className} onClick={props.link}>
        {icon}
      </button>
    </a>
  )
}
