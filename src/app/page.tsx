'use client'

import Link from 'next/link'
import { useState } from 'react'
import LogoWithTitle from './components/logo_with_title'


const teams = ["Olympique de Marseille"]
const nbDropDownElement = 2

function DropDownListElement(props) {
  return (
    <div
      onMouseLeave={props.onMouseLeave}
      onMouseEnter={props.onMouseEnter}
    >
      <>
        <li> {props.label} </li>
        {props.spread && (
          <ul className="ml-3 max-w-md space-y-1 text-gray-500">
            {props.choices.map((choice, index) =>
              <li className="flex flex-row" key={index}> <LogoWithTitle name={choice} link={props.url}/> </li>
            )}
          </ul>
        )}
      </>
  </div>
  )
}

export default function Home() {
  const [spreads, setSpreads] = useState(Array(nbDropDownElement).fill(false))

  const handleSpreadEnter = (idx) => {
    setSpreads(spreads.map((spread, i) => {
      if (i === idx) {
        return true
      } else {
        return false
      }
    }))
  }

  const handleSpreadLeave = () => setSpreads(Array(nbDropDownElement).fill(false))

  return (
    <div className="mx-2 my-2">
    <h2 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">P'tit projet vive lefoute</h2>
    <hr className="w-72 h-1 mx-2 my-4 bg-gray-900 border-0 rounded-sm md:my-5 dark:bg-gray-700"/>
    <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside dark:text-gray-400">
      <li> <Link href={"/standings"} target={"_blank"}> Classement Ligue 1 </Link> </li>
      <DropDownListElement
        label={"Résultats"}
        url={"/results"}
        choices={teams}
        spread={spreads[0]}
        onMouseLeave={handleSpreadLeave}
        onMouseEnter={(() => handleSpreadEnter(0))}/>
      <DropDownListElement
        label={"Meilleurs Buteurs et Passeurs"}
        url={"/performers"}
        choices={teams}
        spread={spreads[1]}
        onMouseLeave={handleSpreadLeave}
        onMouseEnter={(() => handleSpreadEnter(1))}/>
    </ul>
    </div>
  )
}