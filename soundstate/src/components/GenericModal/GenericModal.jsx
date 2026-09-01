import styles from './genericModal.module.css'

function GenericModal({ errorMessage, errorTitle, icon, onClose }) {
    return (
        <div className={styles.generic_modal_overlay}>
            <div className={styles.generic_modal}>
                <div className={styles.generic_modal_header}>

                    <div className={styles.generic_modal_header_title}><span className="material-symbols-outlined">
                        {icon}
                    </span>{errorTitle || "Error"}</div>
                    <div className={styles.generic_modal_header_close} onClick={onClose}>
                        <span className="material-symbols-outlined">
                            close
                        </span>
                    </div>
                </div>
                <div className={styles.generic_modal_body}>{errorMessage || "An error has occurred."}</div>
                <div className={styles.generic_modal_footer}>
                    <button className={styles.generic_modal_button} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    )
}

export default GenericModal