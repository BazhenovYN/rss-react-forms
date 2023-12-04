import { useLocation, Location } from 'react-router-dom';
import { useAppSelector } from '@/app/store';
import { selectHistoryRecords } from '@/store/historySlice';
import ListItem from './ListItem/ListItem';

import styles from './HistoryList.module.scss';

interface IState {
  IsNewData?: boolean;
}

function HistoryList() {
  const { state } = useLocation() as Location<IState | null>;
  const IsNewData = state?.IsNewData;
  const history = useAppSelector(selectHistoryRecords);
  return (
    <div className={styles.container}>
      <h2>History:</h2>
      {history.length > 0 ? (
        <div>
          {[...history].reverse().map((data, index) => (
            <ListItem
              key={data.id}
              data={data}
              highlight={IsNewData && index === 0}
            />
          ))}
        </div>
      ) : (
        <>
          <p className={styles.placeholder}>
            History is empty...
            <br />
            Select the input form and enter your data.
            <br />
            It will be displayed here.
          </p>
        </>
      )}
    </div>
  );
}

export default HistoryList;
