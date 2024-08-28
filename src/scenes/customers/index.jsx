import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplitButton } from "primereact/splitbutton";
import CustomDataTable from "../../components/global/custom-web-controls/custom-data-table";
import CustomPanel from "../../components/global/custom-web-controls/custom-button-panel";
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../redux/api/customer/customerSlice';

const Customers = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { customers = [], totalRecords = 0, isLoading } = useSelector(state => state.customers);

    const [dataSource, setDataSource] = useState(null);
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 2,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {},
    });

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);

    // Load data from the server with pagination
    const loadLazyData = useCallback(() => {
        dispatch(getAllUsers({
            page: lazyState.page,
            limit: lazyState.rows,
            sortBy: lazyState.sortField,
            sortOrder: lazyState.sortOrder === 1 ? 'asc' : 'desc',
        }));
    }, [dispatch, lazyState.page, lazyState.rows, lazyState.sortField, lazyState.sortOrder]);

    useEffect(() => {
        loadLazyData();
    }, [loadLazyData]);

    useEffect(() => {
        if (Array.isArray(customers)) {
            const customersWithSerialNumbers = customers.map((customer, index) => ({
                ...customer,
                serialNumber: lazyState.first + index + 1,
            }));

            setDataSource(customersWithSerialNumbers);
        }
    }, [customers, lazyState.first]);

    const onPage = useCallback((event) => {
        const { first, rows } = event;
        setLazyState((prevState) => ({
            ...prevState,
            first,
            rows,
            page: Math.floor(first / rows) + 1,
        }));
    }, []);

    const onSort = useCallback((event) => {
        setLazyState(event);
    }, []);

    const onFilter = useCallback((event) => {
        event["first"] = 0;
        setLazyState(event);
    }, []);

    const editCustomer = useCallback((customerId) => {
        console.log("Edit customer:", customerId);
    }, []);

    const deleteCustomer = useCallback((customerId) => {
        console.log("Delete customer:", customerId);
    }, []);

    const onSelectionChange = useCallback((event) => {
        const value = event.value;
        setSelectedItems(value);
        setSelectAll(value.length === totalRecords);
    }, [totalRecords]);

    const onSelectAllChange = useCallback((event) => {
        const selectAll = event.checked;
        if (selectAll) {
            setSelectAll(true);
            setSelectedItems(customers);
        } else {
            setSelectAll(false);
            setSelectedItems([]);
        }
    }, [customers]);

    const actionTemplate = useCallback((rowData) => {
        return (
            <SplitButton
                label="Actions"
                icon="pi pi-bars"
                size="small"
                className='rounded'
                menuClassName='ps-0'
                severity="success"
                model={[
                    {
                        label: "Edit",
                        icon: "pi pi-pencil",
                        command: () => editCustomer(rowData._id),
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-trash",
                        command: () => deleteCustomer(rowData._id),
                    },
                ]}
            />
        );
    }, [editCustomer, deleteCustomer]);

    const columns = useMemo(() => [
        {
            field: "serialNumber",
            header: "S.No",
            sortable: true,
            filter: false,
            visible: true,
            width: "30px",
        },
        {
            field: "firstname",
            header: "First Name",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "lastname",
            header: "Last Name",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "email",
            header: "Email",
            sortable: true,
            filter: true,
            visible: true,
            width: "200px",
        },
        {
            field: "role",
            header: "Role",
            sortable: true,
            filter: true,
            visible: true,
            width: "100px",
        },
        {
            field: "isBlocked",
            header: "Blocked",
            sortable: true,
            filter: true,
            visible: true,
            width: "100px",
            body: (rowData) => (rowData.isBlocked ? 'Yes' : 'No'),
        },
        {
            field: "action",
            header: "Action",
            body: actionTemplate,
            visible: true,
            width: "100px",
        },
    ], [actionTemplate]);

    const actionItems = useMemo(() => [
        {
            id: 1,
            btn_label: "Excel All",
            btn_color: "secondary",
            class_name: "w-100 rounded p-2 ps-3 pe-3",
            column_class: "col-md-6 pe-1",
            icon: "pi pi-file-excel",
            btn_size: "small",
            on_action: () => {
                console.log("Excel all");
            },
        },
        {
            id: 2,
            btn_label: "Clear Filter",
            btn_color: "secondary",
            class_name: "w-100 rounded p-2 ps-3 pe-3",
            column_class: "col-md-6",
            icon: "pi pi-filter-slash",
            btn_size: "small",
            on_action: () => {
                console.log("Clear filter");
            },
        },
    ], []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h4 className='mt-md-2'> Customers List </h4>
                <div className="row justify-content-between my-md-3">
                    <div className="col-md-5"></div>
                    <div className="col-md-3">
                        <CustomPanel
                            custom_main_class="row"
                            actionList={actionItems}
                        />
                    </div>
                </div>
                <CustomDataTable
                    loadLazyData={loadLazyData}
                    columns={columns}
                    lazyState={lazyState}
                    totalRecords={totalRecords}
                    dataSource={dataSource}
                    loading={isLoading}
                    scrollHeight="450px"
                    scrollable={true}
                    onPage={onPage}
                    onSort={onSort}
                    onRows={lazyState.rows}
                    onFilter={onFilter}
                    tableSize="small"
                    tableWidth="70rem"
                    borderGridlines={true}
                    selection={selectedItems}
                    onSelectionChange={onSelectionChange}
                    selectAll={selectAll}
                    onSelectAllChange={onSelectAllChange}
                    resizeColumns={false}
                    stripedRows={false}
                    pageSizes={[2, 50, 100, 500]}
                />
            </div>
        </div>
    );
}

export default Customers;
