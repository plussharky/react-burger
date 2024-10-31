import styles from './profile-orders.module.css';
import { useCallback, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "../hooks/react-redux";
import { FeedList } from '../components/feed/feed-list/feed-list';
import { wsConnect } from '../services/feed/actions';
import { WS_ORDERS_USER_URL } from '../utils/api-config';
import { logout } from '../services/auth/actions';

export function ProfileOrders() {
    const dispatch = useDispatch();

    const { orders } = useSelector(store => store.feed)

    useEffect(() => {
        const wssUrl = new URL(WS_ORDERS_USER_URL);
        wssUrl.searchParams.set(
            "token",
            localStorage.getItem("accessToken") ?? ""
        )
        dispatch(wsConnect(wssUrl.toString()));
    }, [dispatch])

    const isActiveLink = useCallback((isActive: boolean) => 
        isActive ? styles.activeMenuButton : styles.inactiveMenuButton
    , []);

    const onLogout = useCallback(() => {
        dispatch(logout());
    }, [dispatch]);

    return (
            <form className={styles.container}>
                <div className={styles.menu}>
                    <NavLink to="/profile" end className={({isActive}) => isActiveLink(isActive)}>
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
                        В этом разделе вы можете посмотреть свою историю заказов
                    </p>
                </div>
                <div className={styles.userProperties}>
                    <FeedList orders={orders}/>
                </div>
            </form>
    );
}