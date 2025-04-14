import styles from './FormContainer.module.css';
import RadioSection from "./form/form-sections/RadioSection.jsx";
import TextSection from "./form/form-sections/TextSection.jsx";
import Button from "../button/Button.jsx";
import {useEffect, useState} from "react";
import {R_NAME} from "../../../js/constants.js";
import {getPointsRequest, createAndGetPoints} from "../../../js/requests.js";
import {getValidationErrors} from "../../../js/input_data_validator.js";

export default function FormContainer({ ref, setPoints }) {
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        let fieldset = ref.current.querySelector(".r_form");
        let radius = localStorage.getItem(R_NAME) ?? 1;
        fieldset.elements[radius - 1].checked = true;
    }, [ref]);

    async function onRadioClick(e) {
        localStorage.setItem(R_NAME, e.target.value);
        let points = await getPointsRequest();
        if (points !== null && points !== undefined) {
            setPoints(points);
        }
        setValidationErrors([]);
    }

    async function onButtonClick(e) {
        e.preventDefault();
        let formData = new FormData(ref.current);
        let errors = getValidationErrors(formData);

        if (errors.length === 0) {
            let points = await createAndGetPoints(formData);
            if (points !== null && points !== undefined) {
                setPoints(points);
            }
            setValidationErrors([]);
        } else {
            setValidationErrors(errors);
        }
    }

    return (
        <form
            className={styles.formContainer}
            ref={ref}
        >
            <RadioSection
                onClick={onRadioClick}
            />
            <div>
                <TextSection
                    validationErrors={validationErrors}
                />
            </div>
            <div>
                <Button
                    onClick={onButtonClick}
                    className={styles.submitButton}
                >
                    Get result
                </Button>
            </div>
        </form>
    );
}
