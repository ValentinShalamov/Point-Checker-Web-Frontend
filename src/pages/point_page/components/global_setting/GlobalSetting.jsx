import styles from './GlobalSetting.module.css';

export default function GlobalSetting({children}) {
    return (
        <div className={styles.globalSetting}>
            {children}
        </div>
    );
}