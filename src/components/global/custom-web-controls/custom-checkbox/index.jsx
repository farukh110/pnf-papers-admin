import { Checkbox } from 'primereact/checkbox';
import './index.scss';

const CustomCheckBox = (props) => {
    return (
        <>
            <Checkbox className='custom-checkbox-style' {...props} />
        </>
    );
};

export default CustomCheckBox;