import { forwardRef } from 'react';
import { Chips } from 'primereact/chips';

const CustomChips = forwardRef((props, ref) => {
    return (
        <>
            <Chips {...props} ref={ref} />
        </>
    );
});

export default CustomChips;