import { TOrder } from '../../../utils/types';
import styles from './feed-stats.module.css';

type TFeedStats = {
    orders: TOrder[];
    totalOrders: number;
     totalTodayOrders: number;
}

export function FeedStats({orders, totalOrders, totalTodayOrders}: TFeedStats) {

    return (
        <div className={styles.statsContainer}>
            <div className={styles.orderBoard}>
                <div className={styles.orders}>
                    <p className={styles.columnName}>Готовы:</p>
                    <div className={styles.orderNumbers}>
                        {
                            orders
                                .filter(o => o.status === "done")
                                .map((o, i) => (
                                    <p 
                                        key={i}
                                        className={styles.idOrderDone}
                                    >
                                        {o.number}
                                    </p>))
                        }  
                    </div>
                </div> 
                <div className={styles.orders}>
                    <p className={styles.columnName}>В работе:</p>
                    <div className={styles.orderNumbers}>
                        {
                            orders
                                .filter(o => o.status !== "done")
                                .map(o => (<p className={styles.idOrderInWork}>{o.number}</p>))
                        }  
                    </div>
                </div> 
            </div>
            <div className={styles.completed}>
                    <p className={styles.columnName}>Выполнено за все время:</p>
                    <p className={styles.completedOrders}>{totalOrders}</p>
            </div>
            <div className={styles.completedToday}>
                    <p className={styles.columnName}>Выполнено за сегодня:</p>
                    <p className={styles.completedOrders}>{totalTodayOrders}</p>
            </div>
        </div>
    );
}