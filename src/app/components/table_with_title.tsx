import Table from '../components/table'

export default function TableWithTittle(props) {
	return (
		<div>
			<div className="grid auto-cols-max grid-flow-col gap-2 place-content-center">
				<h1 className="text-center uppercase">{props.title}</h1>
				{props.icon}
			</div>
			<Table columns={props.tableColumns} initial_data={props.tableData}/>
		</div>
	)
}