import styles from "./GithubInfo.module.css";

const GITHUB_URL = 'https://github.com/ValentinShalamov';
const GITHUB_PNG = {
    url: '/images/github.png',
    width: 25,
    height: 25,
};

export default function GithubInfo({ children }) {
    return (
        <>
            <div className={styles.img}>
                <a href={GITHUB_URL}>
                    <img
                        src={GITHUB_PNG.url}
                        alt=""
                        width={GITHUB_PNG.width}
                        height={GITHUB_PNG.height}
                    />
                </a>
            </div>
            <div className={styles.text}>
                {children}
            </div>
        </>
    );
}