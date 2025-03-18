'use client'

import { useState, useEffect } from 'react'
import Table from '../components/table'
import { teamNameClass } from '../css/classes.tsx'

const columunsInfo = [
  {
    label: "#",
    field: "pos",
    sortable: true,
  },
  {
    label: "Ekip",
    field: "team",
    className: teamNameClass,
  },
  {
    label: "But Pour",
    field: "goals_scored",
    sortable: true,
  },
  {
    label: "But Contre",
    field: "goals_conceded",
    sortable: true,
  },
  {
    label: "Difference",
    field: "difference",
    sortable: true,
  },
  {
    label: "Points",
    field: "points",
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