import { useCallback, useEffect, useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from "react-router-dom";
import AppHeader from "../components/app-header/app-header";
import styles from './profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from '../services/auth/actions';

const Profile = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth)

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, []);

    const onSave = useCallback(() => {
        dispatch(updateUser(email, password, name))
            .catch(error => {
                const errorMsg = error.message || String(error);
                setErrorMessage(errorMsg);
            });
    }, [dispatch, email, password, name]);

    const onCancel = useCallback(() => {
        setName(user.name);
        setEmail(user.email);
        setPassword("");
    }, []);


    return (
        <>
            <div className={styles.container}>
                <div className={styles.menu}>
                    <a className={styles.menuButton}>
                        Профиль
                    </a>
                    <a className={styles.menuButton}>
                        История заказов
                    </a>
                    <a 
                        className={styles.menuButton}
                        onClick={onLogout}
                    >
                        Выход
                    </a>
                    <p className={styles.tip}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <div className={styles.userProperties}>
                    <Input 
                        type={'text'}
                        placeholder={'Имя'}
                        value={name}
                        onChange={e => setName(e.target.value)}
                        name={'name'}
                        icon='EditIcon'
                    />
                    <EmailInput 
                        value={email}
                        name={'email'}
                        isIcon={false}
                        onChange={e => setEmail(e.target.value)}
                        icon='EditIcon'
                    />
                    <PasswordInput 
                        value={password}
                        name={'password'}
                        onChange={e => setPassword(e.target.value)}
                        icon='EditIcon'
                    />
                <div className={styles.buttons}>
                    {errorMessage && <p>{errorMessage}</p>}
                    <Button 
                        htmlType="button" 
                        type="secondary" 
                        size="large"
                        onClick={onCancel}
                    >
                        Отмена
                    </Button>
                    <Button 
                        htmlType="button" 
                        type="primary" 
                        size="large"
                        onClick={onSave}
                    >
                        Сохранить
                    </Button>
                </div>
                </div>
            </div>
        </>
    );
}

export default Profile;