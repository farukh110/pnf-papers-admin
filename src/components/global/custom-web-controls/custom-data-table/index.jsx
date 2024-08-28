/* eslint-disable */
import React, { useEffect, useState, useId } from "react";
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

  const uniqueId = useId(); // Generates a unique ID for each instance

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
        dataKey="_id"
        className="custom-datatable"
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
        {columns.map((column, index) => {
          if (column.visible) {
            const key = `${column.field}-${index}`; // Use a more meaningful key

            if (column.field === "selection") {
              return (
                <Column
                  key={key}
                  selectionMode="multiple"
                  headerStyle={{ width: "3rem" }}
                  style={{ width: column.width }}
                />
              );
            } else {
              return (
                <Column
                  key={key}
                  field={column.field}
                  header={column.header}
                  sortable={column.sortable}
                  filter={column.filter}
                  filterElement={column.filterElement}
                  filterPlaceholder={column.filterPlaceholder}
                  body={column.body}
                  filterField={column.filterField}
                  showFilterMenu={column.filterMenu}
                  style={{ width: column.width }}
                />
              );
            }
          } else {
            return null;
          }
        })}
      </DataTable>

      <Paginator
        first={lazyState.first}
        rows={rowsPerPage}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        rowsPerPageOptions={pageSizes}
      />
    </div>
  );
};

export default CustomDataTable;
