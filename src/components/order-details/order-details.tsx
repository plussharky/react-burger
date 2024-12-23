import styles from './order-details.module.css';
import check from '../../assets/icons/check.svg'
import { useSelector } from '../../hooks/react-redux';
import Preloader from '../preloader/preloader';

export function OrderDetails() {
    const { number, loading, error } = useSelector(store => store.order);

    if (loading) {
        return (<div className={styles.preloader}><Preloader /></div>)
    }

    if (error) {
        return (<p>❌Что-то пошло не так, поробуйте отпарвить запрос еще раз</p>)
    }

    return (
        <div className={styles.card}>
            <p className={styles.id}>{String(number).padStart(6, '0')}</p>
            <p className={styles.idLabel}>идентификатор заказа</p>
            <img className={styles.check} src={check} alt={"✅"}></img>
            <p className={styles.readiness}>Ваш заказ начали готовить</p>
            <p className={styles.advice}>Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}