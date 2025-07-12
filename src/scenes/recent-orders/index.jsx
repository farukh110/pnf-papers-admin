import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CustomDataTable from '../../components/global/custom-web-controls/custom-data-table';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { getAllOrders } from '../../redux/api/auth/authSlice';

const RecentOrders = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { orders = [], totalRecords = 0, isLoading } = useSelector(state => state.auth);

    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get('page'), 10) || 1;
    const initialLimit = parseInt(queryParams.get('limit'), 10) || 50;
    const initialSortBy = queryParams.get('sortBy') || 'orderDate';
    const initialSortOrder = queryParams.get('sortOrder') === 'asc' ? 1 : -1;

    const [dataSource, setDataSource] = useState([]);

    const [lazyState, setLazyState] = useState({
        first: (initialPage - 1) * initialLimit,
        rows: initialLimit,
        page: initialPage,
        sortField: initialSortBy,
        sortOrder: initialSortOrder,
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

        dispatch(getAllOrders(params))
            .unwrap()
            .catch((error) => {
                console.log(`Error: ${error.message}`);
            });
    }, 300), [dispatch, lazyState]);

    useEffect(() => {
        loadLazyData();
    }, [loadLazyData]);

    useEffect(() => {
        if (Array.isArray(orders)) {
            const ordersWithSerialNumbers = orders.map((order, index) => ({
                ...order,
                serialNumber: lazyState.first + index + 1,
            }));

            setDataSource(ordersWithSerialNumbers);
        }
    }, [orders, lazyState.first]);

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

        // console.log('Processed filters before sending:', processedFilters);

        setLazyState(prevState => ({
            ...prevState,
            filters: processedFilters,
            page: 1,
        }));
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
            setSelectedItems(orders);
        } else {
            setSelectAll(false);
            setSelectedItems([]);
        }
    }, [orders]);

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
            body: (rowData) => (`${rowData?.orderBy?.firstname ? rowData?.orderBy?.firstname : ""} ${rowData?.orderBy?.lastname ? rowData?.orderBy?.lastname : ""}`),
            sortable: true,
            filter: true,
            visible: true,
            width: "100px",
        },
        {
            field: "order",
            header: "Order",
            body: (rowData) => (<Link to={`/admin/order/${rowData?.orderBy?._id}`}> View Orders </Link>),
            sortable: true,
            filter: true,
            visible: true,
            width: "50px",
        },
        {
            field: "product",
            header: "Product",
            body: (rowData) => (rowData?.products?.map((productItem, idx) => (
                <p key={idx}>{productItem?.product?.title}</p>
            ))),
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "amount",
            header: "Price",
            body: (rowData) => (`${rowData?.paymentIntent?.amount ? rowData?.paymentIntent?.amount : ""}`),
            sortable: true,
            filter: true,
            visible: true,
            width: "80px",
        },
        {
            field: "totalPriceAfterDiscount",
            header: "Total Price After Discount",
            body: (rowData) => (`${rowData?.totalPriceAfterDiscount ? rowData?.totalPriceAfterDiscount : ""}`),
            sortable: true,
            filter: true,
            visible: true,
            width: "80px",
        },
        {
            field: "orderStatus",
            header: "Status",
            body: (rowData) => (`${rowData?.orderStatus ? rowData?.orderStatus : ""}`),
            sortable: true,
            filter: true,
            visible: true,
            width: "80px",
        },
        {
            field: "createdAt",
            header: "Date",
            body: (rowData) => (new Date(rowData?.createdAt).toLocaleString()),
            sortable: true,
            filter: true,
            visible: true,
            width: "100px",
        },
    ], []);

    const clearFilters = () => {
        setLazyState(prevState => ({
            ...prevState,
            filters: {}, // Reset filters
            page: 1, // Optionally reset to the first page
        }));

        loadLazyData(); // Trigger a new data fetch
    };

    // console.log('dataSource: ', dataSource);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h4 className='mt-md-2'>Recent Orders</h4>

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

export default RecentOrders;
