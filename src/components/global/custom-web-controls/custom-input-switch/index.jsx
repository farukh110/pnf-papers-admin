import { forwardRef } from "react";
import { InputSwitch } from "primereact/inputswitch";

const CustomInputSwitch = forwardRef((props, ref) => {
    return (
        <>
            <InputSwitch {...props} ref={ref} />
        </>
    );
});

export default CustomInputSwitch;
