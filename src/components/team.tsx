import React from "react"
import { ActionBox } from "./index"
import { Iso } from "iso-fns2"

export type TeamSchema = {
  id: string
  name: string
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

export function Team(props: any) {
  return (
    <ActionBox>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-4xl font-bold">Team</h1>
      </div>
    </ActionBox>
  )
}
