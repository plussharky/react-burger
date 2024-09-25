import React from 'react';
import styles from './order-details.module.css';
import check from '../../assets/icons/check.svg'
import { useSelector } from 'react-redux';
import Preloader from '../preloader/preloader';

const OrderDetails = () => {
    const { number, loading, error } = useSelector(store => store.order);

    if (loading) {
        return (<Preloader />)
    }

    if (error) {
        return (<p>❌Что-то пошло не так, поробуйте отпарвить запрос еще раз</p>)
    }

    return (
        <div className={styles.card}>
            <p className={styles.id}>{String(number).padStart(6, '0')}</p>
            <p className={styles.idLabel}>инедификатор заказа</p>
            <img className={styles.check} src={check} alt={"✅"}></img>
            <p className={styles.readiness}>Ваш заказ начали готовить</p>
            <p className={styles.advice}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;