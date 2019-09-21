import React, { useContext, useRef, useEffect } from 'react';
import ListContext from '../../context/list/listContext';

const Filter = ({ filterType }) => {
  const listContext = useContext(ListContext);
  const { filter, clearFilter, filtered } = listContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
    clearFilter();
    // eslint-disable-next-line
  }, []);

  const onChange = e => {
    if (text.current.value !== '') {
      filter(e.target.value, filterType);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        placeholder={
          filterType === 'doctors'
            ? "Search by Doctor's Name..."
            : "Search by Patient's Name..."
        }
        onChange={onChange}
      />
    </form>
  );
};

export default Filter;
