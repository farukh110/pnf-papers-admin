import { useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplitButton } from "primereact/splitbutton";
import CustomDataTable from "../../components/global/custom-web-controls/custom-data-table";
import CustomPanel from "../../components/global/custom-web-controls/custom-button-panel"
import axios from 'axios';
import './index.scss';


const Customers = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [dataSource, setDataSource] = useState(null);
    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 50,
        page: 1,
        sortField: null,
        sortOrder: null,
        filters: {},
    });

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState(null);

    // console.log('dataSource: ',dataSource);

    const loadLazyData = useCallback(() => {
        setLoading(true);

        axios
            .get("https://dummyjson.com/users"
                //     {
                //     params: {
                //         lazyEvent: JSON.stringify(lazyState),
                //     },
                // }
            )
            .then((response) => {
                const data = response.data; // Assuming response.data is in the same format as your existing customer service response

                console.log('data: ', data)

                setTotalRecords(data.total);
                // Generate serial numbers for the data
                const newData = data.users.map((item, index) => ({
                    ...item,
                    serialNumber: lazyState.first + index + 1,
                }));
                setDataSource(newData);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, [lazyState]);

    const onPage = useCallback((event) => {
        const { first, rows } = event;
        setLazyState((prevState) => ({
            ...prevState,
            first,
            rows,
            page: Math.floor(first / rows) + 1, // Calculate the page number based on the first row index
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
        // Handle edit action here
        console.log("Edit customer:", customerId);
    }, []);

    const deleteCustomer = useCallback((customerId) => {
        // Handle delete action here
        console.log("Delete customer:", customerId);
    }, []);

    const onSelectionChange = useCallback((event) => {
        const value = event.value;

        setSelectedItems(value);
        setSelectAll(value.length === totalRecords);

    }, []);

    const onSelectAllChange = useCallback((event) => {
        const selectAll = event.checked;

        if (selectAll) {
            axios
                .get("https://www.primefaces.org/data/customers")
                .then((response) => {
                    const data = response.data;
                    setSelectAll(true);
                    setSelectedItems(data.customers);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        } else {
            setSelectAll(false);
            setSelectedItems([]);
        }
    }, []);

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
                        command: () => editCustomer(rowData.id),
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-trash",
                        command: () => deleteCustomer(rowData.id),
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
            field: "firstName",
            header: "First Name",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "lastName",
            header: "Last Name",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "company.name", // Accessing the nested "name" field from the "company" object
            header: "Company Name",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "company.title", // Accessing the nested "title" field from the "company" object
            header: "Company Title",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "age",
            header: "Age",
            filter: true,
            visible: true,
            width: "150px",
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
                console.log("excel all");
                // exportExcelAll();
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
                console.log("clear filter");
            },
        },
    ], []);

    return (
        <>
            <div className='row'>
                <div className='col-md-12'>

                    <h4 className='mt-md-2'> Customers List </h4>

                    <div className="row justify-content-between my-md-3">
                        <div className="col-md-5">

                        </div>

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
                        loading={loading}
                        scrollHeight="450px"
                        scrollable={true}
                        onPage={onPage}
                        onSort={onSort}
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
                    // pageSizes={[50, 100, 500, 1000]}
                    />

                </div>
            </div>
        </>
    )
}

export default Customers;