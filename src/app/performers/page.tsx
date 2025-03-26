'use client'

import { useEffect, useState } from 'react'
import Table from '../components/table'
import TableWithTittle from '../components/table_with_title'
import AirlineStopsIcon from '@mui/icons-material/AirlineStops'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'


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
			let data = await res.json()
			data.goals = data.goals.sort((a, b) => a.goals > b.goals ? -1 : 1)
			data.assists = data.assists.sort((a, b) => a.assists > b.assists ? -1 : 1)
			setPerformers(data)
		}
		fetchPerformers()
	}
	, [])

	if (!performers) return <div>Loading...</div>

	return (
		<div className="grid auto-cols-max grid-flow-col gap-4 mx-2 my-2">
			<TableWithTittle title={"Buteurs"} tableColumns={goalsColumns} tableData={performers.goals} icon={<SportsSoccerIcon/>}/>
			<TableWithTittle title={"Passeurs"} tableColumns={assistsColumns} tableData={performers.assists} icon={<AirlineStopsIcon/>}/>
		</div>
	)
}