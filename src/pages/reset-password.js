import { useEffect, useState } from 'react'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { resetPassword } from '../utils/auth-api';

const ResetPassword = () => {
    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const isBeenOnForgotPasswordPage = localStorage.getItem("isBeenOnForgotPasswordPage");

    const onSave = () => {
        resetPassword(password, code)
        .then(() => {
            localStorage.removeItem("isBeenOnForgotPasswordPage")
            navigate("/login")
        })
        .catch(error => {
            const errorMsg = error.message || String(error);
            setErrorMessage(errorMsg);
        });    
    }

    useEffect(() => {
        if (!isBeenOnForgotPasswordPage) {
            navigate("/forgot-password");
        }
    }, [isBeenOnForgotPasswordPage, navigate])

    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Восстановление пароля</p>
                <PasswordInput 
                    value={password}
                    placeholder={"Введите новый пароль"}
                    name={'password'}
                    onChange={e => setPassword(e.target.value)}
                />
                <Input 
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    name={'name'}
                />
                {errorMessage && <p>{errorMessage}</p>}
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="large"
                    onClick={onSave}
                >
                    Сохранить
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

export default ResetPassword;