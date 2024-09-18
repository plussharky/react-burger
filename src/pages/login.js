import { useState } from 'react'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <p className={styles.title}>Вход</p>
                <EmailInput 
                    value={email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput 
                    value={password}
                    name={'password'}
                />
                <Button htmlType="button" type="primary" size="large">
                    Войти
                </Button>
                <div className={styles.questions}>
                    <p className={styles.question}>
                        Вы — новый пользователь?&nbsp;
                        <Button 
                            htmlType="button"
                            type="secondary"
                            size="large"
                            extraClass={styles.button}
                        >
                            Зарегистрироваться
                        </Button>
                    </p>
                    <p className={styles.question}>
                        Забыли пароль?&nbsp;
                        <Button 
                            htmlType="button" 
                            type="secondary" 
                            size="large"
                            extraClass={styles.button}
                        >
                            Восстановить пароль
                        </Button>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;