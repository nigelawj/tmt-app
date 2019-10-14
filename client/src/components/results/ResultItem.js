import React, { useContext, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import ResultsContext from '../../context/results/resultsContext';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide
} from '@material-ui/core';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ResultItem = ({ result, showDelete }) => {
  const resultContext = useContext(ResultsContext);
  const { deleteResult } = resultContext;

  const { _id, name, numErrors, timings, date, totalTime } = result;

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="card text-center">
      <div className="card-header bg-info">
        <h4 className="card-title">
          <span className="badge badge-info">{name ? name : 'Guest'} </span>
        </h4>
        {name ? (
          <p className="card-text" style={{ color: '#fff' }}>
            Date: {`${date.substring(0, 10)} [${date.substring(11, 19)}]`}
          </p>
        ) : (
          ''
        )}
      </div>
      <div className="card-body">
        <Fragment>
          <p>
            <strong>Number of errors : </strong>
            <br></br>
            {numErrors}
          </p>
          <p>
            <strong>Total time taken : </strong>
            <br></br>
            {totalTime} ms
          </p>
          <Fragment>
            <p>
              <strong>Time taken to reach node (/ms):</strong>
            </p>
            <div className="row">
              {timings.map((timing, i) => (
                <div className="col-sm-4" key={i}>
                  Node {i + 1 + 1} : {timing}{' '}
                  {/* + 1 because 0-based index, + another 1 because to node i; first line is from node 1 to 2 */}
                </div>
              ))}
            </div>
            <br></br>
          </Fragment>
        </Fragment>
        <Fragment>
          {showDelete ? (
            <Fragment>
              <button
                style={{ float: 'right' }}
                className="btn btn-danger btn-sm"
                onClick={handleClickOpen}
              >
                Delete Result
              </button>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">
                  {'CONFIRM DELETION OF RESULT'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete? This action is
                    irreversible!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      handleClose();
                      deleteResult(_id);
                    }}
                    color="primary"
                  >
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </Fragment>
          ) : null}
        </Fragment>
      </div>
    </div>
  );
};

ResultItem.propTypes = {
  result: PropTypes.object.isRequired
};

export default ResultItem;

/*<div className="card bg-light">
      <h3 className="text-primary text-left">
        {name ? name : 'Guest'}{' '}
        <span style={{ float: 'right' }} className={'badge badge-primary'}>
          User
        </span>
      </h3>
      <Fragment>
        {name ? (<p>Date: {date}</p>) : ''}
        <p>Total time taken: {totalTime} ms</p>
        <strong>Timings</strong>
        <Fragment>
          <p>Time taken to reach node (/ms):</p>
          {timings.map((timing, i) => (
            <h3 key={i}>
              Node {i + 1}: {timing}
            </h3>
          ))}
        </Fragment>
      </Fragment>
      <Fragment>
        Number of errors: {numErrors}
        {showDelete ? (
          <Fragment>
            <button
              style={{ float: 'right' }}
              className="btn btn-danger btn-sm"
              onClick={handleClickOpen}
            >
              Delete Result
            </button>
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleClose}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {'CONFIRM DELETION OF RESULT'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                  Are you sure you want to delete? This action is irreversible!
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    handleClose();
                    deleteResult(_id);
                  }}
                  color="primary"
                >
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Fragment>
        ) : null}
      </Fragment>
    </div>*/
