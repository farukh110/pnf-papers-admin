import { forwardRef } from 'react';
import { InputNumber } from 'primereact/inputnumber';
import './index.scss';

const CustomInputNumber = forwardRef((props, ref) => {

    return (
        <InputNumber {...props} ref={ref} />
    );
});

export default CustomInputNumber;
