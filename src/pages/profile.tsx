import { FormEvent, useCallback, useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from "react-router-dom";
import styles from './profile.module.css'
import { useDispatch, useSelector } from "react-redux";
import { logout, updateUser } from '../services/auth/actions';

function Profile() {
    const dispatch = useDispatch();
    //@ts-ignore
    const { user } = useSelector(store => store.auth)

    const [name, setName] = useState<string>(user.name);
    const [nameError, setNameError] = useState<string>("");
    const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);
    const [email, setEmail] = useState<string>(user.email);
    const [emailError, setEmailError] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [isPasswordDisabled, setIsPasswordDisabled] = useState<boolean>(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [errorServer, setErrorServer] = useState<string>("");

    const isActiveLink = useCallback((isActive: boolean) => 
        isActive ? styles.activeMenuButton : styles.inactiveMenuButton
    , []);

    const handleNameIconClick = useCallback(() => {
        setIsNameDisabled(!isNameDisabled);
    }, [isNameDisabled])

    const handlePasswordIconClick = useCallback(() => {
        setIsPasswordDisabled(!isPasswordDisabled);
    }, [isPasswordDisabled])

    const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);


    const onSave = useCallback((e: FormEvent<HTMLFormElement>) => {
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
        //@ts-ignore
        dispatch(updateUser(email, password, name))
            .catch((error: Error) => {
                const errorMsg = error.message || String(error);
                setErrorServer(errorMsg);
            });
    }, [dispatch, email, password, name, nameError, emailError, passwordError]);

    const onCancel = useCallback(() => {
        setName(user.name);
        setEmail(user.email);
        setPassword("");
    }, [user]);

    const onLogout = useCallback(() => {
        //@ts-ignore
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
                    <p
                        className={styles.inactiveMenuButton}
                        onClick={onLogout}
                    >
                        Выход
                    </p>
                    <p className={styles.tip}>
                        В этом разделе вы можете изменить свои персональные данные
                    </p>
                </div>
                <div className={styles.userProperties}>
                    <Input 
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} 
                        onPointerEnterCapture={undefined} 
                        onPointerLeaveCapture={undefined}                        
                        type="text"
                        placeholder={"Имя"}
                        name={"name"}
                        icon={"EditIcon"}
                        disabled={isNameDisabled}
                        onIconClick={handleNameIconClick}
                    />
                    <EmailInput 
                        value={email}
                        name={'email'}
                        isIcon={true}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <PasswordInput 
                        placeholder={'Пароль'}
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        name={'password'}
                        icon={isPasswordDisabled ? 'EditIcon' : (isPasswordVisible ? 'HideIcon' : 'ShowIcon')}
                        disabled={isPasswordDisabled}
                        onClick={isPasswordDisabled ? handlePasswordIconClick : togglePasswordVisibility}
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