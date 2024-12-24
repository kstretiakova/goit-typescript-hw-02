import { ImSearch } from 'react-icons/im';
import { emptyFieldMessage } from '../../messages/toastMessages';

import styles from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    

    const form = event.target as HTMLFormElement;
    const input = form.elements.namedItem('searchInput') as HTMLInputElement;

    const inputValue = input.value.trim();

    if (!inputValue) {
      emptyFieldMessage();
      return;
    }

    onSubmit(inputValue);
    form.reset();
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <button className={styles.btn} type="submit">
          <ImSearch className={styles.ico} />
        </button>

        <input
          className={styles.input}
          name="searchInput"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

export default SearchBar;
