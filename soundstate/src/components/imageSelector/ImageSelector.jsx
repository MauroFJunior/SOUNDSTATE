import styles from "./imageSelector.module.css"

function ImageSelector({icon}) {
    return (
        <div className={styles.selector_container}>
            <div className={styles.selector_icon}>
                <span className="material-symbols-outlined">
                    {icon || "photo_camera"}
                </span>
            </div>
        </div>
    )
}

export default ImageSelector;