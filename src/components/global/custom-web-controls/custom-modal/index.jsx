import React, { forwardRef } from 'react';
import { Dialog } from 'primereact/dialog';

const CustomModal = forwardRef((props, ref) => {
    const { children } = props;
    return (
        <Dialog {...props} ref={ref}>
            {children}
        </Dialog>
    );
});

export default CustomModal;
