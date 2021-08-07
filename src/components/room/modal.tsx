import React, { ReactNode, useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import styles from './navbar.module.css';
import more from '../../assets/icon/more.png';

import greenHat from '../../assets/icon/greenHat.png';
import redHat from '../../assets/icon/redHat.png';
import yellowHat from '../../assets/icon/yellowHat.png';
import blackHat from '../../assets/icon/blackHat.png';
import blueHat from '../../assets/icon/blueHat.png';
import whiteHat from '../../assets/icon/whiteHat.png';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      height: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export default function SimpleModal({ level }: any) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [detail, setDetail] = useState<ReactNode>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (level === 1) {
      setDetail(
        <div className={styles.rowModal}>
          <div>
            <img src={greenHat} className={styles.hatImg} alt="ddd" />
          </div>
          <div className={styles.hatExplain}>
            <h2 id="simple-modal-title">게임을 시작하지</h2>
            <p id="simple-modal-description">선택은 자네 몫이야</p>
          </div>
        </div>,
      );
    } else if (level === 2) {
      setDetail(
        <div className={styles.row}>
          <div className={styles.hatImg}>
            <img src={redHat} alt="ddd" />
          </div>
          <div className={styles.hatExplain}>
            <h2 id="simple-modal-title">게임을 시작하지</h2>
            <p id="simple-modal-description">선택은 자네 몫이야</p>
          </div>
        </div>,
      );
    } else if (level === 3) {
      setDetail(
        <div className={styles.row}>
          <div className={styles.hatImg}>
            <img src={yellowHat} alt="ddd" />
          </div>
          <div className={styles.hatExplain}>
            <h2 id="simple-modal-title">게임을 시작하지</h2>
            <p id="simple-modal-description">선택은 자네 몫이야</p>
          </div>
        </div>,
      );
    } else if (level === 4) {
      setDetail(
        <div className={styles.row}>
          <div className={styles.hatImg}>
            <img src={blackHat} alt="ddd" />
          </div>
          <div className={styles.hatExplain}>
            <h2 id="simple-modal-title">게임을 시작하지</h2>
            <p id="simple-modal-description">선택은 자네 몫이야</p>
          </div>
        </div>,
      );
    } else if (level === 5) {
      setDetail(
        <div className={styles.row}>
          <div className={styles.hatImg}>
            <img src={blueHat} alt="ddd" />
          </div>
          <div className={styles.hatExplain}>
            <h2 id="simple-modal-title">게임을 시작하지</h2>
            <p id="simple-modal-description">선택은 자네 몫이야</p>
          </div>
        </div>,
      );
    } else if (level === 6) {
      setDetail(
        <div className={styles.row}>
          <div className={styles.hatImg}>
            <img src={whiteHat} alt="ddd" />
          </div>
          <div className={styles.hatExplain}>
            <h2 id="simple-modal-title">게임을 시작하지</h2>
            <p id="simple-modal-description">선택은 자네 몫이야</p>
          </div>
        </div>,
      );
    }
  });
  const body = (
    <div style={modalStyle} className={classes.paper}>
      {detail}
    </div>
  );

  return (
    <div>
      <button type="button" className={styles.modal} onClick={handleOpen}>
        <img src={more} className={styles.modalIcon} alt="d" />
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
