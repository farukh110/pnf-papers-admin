import { useCallback, useEffect, useMemo, useState } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import CustomDataTable from '../../components/global/custom-web-controls/custom-data-table';
import CustomPanel from '../../components/global/custom-web-controls/custom-button-panel';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { deleteCoupon, getAllCoupons } from '../../redux/api/coupon/couponSlice';
import { Modal, notification } from 'antd';
import { useNavigate } from 'react-router-dom';

const Coupons = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { coupons = [], totalRecords = 0, isLoading } = useSelector(state => state.coupons);

    const [dataSource, setDataSource] = useState([]);

    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 50,
        page: 1,
        sortField: 'createdAt',
        sortOrder: -1,
        filters: {},
    });

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const loadLazyData = useCallback(debounce(() => {
        const { page, rows, sortField, sortOrder, filters } = lazyState;

        const params = {
            page,
            limit: rows,
            filters: processFilters(filters), // Process filters
            sortBy: sortField,
            sortOrder: sortOrder === 1 ? 'asc' : 'desc',
        };

        console.log("API Request Params:", params); // Debugging

        dispatch(getAllCoupons(params))
            .unwrap()
            .catch((error) => {
                console.log(`Error: ${error.message}`);
            });
    }, 300), [dispatch, lazyState]);

    useEffect(() => {
        loadLazyData();
    }, [loadLazyData]);

    useEffect(() => {
        if (Array.isArray(coupons)) {
            const couponsWithSerialNumbers = coupons.map((coupon, index) => ({
                ...coupon,
                serialNumber: lazyState.first + index + 1,
            }));

            setDataSource(couponsWithSerialNumbers);
        }
    }, [coupons, lazyState.first]);

    const onPage = useCallback((event) => {
        const { first, rows } = event;
        const newPage = Math.floor(first / rows) + 1;

        setLazyState((prevState) => ({
            ...prevState,
            first,
            rows,
            page: newPage,
        }));
    }, []);

    const onSort = useCallback((event) => {
        setLazyState((prevState) => ({
            ...prevState,
            sortField: event.sortField,
            sortOrder: event.sortOrder,
        }));
    }, []);

    const processFilters = (filters) => {
        return Object.entries(filters).reduce((acc, [key, { value, matchMode }]) => {
            if (value !== null && value !== '') { // Check if value is not null or empty
                acc[key] = { value, matchMode: matchMode || 'startsWith' }; // Default matchMode if not provided
            }
            return acc;
        }, {});
    };

    const onFilter = useCallback((event) => {
        const processedFilters = processFilters(event.filters);
        setLazyState(prevState => ({
            ...prevState,
            filters: processedFilters,
            page: 1,
        }));
    }, []);

    const editCoupon = useCallback((couponId) => {

        navigate(`/admin/coupon/${couponId}`);

    }, []);

    const deleteCouponItem = useCallback((couponId) => {

        Modal.confirm({
            title: 'Are you sure you want to delete this coupon?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    await dispatch(deleteCoupon(couponId)).unwrap();
                    notification.success({
                        message: 'Coupon Deleted',
                        description: 'The coupon has been deleted successfully!',
                        duration: 2,
                    });
                    loadLazyData(); // Refresh list
                } catch (error) {
                    notification.error({
                        message: 'Deletion Failed',
                        description: 'An error occurred while deleting the coupon. Please try again.',
                        duration: 2,
                    });
                }
            },
        });
    }, [dispatch, loadLazyData]);

    const onSelectionChange = useCallback((event) => {
        const value = event.value;
        setSelectedItems(value);
        setSelectAll(value.length === totalRecords);
    }, [totalRecords]);

    const onSelectAllChange = useCallback((event) => {
        const selectAll = event.checked;
        if (selectAll) {
            setSelectAll(true);
            setSelectedItems(coupons);
        } else {
            setSelectAll(false);
            setSelectedItems([]);
        }
    }, [coupons]);

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
                        command: () => editCoupon(rowData._id),
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-trash",
                        command: () => deleteCouponItem(rowData._id),
                    },
                ]}
            />
        );
    }, [editCoupon, deleteCouponItem]);

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
            field: "name",
            header: "Name",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "discount",
            header: "Discount",
            body: (rowData) => `${rowData.discount}%`,
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "expiry",
            header: "Expiry Date",
            body: (rowData) => new Date(rowData.expiry).toLocaleString(),
            sortable: true,
            filter: true,
            visible: true,
            width: "200px",
        },
        {
            field: "action",
            header: "Action",
            body: actionTemplate,
            visible: true,
            width: "100px",
        },
    ], [actionTemplate]);

    const clearFilters = () => {
        setLazyState(prevState => ({
            ...prevState,
            filters: {}, // Reset filters
            page: 1, // Optionally reset to the first page
        }));

        loadLazyData(); // Trigger a new data fetch
    };

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
            on_action: clearFilters,
        },
    ], []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h4 className='mt-md-2'>Coupons List</h4>
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
                    rows={lazyState.rows}
                    onFilter={onFilter}
                    tableSize="small"
                    tableWidth="70rem"
                    borderGrid={true}
                    onSelectionChange={onSelectionChange}
                    onSelectAllChange={onSelectAllChange}
                    selectAll={selectAll}
                />
            </div>
        </div>
    );
}

export default Coupons;