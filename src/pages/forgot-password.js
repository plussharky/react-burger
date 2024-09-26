import { useState } from 'react'
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../utils/auth-api';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onRestore = () => {
        forgotPassword(email)
            .then(() => localStorage.setItem("isBeenOnForgotPasswordPage", true))
            .catch(error => {
                const errorMsg = error.message || String(error);
                setErrorMessage(errorMsg);
            });
        if (errorMessage)
        {
            return;
        }
        navigate("/reset-password");
    }

    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Восстановление пароля</p>
                <EmailInput 
                    placeholder={'Укажите e-mail'}
                    value={email}
                    name={'email'}
                    isIcon={false}
                    onChange={e => setEmail(e.target.value)}
                />
                {errorMessage && <p>{errorMessage}</p>}
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="large"
                    onClick={onRestore}
                >
                    Восстановить
                </Button>
                <div className={styles.questions}>
                    <p className={styles.question}>
                        Вспомнили пароль?&nbsp;
                        <Link 
                            to="/login"
                            className={styles.button}
                        >
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default ForgotPassword;