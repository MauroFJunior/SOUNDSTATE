import styles from './quickAction.module.css';

function QuickAction({ icon, text, onClick }) {
    return (
        <div className={styles.quick_action} onClick={onClick}>
            <div className={styles.quick_action_icon}>
                <span class="material-symbols-outlined">
                    {icon}
                </span>
            </div>
            <div className={styles.quick_action_text}>{text}</div>
        </div>
    );
}

export default QuickAction;