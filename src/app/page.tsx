'use client'

import { useState, useEffect } from 'react'


export default function Home() {
  const [standings, setStandings] = useState(null)
  const [order, setOrder] = useState("asc")
  const [sortField, setSortField] = useState("")

  function Header({ label, standing_field }) {
    let handleOnClick = null
    if (standing_field) {
      handleOnClick = () => {
        const sorted = [...standings].sort((a, b) => {
          if (order === "asc") {
            return a[standing_field] < b[standing_field] ? -1 : 1
          }
          return a[standing_field] < b[standing_field] ? 1 : -1
        })
        setSortField(standing_field)
        setOrder(order === "asc" ? "desc" : "asc")
        setStandings(sorted)
      }
    }

    let className = "px-6 py-3"
    if (standing_field === sortField) {
      className += " text-decoration: underline"
    }
    return <th className={className} onClick={handleOnClick}>{label}</th>
  }

  useEffect(() => {
    async function fetchStandings() {
      const res = await fetch('http://localhost:8000/standings/')
      const data = await res.json()
      setStandings(data)
    }
    fetchStandings()
  }, [])

  if (!standings) return <div>Loading...</div>

  return (
    <div className="relative overflow-x-auto">
      <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <Header label="#" standing_field="pos"/>
            <Header label="Ekip"/>
            <Header label="But Pour" standing_field="goals_scored"/>
            <Header label="But Contre" standing_field="goals_conceded"/>
            <Header label="Difference" standing_field="difference"/>
            <Header label="Points"/>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={standing.team}>
              <td className="text-center"> {standing.pos} </td>
              <td className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">{standing.team}</td>
              <td className="text-center">{standing.goals_scored}</td>
              <td className="text-center">{standing.goals_conceded}</td>
              <td className="text-center">{standing.difference}</td>
              <td className="text-center">{standing.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
