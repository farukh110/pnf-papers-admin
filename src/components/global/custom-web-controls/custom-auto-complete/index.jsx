import { forwardRef } from "react";
import { AutoComplete } from "primereact/autocomplete";

const CustomAutoComplete = forwardRef((props) => {
    return (
        <>
            <AutoComplete {...props} />
        </>
    );
});

export default CustomAutoComplete;