import { forwardRef } from "react";
import { Dropdown } from "primereact/dropdown";

const DropdownWrapper = forwardRef((props, ref) => (
    <Dropdown {...props} ref={ref} />
));

export default DropdownWrapper;