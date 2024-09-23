import { useState } from 'react'
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from "../components/app-header/app-header";
import styles from './profile.module.css'

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("1");

    return (
        <>
            <AppHeader />
            <div className={styles.container}>
                <div className={styles.menu}>
                    <a className={styles.menuButton}>
                        Профиль
                    </a>
                    <a className={styles.menuButton}>
                        История заказов
                    </a>
                    <a className={styles.menuButton}>
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
                </div>
            </div>
        </>
    );
}

export default Profile;