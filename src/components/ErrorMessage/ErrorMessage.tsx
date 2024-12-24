import React from 'react';
import styles from './ErrorMessage.module.css';

interface ErrorMessageProps {
  error: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return (
    <div className={styles.error_wrap}>
      <p className={styles.title}>Ooooops... something went wrong...</p>
      <p className={styles.text}>
        The reason is: <span className={styles.message}>{error}</span>
      </p>
    </div>
  );
};

export default ErrorMessage;
