import { useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { register } from '../services/auth/actions'

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");


    const onRegister = () => {
        let message = "";
        if(!name) {
            message += `\nВведите имя!`;
        }
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
        dispatch(register(email, password, name))
            .then(() => navigate("/"))
            .catch(error => setErrorMessage(error));
    }

    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>Регистрация</p>
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    name={'name'}
                />
                <EmailInput 
                    value={email}
                    name={'email'}
                    isIcon={false}
                    onChange={e => setEmail(e.target.value)}
                    checked={false}
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
                    onClick={onRegister}
                >
                    Зарегистрироваться
                </Button>
                <div className={styles.questions}>
                    <p className={styles.question}>
                        Уже зарегистрированы?&nbsp;
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

export default Register;