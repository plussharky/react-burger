import styles from './feed-list.module.css'
import { OrderCard } from './order-card/order-card';
import { useSelector } from '../../../hooks/react-redux';

export function FeedList() {
    const { ingredients, loading, error } = useSelector(store => store.ingredients)

    return (
        <div className={styles.ordersContainer}>
        {
            [1, 2, 4, 5, 6].map(i => {
                return <OrderCard
                id={4434237712}
                timestamp={new Date()}
                name={'Гранд тейсти'}
                ingredients={ingredients.slice(0, i + 5)}
                price={2345}
            />
            })    
        }
        </div>
    );
}