import React from "react"
import { Header } from "../components"
import { useParams } from "react-router-dom"
import { Iso } from "iso-fns2"
import assert from "assert"
import { BracketService } from "../utils"
import { Formik, Form, Field, FormikValues } from "formik"

export type TeamSchema = {
  id: string
  name: string
  numWins: number
  createdDate: Iso.Instant
  lastModifiedDate: Iso.Instant
}

export type TeamUpdateSchema = {
  id: string
  name: string
}

export function Teams() {
  const { id } = useParams()
  assert.ok(id, "id is required")

  const bracket = BracketService.getBracket(id)
  assert.ok(bracket, "bracket is required")

  const updateBracket = (team: TeamUpdateSchema) => {
    BracketService.updateTeam(id, team)
  }

  return (
    <>
      <Header
        title={bracket.name}
        leftIcon={{
          link: "/",
          alt: "home button",
          icon: "home"
        }}
        rightIcon={{
          link: `/brackets/${id}/0`,
          alt: "start bracket",
          icon: "play"
        }}
      />

      <div className="flex w-screen items-center justify-center">
        <ul className="w-96">
          {bracket.teams.map((team, teamIndex) => (
            <Team
              teamName={team.name}
              key={`team${teamIndex}`}
              teamId={team.id}
              bracketUpdater={updateBracket}
            />
          ))}
        </ul>
      </div>
    </>
  )
}

function Team(props: {
  teamName: string
  key: string
  teamId: string
  bracketUpdater: (team: TeamUpdateSchema) => void
}) {
  const [editable, setEditable] = React.useState(false)
  const [teamName, setTeamName] = React.useState(props.teamName)

  const toggleEdit = () => {
    setEditable(!editable)
  }

  const handleNameChange = (values: FormikValues) => {
    setTeamName(values.teamName)
    props.bracketUpdater({ id: props.teamId, name: values.teamName })
    toggleEdit()
  }

  return (
    <>
      {/* If the field is currently not editable display the standard list item */}
      {!editable && (
        <li
          className="m-2 inline-flex w-full justify-between rounded bg-white p-5 text-gray-800 shadow-md"
          key={props.key}>
          {teamName}
          <button
            className="cursor-pointer rounded bg-purple-400 py-0.5 px-5 text-gray-800 shadow-md"
            onClick={toggleEdit}>
            Edit
          </button>
        </li>
      )}

      {/* If the field is currently editable display the formik form */}
      {editable && (
        <Formik
          initialValues={{ teamName: props.teamName }}
          onSubmit={handleNameChange}>
          <Form className="m-2 inline-flex w-full justify-between rounded bg-white p-5 text-gray-800 shadow-md">
            <Field name="teamName" type="text" />
            <button
              className="cursor-pointer rounded bg-purple-400 py-0.5 px-5 text-gray-800 shadow-md"
              type="submit">
              Save
            </button>
          </Form>
        </Formik>
      )}
    </>
  )
}
