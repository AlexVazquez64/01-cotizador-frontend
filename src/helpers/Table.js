import React from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { useTable, useRowSelect } from 'react-table';

import moment from 'moment';

const Table = ( props ) => {

  const { clientes } = useSelector( state => state.cliente )

  const {
    columnas,
    filas,
    handleOnSelectRow,
    handleDelete,
    handleOpenPDF,
    handleSendMailPDF,
    path,
  } = props;

  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef()
      const resolvedRef = ref || defaultRef
  
      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate
      }, [resolvedRef, indeterminate]);

      // console.log(rest.setactive)
  
      return (
        <>
          <button
            className="btn btn-success"
            onClick={ () => handleSendMailPDF( rest.setactive ) }
            ref={ resolvedRef }
            { ...rest }
            data-toggle="tooltip"
            data-placement="top"
            title="Enviar PDF"
            hidden={ ( path === '/clientes' || path === '/articulos' ) ? true : false }
          >
            <i className="fas fa-paper-plane"></i>
          </button>

          <button
            className="btn btn-danger"
            onClick={ () => handleOpenPDF( rest.setactive ) }
            ref={ resolvedRef }
            { ...rest }
            data-toggle="tooltip"
            data-placement="top"
            title="PDF"
            hidden={ ( path === '/clientes' || path === '/articulos' ) ? true : false }
          >
            <i className="fas fa-file-pdf"></i>
          </button>

          <button
            className="btn btn-info"
            onClick={ () => handleOnSelectRow( rest.setactive ) }
            ref={ resolvedRef }
            { ...rest }
            data-toggle="tooltip"
            data-placement="top"
            title="Editar"
          >
            <i className="far fa-edit"></i>
          </button>

          <button
            className="btn btn-danger"
            onClick={ () => handleDelete( rest.setactive ) }
            ref={ resolvedRef }
            { ...rest }
            data-toggle="tooltip"
            data-placement="top"
            title="Eliminar"
          >
            <i className="fas fa-trash-alt"></i>
          </button>
        </>
      )
    }
  )

  const columns = React.useMemo(
    () => columnas,
    [ columnas ]
  )

  const data = React.useMemo(
    () => filas,
    [ filas ]
  )

  // const tableInstance = useTable({ columns, data })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // selectedFlatRows,
    // state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push(columns => [
        // Let's make a column for selection
        ...columns,
        {
          Header: 'Acciones',
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
            // Header: ({ getToggleAllRowsSelectedProps }) => (
            //   <div>
            //     <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            //   </div>
            // ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox setactive={ row.original } {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        
      ])
    }
  )

  return (
    <div className="overflow-auto">
      <table
        className="table table-sm table-md table-lg table-xl table-bordered border-white table-striped table-hover" {...getTableProps()}
      >
        <thead className="text-center align-middle">
          {// Loop over the header rows
          headerGroups.map(headerGroup => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {// Loop over the headers in each row
              headerGroup.headers.map(column => (
                // Apply the header cell props
                <th {...column.getHeaderProps()}>
                  {// Render the header
                  column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {// Loop over the table rows
          rows.map(row => {
            // Prepare the row for display
            prepareRow(row)
            return (
              // Apply the row props
              <tr {...row.getRowProps()}>
                {// Loop over the rows cells
                row.cells.map(cell => {
                  // Apply the cell props
                  return (
                    <td
                      className="text-center align-middle"
                      { ...cell.getCellProps() }
                    >
                      { // Render the cell contents
                        ( cell.column.id === 'cliente_id' ) ?
                          clientes.filter( cliente => cliente.id === cell.value).pop()?.nombre :
                          ( cell.column.id === 'fecha_validez' ) ?
                          moment( cell.value ).format( 'DD[-]MMM[-]YYYY' ) :
                          cell.render('Cell')
                      }
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {
  columnas: PropTypes.array.isRequired,
  filas: PropTypes.array.isRequired,
  handleOnSelectRow: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
}

export default Table
