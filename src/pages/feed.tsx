import styles from './feed.module.css';
import { FeedList } from '../components/feed/feed-list/feed-list';
import { FeedStats } from '../components/feed/feed-stats/feed-stats';
import { useDispatch, useSelector } from '../hooks/react-redux';
import { useEffect } from 'react';
import { wsConnect, wsDisconnect } from '../services/feed/actions';
import { WS_ORDERS_ALL_URL } from '../utils/api-config';

function Feed() {
  const dispatch = useDispatch();

  const { orders, total, totalToday } = useSelector(store => store.feed)

  useEffect(() => {
    dispatch(wsConnect(WS_ORDERS_ALL_URL));

    return () => {
      dispatch(wsDisconnect());
    }
  }, [dispatch])

  return (
    <main className={styles.main}>
        <h2 className={styles.title}>Лента заказов</h2>
        <div className={styles.feedAssembly}>
          <FeedList orders={orders}/>
          <FeedStats 
            orders={orders}
            totalOrders={total}
            totalTodayOrders={totalToday}
            />
        </div>
    </main>
  );
}

export default Feed;