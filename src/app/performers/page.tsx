'use client'

import { useEffect, useState } from 'react'
import Table from '../components/table'


const goalsColumns = [
	{
		label: "Nom",
		getCell: (row) => row.player,
	},
	{
		label: "Buts",
		getCell: (row) => row.goals,
		sortable: true,
	},
]
const assistsColumns = [
	{
		label: "Nom",
		getCell: (row) => row.player,
	},
	{
		label: "Passes décisives",
		getCell: (row) => row.assists,
		sortable: true,
	},
]

export default function Performers() {
	const [performers, setPerformers] = useState(null)

	useEffect(() => {
		async function fetchPerformers() {
			const res = await fetch('http://localhost:8000/performers/')
			const data = await res.json()
			setPerformers(data)
		}
		fetchPerformers()
	}
	, [])

	if (!performers) return <div>Loading...</div>

	return (
		<div className="grid grid-cols-2 gap-4">
			<Table columns={goalsColumns} initial_data={performers.goals}/>
			<Table columns={assistsColumns} initial_data={performers.assists}/>
		</div>
	)
}