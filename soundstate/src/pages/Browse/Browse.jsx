import styles from './browse.module.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import SongItem from '../../components/SongItem/SongItem.jsx';



function Browse() {

    const [songList, setSongList] = useState([]);
    const [songListFiltered, setSongListFiltered] = useState(songList);
    const [genreList, setGenreList] = useState(["All genres"]);

    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path);
    }

    function fetchSongs() {
        fetch('http://localhost:8080/songs')
            .then(response => response.json())
            .then(data => {
                setSongList(data);
                setSongListFiltered(data);
                setGenreList(["All genres", ...new Set(data.map(song => song.genre))]);
            })
            .catch(error => console.error('Error fetching songs:', error));
    }

    useEffect(() => {
        fetchSongs();
    }, []);

    function handleGenreFilter(genre) {
        const filteredSongs = genre === "All genres"
            ? songList
            : songList.filter((song) => song.genre === genre);

        setSongListFiltered(filteredSongs);
    }

    function handleSearchInput(event) {
        const searchTerm = event.target.value.toLowerCase();
        const filteredSongs = songList.filter((song) => song.name.toLowerCase().includes(searchTerm) || song.artist.toLowerCase().includes(searchTerm));
        setSongListFiltered(filteredSongs);
    }

    return (
        <div className={styles.browse_page}>
            <div className={styles.browse_header} onClick={() => handleNavigation("/")}><span className="material-symbols-outlined">
                arrow_back
            </span>Go Back</div>
            <div className={styles.browse_container}>
                <div className={styles.browse_content_header}>
                    <div className={styles.browse_content_header_text}>
                        <div className={styles.browse_content_title}>HERE'S WHAT YOU SAVED SO FAR</div>
                        <div className={styles.browse_content_subtitle}>WE DID SAY WE WOULD RECORD IT...</div>
                    </div>
                </div>
                <div className={styles.browse_content_body}>
                    <div className={styles.browse_grid}>
                        {songListFiltered.length > 0 ? (
                            songListFiltered.map((song) => (
                                <SongItem key={song.id} song={song} onClick={() => console.log(`Clicked on ${song.name}`)} />
                            ))) : (
                            <div className={styles.browse_no_songs}>You haven't saved anything yet!</div>
                        )
                        }
                    </div>
                    <aside className={styles.browse_sidebar}>
                        <div className={styles.browse_sidebar_title}>FILTER SONGS</div>
                        <label className={styles.browse_field_label} htmlFor="song-search">SEARCH</label>
                        <input
                            id="song-search"
                            className={styles.browse_search_input}
                            type="search"
                            placeholder="Name or artist..."
                            onChange={handleSearchInput}
                        />
                        <label className={styles.browse_field_label} htmlFor="genre-filter">GENRE</label>
                        <select id="genre-filter" className={styles.browse_genre_select} defaultValue="All genres"
                            onChange={(event) => handleGenreFilter(event.target.value)}>
                            {genreList.map((genre) => (
                                <option key={genre} value={genre}>
                                    {genre.charAt(0).toUpperCase() + genre.slice(1)}
                                </option>
                            ))}
                        </select>
                    </aside>
                </div>
            </div>
        </div>
    )
}

export default Browse;