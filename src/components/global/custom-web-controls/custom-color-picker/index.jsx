import { ColorPicker } from "primereact/colorpicker";
import { forwardRef } from "react";

const CustomColorPicker = forwardRef((props, ref) => {
    return (
        <>
            <ColorPicker {...props} ref={ref} />
        </>
    );
});

export default CustomColorPicker;