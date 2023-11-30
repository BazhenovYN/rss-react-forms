import { useAppSelector } from '@/app/store';
import { selectCountries } from '@/store/countriesSlice';
import Autocomplete from '../Autocomplete';

interface IProps {
  label: string;
}

function CountrySelect({ label, ...rest }: IProps) {
  const countryList = useAppSelector(selectCountries);
  const selectedItems = countryList.map(
    (item) => `${item.label} (${item.code})`
  );
  return <Autocomplete label={label} options={selectedItems} {...rest} />;
}

export default CountrySelect;
