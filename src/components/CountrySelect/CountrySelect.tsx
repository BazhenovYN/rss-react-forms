import { useAppSelector } from '@/app/store';
import { selectCountries } from '@/store/countriesSlice';
import Autocomplete from '@/components/Autocomplete';
import { forwardRef } from 'react';

interface IProps {
  label: string;
  errorText?: string;
  onInputChange?: (value: string) => void;
  value?: string;
}

const CountrySelect = forwardRef<HTMLInputElement, IProps>(
  ({ label, errorText, onInputChange, value, ...rest }, ref) => {
    const countryList = useAppSelector(selectCountries);
    const selectedItems = countryList.map(
      (item) => `${item.label} (${item.code})`
    );
    return (
      <Autocomplete
        label={label}
        options={selectedItems}
        value={value}
        onInputChange={onInputChange}
        errorText={errorText}
        ref={ref}
        {...rest}
      />
    );
  }
);

export default CountrySelect;
