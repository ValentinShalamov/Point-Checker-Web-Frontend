import styles from './LoginPage.module.css';

export default function FormElement({type, name, className, children}) {
    return (
        <div className={className}>
            <label className={styles.labelGroup} htmlFor={name}>{children}</label>
            <input className={styles.inputs} type={type} id={name} name={name}/>
        </div>
    );
}