import { forwardRef } from 'react';
import { ToggleButton } from 'primereact/togglebutton';

const CustomToggleButton = forwardRef((props, ref) => {
    return (
        <ToggleButton {...props} ref={ref} />
    );
});

export default CustomToggleButton;