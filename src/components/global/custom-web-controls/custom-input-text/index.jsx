import { forwardRef } from 'react';
import { InputText } from 'primereact/inputtext';
import './index.scss';

const CustomInputText = forwardRef((props, ref) => {
    return (
        <>
            <InputText {...props} ref={ref} />
        </>
    );
});

export default CustomInputText;
