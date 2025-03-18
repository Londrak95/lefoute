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
	const [resultType, setResultType] = useState('all')

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

	return (
		<>
		<select name="result-types" id="result-type-select" value={resultType}
		  onChange={(e) => {
		  	// setResults(results.filter(result => result.goals_conceded === 0))
		  	setResultType(e.target.value)
		  }}>
		  <option value="all">Tous les résultats</option>
		  <option value="victory">Victoires</option>
		  <option value="draw">Matchs Nuls</option>
		  <option value="defeat">Défaites</option>
		</select>
		<hr/>
		<Table columns={columnsInfo} initial_data={results}/>
		</>
	)
}