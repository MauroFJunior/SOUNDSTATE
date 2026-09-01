import styles from "./loader.module.css"

function Loader() {
    return (
        <div className={styles.loader}>
            <span className="material-symbols-outlined">
                progress_activity
            </span>
        </div>
    );
}

export default Loader