import { forwardRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';

const CustomMultiSelect = forwardRef((props, ref) => {
    return (
        <MultiSelect {...props} ref={ref} />
    );
});

export default CustomMultiSelect;