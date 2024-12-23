import { useCallback } from 'react';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from "react-router-dom";
import styles from './app-header.module.css';
import { useSelector } from '../../hooks/react-redux';

function AppHeader() {
    const isActiveLink = useCallback((isActive: boolean): string => 
        isActive ? styles.activeButton : styles.inactiveButton
    , [])

    const { user } = useSelector(store => store.auth)

    return (
         <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink to="/" className={({isActive}) => isActiveLink(isActive)}>
                        <BurgerIcon type="primary"/> Конструктор
                </NavLink>
                <NavLink to="/feed" className={({isActive}) => isActiveLink(isActive)}>
                    <ListIcon type="primary" /> Лента заказов
                </NavLink>
            </nav>
            <Link to="/">
                <Logo/>
            </Link>
            <NavLink to="/profile" className={({isActive}) => isActiveLink(isActive)}>
                <ProfileIcon type="primary" />
                { 
                    user 
                    ? (<p className={styles.signIn}>{user.name}</p>)
                    : (<p className={styles.signIn}>Войти</p>)
                }
            </NavLink>
        </header>
    )
}

export default AppHeader;