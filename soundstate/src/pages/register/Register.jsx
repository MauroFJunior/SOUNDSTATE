import styles from "./register.module.css"
import ImageSelector from "../../components/imageSelector/ImageSelector";
import ImageSearch from "../../components/ImageSearch/ImageSearch.jsx";
import { useEffect, useState } from "react";

function Register({ closeRegisterModal }) {
    const [isImageSearchOpen, setImageSearchState] = useState(false);
    const [selectArtwork, setSelectArtwork] = useState("");
    const [songName, setSongName] = useState("");
    const [artist, setArtist] = useState("");
    const [album, setAlbum] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [durSec, setDurSec] = useState("");

    const isFilled =
        songName.trim() !== "" &&
        artist.trim() !== "" &&
        album.trim() !== "" &&
        genre.trim() !== "" &&
        year.trim() !== "" &&
        durSec.trim() !== "";

    const yearNumber = Number(year);
    const isYearValid =
        year.trim() !== "" &&
        Number.isInteger(yearNumber) &&
        yearNumber >= 1800 &&
        yearNumber <= 2026;

    const durSecNumber = Number(durSec);
    const isDurSecValid =
        durSec.trim() !== "" &&
        durSecNumber >= 1 &&
        durSecNumber <= 999;

    const isValid = isFilled && isYearValid && isDurSecValid;

    function handleImageSearch() {
        setImageSearchState(!isImageSearchOpen);
    }

    function handleYearInput(value) {
        setYear(value.slice(0, 4));
    }

    function handleDurSecInput(e) {
        if (e.length > 3) {
            e = e.slice(0, 3);
        }

        setDurSec(e);
    }

    function handleGenreInput(value) {
        setGenre(value.replace(/\d/g, ""));
    }

    function createRegisterPayload() {
        const payload = {
            name: songName,
            artist: artist,
            album: album,
            genre: genre,
            year: year,
            durSec: durSec,
            artwork: selectArtwork,
        };

        console.log(payload);
        //return payload;

        closeRegisterModal();
    }

    return (
        <div className={styles.register_modal_overlay}>
            {isImageSearchOpen && <ImageSearch closeImageSearch={handleImageSearch} inputedSong={songName || ""} setArtwork={setSelectArtwork} />}
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
                                <input
                                    type="text"
                                    className={styles.register_input}
                                    placeholder="Name"
                                    value={songName}
                                    onChange={(event) => setSongName(event.target.value)}
                                />
                                <input
                                    type="text"
                                    className={styles.register_input}
                                    placeholder="Artist"
                                    value={artist}
                                    onChange={(event) => setArtist(event.target.value)}
                                />
                                <input
                                    type="text"
                                    className={styles.register_input}
                                    placeholder="Album"
                                    value={album}
                                    onChange={(event) => setAlbum(event.target.value)}
                                />
                                <input
                                    type="text"
                                    className={styles.register_input}
                                    placeholder="Genre"
                                    value={genre}
                                    onChange={(event) => handleGenreInput(event.target.value)}
                                />
                                <input
                                    type="number"
                                    max="2026"
                                    min="1800"
                                    className={`${styles.register_input} ${!isYearValid && (year.trim() !== "") && styles.register_invalid}`}
                                    placeholder="Year"
                                    value={year}
                                    onChange={(event) => handleYearInput(event.target.value)}
                                />
                                <input
                                    type="number"
                                    min="1"
                                    max="999"
                                    className={`${styles.register_input} ${!isDurSecValid && (durSec.trim() !== "") && styles.register_invalid}`}
                                    placeholder="Duration in seconds"
                                    value={durSec}
                                    onChange={(event) => handleDurSecInput(event.target.value)}
                                />
                            </div>
                            <div className={styles.register_content_center_right}>
                                <div className={styles.register_image_selector} onClick={handleImageSearch}>
                                    <ImageSelector content={selectArtwork} />
                                </div>
                                <button
                                    className={`${styles.register_button} ${isValid ? styles.active : styles.inactive}`}
                                    onClick={isValid ? createRegisterPayload : undefined}
                                    disabled={!isValid}
                                >
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