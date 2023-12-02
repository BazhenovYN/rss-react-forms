import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import HistoryList from '@/components/HistoryList';

function Home() {
  return (
    <section className={styles.home}>
      <h1>React Forms</h1>
      <Link to="/simple-form">Simple form</Link>
      <Link to="/complex-form">Complex form</Link>
      <HistoryList />
    </section>
  );
}

export default Home;
