import { useState } from 'react'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'
import { useDispatch } from "react-redux";
import { login } from '../services/auth/actions'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onLogin = () => {
        let message = "";
        if(!email) {
            message += `\nВведите почту!`;
        }
        if(!password) {
            message += `\nВведите пароль!`;
        }
        setErrorMessage(message);
        if (message) {
            return;
        }
        dispatch(login(email, password))
            .then(() => navigate("/"))
            .catch(error => setErrorMessage(error));
    }

    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Вход</p>
                <EmailInput 
                    value={email}
                    name={'email'}
                    isIcon={false}
                    onChange={e => setEmail(e.target.value)}
                />
                <PasswordInput 
                    value={password}
                    name={'password'}
                    onChange={e => setPassword(e.target.value)}
                />
                {errorMessage && <p>{errorMessage}</p>}
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="large"
                    onClick={onLogin}
                >
                    Войти
                </Button>
                <div className={styles.questions}>
                    <p className={styles.question}>
                        Вы — новый пользователь?&nbsp;
                        <Link 
                            to="/register"
                            className={styles.button}
                        >
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className={styles.question}>
                        Забыли пароль?&nbsp;
                        <Link 
                            to="/forgot-password"
                            className={styles.button}
                        >
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;