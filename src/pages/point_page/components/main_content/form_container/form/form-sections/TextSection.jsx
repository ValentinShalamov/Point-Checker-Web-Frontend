import styles from '../../FormContainer.module.css'
import {X_MAX, X_MIN, X_NAME, Y_MAX, Y_MIN, Y_NAME} from "../../../../../js/constants.js";

export default function TextSection({validationErrors}) {

    return (
        <>
            <div className={styles.xName}>2. Define X and Y values for the point</div>
            <div className={styles.xUnderName}>You can also set the desired point by clicking on the graph</div>
            <div className={styles.xValues}>
                <div className={styles.x}>X:</div>
                <fieldset className="x_form">
                    <input className={styles.inputText}
                           type="text"
                           placeholder={`${X_MIN} ... ${X_MAX}`}
                           id={X_NAME}
                           name={X_NAME}
                    />
                    <div className={styles.errorMessage}>
                        {validationErrors
                            .filter(error => (error.name === X_NAME))
                            .map(error => (error.message))
                        }
                    </div>
                </fieldset>
            </div>

            <div className={styles.yValues}>
                <div className={styles.x}>Y:</div>
                <fieldset className="y_form">
                    <input className={styles.inputText}
                           type="text"
                           placeholder={`${Y_MIN} ... ${Y_MAX}`}
                           id={Y_NAME}
                           name={Y_NAME}
                    />
                    <div className={styles.errorMessage}>
                        {validationErrors
                            .filter(error => (error.name === Y_NAME))
                            .map(error => (error.message))
                        }
                    </div>
                </fieldset>
            </div>
        </>
    );
}