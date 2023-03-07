import React, { useState } from "react"
import { Header } from "../components"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi"
import { BracketSchema } from "./bracket"
import { v4 as uuid } from "uuid"
import { instantFns } from "iso-fns2"
import { useNavigate } from "react-router-dom"
import assert from "assert"

export function CreateBracket() {
  const [teamCount, setTeamCount] = useState(1)
  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    assert.ok(data.bracketName, "bracketName is required")

    const Bracket: BracketSchema = {
      id: uuid(),
      name: data.bracketName,
      teams: [],
      createdDate: instantFns.now(),
      lastModifiedDate: instantFns.now()
    }

    delete data.bracketName

    Object.keys(data).forEach((key: string) => {
      Bracket.teams.push({
        id: uuid(),
        name: data[key],
        numWins: 0,
        createdDate: instantFns.now(),
        lastModifiedDate: instantFns.now()
      })
    })

    localStorage.setItem(Bracket.id, JSON.stringify(Bracket))

    navigate({
      pathname: `/brackets/${Bracket.id}/0`
    })
  }

  return (
    <>
      <Header
        title="Create Bracket"
        leftIcon={{
          link: "/",
          alt: "home",
          icon: "back"
        }}
      />
      <Formik
        className="flex w-full justify-center"
        initialValues={{ bracketName: "" }}
        onSubmit={onSubmit}
        validate={(values: any) => {
          const errors: any = {}
          return Object.keys(values).forEach((key: string) => {
            if (!values[key]) errors[key] = "Required"
          })
        }}>
        <Form className="flex h-full w-full flex-col items-center justify-center text-center">
          {/* bracket name section */}
          <section className="mt-3 w-full">
            <h1 className="w-full font-bold">Bracket Name</h1>
            <Field
              className="mb-1 w-2/3 rounded pl-0.5 outline outline-1 outline-black"
              type="text"
              name="bracketName"
              key="bracketName"
            />
          </section>
          {/* teams section */}
          <section className="flex w-full flex-col items-center justify-center">
            <h1 className="font-bold">Teams</h1>
            {[...Array(teamCount)].map((value: undefined, i: number) => (
              <>
                <Field
                  className="mb-1 w-2/3 rounded pl-0.5 outline outline-1 outline-black"
                  type="text"
                  name={`team${i}`}
                  key={`team${i}`}
                />
                <ErrorMessage name={`team${i}`} component="div" />
              </>
            ))}
            {/* plus and minus buttons */}
            <div>
              <button
                className="mb-1 h-5 w-5"
                onClick={() => {
                  if (teamCount > 0) setTeamCount(teamCount - 1)
                }}
                type="button">
                <BiMinusCircle className="h-full w-full" />
              </button>
              <button
                className="mb-1 h-5 w-5"
                onClick={() => setTeamCount(teamCount + 1)}
                type="button">
                <BiPlusCircle className="h-full w-full" />
              </button>
            </div>
            <input
              className="cursor-pointer rounded border border-black bg-transparent py-2 px-4 font-semibold text-black hover:border-transparent hover:bg-gradient-to-r hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 hover:text-white"
              type="submit"
            />
          </section>
        </Form>
      </Formik>
    </>
  )
}
