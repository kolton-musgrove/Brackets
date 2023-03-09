import React, { useState } from "react"
import { Header } from "../components"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi"
import { BracketSchema } from "./bracket"
import { v4 as uuid } from "uuid"
import { instantFns } from "iso-fns2"
import { useNavigate } from "react-router-dom"
import { updateBracketList } from "../utils"
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
    updateBracketList(Bracket)

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
          {/* bracket name section */}
          <section className="mt-3 w-96">
            <h1 className="w-full font-bold text-lg">Bracket Name</h1>
            <Field
              className="w-full border-b-2 border-neutral-200 mb-5 border-opacity-100 pl-5 py-4 dark:border-opacity-50"
              type="text"
              name="bracketName"
              key="bracketName"
              placeholder="Enter bracket name"
            />
          </section>
          {/* teams section */}
          <section className="flex w-96 flex-col items-center justify-center">
            <h1 className="w-full font-bold text-lg">Teams</h1>
            {[...Array(teamCount)].map((value: undefined, i: number) => (
              <>
                <Field
                  className="w-full border-b-2 border-neutral-100 mb-5 border-opacity-100 pl-5 py-4 dark:border-opacity-50"
                  type="text"
                  name={`team${i}`}
                  key={`team${i}`}
                  placeholder="Enter team name"
                />
                <ErrorMessage name={`team${i}`} component="div" />
              </>
            ))}
            {/* plus and minus buttons */}
            <div className="mt-10">
              <button
                className="mb-1 mr-20"
                onClick={() => {
                  if (teamCount > 0) setTeamCount(teamCount - 1)
                }}
                type="button">
                <BiMinusCircle className="h-10 w-10 hover:animate-bounce"/>
              </button>
              <button
                className="mb-1 ml-20"
                onClick={() => setTeamCount(teamCount + 1)}
                type="button">
                <BiPlusCircle className="h-10 w-10 hover:animate-bounce"/>
              </button>
            </div>
            <button className="cursor-pointer relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-500 border-2 border-indigo-500 rounded-full hover:text-white group hover:bg-gray-50" onClick={onSubmit}>
              <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-500 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
              <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span className="relative">Submit</span>
            </button>
          </section>
        </Form>
      </Formik>
    </>
  )
}
