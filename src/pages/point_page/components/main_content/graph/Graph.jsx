import {useEffect, useRef } from "react";
import {X_NAME, Y_NAME, R_NAME, X_RESULT_NAME, Y_RESULT_NAME} from "../../../js/constants.js";
import {createAndGetPoints} from "../../../js/requests.js";
import {isHit} from "../../../js/area_check_validator.js";

const width = 350;
const height = 340;
const centerX = width / 2;
const centerY = height / 2;
const offsetX = 8;
const offsetY = 1.125;

const X_CONVERSATION_RATE = 124;
const Y_CONVERSATION_RATE = 124;

export default function Graph({ref, points, setPoints }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const ctx = canvasRef.current.getContext('2d');
        let radiusValue = new FormData(ref.current).get(R_NAME);
        draw(points, radiusValue, ctx);
    },[points, ref]);

    async function sendRequestFromGraph(e) {
        let formData = new FormData(ref.current);
        let point = getPointFromCoordinates(e, formData, canvasRef.current);

        formData.set(X_NAME, point.x);
        formData.set(Y_NAME, point.y);

        let points = await createAndGetPoints(formData);
        if (points !== undefined && points !== null) {
            setPoints(points);
        }
    }

    return (
        <canvas
            onClick={sendRequestFromGraph}
            ref={canvasRef}
            id="canvas"
            width={width}
            height={height}
        />
    );
}

function getPointFromCoordinates(e, formData, canvas) {
    let rect = canvas.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    let computedX = x - centerX + offsetX;
    let computedY = centerY - y - offsetY;

    let xReal = Math.round(((computedX / X_CONVERSATION_RATE) * formData.get("r_value")) * 100) / 100;
    let yReal = Math.round(((computedY / Y_CONVERSATION_RATE) * formData.get("r_value")) * 100) / 100;

    return {
        x : xReal,
        y : yReal
    }
}

function draw(initPoints, radiusValue, ctx) {
    const img = new Image();
    img.src = '/images/graphic.png';
    img.onload = () => {
        ctx.drawImage(img, 0, 0);

        for (let initPoint of initPoints) {
            let xReal = +initPoint[X_RESULT_NAME];
            let yReal = +initPoint[Y_RESULT_NAME];

            let point = {
                x: xReal,
                y: yReal,
                radius: radiusValue,
            };

            let hit = isHit(point)

            let coordinateX = (xReal * X_CONVERSATION_RATE) / +radiusValue;
            let coordinateY = (yReal * Y_CONVERSATION_RATE) / +radiusValue;

            let computeCoordinateX = centerX + coordinateX - offsetX;

            let computeCoordinatedY = centerY - coordinateY - offsetY;

            if (hit) {
                ctx.beginPath();
                ctx.fillStyle = '#69ff6b';
                ctx.arc(computeCoordinateX, computeCoordinatedY, 3, 0, 2*Math.PI);
                ctx.fill();
            } else {
                ctx.beginPath();
                ctx.fillStyle = '#ff0000';
                ctx.arc(computeCoordinateX, computeCoordinatedY, 3, 0, 2*Math.PI);
                ctx.fill();
            }
        }
    };
}
