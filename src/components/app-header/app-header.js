import React from 'react';
import { Button, Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

const AppHeader = () => {
    return (
         <header className={styles.header}>
            <nav className={styles.nav}>
                <Button htmlType="button" type="secondary" size="medium" extraClass={styles.button}>
                    <BurgerIcon type="primary"/> Конструктор
                </Button>
                <Button htmlType="button" type="secondary" size="medium" extraClass={styles.button}>
                    <ListIcon type="primary" /> Лента заказов
                </Button>
            </nav>
            <Logo/>
            <Button htmlType="button" type="secondary" size="medium" extraClass={styles.button}>
                <ProfileIcon type="primary" /> Личный кабинет
            </Button>
        </header>
    )
 }

 export default AppHeader;