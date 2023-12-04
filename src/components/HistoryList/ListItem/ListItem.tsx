import { LogData } from '@/types';
import styles from './ListItem.module.scss';

interface IProps {
  data: LogData;
  highlight?: boolean;
}

function ListItem({ data, highlight = false }: IProps) {
  const { formName, formData, creationDate } = { ...data };
  return (
    <div
      className={[styles.container, highlight ? styles.highlight : '']
        .join(' ')
        .trimEnd()}
    >
      <div className={styles.content}>
        <img src={formData.avatar} className={styles.avatar} />
        <div className={styles.item}>
          <div>Name:</div>
          <div>{formData.name}</div>
        </div>
        <div className={styles.item}>
          <div>Age:</div>
          <div>{formData.age}</div>
        </div>
        <div className={styles.item}>
          <div>E-mail:</div>
          <div>{formData.email}</div>
        </div>
        <div className={styles.item}>
          <div>Gender:</div>
          <div>{formData.gender}</div>
        </div>
        <div className={styles.item}>
          <div>Country:</div>
          <div>{formData.country}</div>
        </div>
        <div className={styles.item}>
          <div>Password:</div>
          <div>{formData.password}</div>
        </div>
      </div>
      <div className={styles.form}>{formName}</div>
      <div className={styles.date}>
        {new Date(creationDate).toLocaleTimeString()}
      </div>
    </div>
  );
}
export default ListItem;
