import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

function Home() {
  return (
    <section className={styles.home}>
      <h1>React Forms</h1>
      <Link to="/simple-form">Simple form</Link>
      <Link to="/complex-form">Complex form</Link>
    </section>
  );
}

export default Home;
