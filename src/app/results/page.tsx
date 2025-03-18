'use client'

import { useEffect, useState } from 'react'
import Table from '../components/table'
import '../css/styles.css'
import { teamNameClass } from '../css/classes.tsx'

const columnsInfo = [
	{
		label: "#",
		field: "match_day",
	},
	{
		label: "Ekip",
		field: "against",
		className: teamNameClass,
	},
	{
		label: "Score",
		func: (row) => `${row.goals_scored} - ${row.goals_conceded}`,
		classFunc: (row) => {
			let className = 'text-center'
			if (row.goals_scored > row.goals_conceded) {
				className += ' green-text'
			} else if (row.goals_scored === row.goals_conceded) {
				className += ' orange-text'
			} else {
				className += ' red-text'
			}
			return className
		},
	}
]

export default function Results() {
	const [results, setResults] = useState(null)

	useEffect(
		() => {
			async function fetchResults() {
				const res = await fetch('http://localhost:8000/results/')
				const data = await res.json()
				setResults(data)
			}
			fetchResults()
		}
	, [])

	if (!results) return <div>Loading...</div>

	return <Table columns={columnsInfo} initial_data={results}/>
}