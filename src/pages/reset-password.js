import { useState } from 'react'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './login.module.css'

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");

    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <p className={styles.title}>Вход</p>
                <PasswordInput 
                    value={password}
                    name={'password'}
                    onChange={e => setPassword(e.target.value)}
                />
                <Input 
                    type={'text'}
                    placeholder={'Имя'}
                    value={code}
                    onChange={e => setCode(e.target.value)}
                    name={'name'}
                />
                <Button htmlType="button" type="primary" size="large">
                    Сохранить
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

export default ResetPassword;