import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import itemData from './itemData';
import blueHat from '../../assets/icon/blueHat.png';
import whiteHat from '../../assets/icon/whiteHat.png';
import yellowHat from '../../assets/icon/yellowHat.png';
import blackHat from '../../assets/icon/blackHat.png';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const itemData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TitlebarImageList() {
  const classes = useStyles();
  const meetList = [
    {
      kind: 'brainstroming',
      date: '2021-07-01',
      key: 1,
      img: blueHat,
      title: '아몽더넥슽뤠븰',
      author: '추ㅖ끼라웃',
    },
    {
      kind: '6-hat-thinking',
      date: '2021-07-02',
      key: 2,
      img: whiteHat,
      title: '붉은색푸른색',
      author: '그사이삼초그짧은시간',
    },
    {
      kind: '5whys',
      date: '2021-07-03',
      key: 3,
      img: yellowHat,
      title: '냉짬뽕',
      author: '오마카세',
    },
    {
      kind: '635method',
      date: '2021-07-04',
      key: 4,
      img: blackHat,
      title: '결선가게',
      author: '해주세요',
    },
  ];

  return (
    <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div">Meet List</ListSubheader>
        </ImageListItem>
        {meetList.map((item) => (
          <ImageListItem key={item.key}>
            <img src={item.img} alt={item.date} />
            <ImageListItemBar
              title={item.kind}
              subtitle={<span>by: {item.date}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${item.date}`} className={classes.icon}>
                  <InfoIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>
    </div>
  );
}
