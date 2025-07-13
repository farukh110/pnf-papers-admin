import { useCallback, useEffect, useMemo, useState } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import CustomDataTable from '../../components/global/custom-web-controls/custom-data-table';
import CustomPanel from '../../components/global/custom-web-controls/custom-button-panel';
import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { deleteColor, getAllColors } from './../../redux/api/color/colorSlice';
import { useNavigate } from 'react-router-dom';
import { Modal, notification } from 'antd';
import { exportToExcel } from '../../utils';
import namer from 'color-namer';

const Colors = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { colors = [], totalRecords = 0, isLoading } = useSelector(state => state.colors);

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

        dispatch(getAllColors(params))
            .unwrap()
            .catch((error) => {
                console.log(`Error: ${error.message}`);
            });
    }, 300), [dispatch, lazyState]);

    useEffect(() => {
        loadLazyData();
    }, [loadLazyData]);

    useEffect(() => {
        if (Array.isArray(colors)) {
            const colorsWithSerialNumbers = colors.map((color, index) => ({
                ...color,
                serialNumber: lazyState.first + index + 1,
            }));

            setDataSource(colorsWithSerialNumbers);
        }
    }, [colors, lazyState.first]);

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

    const editColor = useCallback((colorId) => {

        navigate(`/admin/color/${colorId}`);

    }, [navigate]);

    const deleteColorItem = useCallback((colorId) => {
        Modal.confirm({
            title: 'Are you sure you want to delete this color?',
            content: 'This action cannot be undone.',
            okText: 'Yes, Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            onOk: async () => {
                try {
                    await dispatch(deleteColor(colorId)).unwrap();
                    notification.success({
                        message: 'Color Deleted',
                        description: 'The color has been deleted successfully!',
                        duration: 2,
                    });
                    loadLazyData(); // Refresh list
                } catch (error) {
                    notification.error({
                        message: 'Deletion Failed',
                        description: 'An error occurred while deleting the color. Please try again.',
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
            setSelectedItems(colors);
        } else {
            setSelectAll(false);
            setSelectedItems([]);
        }
    }, [colors]);

    const colorTemplate = useCallback((rowData) => {
        return (
            <div style={{ width: '50px', height: '50px', borderRadius: '100px', backgroundColor: `#${rowData.title}` }}></div>
        );
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
                        command: () => editColor(rowData._id),
                    },
                    {
                        label: "Delete",
                        icon: "pi pi-trash",
                        command: () => deleteColorItem(rowData._id),
                    },
                ]}
            />
        );
    }, [editColor, deleteColorItem]);

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
            header: "Color",
            body: colorTemplate,
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
            btn_label: "Add Color",
            btn_color: "secondary",
            class_name: "w-100 rounded p-2 ps-3 pe-3",
            column_class: "col-md-4 pe-1",
            icon: "pi pi-plus",
            btn_size: "small",
            on_action: () => {
                navigate('/admin/add-color');
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

                    const result = await dispatch(getAllColors(allParams)).unwrap();
                    const rawColors = result?.data || [];

                    const exportData = rawColors.map((item, index) => {
                        const hex = `#${item.title.toLowerCase()}`;
                        const nameResult = namer(hex);
                        const colorName = nameResult?.ntc?.[0]?.name || 'Unknown';

                        return {
                            "S.No": index + 1,
                            "Color Hex": hex,
                            "Color Name": colorName,
                            "Created Date": new Date(item.createdAt).toLocaleString(),
                            "Updated Date": new Date(item.updatedAt).toLocaleString(),
                        };
                    });

                    console.log("Exporting Excel data:", exportData);

                    exportToExcel(exportData, 'Colors_List');
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
                <h4 className='mt-md-2'>Colors List</h4>
                <div className="row justify-content-between my-md-3">
                    <div className="col-md-5"></div>
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

export default Colors;
