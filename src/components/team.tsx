import React from "react"
import { ActionBox } from "./index"
import { Iso } from "iso-fns2"

export type TeamSchema = {
  id: string
  name: string
  numWins: number
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

export function Team(props: any) {
  return (
    <ActionBox>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Team</h1>
      </div>
    </ActionBox>
  )
}
