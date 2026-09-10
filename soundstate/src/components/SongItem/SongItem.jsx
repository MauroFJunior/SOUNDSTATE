import styles from "./songItem.module.css";

function SongItem({ song, onClick }) {

    const totalSeconds = Number.parseInt(song.durSec, 10);
    const durSec = Number.isNaN(totalSeconds)
        ? song.durSec
        : `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;

    return (
        <div className={styles.song_item} onClick={onClick}>
            <div className={styles.song_item_artwork}>
                <img src={song.artwork} alt="" />
                <div className={styles.song_item_duration}>{durSec}</div>
            </div>
            <div className={styles.song_item_name}>{song.name}</div>
            <div className={styles.song_item_artist}>{song.artist}</div>
        </div>
    );
}

export default SongItem;