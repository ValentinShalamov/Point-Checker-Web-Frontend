
import RadioButton from "../form-elements/RadioButton.jsx";
import {R_NAME} from "../../../../../js/constants.js";

export default function RadioSection({onClick}) {

    return (
        <div className="r_values">
            <div style={{
                textAlign: "left",
                paddingBottom: "5px"
            }}>
                1. Set the radius (R) of area:
            </div>
            <fieldset className="r_form">
                <RadioButton
                    onClick={onClick}
                    id={"1"}
                    name={R_NAME}
                    value={"1"}
                >1</RadioButton>

                <RadioButton
                    onClick={onClick}
                    id={"2"}
                    name={R_NAME}
                    value={"2"}
                >2</RadioButton>

                <RadioButton
                    onClick={onClick}
                    id={"3"}
                    name={R_NAME}
                    value={"3"}
                >3</RadioButton>

                <RadioButton
                    onClick={onClick}
                    id={"4"}
                    name={R_NAME}
                    value={"4"}
                >4</RadioButton>

                <RadioButton
                    onClick={onClick}
                    id={"5"}
                    name={R_NAME}
                    value={"5"}
                >5</RadioButton>
            </fieldset>
        </div>
    );
}