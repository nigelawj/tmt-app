import React, { useContext, useState } from 'react';
import './GameNavLayout.css';

import GameContext from '../../context/game/gameContext';
import Errors from '../game/Errors';

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

const GameNav = () => {
  const gameContext = useContext(GameContext);
  const { initGame, end } = gameContext;

  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="navbar bg-primary">
      <ul>
        <li>{!end ? <button onClick={initGame}>RESET</button> : null}</li>
      </ul>
      <button style={{ float: 'right' }} onClick={handleClickOpen}>
        INFO
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
          {'How to play the game'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Connect the 25 nodes. The path you trace will be displayed. Timing
            begins after you click on the first node!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK!
          </Button>
        </DialogActions>
      </Dialog>
      <Errors></Errors>
    </div>
  );
};

export default GameNav;
