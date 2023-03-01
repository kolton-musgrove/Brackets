import React from "react"

export function ActionBox(props: any) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-center w-full h-full">
        {props.children}
      </div>
    </div>
  )
}
