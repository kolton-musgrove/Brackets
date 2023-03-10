import React, { useState } from "react"
import { Header } from "../components"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BracketSchema } from "./bracket"
import { v4 as uuid } from "uuid"
import { instantFns } from "iso-fns2"
import { useNavigate } from "react-router-dom"
import { BracketListService } from "../utils"
import assert from "assert"

export function CreateBracket() {
  const [teamCount, setTeamCount] = useState(2)
  const navigate = useNavigate()

  const onSubmit = (data: any) => {
    assert.ok(data.bracketName, "bracketName is required")

    const Bracket: BracketSchema = {
      id: uuid(),
      name: data.bracketName,
      teams: [],
      rounds: [],
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
    BracketListService.createOrUpdateBracketList(Bracket)

    navigate({ pathname: `/teams/${Bracket.id}` })
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
          <section className="mt-3 w-96">
            <h1 className="w-full text-lg font-bold">Bracket Name</h1>
            <Field
              className="mb-5 w-full border-b-2 border-neutral-200 border-opacity-100 py-4 pl-5 dark:border-opacity-50"
              type="text"
              name="bracketName"
              key="bracketName"
              placeholder="Enter bracket name"
            />
          </section>
          <section className="flex w-96 flex-col items-center justify-center">
            <h1 className="w-full text-lg font-bold">Teams</h1>
            {[...Array(teamCount)].map((value: undefined, i: number) => (
              <>
                <Field
                  className="mb-5 w-full border-b-2 border-neutral-100 border-opacity-100 py-4 pl-5 dark:border-opacity-50"
                  type="text"
                  name={`team${i}`}
                  key={`team${i}`}
                  placeholder="Enter team name"
                />
                <ErrorMessage name={`team${i}`} component="div" />
              </>
            ))}
            <div className="mb-5 inline-flex">
              <button
                className="rounded-l bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
                onClick={() => {
                  if (teamCount > 2) setTeamCount(teamCount - 1)
                }}
                type="button">
                Remove Team
              </button>
              <button
                className="rounded-r bg-gray-300 py-2 px-4 font-bold text-gray-800 hover:bg-gray-400"
                onClick={() => {
                  if (teamCount < 16) setTeamCount(teamCount + 1)
                }}
                type="button">
                Add Team
              </button>
            </div>
            <button
              className="group relative inline-flex cursor-pointer items-center overflow-hidden rounded-full border-2 border-indigo-500 px-12 py-3 text-lg font-medium text-indigo-500 hover:bg-gray-50 hover:text-white"
              onClick={onSubmit}>
              <span className="duration-400 ease absolute left-0 top-1/2 block h-0 w-full bg-indigo-500 opacity-100 transition-all group-hover:top-0 group-hover:h-full"></span>
              <span className="ease absolute right-0 flex h-10 w-10 translate-x-full transform items-center justify-start duration-300 group-hover:translate-x-0">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="relative">Submit</span>
            </button>
          </section>
        </Form>
      </Formik>
    </>
  )
}
