import React from "react"

export function Header(props: any) {
  return (
    <header className="border-b-4 border-black flex flex-auto justify-center items-center">
      {props.leftIcon && <div>{props.leftIcon}</div>}
      <h1 className="text-2xl">Brackets</h1>
      {props.rightIcon && <div>{props.rightIcon}</div>}
    </header>
  )
}
