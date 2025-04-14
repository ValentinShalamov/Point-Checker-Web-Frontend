import {
    X_NAME,
    Y_NAME,
    X_MIN,
    Y_MIN,
    X_MAX,
    Y_MAX,
    R_NAME,
    FILL_X_FORM,
    INCORRECT_INPUT,
    FILL_Y_FORM, FILL_R_FORM, R_MAX, R_MIN
} from "./constants.js";

export function getValidationErrors(formData) {
    let x = formData.get(X_NAME);
    let y = formData.get(Y_NAME);
    let radius = formData.get(R_NAME);

    let errors = [];

    if (x === undefined || x.length === 0) {
        errors.push({
            name: X_NAME,
            message: FILL_X_FORM
        });
    } else if (isNaN(+x) || +x < `${X_MIN}` || +x > `${X_MAX}`) {
        errors.push({
            name: X_NAME,
            message: INCORRECT_INPUT
        });
    }

    if (y === undefined || y.length === 0) {
        errors.push({
            name: Y_NAME,
            message: FILL_Y_FORM,
        });
    } else if (isNaN(+y) || +y < `${Y_MIN}` || +y > `${Y_MAX}`) {
        errors.push({
            name: Y_NAME,
            message: INCORRECT_INPUT
        });
    }

    if (radius === undefined || y.length === 0) {
        errors.push({
            name: R_NAME,
            message: FILL_R_FORM
        });
    } else if (isNaN(+radius) || +radius < `${R_MIN}` || +radius > `${R_MAX}` || +radius %1 !== 0) {
        errors.push({
            name: R_NAME,
            message: FILL_R_FORM
        });
    }

    return errors;
}
