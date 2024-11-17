import styles from './order.module.css';
import { OrderInfo } from '../components/order-info/order-info';


export function Order() {
    return (
        <div className={styles.main}>
            <OrderInfo />
        </div>
    );
}