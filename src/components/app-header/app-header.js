import React, { useCallback } from 'react';
import { Button, Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink } from "react-router-dom";
import styles from './app-header.module.css';

const AppHeader = () => {
    const isActiveLink = useCallback((isActive) => 
        isActive ? styles.activeButton : styles.inactiveButton
    , [])

    return (
         <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink to="/" className={({isActive}) => isActiveLink(isActive)}>
                        <BurgerIcon type="primary"/> Конструктор
                </NavLink>
                <NavLink to="/list" className={({isActive}) => isActiveLink(isActive)}>
                    <ListIcon type="primary" /> Лента заказов
                </NavLink>
            </nav>
            <Logo/>
            <NavLink to="/profile" className={({isActive}) => isActiveLink(isActive)}>
                <ProfileIcon type="primary" /> Личный кабинет
            </NavLink>
        </header>
    )
}

 export default AppHeader;