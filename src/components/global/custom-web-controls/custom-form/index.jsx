import React from 'react';
import { useForm } from 'react-hook-form';
import FormElement from './FormElement'; // Assuming FormElement.js is in the same directory

const CustomForm = ({ formConfig, onSubmit }) => {
    const { register, handleSubmit } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {formConfig.map((element, index) => (
                <FormElement key={index} {...element} register={register} />
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomForm;
