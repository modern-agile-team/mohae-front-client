/** @format */

import { Img } from '../../../components';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/root';
import { update_regist_info } from '../../../redux/user/reducer';
import {
  FirstArticle,
  SecondArticle,
  ThirdArticle,
} from '../../../utils/Article';
import CheckWrapper from '../../../components/CheckBox/CheckWrapper';

interface Object {
  [key: string]: any;
  showContent: { [key: number]: boolean };
  setShowContent: Dispatch<SetStateAction<{ [key: number]: boolean }>>;
  agreementContentsAllClose: () => void;
}

export interface ArticleType {
  id: number;
  title: string;
  contents: JSX.Element;
  checked: boolean;
}

const Agreement = ({
  next,
  showContent,
  setShowContent,
  agreementContentsAllClose,
}: Object) => {
  const [articles, setArticle] = useState<ArticleType[]>([
    {
      id: 1,
      title: '서비스 이용약관(필수)',
      contents: <FirstArticle />,
      checked: false,
    },
    {
      id: 2,
      title: '개인정보 수집 및 이용 동의 (필수)',
      contents: <SecondArticle />,
      checked: false,
    },
    {
      id: 3,
      title: '광고성 정보 수신 동의 (선택)',
      contents: <ThirdArticle />,
      checked: false,
    },
  ]);
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const registInfo = useSelector((state: RootState) => state.user.registInfo);
  const dispatch = useDispatch<AppDispatch>();

  const onCheck = (id: number) => {
    setArticle(
      articles.map(article =>
        article.id === id ? { ...article, checked: !article.checked } : article,
      ),
    );
  };

  const onAllCheck = () => {
    if (allCheck) {
      setArticle(articles.map(article => ({ ...article, checked: true })));
    } else
      setArticle(articles.map(article => ({ ...article, checked: false })));
  };

  const onClick = () => {
    dispatch(
      update_regist_info({
        ...registInfo,
        terms: [articles[0].checked, articles[1].checked, articles[2].checked],
      }),
    );
    next();
    agreementContentsAllClose();
  };

  useEffect(() => {
    onAllCheck();
  }, [allCheck]);

  return (
    <Wrapper>
      <h1>약관 동의</h1>
      {articles.map((article: ArticleType, i) => (
        <CheckWrapper
          showContent={showContent[i]}
          setShowContent={setShowContent}
          key={article.id}
          article={article}
          onCheck={onCheck}
          index={i}
        >
          {article.contents}
        </CheckWrapper>
      ))}
      <CheckItem>
        {allCheck ? (
          <CheckDone onClick={() => setAllCheck(!allCheck)}>
            <Img src={'/img/check.png'} />
          </CheckDone>
        ) : (
          <CheckBox onClick={() => setAllCheck(!allCheck)} />
        )}
        <span onClick={() => setAllCheck(!allCheck)}>
          위 약관에 모두 동의합니다
        </span>
      </CheckItem>
      <Button
        onClick={onClick}
        disabled={!articles[0].checked || !articles[1].checked}
      >
        다음
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 25em;

  h1 {
    font-size: 16px;
    font-weight: 700;
    color: #4f4e5c;
    margin-top: 20px;
  }
`;

const CheckItem = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-bottom: 20px;

  span {
    font-weight: 400;
    font-size: 14px;
    color: #84838d;
    margin-left: 8px;
    cursor: pointer;
  }
`;
const CheckBox = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px #84838d;
  cursor: pointer;
`;
const CheckDone = styled.div`
  width: 16px;
  height: 16px;
  border-radius: 2px;
  box-shadow: 0px 0px 4px 0px #84838d;
  background-color: #ff445e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  div {
    width: 8px;
    height: 8px;
  }
`;

const Button = styled.button`
  width: 480px;
  padding: 15px;
  border-radius: 6px;
  background-color: #ff445e;
  box-shadow: 0px 0px 8px 0px #84838d;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;

  &:disabled {
    background-color: #e7e7e8;
  }
`;

export default Agreement;
