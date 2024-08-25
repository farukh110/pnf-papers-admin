import { Password } from "primereact/password";
import { forwardRef } from "react";

const CustomInputPassword = forwardRef((props, ref) => {

    return (
        <>
            <Password {...props} ref={ref} />
        </>
    );
});

export default CustomInputPassword;