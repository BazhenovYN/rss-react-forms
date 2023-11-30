import {
  ChangeEvent,
  InputHTMLAttributes,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Autocomplete.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  options: string[];
  errorText?: string;
};

function Autocomplete({ label, options, errorText, ...rest }: Props) {
  const autocompleteRef = useRef<HTMLDivElement | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      if (
        autocompleteRef.current &&
        !autocompleteRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutSide);
    return () => {
      document.removeEventListener('mousedown', handleClickOutSide);
    };
  }, []);

  const suggestions = options.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputBlur = (event: FocusEvent<HTMLInputElement>) => {
    const query = event.target.value;
    if (!options.find((item) => item === query)) {
      setInputValue('');
    }
  };

  const handleSuggestionClick = (suggetion: string) => {
    setInputValue(suggetion);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.autocomplete} ref={autocompleteRef}>
      <label>
        {label}
        <input
          type="search"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleInputBlur}
          autoComplete="off"
          {...rest}
        />
      </label>
      {errorText && <div className={styles['error-message']}>{errorText}</div>}
      {showSuggestions && (
        <ul className={styles.suggestions}>
          {suggestions.map((suggestion) => (
            <li
              onClick={() => handleSuggestionClick(suggestion)}
              key={suggestion}
            >
              {suggestion}
            </li>
          ))}
          {suggestions.length === 0 && (
            <li className={styles.placeholder}>No options...</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
