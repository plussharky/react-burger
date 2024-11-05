import { FormEvent, useCallback, useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from "react-router-dom";
import styles from './profile.module.css'
import { useDispatch, useSelector } from "../hooks/react-redux";
import { logout, updateUser } from '../services/auth/actions';
import { useForm } from '../hooks/use-form';

export function Profile() {
    const dispatch = useDispatch();
    const { user } = useSelector(store => store.auth)
    const initialForm = {
        name: user!.name,
        email: user!.email,
        password: "",
    };

    const { values, handleChange, setValues } = useForm(initialForm);
    const [isNameDisabled, setIsNameDisabled] = useState<boolean>(true);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const isActiveLink = useCallback((isActive: boolean) => 
        isActive ? styles.activeMenuButton : styles.inactiveMenuButton
    , []);

    const handleNameIconClick = useCallback(() => {
        setIsNameDisabled(!isNameDisabled);
    }, [isNameDisabled])

    const togglePasswordVisibility = useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);


    const onSave = useCallback((e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
    
        if (!values.email) {
          setError(prev => prev + "Введите почту! ");
        }
    
        if (!values.password) {
            setError(prev => prev + "Введите пароль! ");
        }
        if (!values.name) {
            setError(prev => prev + "Введите имя! ");
        }

        if (error) {
          return;
        }

        dispatch(updateUser(values.email, values.password, values.name))
            .catch((error: Error) => {
                const errorMsg = error.message || String(error);
                setError(prev => prev + errorMsg);
            });
    }, [dispatch, values]);

    const onCancel = useCallback(() => {
        setValues(initialForm);
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
                    <NavLink to="/profile/orders" className={({isActive}) => isActiveLink(isActive)}>
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
                        value={values.name}
                        onChange={handleChange} 
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
                        value={values.email}
                        name={'email'}
                        isIcon={true}
                        onChange={handleChange}
                    />
                    {
                        isPasswordVisible 
                        ? <Input 
                            value={values.password}
                            onChange={handleChange}                         
                            onPointerEnterCapture={undefined} 
                            onPointerLeaveCapture={undefined}    
                            type="password"
                            placeholder={"Пароль"}
                            name={"password"}
                            icon={"EditIcon"}
                            disabled={true}
                            onIconClick={togglePasswordVisibility}
                            />
                        : <PasswordInput 
                            placeholder={'Пароль'}
                            value={values.password}
                            onChange={handleChange}
                            name={'password'}
                            onBlur={togglePasswordVisibility}
                        />
                    }
                    <div className={styles.buttons}>
                        {error && <p className={styles.error}>{error}</p>}
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