import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SplitButton } from 'primereact/splitbutton';
import CustomDataTable from '../../components/global/custom-web-controls/custom-data-table';
import CustomPanel from '../../components/global/custom-web-controls/custom-button-panel';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { deleteBrand, getAllBrands } from './../../redux/api/brand/brandSlice';
import { Modal, notification } from 'antd';
import { exportToExcel } from '../../utils';

const Brands = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { brands = [], totalRecords = 0, isLoading } = useSelector(state => state.brands);

    const queryParams = new URLSearchParams(location.search);
    const initialPage = parseInt(queryParams.get('page'), 10) || 1;
    const initialLimit = parseInt(queryParams.get('limit'), 10) || 50;
    const initialSortBy = queryParams.get('sortBy') || 'createdAt';
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

        console.log("API Request Params:", params); // Debugging

        dispatch(getAllBrands(params))
            .unwrap()
            .catch((error) => {
                console.log(`Error: ${error.message}`);
            });
    }, 300), [dispatch, lazyState]);

    useEffect(() => {
        loadLazyData();
    }, [loadLazyData]);

    useEffect(() => {
        if (Array.isArray(brands)) {
            const brandsWithSerialNumbers = brands.map((brand, index) => ({
                ...brand,
                serialNumber: lazyState.first + index + 1,
            }));

            setDataSource(brandsWithSerialNumbers);
        }
    }, [brands, lazyState.first]);

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

    const editBrand = useCallback((brandId) => {

        // console.log("Edit brand:", brandId);

        navigate(`/admin/brand/${brandId}`);

    }, [navigate]);

    const deleteBrandItem = useCallback((brandId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this brand?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    await dispatch(deleteBrand(brandId)).unwrap();
                    notification.success({
                        message: 'Brand Deleted',
                        description: 'The brand has been deleted successfully!',
                        duration: 2,
                    });
                    loadLazyData(); // Refresh list
                } catch (error) {
                    notification.error({
                        message: 'Deletion Failed',
                        description: 'An error occurred while deleting the brand. Please try again.',
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
            setSelectedItems(brands);
        } else {
            setSelectAll(false);
            setSelectedItems([]);
        }
    }, [brands]);

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
                        command: () => editBrand(rowData._id),
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-trash",
                        command: () => deleteBrandItem(rowData._id),
                    },
                ]}
            />
        );
    }, [editBrand, deleteBrandItem]);

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
            field: "title",
            header: "Title",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "createdAt",
            header: "Created Date",
            sortable: true,
            filter: true,
            visible: true,
            width: "150px",
        },
        {
            field: "updatedAt",
            header: "Updated Date",
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
            btn_label: "Add Brands",
            btn_color: "secondary",
            class_name: "w-100 rounded p-2 ps-3 pe-3",
            column_class: "col-md-4 pe-1",
            icon: "pi pi-plus",
            btn_size: "small",
            on_action: () => {
                navigate('/admin/add-brand');
            },
        },
        {
            id: 2,
            btn_label: "Excel All",
            btn_color: "secondary",
            class_name: "w-100 rounded p-2 ps-3 pe-3",
            column_class: "col-md-4 pe-1",
            icon: "pi pi-file-excel",
            btn_size: "small",
            on_action: async () => {
                try {
                    const allParams = {
                        page: 1,
                        limit: 10000,
                        sortBy: 'createdAt',
                        sortOrder: 'desc',
                        filters: {},
                    };

                    const result = await dispatch(getAllBrands(allParams)).unwrap();
                    const rawColors = result?.data || [];

                    const exportData = rawColors.map((item, index) => {

                        return {
                            "S.No": index + 1,
                            "Name": item.title,
                            "Created Date": new Date(item.createdAt).toLocaleString(),
                            "Updated Date": new Date(item.updatedAt).toLocaleString(),
                        };
                    });

                    console.log("Exporting Excel data:", exportData);

                    exportToExcel(exportData, 'Brands_List');
                } catch (err) {
                    console.error('Excel export error:', err);
                }
            }
        },
        {
            id: 3,
            btn_label: "Clear Filter",
            btn_color: "secondary",
            class_name: "w-100 rounded p-2 ps-3 pe-3",
            column_class: "col-md-4",
            icon: "pi pi-filter-slash",
            btn_size: "small",
            on_action: clearFilters,
        },
    ], []);

    return (
        <div className='row'>
            <div className='col-md-12'>
                <h4 className='mt-md-2'>Brands List</h4>
                <div className="row justify-content-between my-md-3">
                    <div className="col-md-6"></div>
                    <div className="col-md-5">
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

export default Brands;
