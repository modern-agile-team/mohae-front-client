import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setInterceptors from '../../apis/common/setInterceptors';
import { customAxios } from '../../apis/instance';
import { handelReportModal } from '../../redux/modal/reducer';
import { RootState } from '../../redux/root';
import { CheckList, List, RequestForm } from '../../types/report/type';
import Presenter from './Presenter';

function Container() {
  const dispatch = useDispatch();
  const { view, userInfo, boardNo } = useSelector((state: RootState) => {
    return {
      view: state.modal.reportModal,
      userInfo: state.user.user,
      boardNo: state.post.data.response.board.no,
    };
  });

  const reportTarget = view.board ? 'board' : 'user';

  const handleRequestForm = ({ list, text }: CheckList) => {
    const countBox = list.reduce((acc: number[], cur: List, i: number) => {
      if (cur.checked) acc.push(i + 1);
      return acc;
    }, []);

    return {
      checksCount: countBox,
      description: text,
    };
  };

  const onSubmit = (requestForm: RequestForm) => {
    const body = {
      head: reportTarget,
      headNo: reportTarget === 'board' ? boardNo : userInfo?.userNo,
      checks: requestForm.checksCount,
      description: requestForm.description,
    };

    if (
      requestForm.checksCount.length &&
      requestForm.description.replace('\\n', '').length < 100
    ) {
      setInterceptors(customAxios)
        .post('reports', body)
        .then(_ => dispatch(handelReportModal()))
        .catch(_ => alert('알 수 없는 에러 발생'));
    } else alert('항목을 세 개 이하 체크 후 사유를 작성해주세요.');
  };

  const show = () => {
    if (view.board || view.user) {
      return <Presenter requestForm={handleRequestForm} onSubmit={onSubmit} />;
    }
  };

  return <>{show()}</>;
}

export default Container;
