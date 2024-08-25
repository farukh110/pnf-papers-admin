import { InputTextarea } from "primereact/inputtextarea";
import { forwardRef } from "react";

const CustomTextArea = forwardRef((props, ref) => {
    return (
        <>
            <InputTextarea {...props} ref={ref} />
        </>
    );
});

export default CustomTextArea;
