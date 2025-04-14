import styles from './LoginPage.module.css';
import FormElement from "./FormElement.jsx";
import Button from "../point_page/components/main_content/button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {checkCredentials, login} from "../point_page/js/requests.js";

export default function LoginPage() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        checkCredentials()
            ?.then((res) => {
                const location = res.headers.get("X-Redirect");
                if (location) {
                    navigate(location);
                }
            });
    }, [navigate]);

    function handleClick(e) {
        e.preventDefault();

        let formData = new FormData(formRef.current);
        formData.get("isRegistration") ? formData.set("isRegistration", true) : formData.set("isRegistration", false);

        login(formData)?.then((response) => {
            if (response.username) {
                navigate("/points");
            } else {
                setLoginError(response?.name);
                setPasswordError(response?.password);
                setErrorMessage(response?.errorMessage);
            }
        });

    }

    return (
        <div className={styles.localSetting}>
            <div className={styles.loginContainer}>
                <h2>Authentication</h2>
                <form ref={formRef}>
                    <FormElement type={"text"} name={"name"} className={styles.inputGroup}>
                        Username
                    </FormElement>
                    {loginError && <div className={styles.errorMessage}>{loginError}</div>}
                    <FormElement type={"password"} name={"password"} className={styles.inputGroup}>
                        Password
                    </FormElement>
                    {passwordError && <div className={styles.errorMessage}>{passwordError}</div>}
                    <FormElement type={"checkbox"} name={"isRegistration"} className={styles.checkboxContainer}>
                        Register
                    </FormElement>

                    <Button
                        onClick={handleClick}
                        className={styles.authenticate}
                    >Submit</Button>
                    {errorMessage && <div style={{color: "#b34a15"}}>{errorMessage}</div>}
                </form>
            </div>
        </div>
    )
}
