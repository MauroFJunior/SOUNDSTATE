import styles from "./imageResult.module.css"

function ImageResult({ image, onClick }) {
    return (
        <div className={styles.image_result_container} onClick={onClick}>
            <img src={image} alt="" />
        </div>
    )
}

export default ImageResult