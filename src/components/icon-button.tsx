import React from "react"
import { AiFillPlusCircle } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { BsFillShareFill, BsFillPlayFill } from "react-icons/bs"
import { HiHome } from "react-icons/hi"
import { useNavigate } from "react-router-dom"

export function IconButton(props: any) {
  const navigate = useNavigate()

  const onClick = () => {
    if (props.link) {
      navigate(props.link)
    }
  }

  let icon = props.icon

  switch (props.icon) {
    case "plus":
      icon = (
        <AiFillPlusCircle className="h-8 w-8 hover:scale-125 hover:text-gray-300 transition-all" />
      )
      break

    case "share":
      icon = <BsFillShareFill className="h-8 w-8 hover:scale-125 hover:text-gray-300 transition-all" />
      break

    case "back":
      icon = <BiArrowBack className="h-8 w-8 hover:scale-125 hover:text-gray-300 transition-all" />
      break

    case "home":
      icon = <HiHome className="white h-8 w-8 hover:scale-125 hover:text-gray-300 transition-all" />
      break

    case "play":
      icon = <BsFillPlayFill className="white h-8 w-8 hover:scale-125 hover:text-gray-300 transition-all" />
      break
  }

  return (
    <a href={props.link}>
      <button className={props.className} onClick={onClick}>
        {icon}
      </button>
    </a>
  )
}
