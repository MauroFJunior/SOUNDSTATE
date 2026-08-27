import styles from './index.module.css';
import QuickAction from '../../components/quickAction/QuickAction.jsx';

function Index() {

    let randomNumber = Math.floor(Math.random() * 10 + 1);

    return (
        <div className={styles.index_page}>
            <div className={styles.index_container}>
                <div className={styles.index_content}>
                    <div className={`${styles.content_text} ${styles[`sticker_${randomNumber}`]}`}>
                        <div className={styles.text_container_detail}>
                            <div className={styles.detail_circle}></div>
                            <div className={styles.detail_circle}></div>
                        </div>
                        <div className={styles.content_title}>SOUNDSTATE</div>
                        <div className={styles.content_subtitle}>A save-state. For music. <span className={styles.content_underline}>You get it.</span></div>
                    </div>
                   <div className={styles.content_quickActions}>
                        <QuickAction icon="play_circle" text="Save" onClick={() => {}} />
                        <QuickAction icon="library_books" text="Browse" onClick={() => {}} />
                        <QuickAction icon="playlist_add" text="Organize" onClick={() => {}} />
                    </div>
                </div>
                <div className={styles.cc}>SoundState @ 2026 - Mauro Jr</div>
            </div>
        </div>
    )
}

export default Index;