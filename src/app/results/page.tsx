'use client'

import { useEffect, useState } from 'react'
import Table from '../components/table'
import { teamNameClass } from '../css/classes.tsx'

const columnsInfo = [
	{
		label: "#",
		getCell: (row) => row.match_day,
	},
	{
		label: "Ekip",
		getCell: (row) => row.against,
		className: teamNameClass,
	},
	{
		label: "Score",
		getCell: (row) => `${row.goals_scored} - ${row.goals_conceded}`,
		classFunc: (row) => {
			let className = 'text-center'
			if (row.goals_scored > row.goals_conceded) {
				className += ' text-green-700'
			} else if (row.goals_scored === row.goals_conceded) {
				className += ' text-orange-500'
			} else {
				className += ' text-red-400'
			}
			return className
		},
	},
	{
		label: "Buteurs",
		getCell: (row) => <Scorers matchID={row.match_day}/>
	}
]

function Scorers({matchID}) {
	const [expanded, setExpanded] = useState(false)
	const [scorers, setScorers] = useState(null)

	const handleOnClick = () => {
		if (scorers) {
			setExpanded(true)
			return scorers
		}
		async function fetchScorers() {
			const res = await fetch(`http://localhost:8000/scorers/${matchID}/`)
			const data = await res.json()
			setScorers(data)
			setExpanded(true)
		}
		fetchScorers()
	}

	if (!expanded) {
		return <h1 onClick={handleOnClick}>Voir les buteurs</h1>
	} else {
		if (scorers.length === 0) {
			return <h1 className="text-center">{"Pas de buteurs =/"}</h1>
		}
		return <ul onClick={() => setExpanded(false)}>
			{scorers.map((scorer, idx) =>
				<li key={idx}>
					<div className="grid grid-cols-2 place-content-between">
						<div className="text-left"> {scorer[0]} </div>
						<div className="text-right"> {scorer[1]}' </div>
					</div>
				</li>
			)}
		</ul>
	}
}

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