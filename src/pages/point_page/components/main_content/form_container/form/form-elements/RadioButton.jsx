import styles from './RadioButton.module.css';

export default function RadioButton({id, name, value, children, onClick}) {

    return (
        <>
            <input
                onClick={onClick}
                type="radio"
                id={id}
                name={name}
                value={value}
            />
            <label className={styles.radioLabel} htmlFor={id}>{children}</label>
        </>
    );
}