import { FormEvent, useCallback, useEffect, useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink } from "react-router-dom";
import styles from './profile.module.css'
import { useDispatch, useSelector } from "../hooks/react-redux";
import { logout, updateUser } from '../services/auth/actions';
import { useForm } from '../hooks/use-form';
import { FeedList } from '../components/feed/feed-list/feed-list';
import { wsConnect } from '../services/feed/actions';
import { WS_ORDERS_USER_URL } from '../utils/api-config';

export function ProfileOrders() {
    const dispatch = useDispatch();

    const { orders } = useSelector(store => store.feed)

    useEffect(() => {
        const wssUrl = new URL(WS_ORDERS_USER_URL);
        wssUrl.searchParams.set(
            "token",
            localStorage.getItem("accessToken") ?? ""
        )
        dispatch(wsConnect(WS_ORDERS_USER_URL));
    })

    const isActiveLink = useCallback((isActive: boolean) => 
        isActive ? styles.activeMenuButton : styles.inactiveMenuButton
    , []);

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
            <form className={styles.container}>
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
                    <FeedList orders={orders}/>
                </div>
            </form>
    );
}