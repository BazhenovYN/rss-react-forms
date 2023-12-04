import {
  ChangeEvent,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
  forwardRef,
} from 'react';
import styles from './Autocomplete.module.scss';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  options: string[];
  errorText?: string;
  onInputChange?: (value: string) => void;
  value?: string;
};

const Autocomplete = forwardRef<HTMLInputElement, Props>(
  ({ label, options, errorText, onInputChange, value, ...rest }, ref) => {
    const autocompleteRef = useRef<HTMLDivElement | null>(null);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputValue, setInputValue] = useState(value ?? '');

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
      if (onInputChange) {
        onInputChange(event.target.value);
      }
    };

    const handleSuggestionClick = (suggetion: string) => {
      setInputValue(suggetion);
      setShowSuggestions(false);
      if (onInputChange) {
        onInputChange(suggetion);
      }
    };

    return (
      <div className={styles.autocomplete} ref={autocompleteRef}>
        <label>
          {label}
          <input
            type="search"
            value={inputValue}
            className={errorText ? styles.error : ''}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            autoComplete="off"
            ref={ref}
            {...rest}
          />
        </label>
        <div className={styles['error-message']}>{errorText}</div>
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
);

export default Autocomplete;
