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
      width: 1000,
      height: 500,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      borderRadius: '20px',
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
          <div className={styles.modalLeft}>
            <img src={blueHat} className={styles.hatImg} alt="ddd" />
            <br />
            <h2>회의주제자</h2>
            <br />
            <p>파란모자는 의장의 역할로써 회의의 시작과 끝을 담당합니다.</p>
          </div>
          <div className={styles.hatExplain}>
            <h1>파란모자는 문제를 정의하고, 사고를 조직화합니다.</h1>
            <br />
            <h2>회의 시작 전에 다음과 같은 사항을 점검합니다.</h2>
            <br />
            <p>- 우리는 왜 회의를 하는가? / 무엇에 대하여 생각할 것인가?</p>
            <p>- 상황을 어떻게 정의할 것인가? / 또 다른 정의는 없는가?</p>
            <p>- 우리가 성취하고자 하는 것은 무엇인가?</p>
            <p>- 어디까지 회의를 진행할 것인가?</p>
            <p>- 문제의 배경은 무엇인가?</p>
          </div>
        </div>,
      );
    } else if (level === 2) {
      setDetail(
        <div className={styles.rowModal}>
          <div className={styles.modalLeft}>
            <img src={greenHat} className={styles.hatImg} alt="ddd" />
            <br />
            <h2>아이디어 제안자</h2>
            <br />
            <p>
              초록모자의 가치는 모자를 쓴 모든 사람이 창조적인 노력을 하도록 하는 데 있습니다. 모든 사람이 창조적인
              노력을 해야 합니다.
            </p>
          </div>
          <div className={styles.hatExplain}>
            <h1>초록모자는 새로운 아이디어를 제안합니다.</h1>
            <br />
            <p>- 다른 대안들과 다른 방식들을 제안하는 역할입니다.</p>
            <p>- 명백한 대안이나 새로운 아이디어들을 냅니다.</p>
            <p>- 기존의 아이디어를 수정하거나 더 개선시킵니다.</p>
            <br />
            <h1>아이디어 도출을 위한 질문</h1>
            <br />
            <p>- 전혀 다른 방법으로 해볼까요?</p>
            <p>- 새로운 대안을 찾아봅시다</p>
            <p>- 개선방안은 무엇입니까?</p>
          </div>
        </div>,
      );
    } else if (level === 3) {
      setDetail(
        <div className={styles.rowModal}>
          <div className={styles.modalLeft}>
            <img src={redHat} className={styles.hatImg} alt="ddd" />
            <br />
            <h2>직관주의자</h2>
            <br />
            <p>
              강렬하고 현실적인 빨간모자는 모든 사고과정의 뒤에 숨어서 영향을 끼치는 비이성적인 영역을 인정하는 데
              가치가 있습니다.
            </p>
          </div>
          <div className={styles.hatExplain}>
            <h1>빨간모자는 순간의 느낌입니다.</h1>
            <br />
            <p>- 예감, 직감과 같은 감정의 영역을 공유합니다.</p>
            <p>- 사실 사고 과정에서 비이성적 측면은 허용될 수 없습니다.</p>
            <p>- 이를 빨간모자 단계를 거쳐 정당하게 공개할 수 있게 합니다..</p>
            <br />
            <h1>감정의 영역을 공유하는 방법</h1>
            <br />
            <p>- 이번 프로젝트는 성공할 것 같군요</p>
            <p>- 아이디어가 마음에 들지않습니다.</p>
            <p>- 꼭 이렇게 진행하고싶습니다.</p>
          </div>
        </div>,
      );
    } else if (level === 4) {
      setDetail(
        <div className={styles.rowModal}>
          <div className={styles.modalLeft}>
            <img src={yellowHat} className={styles.hatImg} alt="ddd" />
            <br />
            <h2>낙관주의자</h2>
            <br />
            <p>노란모자는 근거있는 긍정적인 가치를 찾아내고 구체화 시키는 데 의미가 있습니다.</p>
          </div>
          <div className={styles.hatExplain}>
            <h1>노랑모자는 아이디어의 장점을 부각합니다.</h1>
            <br />
            <p>- 이득, 이점, 가치 등 희망적이고 긍정적인 가치를 찾아냅니다.</p>
            <p>- 건전한 판단과 논리에 근거한 것이어야 합니다.</p>
            <br />
            <h1>노란모자를 쓴 사람은 다음과 같은 질문에 답해야 합니다.</h1>
            <br />
            <p>- 그 제안의 가치가 무엇인가? / 누구를 위한 것인가? </p>
            <p>- 어떤 상황에서 가치가 있는가?</p>
            <p>- 그 가치는 어떻게 구체화될 수 있는가?</p>
          </div>
        </div>,
      );
    } else if (level === 5) {
      setDetail(
        <div className={styles.rowModal}>
          <div className={styles.modalLeft}>
            <img src={blackHat} className={styles.hatImg} alt="ddd" />
            <br />
            <h2>비관주의자</h2>
            <br />
            <p>
              검은모자의 가치는 검은모자의 가치는 비판적사고를 통해 우리가 당연히 생각하고있던 것이 부정당할때 느끼는
              불편함을 최소화합니다.
            </p>
          </div>
          <div className={styles.hatExplain}>
            <h1>검은모자는 아이디어의 문제를 도출합니다.</h1>
            <br />
            <p>- 아이디어의 모순과 장애요인을 밝힙니다.</p>
            <p>- 불일치 매커니즘으로 적용됩니다.</p>
            <p>- 기대패턴에 맞지 않으면 불편함을 느낍니다.</p>
            <br />
            <h1>검은모자를 쓴 사람은 다음과 같은 질문들에 답해야 합니다.</h1>
            <br />
            <p>- 이렇게 행동한다면 무슨일이 생길까?</p>
            <p>- 무엇이 잘못될 수 있을까?</p>
            <p>- 잠재적인 문제점들은 무엇일까?</p>
          </div>
        </div>,
      );
    } else if (level === 6) {
      setDetail(
        <div className={styles.rowModal}>
          <div className={styles.modalLeft}>
            <img src={whiteHat} className={styles.hatImg} alt="ddd" />
            <br />
            <h2>객관주의자</h2>
            <br />
            <p>하얀모자는 모든 차원의 정보를 찾아내고 그 정보를 정리하는 역할을 하는 데 가치가 있습니다.</p>
          </div>
          <div className={styles.hatExplain}>
            <h1>하얀모자는 중립적이며 객관적인 정보를 다룹니다.</h1>
            <br />
            <p>- 빠뜨린 정보가 없는지 확인하고 필요한 정보를 획득하기 위한 방법을 찾습니다.</p>
            <p>- 지금까지 모인 정보의 필요성을 검토합니다.</p>
            <p>- 일치되지 않는 두 가지 정보를 선택하는 시간을 가집니다.</p>
            <br />
            <h1>객관적인 정보를 다루기 위해 다음과 같은 질문에 답해야 합니다.</h1>
            <br />
            <p>- 우리가 갖고 있는 정보는 무엇인가?</p>
            <p>- 우리는 어떤 정보를 필요로 합니까?</p>
            <p>- 우리는 어떻게 필요한 정보를 얻을 것인가?</p>
          </div>
        </div>,
      );
    } else if (level === 7) {
      setDetail(
        <div className={styles.rowModal}>
          <div className={styles.modalLeft}>
            <img src={blueHat} className={styles.hatImg} alt="ddd" />
            <br />
            <h2>회의주제자</h2>
            <br />
            <p>파란모자는 의장의 역할로써 회의의 시작과 끝을 담당합니다.</p>
          </div>
          <div className={styles.hatExplain}>
            <h1>파란모자는 문제를 정의하고, 사고를 조직화합니다.</h1>
            <br />
            <h2>회의 끝에 다음과 같은 사항을 짚고 넘어갑니다.</h2>
            <br />
            <p>- 결론은 무엇인가?</p>
            <p>- 무엇을 성취했는가?</p>
            <p>- 해결방안은 무엇인가?</p>
            <p>- 다음에 할 일은 무엇인가?</p>
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
