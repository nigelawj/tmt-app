import React, { useContext, useRef, useEffect } from 'react';
import ListContext from '../../context/list/listContext';
import AlertContext from '../../context/alert/alertContext';

const Filter = ({ filterType }) => {
  const listContext = useContext(ListContext);
  const { filter, clearFilter, filtered } = listContext;

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
    clearFilter();
    // eslint-disable-next-line
  }, []);

  const onKeyDown = e => {
    // Check for illegal characters that will crash RegExp
    if (
      (e.shiftKey && e.keyCode === 57) ||
      (e.shiftKey && e.keyCode === 48) ||
      e.keyCode === 219 ||
      e.keyCode === 220
    ) {
      // Only set alert if text field contains: \, (, ), or [
      setAlert("Input field cannot contain '\\', '(', ')', or '['", 'danger');
      e.preventDefault();
    } else if (e.keyCode === 13 || e.keyCode === 32) {
      // Enter key and Spacebar
      e.preventDefault();
    }
  };

  const onChange = e => {
    if (text.current.value !== '') {
      filter(e.target.value, filterType);
    } else {
      clearFilter(); // sets filtered array back to null
    }
  };

  return (
    <form>
      <input
        className="form-control"
        ref={text}
        type="text"
        placeholder={
          filterType === 'doctors'
            ? "Search by Doctor's Name..."
            : "Search by Patient's Name..."
        }
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{ margin: '0 auto', width: '500px' }}
      />
    </form>
  );
};

export default Filter;
