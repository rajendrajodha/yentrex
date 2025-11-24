import React from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
    headCells: {
        style: {
            fontWeight: 'bolder',
            fontSize: '15px',
        },
    },
};

const DataTableComponent = ({ columns, data, itemsPerPage, totalData, handlePageChange } = {}) => {
console.log("🚀 ~ DataTableComponent ~ columns:", columns)
console.log("🚀 ~ DataTableComponent ~ data:", data)

    return (
        <>
            {data && data?.length > 0 ? (
                <DataTable
                    columns={columns}
                    data={data}
                    pagination
                    striped
                    highlightOnHover
                    paginationServer
                    paginationPerPage={itemsPerPage}
                    paginationTotalRows={totalData}
                    onChangePage={handlePageChange}
                    customStyles={customStyles}
                />
            ) : (
                <div className="text-center p-4 fw-bold">No records found</div>
            )}
        </>
    )
}

export default DataTableComponent
