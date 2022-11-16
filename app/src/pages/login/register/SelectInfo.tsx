import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { css, cx } from '@emotion/css';
import { useDispatch, useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { color, radius, shadow } from '../../../styles';
import { Btn, Img } from '../../../components';
import { RootState } from '../../../redux/root';
import { ENDPOINT } from '../../../utils/ENDPOINT';
import { customAxios } from '../../../apis/instance';
import { handlePopup } from '../../../redux/modal/reducer';

interface Object {
  [key: string]: any;
}

interface Props {
  [key: string]: any;
}

export default function SelectInfo({ setPart }: Props) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<Object>({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const [info, setInfo] = useState<{
    phoneNumber: string | null;
    school: number | null;
    major: number | null;
    intersted: number[];
  }>({
    phoneNumber: '',
    school: null,
    major: null,
    intersted: [],
  });
  const [intersted, setIntersted] = useState<string[]>([]);
  const [phoneBehindNumber, setPhoneBehindNumber] = useState<string>('');
  const registInfo = useSelector((state: RootState) => state.user.registInfo);
  const valid = useMemo(() => {
    if (info.phoneNumber && info.school && info.major && info.intersted.length)
      return true;
    else return false;
  }, [info]);

  const toggleSelectBox = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget.id;
    setOpen({
      one: false,
      two: false,
      three: false,
      four: false,
      [target]: !open[target],
    });
  };

  const popupOnClick = () => {
    dispatch(handlePopup());
    setPart(0);
  };
  const popupContents = {
    text: '회원 가입이 완료 되었습니다.',
    children: (
      <BtnImgWrapper>
        <Btn main onClick={popupOnClick}>
          닫기
        </Btn>
      </BtnImgWrapper>
    ),
  };
  const text: { [key: string]: any } = {
    label: {
      mail: '이메일',
      nickname: '닉네임',
      phone: '연락처',
      school: '학교',
      major: '전공',
      interested: '관심사',
    },
    placeholder: {
      nickname: '닉네임을 입력해 주세요. (3~8자)',
      phone: `'-' 제외하고 숫자만 입력`,
      school: '학교를 선택해 주세요.',
      major: '전공을 선택해 주세요.',
      interested: '관심사를 선택해 주세요.',
    },
    description: '회원 정보는 마이페이지에서 수정 가능합니다.',
    check: '중복확인',
    ignore: '건너뛰기',
    finish: '가입하기',
    phoneNumbers: ['010', '011', '02', '031'],
    schools: ['인덕대학교', '광운대학교'],
    majors: [
      '건축',
      '전기/전자',
      '컴퓨터/통신',
      '토목/도시',
      '교육',
      '경영/경제',
      '법률',
      '디자인',
      '무용/체육',
      '연극/영화',
      '음악',
      '간호',
      '약학',
      '의료/보건',
      '인문',
    ],
    categories: [
      '디자인',
      'IT / 개발',
      '사진 / 영상',
      '기획 / 마케팅',
      '번역 / 통역',
      '문서작업',
      '컨설팅',
      '법률',
      '과외 / 레슨',
      '상담 / 운세',
      '이벤트',
      '핸드메이드',
      '취미',
      '생활서비스',
      '기타',
    ],
  };

  const onSelect = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e.currentTarget.name === 'phoneNumber') {
      setInfo({
        ...info,
        phoneNumber: e.currentTarget.value,
      });
    } else
      setInfo({
        ...info,
        [e.currentTarget.name]: index + 1,
      });
  };

  const onCategrySelect = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (info.intersted.length === 3) {
      return;
    } else if (info.intersted.includes(index + 2)) {
      return;
    }
    setInfo({
      ...info,
      intersted: [...info.intersted, index + 2],
    });
    setIntersted([...intersted, e.currentTarget.value]);
  };

  const onSelectInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneBehindNumber(e.target.value);
  };

  const onCategoryDelete = (category: string) => {
    setIntersted(intersted.filter((el: string) => el !== category));
    setInfo({
      ...info,
      intersted: info.intersted.filter(
        (el: number) => el !== text.categories.indexOf(category) + 2,
      ),
    });
  };

  const onSubmit = () => {
    const body = {
      ...registInfo,
      phone: info.phoneNumber + phoneBehindNumber,
      school: info.school,
      major: info.major,
      categories: info.intersted,
    };

    customAxios
      .post(`${ENDPOINT}auth/signup`, body, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.data.statusCode >= 200 && res.data.statusCode <= 204) {
          dispatch(
            handlePopup({
              text: popupContents.text,
              children: popupContents.children,
            }),
          );
        } else {
          alert('다시 가입 해주세요');
        }
      })
      .catch(err => {
        alert(err.response.data.error.message);
      });
  };

  const onIgnore = () => {
    customAxios
      .post(`${ENDPOINT}auth/signup`, registInfo, {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        if (res.data.statusCode >= 200 && res.data.statusCode <= 204) {
          dispatch(
            handlePopup({
              text: popupContents.text,
              children: popupContents.children,
            }),
          );
        } else {
          alert('다시 가입 해주세요');
        }
      })
      .catch(err => {
        alert(err.response.data.error.message);
      });
  };

  const style = css`
    width: 100%;
    height: 100%;
    #one,
    #two,
    #three,
    #four {
      ${radius[6]};
      width: 100%;
      transition: 0.3s all ease-in-out;
      overflow: hidden;
      display: flex;
      align-items: start;
    }
    #one {
      ${shadow.normal}
      ${open.one
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    #two {
      ${shadow.normal}
      ${open.two
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    #three {
      ${shadow.normal}
      ${open.three
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    #four {
      ${shadow.normal}
      ${open.four
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    /* padding-bottom: 8px; */
    > .wrapper {
      > *:not(:last-child) {
        margin-bottom: 8px;
      }
      > .description {
        margin: 16px 0 16px;
        height: 20px;
        color: ${color.main};
      }
      width: 100%;
      height: fit-content;
      ${radius[24]};
      font-size: 14px;
      margin-bottom: 16px;
      display: flex;
      flex-direction: column;
      height: fit-content;
      .line {
        display: flex;
        align-items: center;
        width: 480px;
        height: 52px;
        .btn {
          width: 100px;
          height: 52px;
        }
        .white {
          background-color: white;
        }
        .inset {
          ${shadow.inputGray}
        }
        .input {
          width: 384px;
          height: 100%;
          ${radius[6]}
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          color: ${color.dark2};
          > .box {
            width: 100%;
            height: 52px;
            ${radius[6]};
            ${shadow.normal};
          }
          input {
            width: 268px;
            height: 100%;
            padding: 16px;
            background-color: #0000;
            color: ${color.dark1};
          }
          .text {
            width: 268px;
            height: 52px;
            ${radius[6]}
            background-color: white;
          }
        }
        .label {
          width: 96px;
          height: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
          vertical-align: text-bottom;
          color: ${color.dark1};
        }
      }
    }
    .btn {
      height: 52px;
    }
    .ignore {
      margin-bottom: 8px;
    }
  `;
  const mainColor = css`
    color: ${color.main} !important;
  `;

  return (
    <div className={cx(style)}>
      <div className={'wrapper'}>
        <div className={'description'}>{text.description}</div>
        <div className={'line'}>
          <div className={'label'}>{text.label.phone}</div>
          <div className={'input'}>
            <div className={'btn white'}>
              <div id="one" onClick={toggleSelectBox}>
                <DemoSelectBox>
                  <SelectButton>
                    <PlaceHolder>
                      {info.phoneNumber ? (
                        <span>{info.phoneNumber}</span>
                      ) : (
                        <span>선택</span>
                      )}
                    </PlaceHolder>
                    <Arrow>
                      <Img src="/img/arrow-down-dark3.png" alt="info-opener" />
                    </Arrow>
                  </SelectButton>
                  <Option>
                    <List>
                      {text.phoneNumbers.map(
                        (phoneNumber: string, index: number) => (
                          <ListButton
                            key={index}
                            onClick={e => onSelect(index, e)}
                            value={phoneNumber}
                            name="phoneNumber"
                          >
                            {phoneNumber}
                          </ListButton>
                        ),
                      )}
                    </List>
                  </Option>
                </DemoSelectBox>
              </div>
            </div>
            <div className={'inset text'}>
              <input
                spellCheck={false}
                placeholder={text.placeholder.phone}
                className={''}
                onChange={e => onSelectInputChange(e)}
                value={phoneBehindNumber}
              />
            </div>
          </div>
        </div>
        <div className={'line'}>
          <div className={'label'}>{text.label.school}</div>
          <div className={'input white'}>
            <div id="two" onClick={toggleSelectBox}>
              <DemoSelectBox>
                <SelectButton>
                  <PlaceHolder>
                    <span>
                      {info.school
                        ? text.schools[info.school - 1]
                        : text.placeholder.school}
                    </span>
                  </PlaceHolder>
                  <Arrow>
                    <Img src="/img/arrow-down-dark3.png" alt="info-opener" />
                  </Arrow>
                  <Option>
                    <List>
                      {text.schools.map((school: string, index: number) => (
                        <ListButton
                          key={index}
                          onClick={e => onSelect(index, e)}
                          value={school}
                          name="school"
                        >
                          {school}
                        </ListButton>
                      ))}
                    </List>
                  </Option>
                </SelectButton>
              </DemoSelectBox>
            </div>
          </div>
        </div>
        <div className={'line'}>
          <div className={'label'}>{text.label.major}</div>
          <div className={'input white'}>
            <div id="three" onClick={toggleSelectBox}>
              <DemoSelectBox>
                <SelectButton>
                  <PlaceHolder>
                    <span>
                      {info.major
                        ? text.majors[info.major - 1]
                        : text.placeholder.major}
                    </span>
                  </PlaceHolder>
                  <Arrow>
                    <Img src="/img/arrow-down-dark3.png" alt="info-opener" />
                  </Arrow>
                  <Option>
                    <List>
                      {text.majors.map((major: string, index: number) => (
                        <ListButton
                          key={index}
                          onClick={e => onSelect(index, e)}
                          value={major}
                          name="major"
                        >
                          {major}
                        </ListButton>
                      ))}
                    </List>
                  </Option>
                </SelectButton>
              </DemoSelectBox>
            </div>
          </div>
        </div>
        <div className={'line'}>
          <div className={'label'}>{text.label.interested}</div>
          <div className={'input white'}>
            <div id="four" onClick={toggleSelectBox}>
              <DemoSelectBox>
                <SelectButton>
                  <PlaceHolder>
                    {info.intersted.length
                      ? intersted.map((el: string, index: number) => (
                          <CategoryWrapper>
                            <Category
                              key={index}
                              select={index + 2}
                              intersted={info.intersted}
                            >
                              {el}
                              <CloseButton onClick={() => onCategoryDelete(el)}>
                                <Img
                                  src="/img/close-dark2.png"
                                  alt="info-opener"
                                />
                              </CloseButton>
                            </Category>
                          </CategoryWrapper>
                        ))
                      : text.placeholder.major}
                  </PlaceHolder>
                  <Arrow>
                    <Img src="/img/arrow-down-dark3.png" alt="info-opener" />
                  </Arrow>
                  <CategoryOption>
                    <div className={'sub'}>
                      <span>{'관심사를 선택해주세요. (최대3개)'}</span>
                      <div>
                        <span className={cx(mainColor)}>
                          {intersted.length}
                        </span>
                        <span>{'/3'}</span>
                      </div>
                    </div>
                    <div className={'list'}>
                      {text.categories.map(
                        (category: string, index: number) => (
                          <Category
                            key={index}
                            value={category}
                            name={category}
                            onClick={e => onCategrySelect(index, e)}
                            select={index + 2}
                            intersted={info.intersted}
                          >
                            <span>{category}</span>
                          </Category>
                        ),
                      )}
                    </div>
                  </CategoryOption>
                </SelectButton>
              </DemoSelectBox>
            </div>
          </div>
        </div>
      </div>
      <div className={'btn ignore'}>
        <Btn onClick={() => onIgnore()} white>
          {text.ignore}
        </Btn>
      </div>
      <Button disabled={!valid} onClick={() => onSubmit()}>
        가입하기
      </Button>
    </div>
  );
}

const BtnImgWrapper = styled.button`
  width: 74px;
  height: 43px;
`;

const DemoSelectBox = styled.div`
  ${radius[6]};
  ${shadow.normal};
  width: 100%;
  height: 240px;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: white;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SelectButton = styled.button`
  color: ${color.dark2};
  width: 100%;
  height: 52px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    color: ${color.main};
  }
  ${shadow.normal};
`;

const PlaceHolder = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  > :not(:last-child) {
    margin-right: 8px;
  }
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
`;

const Option = styled.div`
  width: 100%;
  position: absolute;
  z-index: 1;
  top: 52px;
  left: 0;
  padding: 8px 0 0 0;
  height: 180px;
  display: flex;
  flex-direction: column;
`;

const List = styled.div`
  width: 100%;
  padding: 8px 8px;
  height: 100%;
  background-color: white;
  overflow: scroll;
  > :nth-of-type(2n-1) {
    background-color: ${color.light1};
  }
`;

const ListButton = styled.button`
  width: 100%;
  display: flex;
  line-height: 20px;
  padding: 8px 0;
  justify-content: center;
  align-items: center;
`;

const CategoryOption = styled.div`
  width: calc(100% - 2px);
  height: fit-content;
  height: 100%;
  position: absolute;
  z-index: 5;
  top: 52px;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  .sub {
    width: 100%;
    padding: 2px 8px 0;
    display: flex;
    height: fit-content;
    justify-content: space-between;
  }
  .list {
    width: 100%;
    padding: 8px 8px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
    height: 168px;
    background-color: white;
    overflow: scroll;
    > :not(:nth-of-type(3n)) {
      margin: 0 14px 8px 0;
    }
  }
`;

const Category = styled.button<{ select: number; intersted: number[] }>`
  font-size: 14px;
  width: 100px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  box-shadow: 0px 0px 8px 0px #84838d;
  position: relative;
  span {
    color: ${props =>
      props.intersted.includes(props.select) ? color.main : '#a7a7ad'};
  }
  :hover {
    background-color: ${color.subtle};
  }
  :active {
    background-color: ${color.lighter};
    color: white !important;
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  width: 100%;
`;

const CloseButton = styled.div`
  width: 13px;
  height: 13px;
  position: absolute;
  top: 5px;
  right: 5px;
`;

const Button = styled.button`
  width: 480px;
  height: 52px;
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
