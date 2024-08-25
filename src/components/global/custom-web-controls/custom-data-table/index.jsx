/* eslint-disable */
  import React, { useEffect, useState } from "react";
  import { DataTable } from "primereact/datatable";
  import { Column } from "primereact/column";
  import { Paginator } from "primereact/paginator";
  import "./index.scss";

  const CustomDataTable = (props) => {
    const {
      loadLazyData,
      columns,
      onRows,
      lazyState,
      totalRecords,
      dataSource,
      loading,
      onPage,
      onSort,
      onFilter,
      tableSize,
      borderGridlines,
      scrollHeight,
      scrollable,
      selection,
      onSelectionChange,
      selectAll,
      onSelectAllChange,
      resizeColumns,
      stripedRows,
      pageSizes,
      tableWidth,
      rowClassName,
    } = props;

    useEffect(() => {
      loadLazyData();
    }, [lazyState]);


    const [rowsPerPage, setRowsPerPage] = useState(onRows);

    const onPageChange = (e) => {
      setRowsPerPage(e.rows);
      onPage({ ...lazyState, first: e.first, rows: e.rows });
    };

    return (
        <div className="card">
          <DataTable
              value={dataSource}
              lazy
              filterDisplay="row"
              dataKey="id"
              className="custom-datatable"
              // paginator
              scrollable={scrollable}
              scrollHeight={scrollHeight}
              first={lazyState.first}
              rows={lazyState.rows}
              totalRecords={totalRecords}
              onPage={onPage}
              onSort={onSort}
              sortField={lazyState.sortField}
              sortOrder={lazyState.sortOrder}
              onFilter={onFilter}
              loading={loading}
              tableStyle={{ minWidth: tableWidth }}
              size={tableSize}
              showGridlines={borderGridlines}
              selection={selection}
              onSelectionChange={onSelectionChange}
              selectAll={selectAll}
              onSelectAllChange={onSelectAllChange}
              resizableColumns={resizeColumns}
              stripedRows={stripedRows}
              rowClassName={rowClassName}

          >
            {/* Render remaining columns */}
            {columns.map((column, index) => {
              if (column.visible) {
                // Check if the column should be visible
                if (column.field === "selection") {
                  return (
                      <Column
                          key={index}
                          selectionMode="multiple"
                          headerStyle={{ width: "3rem" }}
                          style={{ width: column.width }}
                      />
                  );
                } else {
                  return (
                      <Column
                          key={index}
                          field={column.field}
                          header={column.header}
                          sortable={column.sortable}
                          filter={column.filter}
                          filterElement={column.filterElement}
                          filterPlaceholder={column.filterPlaceholder}
                          body={column.body}
                          filterField={column.filterField}
                          showFilterMenu={column.filterMenu}
                          style={{ width: column.width  }}

                          // bodyStyle={{
                          //   backgroundColor: rowClassName.background,
                          //   color: rowClassName.color
                          // }}


                          // bodyStyle={{ backgroundColor: '#5f5ff4',color:'white'   }}
                          // bodyStyle={{
                          //   backgroundColor: rowClassName.background,
                          //   color: rowClassName.color
                          // }}
                          // bodyStyle={(rowData) => calculateRowColor(rowData)} // Directly call calculateRowColor function

                          // bodyStyle={(rowData) => {
                          //   const rowColor = rowClassName(rowData); // Call the rowClassName function with rowData
                          //   return {
                          //     backgroundColor: rowColor.background,
                          //     color: rowColor.color
                          //   };
                          // }}

                          // bodyStyle={(rowData) => {
                          //   const rowColor = rowClassName[rowData.id]; // Get the color object based on the row ID
                          //   // if (rowColor) {
                          //     return {
                          //       backgroundColor: rowData.background,
                          //       color: rowData.color
                          //     };
                          //   // }
                          //   // else {
                          //   //   return null; // Return null if no color is found for the row
                          //   // }
                          // }}
                      />
                  );
                }
              } else {
                return null; // Render nothing if the column should be hidden
              }
            })}
          </DataTable>

          <Paginator
              first={lazyState.first}
              rows={rowsPerPage} // Use rowsPerPage state here
              totalRecords={totalRecords}
              onPageChange={onPageChange}
              rowsPerPageOptions={pageSizes}
          />
        </div>
    );
  };

  export default CustomDataTable;
