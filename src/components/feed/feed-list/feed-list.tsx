import styles from './feed-list.module.css'
import { OrderCard } from './order-card/order-card';
import { TOrder } from '../../../utils/types';

type TFeedList = {
    orders: TOrder[]
}

export function FeedList({ orders }: TFeedList) {

    return (
        <div className={styles.ordersContainer}>
        {
            orders.map(order => (
                <OrderCard 
                    key={order._id}
                    id={order.number}
                    timestamp={order.createdAt}
                    name={order.name}
                    ingredientIds={order.ingredients}
                />
            )) 
        }
        </div>
    );
}