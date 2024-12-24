import React from 'react';
import { BiLeftDownArrowCircle } from 'react-icons/bi';

import styles from './LoadMoreBtn.module.css';

interface LoadMoreBtnProps {
  onLoadMoreClick: () => void;
}

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onLoadMoreClick }) => {
  return (
    <div className={styles.btn_wrap}>
      <button className={styles.btn} onClick={onLoadMoreClick}>
        <BiLeftDownArrowCircle className={styles.ico} />
        Load more
      </button>
    </div>
  );
};

export default LoadMoreBtn;
