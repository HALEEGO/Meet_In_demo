import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// eslint-disable-next-line no-unused-vars
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(5),
    },
  },
  input: {
    borderRadius: 25,
    position: 'relative',
    // backgroundColor: theme.palette.background.paper,
    placeContent: '회의 기법을 선택해 주세요.',
    placeItems: '회의 기법을 선택해 주세요.',
    placeSelf: '회의 기법을 선택해 주세요.',
    border: '2px solid #57bfc9',
    width: 210,
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(0),
  },
}));

export default function CustomizedSelects({ type, setType }: any) {
  const classes = useStyles();
  const handleChange = (e) => {
    setType(e.target.value);
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        {/* <InputLabel id="demo-customized-select-label">회의 기법</InputLabel> */}
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={type}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem selected value="회의기법을 선택해 주세요.">
            회의기법을 선택해 주세요.
          </MenuItem>
          <MenuItem value={1}>브레인스토밍</MenuItem>
          <MenuItem value="SIX_HAT">6색 사고 모자</MenuItem>
          <MenuItem value={3}>6-3-5 회의</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
