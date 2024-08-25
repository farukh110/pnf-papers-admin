import { forwardRef } from 'react';
import { Calendar } from 'primereact/calendar';

const CustomDatePicker = forwardRef((props, ref) => {
    return (
        <Calendar {...props} ref={ref} />
    );
});

export default CustomDatePicker;