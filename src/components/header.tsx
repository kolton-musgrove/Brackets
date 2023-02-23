import React from "react"
import { IconButton } from "./icon-button"

export function Header(props: any) {
  return (
    <header className="border-b-4 border-black flex flex-auto justify-center items-center">
      {props.leftIcon && (
        <IconButton
          className="absolute left-0 ml-2"
          link={props.leftIcon.link}
          icon={props.leftIcon.icon}
          alt={props.leftIcon.alt}
        />
      )}

      <h1 className="text-5xl mb-2">Brackets</h1>

      {props.rightIcon && (
        <IconButton
          className="absolute right-0 mr-2"
          link={props.rightIcon.link}
          icon={props.rightIcon.icon}
          alt={props.rightIcon.alt}
        />
      )}
    </header>
  )
}
