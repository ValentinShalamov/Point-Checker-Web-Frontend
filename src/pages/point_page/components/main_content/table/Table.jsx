import {useState} from "react";
import Icon from "../../icon/Icon.jsx";
import {deleteAndGetPoints, updateAndGetPoints} from "../../../js/requests.js";
import {LAB_PATH, POINT_ID, R_NAME, X_NAME, Y_NAME} from "../../../js/constants.js";
import {getValidationErrors} from "../../../js/input_data_validator.js";
import styles from "./Table.module.css";

// const binSrc = `${LAB_PATH}/images/bin.svg`;
// const pencilSrc = `${LAB_PATH}/images/pencil.svg`;
// const tickSrc = `${LAB_PATH}/images/tick.svg`;
// const cancelSrc = `${LAB_PATH}/images/cancel.svg`;

const binSrc = `/images/bin.svg`;
const pencilSrc = `/images/pencil.svg`;
const tickSrc = `/images/tick.svg`;
const cancelSrc = `/images/cancel.svg`;

export default function Table({points, setPoints}) {
    let isHidden = points === undefined || points === false || points.length === 0;

    const [selectedId, setSelectedId] = useState(0);
    const [changedPoint, setChangedPoint] = useState({});
    const [validationErrors, setValidationErrors] = useState([]);
    const [isEdit, setIsEdit] = useState(false);

    function onChangeXValue(e) {
        setChangedPoint({
            ...changedPoint,
            x: e.target.value
        });
    }

    function onChangeYValue(e) {
        setChangedPoint({
            ...changedPoint,
            y: e.target.value
        });
    }

    function onChangeRadius(e) {
        setChangedPoint({
            ...changedPoint,
            radius: e.target.value
        });
    }

    function pencilClick(id) {
        if (isEdit) return;

        setIsEdit(true);
        setSelectedId(id);

        let changedPoint = points.find((p) => p.id === id);
        setChangedPoint({...changedPoint});
    }

    async function binClick(id) {
        if (isEdit) return;

        clear();
        let formData = new FormData();
        formData.set(POINT_ID, id);
        let points = await deleteAndGetPoints(formData);
        if (points !== null && points !== undefined) {
            setPoints(points);
        }
    }

    async function onTickClick() {
        let point = changedPoint;

        let formData = new FormData();
        formData.set(X_NAME, point.x);
        formData.set(Y_NAME, point.y);
        formData.set(R_NAME, point.radius);
        formData.set(POINT_ID, point.id);

        let errors = getValidationErrors(formData);

        if (errors.length > 0) {
            setValidationErrors(errors);
        } else {
            clear();
            let points = await updateAndGetPoints(formData);
            if (points !== null && points !== undefined) {
                setPoints(points);
            }
        }
    }

    function onCancelClick() {
        clear();
    }

    function clear() {
        setChangedPoint({});
        setSelectedId(0);
        setIsEdit(false);
        setValidationErrors([]);
    }

    return (
        <table
            hidden={isHidden}
            className="result">
            <caption>
                Results Table
            </caption>
            <thead>
            <tr>
                <th scope="col">Id</th>
                <th scope="col">X value</th>
                <th scope="col">Y value</th>
                <th scope="col">R value</th>
                <th scope="col">Result</th>
                <th scope="col">Edit</th>
            </tr>
            </thead>
            <tbody>
            {points.length > 0 && points
                .sort( (a, b) => a.id - b.id)
                .map(point =>
                    selectedId === point.id
                        ? (
                            <tr key={point.id} id={point.id}>
                                <td>{point.id}</td>
                                <td>
                                    <input className={styles.inputInTable} value={changedPoint.x ?? point.x} type={"text"} onChange={onChangeXValue} />
                                    <div className={styles.errorMessage}>
                                        {validationErrors
                                            .filter(error => (error.name === X_NAME))
                                            .map(error => (error.message))
                                        }
                                    </div>
                                </td>
                                <td>
                                    <input className={styles.inputInTable} value={changedPoint.y ?? point.y} type={"text"} onChange={onChangeYValue} />
                                    <div className={styles.errorMessage}>
                                        {validationErrors
                                            .filter(error => (error.name === Y_NAME))
                                            .map(error => (error.message))
                                        }
                                    </div>
                                </td>
                                <td>
                                    <input className={styles.inputInTable} value={changedPoint.radius ?? point.radius} type={"text"} onChange={onChangeRadius} />
                                    <div className={styles.errorMessage}>
                                        {validationErrors
                                            .filter(error => (error.name === R_NAME))
                                            .map(error => (error.message))
                                        }
                                    </div>
                                </td>
                                <td>
                                    <Icon
                                        onClick={onTickClick}
                                        width={25}
                                        height={25}
                                        src={tickSrc}
                                    />
                                </td>
                                <td>
                                    <Icon
                                        onClick={onCancelClick}
                                        width={25}
                                        height={25}
                                        src={cancelSrc}
                                    />
                                </td>
                            </tr>
                        ) :
                        ( <tr key={point.id} id={point.id}>
                            <td>{point.id}</td>
                            <td>{point.x}</td>
                            <td>{point.y}</td>
                            <td>{point.radius}</td>
                            <td>{getTextForPointResult(point.result)}</td>
                            <td style={{display: 'flex', justifyContent: 'space-between'}}>
                                <Icon
                                    onClick={() => pencilClick(point.id)}
                                    width={20}
                                    height={20}
                                    src={pencilSrc}
                                />
                                <Icon
                                    onClick={() => binClick(point.id)}
                                    width={20}
                                    height={20}
                                    src={binSrc}
                                />
                            </td>
                        </tr>)
                )}
            </tbody>
        </table>
    );
}

function getTextForPointResult(result) {
    return result === true ? "HIT" : "MISS";
}

