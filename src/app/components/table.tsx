import { useState } from 'react'

function Header(props) {
  const [order, setOrder] = useState("desc")

    let handleOnClick = null
    if ("sortable" in props.column && props.column.sortable) {
      handleOnClick = () => {
        const sorted = [...props.data].sort((a, b) => {
          if (order === "asc") {
            return a[props.column.field] < b[props.column.field] ? -1 : 1
          }
          return a[props.column.field] < b[props.column.field] ? 1 : -1
        })
        setOrder(order === "asc" ? "desc" : "asc")
        props.setSortField(props.column.field)
        props.setData(sorted)
      }
    }

    let className = "px-6 py-3"
    if (props.column.field === props.sortField) {
      className += " text-decoration: underline"
    }
    return <th className={className} onClick={handleOnClick}>{props.column.label}</th>
  }

function Headers(props) {
  const [sortField, setSortField] = useState("")

  return (
  	<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
  	  <tr key="header">
  	  	{props.columns.map((column, index) => (
		  <Header key={index} column={column} sortField={sortField} setSortField={setSortField} {...props}/>
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
	          			{row[column.field] ?? column.func(row)}
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

  //   one or the other
  //   @field: key of the row object which holds the value of the cell
  //   @func: function that takes the row as parameter and returns the value for the cell 

  //   optionnal
  //   @sortable: boolean whether the column is sortable or not (default is false)
  //   @className: CSS for the values in the column (default is 'text-center')
  //   @classFunc: function that takes the row as parameter and returns the class to use

  // Parameter @initial_data should be a list of objects representing each row
  // Each object should have a field matching the @field parameter in @columns
  
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