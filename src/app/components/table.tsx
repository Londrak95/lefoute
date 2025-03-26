import { useState } from 'react'


function Header(props) {
  const [order, setOrder] = useState("desc")

  let className = "px-6 py-3 text-center"
  if (props.sorted) {
    className += " text-decoration: underline"
  }

  const handleOnClick = () => {
    props.handleOnClick(order)
    setOrder(order === "asc" ? "desc" : "asc")
  }
  return <th className={className} onClick={handleOnClick}> {props.column.label} </th>
}

function Headers(props) {
  const [ordering, setOrdering] = useState(props.columns.map(column => column.sortable === true ? false : null))

  const handleSort = (sorted, index, order) => {
    if (sorted == null) return null

    const sortedData = [...props.data].sort((a, b) => {
      if (order === "asc") {
        return props.columns.at(index).getCell(a) < props.columns.at(index).getCell(b) ? -1 : 1
      }
      return props.columns.at(index).getCell(a) < props.columns.at(index).getCell(b) ? 1 : -1
    })

    props.setData(sortedData)
    setOrdering(ordering.map((c, i) => {
      if (i !== index) {
        return c !== null ? null : false
      } else {
        return true
      }
    }))
  }

  return (
  	<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  	  <tr key="header">
  	  	{props.columns.map((column, index) => (
		      <Header key={index} column={column} sorted={ordering.at(index)} handleOnClick={(order) => handleSort(ordering.at(index), index, order)}/>
  		))}
  	  </tr>
	</thead>
  )
}

function Body({columns, data}) {
	return (
	  <tbody>
		  {data.map((row, rowIndex) => (
	        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200" key={rowIndex}>
	          {columns.map((column, colIndex) => {
	          	return (
	          		<td className={column.className ?? (column.classFunc && column.classFunc(row)) ?? "text-center"} key={colIndex}>
	          			{column.getCell(row)}
	          		</td>
	          	)
	          })}
	        </tr>
	      ))}
	  </tbody>
	)
}

export default function Table({columns, initial_data}) {
  // Base component for a generic table
  // Parameter @columns should be a list of objects, each object should have
  //   mandatory
  //   @label: display name of the header
  //   @getCell: function that takes the row as parameter and returns the value for the cell

  //   optionnal
  //   @sortable: boolean whether the column is sortable or not (default is false)
  //   @className: CSS for the values in the column (default is 'text-center')
  //   @classFunc: function that takes the row as parameter and returns the class to use

  // Parameter @initial_data should be a list of objects representing each row

  const [data, setData] = useState(initial_data)

  return (
    <div className="relative overflow-x-auto">
      <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      	<Headers columns={columns} data={data} setData={setData}/>
      	<Body columns={columns} data={data}/>
      </table>
    </div>
  )
}