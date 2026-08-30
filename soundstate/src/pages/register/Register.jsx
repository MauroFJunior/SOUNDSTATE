import styles from "./register.module.css"
import ImageSelector from "../../components/imageSelector/ImageSelector";
import ImageSearch from "../../components/ImageSearch/ImageSearch.jsx";
import { useState } from "react";

function Register({ closeRegisterModal }) {

    let isValid = false;
    let name = "";

      const [isImageSearchOpen, setImageSearchState] = useState(false);
      const [selectArtwork, setSelectArtwork] = useState("");
      const [songName, setSongName] = useState("");
    

      function handleImageSearch() {
        setImageSearchState(!isImageSearchOpen);
      }

      function getName() {
        setSongName(document.getElementById("name").value);
      }

    return (
        <div className={styles.register_modal_overlay}>
            {isImageSearchOpen && <ImageSearch closeImageSearch={handleImageSearch} inputedSong={songName || ""} setArtwork={setSelectArtwork}/>}
            <div className={styles.register_modal}>
                <div className={styles.register_container}>
                    <div className={styles.register_content}>
                        <div className={styles.register_content_header}>
                            <div className={styles.register_content_header_text}>
                                <div className={styles.register_content_title}>DESCRIBE THE SONG</div>
                                <div className={styles.register_content_subtitle}>SO WE CAN RECORD IT FOR YOU</div>
                            </div>
                            <div className="register_content_header_actions">
                                <div className={styles.register_content_header_action} onClick={closeRegisterModal}>
                                    <span className="material-symbols-outlined">
                                        close
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.register_content_center}>
                            <div className={styles.register_input_container}>
                                <input id="name" type="text" className={styles.register_input} placeholder="Name" onChange={getName}/>
                                <input id="artist" type="text" className={styles.register_input} placeholder="Artist" />
                                <input id="album" type="text" className={styles.register_input} placeholder="Album" />
                                <input id="genre" type="text" className={styles.register_input} placeholder="Genre" />
                                <input id="year" type="text" className={styles.register_input} placeholder="Year" />
                                <input id="duration" type="text" className={styles.register_input} placeholder="Duration in seconds" />
                            </div>
                            <div className={styles.register_content_center_right}>
                                <div className={styles.register_image_selector} onClick={handleImageSearch}>
                                    <ImageSelector content={selectArtwork} />
                                </div>
                                <button className={`${styles.register_button} ${styles.inactive}`} onClick={isValid ? closeRegisterModal : null}>
                                    <span className="material-symbols-outlined">
                                        fiber_manual_record
                                    </span>
                                    RECORD
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;