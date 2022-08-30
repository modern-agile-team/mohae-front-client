import React, { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { Box } from '../../components';
import { animation } from './modalAnimation';
import { Btn } from '../button';
import Report from '../check-label/CheckLabel';
import Img from '../img/Img';
import { color, font } from '../../styles';
import { useParams } from 'react-router-dom';
import { ENDPOINT } from '../../utils/ENDPOINT';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';
import { Popup } from '../../components';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';

interface Props {
  visible: boolean;
  close: () => void;
  board?: boolean;
  user?: boolean;
}

interface CheckList {
  list: { checked: boolean; title: string }[];
  text: string;
}

function ReportModal({ visible, close, board, user }: Props) {
  const [modalState, setModalState] = useState(false);
  const [checkList, setCheckList] = useState<CheckList>({
    list: [
      { checked: false, title: '욕설 / 비방' },
      { checked: false, title: '개인정보 요구' },
      { checked: false, title: '사기' },
      { checked: false, title: '사적인 연락' },
      { checked: false, title: '도배' },
      { checked: false, title: '선정적인 게시물' },
      { checked: false, title: '위협' },
    ],
    text: '',
  });
  const [success, setSuccess] = useState(false);
  const userInfo = useSelector((state: RootState) => state.user.user);
  const { no } = useParams();

  const report = (): { checks: any; description: string } => {
    const init: Array<number> = [];

    const requestData = {
      checks: checkList.list.reduce((acc: any, cur: any, index: number) => {
        if (cur.checked) {
          acc.push(index + 1);
        }
        return acc;
      }, init),
      description: checkList.text,
    };

    return requestData;
  };

  const cleanUp = () => {
    setCheckList({
      list: [
        { checked: false, title: '욕설 / 비방' },
        { checked: false, title: '개인정보 요구' },
        { checked: false, title: '사기' },
        { checked: false, title: '사적인 연락' },
        { checked: false, title: '도배' },
        { checked: false, title: '선정적인 게시물' },
        { checked: false, title: '위협' },
      ],
      text: '',
    });
  };

  const successPopupClose = () => {
    setSuccess(prev => !prev);
    close();
  };

  const ReportOnSubmit = (report: {
    checks: number[];
    description: string;
  }) => {
    const data = {
      head: board ? 'board' : 'user',
      headNo: board ? Number(no) : userInfo?.userNo,
      checks: report.checks,
      description: report.description,
    };
    if (
      report.checks.length &&
      report.description.replace('\\n', '').length < 100
    ) {
      setInterceptors(customAxios)
        .post(`${ENDPOINT}reports`, data)
        .then(res => {
          cleanUp();
          setSuccess(true);
        })
        .catch(err => console.log('err', err));
    } else alert('항목을 세 개 이하 체크 후 사유를 작성해주세요.');
  };

  useEffect(() => {
    let timer: any;
    if (visible) {
      setModalState(true);
    } else {
      timer = setTimeout(() => setModalState(false), 800);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  if (!modalState) return null;

  const box = css`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    z-index: 14;
    padding: 16px 67px 24px 67px;
    ${visible ? animation.basicAppear : animation.basicDissappear}
    .wrap {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .title {
        width: fit-content;
        height: 23px;
        color: ${color.dark1};
        ${font.size[16]}
        ${font.weight[400]}
      }
      .warring {
        width: fit-content;
        height: 14px;
        color: ${color.main};
        ${font.size[10]}
        ${font.weight[300]}
        margin-bottom: 12px;
      }
    }

    .close-btn {
      width: 15px;
      height: 15px;
      margin: 0px 0px 0px 286px;
    }

    .send-btn {
      width: 74px;
      height: 44px;
    }

    label {
      height: 20px;
    }
  `;

  const overlay = css`
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 13;
    ${modalState || animation.dissappearOverlay};
  `;

  const btnWrap = css`
    width: 74px;
    height: 43px;
  `;

  return (
    <>
      <Box light size={[384, 480]} className={box}>
        <div
          className={'close-btn'}
          onClick={() => {
            close();
            cleanUp();
          }}
        >
          <Img src="/img/close.png" />
        </div>
        <div className="wrap">
          <p className="title">신고 사유 선택</p>
          <p className="warring">최대 3개 항목까지 선택 가능합니다.</p>
        </div>
        <Report checkList={checkList} setCheckList={setCheckList} />
        <div className="wrap">
          <div className={'send-btn'}>
            <Btn main onClick={() => ReportOnSubmit(report())}>
              {'전송'}
            </Btn>
          </div>
        </div>
      </Box>
      <div
        onClick={() => {
          close();
          cleanUp();
        }}
        className={cx(overlay)}
      ></div>
      {success && (
        <Popup
          visible={success}
          text1={'신고가 정상적으로 접수 되었습니다.'}
          overlay={successPopupClose}
        >
          <div className={cx(btnWrap)}>
            <Btn main onClick={() => successPopupClose()}>
              닫기
            </Btn>
          </div>
        </Popup>
      )}
    </>
  );
}

export default ReportModal;
export type { CheckList };
