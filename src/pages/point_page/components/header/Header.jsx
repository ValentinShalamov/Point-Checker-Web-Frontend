import styles from './Header.module.css';
import GithubInfo from "./content/github_info/GithubInfo.jsx";
import LogoutInfo from "./content/logoutInfo/LogoutInfo.jsx";

export function Header() {

    return (
        <header className={styles.pageHeader}>
            <div style={{
                display: "flex",
                gap: "10px"
            }}>
                <GithubInfo>ValentinShalamov / Lab4</GithubInfo>
            </div>

            <div style={{
                display: "flex",
                alignItems: "end",
                flexDirection: "column",
                gap: "10px"
            }}>
                <LogoutInfo>{localStorage.getItem("username")}</LogoutInfo>
            </div>
        </header>
    );
}