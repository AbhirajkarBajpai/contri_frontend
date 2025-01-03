import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = (props) => {
  const handleClick = (page) => {
    if (page >= 1 && page <= props.totalPages) {
      props.setCurrentPage(page);
    }
  };

  const getPagination = () => {
    const pagination = [];
    const totalVisiblePages = 5; // The number of pages visible at a time (excluding '...')
    if (props.totalPages <= totalVisiblePages + 2) {
      // If total pages are less than or equal to visible pages + two ends
      for (let i = 1; i <= props.totalPages; i++) {
        pagination.push(i);
      }
    } else if (props.currentPage <= 3) {
      // If the current page is near the beginning
      pagination.push(1, 2, 3, 4, "...", props.totalPages);
    } else if (props.currentPage >= props.totalPages - 2) {
      // If the current page is near the end
      pagination.push(1, "...", props.totalPages - 3, props.totalPages - 2, props.totalPages - 1, props.totalPages);
    } else {
      // For pages in the middle
      pagination.push(
        1,
        "...",
        props.currentPage - 1,
        props.currentPage,
        props.currentPage + 1,
        "...",
        props.totalPages
      );
    }
    return pagination;
  };
  

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.button}
        disabled={props.currentPage === 1}
        onClick={() => handleClick(props.currentPage - 1)}
      >
        Prev
      </button>

      {getPagination().map((item, index) => (
        <button
          key={index}
          className={`${styles.pageButton} ${item === props.currentPage ? styles.active : ''}`}
          disabled={item === '...'}
          onClick={() => typeof item === 'number' && handleClick(item)}
        >
          {item}
        </button>
      ))}

      <button
        className={styles.button}
        disabled={props.currentPage === props.totalPages}
        onClick={() => handleClick(props.currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
