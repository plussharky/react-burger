import { useState } from 'react'
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'

const FogotPassword = () => {
    const [email, setEmail] = useState("");

    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <p className={styles.title}>Восстановление пароля</p>
                <EmailInput 
                    placeholder={'Укажите e-mail'}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    onChange={e => setEmail(e.target.value)}
                />
                <Button htmlType="button" type="primary" size="large">
                    Восстановить
                </Button>
                <div className={styles.questions}>
                    <p className={styles.question}>
                        Вспомнили пароль?&nbsp;
                        <Button 
                            htmlType="button"
                            type="secondary"
                            size="large"
                            extraClass={styles.button}
                        >
                            Войти
                        </Button>
                    </p>
                </div>
            </div>
        </>
    );
}

export default FogotPassword;