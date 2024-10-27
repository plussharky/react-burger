import styles from './feed.module.css';
import { FeedList } from '../components/feed/feed-list/feed-list';
import { FeedStats } from '../components/feed/feed-stats/feed-stats';
import { number } from 'prop-types';

function Feed() {
  return (
    <main className={styles.main}>
        <h2 className={styles.title}>Лента заказов</h2>
        <div className={styles.feedAssembly}>
          <FeedList />
          <FeedStats 
            orders={[
              {
                number: 1234523,
                status: "done",
              },
              {
                number: 1234523,
                status: "done",
              },
              {
                number: 1234523,
                status: "done",
              },
              {
                number: 1234523,
                status: "done",
              },
              {
                number: 1234523,
                status: "inWork",
              },
              {
                number: 1234523,
                status: "inWork",
              },
              {
                number: 1234523,
                status: "inWork",
              },
              {
                number: 1234523,
                status: "inWork",
              },
              {
                number: 1234523,
                status: "inWork",
              },
              {
                number: 1234523,
                status: "inWork",
              },
            ]}
            totalOrders={1424343}
            totalTodayOrders={134}
            />
        </div>
    </main>
  );
}

export default Feed;