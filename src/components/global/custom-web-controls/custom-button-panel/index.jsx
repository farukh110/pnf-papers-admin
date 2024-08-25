/* eslint-disable */
import CustomButton from "../custom-button";

const CustomPanel = (props) => {

  const { actionList, custom_main_class } = props;

  return (
    <div className={custom_main_class}>
      {actionList.map((item) =>
        <div key={item.id} className={item.column_class}>
          <CustomButton
            label={item.btn_label}
            severity={item.btn_color}
            className={item.class_name}
            disabled={item?.disabled}
            icon={item.icon}
            size={item.btn_size}
            onClick={item.on_action}
          />
        </div>
      )}
    </div>
  );
};

export default CustomPanel;
