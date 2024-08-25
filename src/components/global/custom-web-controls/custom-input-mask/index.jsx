import { forwardRef } from "react";
import { InputMask } from "primereact/inputmask";

const CustomInputMask = forwardRef((props, ref) => {
    return (
        <>
            <InputMask {...props} ref={ref} />
        </>
    );
});

export default CustomInputMask;
