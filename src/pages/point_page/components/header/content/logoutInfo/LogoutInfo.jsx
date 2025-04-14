import styles from "./LogoutInfo.module.css";
import {logout} from "../../../../js/requests.js";
import Button from "../../../main_content/button/Button.jsx";
import {useNavigate} from "react-router-dom";

export default function LogoutInfo({ children }) {
    let navigate = useNavigate();

    function onClick() {
        logout()
            .then(() => navigate("/login"));
    }
    return (
        <>
            <div>
                <p className={styles.username}>{children}</p>
            </div>
            <div>
                <Button
                    onClick={onClick}
                    className={styles.logout}
                >
                    Logout
                </Button>
            </div>
        </>
    );
}