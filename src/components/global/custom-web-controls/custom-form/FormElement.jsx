import React from 'react';
import CustomInputText from '../custom-input-text';
import CustomCheckBox from '../custom-checkbox';
import CustomInputNumber from '../custom-input-number';
import CustomDatePicker from '../custom-date-picker/custom-date-picker';
import CustomTextArea from '../custom-text-area';
import CustomAutoComplete from '../custom-auto-complete';
import CustomInputMask from '../custom-input-mask';
import CustomSlider from '../custom-slider';
import DropdownWrapper from '@/components/custom-controls/dropdown-wrapper';

// mapping of our components

const componentMapping = {
    Dropdown: DropdownWrapper,
    Text: CustomInputText,
    Checkbox: CustomCheckBox,//CustomCheckbox,
    Number: CustomInputNumber,
    DatePicker: CustomDatePicker,
    Multiline: CustomTextArea,
    // Calculated: CustomCalculatedControl,
    // Password: CustomPasswordTextBox,
    // CustomHeading: CustomHeading,
    // Label: CustomLabel,
    AutoComplete: CustomAutoComplete,
    RangePicker:CustomSlider,
    CustomPhone: CustomInputMask
};

const FormElement = (props) => {

    const Component = componentMapping[props.type];

    return (
        <>
            <Component {...props} />
        </>
    );
};

export default FormElement;