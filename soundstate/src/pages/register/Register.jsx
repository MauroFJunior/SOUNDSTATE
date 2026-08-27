import styles from "./register.module.css"
import ImageSelector from "../../components/imageSelector/ImageSelector";

function Register() {
    return (

        <div className={styles.register_page}>
            <div className={styles.register_container}>
                <div className={styles.register_content}>
                    <ImageSelector />
                    <div className={styles.register_input_container}>
                        <div className={styles.teste_input}>Nome</div>
                        <div className={styles.teste_input}>Artista</div>
                        <div className={styles.teste_input}>Album</div>
                        <div className={styles.teste_input}>Genero</div>
                        <div className={styles.teste_input}>Ano</div>
                        <div className={styles.teste_input}>Duracao</div>
                    </div>
                </div>
                <div className={styles.cc}>SoundState @ 2026 - Mauro Jr</div>
            </div>
        </div>

    )
}

export default Register;