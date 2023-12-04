import { Link } from 'react-router-dom';
import HistoryList from '@/components/HistoryList';

import styles from './Home.module.scss';

function Home() {
  return (
    <section className={styles.home}>
      <h1>React. Forms</h1>
      <Link to="/simple-form">Simple form</Link>
      <Link to="/complex-form">Complex form</Link>
      <HistoryList />
    </section>
  );
}

export default Home;
