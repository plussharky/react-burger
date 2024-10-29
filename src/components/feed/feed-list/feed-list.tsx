import styles from './feed-list.module.css'
import { OrderCard } from './order-card/order-card';
import { useSelector } from '../../../hooks/react-redux';
import { TOrder } from '../../../utils/types';

type TFeedList = {
    orders: TOrder[]
}

export function FeedList({ orders }: TFeedList) {
    const { ingredients, loading, error } = useSelector(store => store.ingredients)

    return (
        <div className={styles.ordersContainer}>
        {
            orders.map(order => (
                <OrderCard 
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