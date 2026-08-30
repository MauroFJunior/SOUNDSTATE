import styles from "./imageSelector.module.css"

function ImageSelector({ content }) {
    return (
        <div className={styles.selector_container}>
            {content == "" && <div className={styles.selector_icon}>
                <span className="material-symbols-outlined">
                    {"photo_camera"}
                </span>
            </div>}
            {content != "" && <img src={content} alt="" />}
        </div>
    )
}

export default ImageSelector;