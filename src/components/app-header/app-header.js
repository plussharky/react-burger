import React from 'react';
import { Button, Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

class AppHeader extends React.Component {
    render(){
        return <header className={styles.header}>
            <nav className={styles.nav}>
                <Button htmlType="button" type="secondary" size="medium" extraClass={styles.burgerConstructor}>
                    <BurgerIcon type="primary"/>  Конструктор
                </Button>
                <Button htmlType="button" type="secondary" size="medium" extraClass={styles.orders}>
                    <ListIcon type="primary" />  Лента заказов
                </Button>
            </nav>
            <Logo extraClass={styles.logo}/>
            <Button htmlType="button" type="secondary" size="medium" extraClass={styles.account}>
                <ProfileIcon type="primary" />  Личный кабинет
            </Button>
        </header>
    }
 }

 export default AppHeader;