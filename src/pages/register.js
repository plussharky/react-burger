import { useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <>
            <AppHeader />
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
                />
                <PasswordInput 
                    value={password}
                    name={'password'}
                    onChange={e => setPassword(e.target.value)}
                />
                <Button htmlType="button" type="primary" size="large">
                    Зарегистрироваться
                </Button>
                <div className={styles.questions}>
                    <p className={styles.question}>
                        Уже зарегистрированы?&nbsp;
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

export default Register;