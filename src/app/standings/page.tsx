'use client'

import { useState, useEffect } from 'react'
import Table from '../components/table'
import { teamNameClass } from '../css/classes.tsx'

const columunsInfo = [
  {
    label: "#",
    getCell: (row) => row.pos,
    sortable: true,
  },
  {
    label: "Ekip",
    getCell: (row) => row.team,
    className: teamNameClass,
  },
  {
    label: "But Pour",
    getCell: (row) => row.goals_scored,
    sortable: true,
  },
  {
    label: "But Contre",
    getCell: (row) => row.goals_conceded,
    sortable: true,
  },
  {
    label: "Difference",
    getCell: (row) => row.difference,
    sortable: true,
  },
  {
    label: "Points",
    getCell: (row) => row.points,
  },
]

export default function Standings() {
  const [standings, setStandings] = useState(null)

  useEffect(() => {
    async function fetchStandings() {
      const res = await fetch('http://localhost:8000/standings/')
      const data = await res.json()
      setStandings(data)
    }
    fetchStandings()
  }, [])

  if (!standings) return <div>Loading...</div>

  return <Table columns={columunsInfo} initial_data={standings}/>
}