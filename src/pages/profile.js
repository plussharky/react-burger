import { useCallback, useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from "react-router-dom";
import styles from './profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from '../services/auth/actions';

const Profile = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(store => store.auth)

    const [name, setName] = useState(user.name);
    const [nameError, setNameError] = useState("");
    const [isNameDisabled, setIsNameDisabled] = useState(true);
    const [email, setEmail] = useState(user.email);
    const [emailError, setEmailError] = useState("");
    const [isEmailDisabled, setIsEmailDisabled] = useState(true);
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
    const [errorServer, setErrorServer] = useState("");

    const isActiveLink = useCallback((isActive) => 
        isActive ? styles.activeMenuButton : styles.inactiveMenuButton
    , []);

    const handleEmailIconClick = useCallback(() => {
        setIsEmailDisabled(!isEmailDisabled);
    }, [isEmailDisabled])


    const handleNameIconClick = useCallback(() => {
        setIsNameDisabled(!isNameDisabled);
    }, [isNameDisabled])

    const handlePasswordIconClick = useCallback(() => {
        setIsPasswordDisabled(!isPasswordDisabled);
    }, [isPasswordDisabled])


    const onSave = useCallback((e) => {
        setNameError("");
        setEmailError("");
        setPasswordError("");
        setErrorServer("");
        e.preventDefault();
    
        if (!email) {
          setEmailError("Введите почту!");
        }
    
        if (!password) {
          setPasswordError("Введите пароль!");
        }
        if (!name) {
          setNameError("Введите имя!");
        }

        if (nameError || emailError || passwordError) {
          return;
        }

        dispatch(updateUser(email, password, name))
            .catch(error => {
                const errorMsg = error.message || String(error);
                setErrorServer(errorMsg);
            });
    }, [dispatch, email, password, name]);

    const onCancel = useCallback(() => {
        setName(user.name);
        setEmail(user.email);
        setPassword("");
    }, [user]);

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
            <form className={styles.container} onSubmit={onSave}>
                <div className={styles.menu}>
                    <NavLink to="/profile" className={({isActive}) => isActiveLink(isActive)}>
                        Профиль
                    </NavLink>
                    <NavLink to="/history" className={({isActive}) => isActiveLink(isActive)}>
                        История заказов
                    </NavLink>
                    <a 
                        className={styles.inactiveMenuButton}
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
                        error={!!nameError}
                        errorText={nameError}
                        disabled={isNameDisabled}
                        onIconClick={handleNameIconClick}
                    />
                    <EmailInput 
                        value={email}
                        name={'email'}
                        isIcon={false}
                        onChange={e => setEmail(e.target.value)}
                        icon='EditIcon'
                        error={!!emailError}
                        errorText={emailError}
                        disabled={isEmailDisabled}
                        onIconClick={handleEmailIconClick}
                    />
                    <PasswordInput 
                        value={password}
                        name={'password'}
                        onChange={e => setPassword(e.target.value)}
                        icon={isPasswordDisabled ? 'EditIcon' : 'ShowIcon'}
                        error={!!passwordError}
                        errorText={passwordError}
                        disabled={isPasswordDisabled}
                        onIconClick={handlePasswordIconClick}
                    />
                    <div className={styles.buttons}>
                        {errorServer && <p className={styles.error}>{errorServer}</p>}
                        <Button 
                            htmlType="button" 
                            type="secondary" 
                            size="large"
                            onClick={onCancel}
                        >
                            Отмена
                        </Button>
                        <Button 
                            htmlType="submit" 
                            type="primary" 
                            size="large"
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            </form>
    );
}

export default Profile;