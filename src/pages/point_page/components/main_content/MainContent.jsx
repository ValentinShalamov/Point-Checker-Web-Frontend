import styles from './MainContent.module.css';
import FormContainer from "./form_container/FormContainer.jsx";
import Graph from "./graph/Graph.jsx";
import Table from "./table/Table.jsx";
import {useEffect, useRef, useState} from "react";
import {getPointsRequest} from "../../js/requests.js";
import {useNavigate} from "react-router-dom";


export default function MainContent() {
    const formRef = useRef(null);
    const [points, setPoints] = useState([]);
    const navigate = useNavigate();

    async function sendStartPageRequest() {
        let initPoints = await getPointsRequest();
        if (initPoints !== undefined && initPoints !== null) {
            setPoints(initPoints);
        }
    }

    useEffect(() => {
        sendStartPageRequest()
            .catch(() => {navigate("/login")});
    }, [navigate]);

    return (
        <main>
            <div className={styles.container}>
                <div>
                    <FormContainer
                        ref={formRef}
                        setPoints={setPoints}
                    />
                </div>
                <div className={styles.image}>
                    <Graph
                        ref={formRef}
                        points={points}
                        setPoints={setPoints}
                    />
                </div>
            </div>
            <div className={styles.containerTable}>
                <Table
                    points={points}
                    setPoints={setPoints}
                />
            </div>
        </main>
    );
}
