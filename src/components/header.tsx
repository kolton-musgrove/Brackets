import React from "react"
import { IconButton } from "./icon-button"

export function Header(props: any) {
  return (
    <header className="flex flex-auto items-center justify-center border-b-4 border-black bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-bold text-white">
      {props.leftIcon && (
        <IconButton
          className="absolute left-0 ml-2"
          link={props.leftIcon.link}
          icon={props.leftIcon.icon}
          alt={props.leftIcon.alt}
        />
      )}

      <h1 className="mb-2 text-5xl">{props.title}</h1>

      {props.rightIcon && (
        <IconButton
          className="absolute right-2 top-3"
          link={props.rightIcon.link}
          icon={props.rightIcon.icon}
          alt={props.rightIcon.alt}
        />
      )}
    </header>
  )
}
