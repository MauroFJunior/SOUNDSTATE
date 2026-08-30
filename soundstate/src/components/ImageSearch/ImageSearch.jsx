import styles from "./imageSearch.module.css"
import ImageResult from "../ImageResult/ImageResult";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";

function ImageSearch({ closeImageSearch, inputedSong, setArtwork }) {
    const [foundSongs, setFoundSongs] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState(inputedSong || "");

    useEffect(() => {
        if (!searchTerm.trim()) {
            setFoundSongs([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);

        const timer = setTimeout(async () => {
            try {
                const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=song&limit=12`);
                const data = await res.json();

                const songs = data.results.map((song) => ({
                    image: song.artworkUrl100.replace("100x100bb", "600x600bb")
                }));

                setFoundSongs(songs);
            } catch (error) {
                console.error("Erro ao buscar músicas:", error);
                setFoundSongs([]);
            } finally {
                setIsLoading(false);
            }
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    function handleSearchTermChange(event) {
        setSearchTerm(event.target.value);
    }

    return (
        <div className={styles.image_search_backdrop}>
            <div className={styles.image_search_container}>

                <div className={styles.image_search_header}>
                    <div className={styles.image_search_content_header_text}>
                        <div className={styles.image_search_title}>SELECT AN IMAGE</div>
                        <div className={styles.image_search_subtitle}>LIKE THE ICONS ON THE MEMORY CARD!</div>
                    </div>

                    <div className="image_search_searchbar">
                        <input
                            type="text"
                            className={styles.image_search_input}
                            placeholder="Name"
                            value={searchTerm}
                            onChange={handleSearchTermChange}
                        />
                    </div>

                    <div className="register_content_header_actions">
                        <div className={styles.image_search_header_action} onClick={closeImageSearch}>
                            <span className="material-symbols-outlined">
                                close
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.image_search_content}>
                                    {isLoading && <Loader />}
                    <div className={styles.image_search_grid}>
                        {foundSongs.map((item, index) => (
                            <ImageResult
                                key={index}
                                image={item.image}
                                onClick={() => {
                                    setArtwork(item.image);
                                    closeImageSearch();
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ImageSearch;