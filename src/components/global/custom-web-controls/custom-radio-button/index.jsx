import { forwardRef } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import './index.scss';

const CustomRadioButton = forwardRef((props, ref) => {
    return (
        <>
            <RadioButton className='custom-radio-button' {...props} ref={ref} />
        </>
    );
});

export default CustomRadioButton;