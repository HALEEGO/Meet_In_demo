/* eslint-disable no-unused-vars */
import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    maxHeight: 30,
    flexGrow: 1,
  },

  rBtn: {
    minHeight: 20,
  },
  lBtn: {
    minHeight: 20,
  },
});

export default function DotsMobileStepper({ level, setLevel, latestLevel, setLatestLevel, sendNextLevel }: any) {
  const classes = useStyles();
  const theme = useTheme();

  const handleNext = () => {
    setLevel((prior) => prior + 1);
  };

  const handleBack = () => {
    setLevel((prior) => prior - 1);
  };

  return (
    <MobileStepper
      variant="dots"
      steps={8}
      position="static"
      activeStep={level}
      className={classes.root}
      nextButton={
        <Button
          size="small"
          className={classes.rBtn}
          onClick={() => (level >= latestLevel ? sendNextLevel(level) : handleNext())}
          disabled={level === 8}
        >
          다음 모자
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button size="small" className={classes.lBtn} onClick={() => handleBack()} disabled={level === 0}>
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          이전 모자
        </Button>
      }
    />
  );
}
