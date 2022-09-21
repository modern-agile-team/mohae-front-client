/** @format */

import { useState, useEffect } from 'react';
import { css, cx } from '@emotion/css';
import { color, radius, font, shadow } from '../../styles';
import { BasicModal, Btn, Img } from '../../components';
import ProfileBox from '../../components/profile/ProfileBox';
import PhoneNumberSelectBox from '../../components/profileselect/PhoneNumberSelectBox';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root';
import axios from 'axios';

interface Object {
  [key: string]: any;
}

export default function ModifyProfile() {
  const [open, setOpen] = useState<Object>({
    one: false,
    two: false,
    three: false,
    four: false,
  });
  const user = useSelector((state: RootState) => state.user.user);
  const [profileForm] = useState<FormData>(new FormData());
  const [intersted, setIntersted] = useState<string[]>([]);
  const [phoneBehindNumber, setPhoneBehindNumber] = useState<string>(
    user ? user.phone.slice(3, 11) : '',
  );
  const [userInfo, setUserInfo] = useState<any>({
    phone: user.phone,
    nickname: user.nickname,
    school: user.schoolNo,
    major: user.majorNo,
    categories: user.categories.length ? [Number(user.categories[0].no)] : [],
  });

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

  const text: { [key: string]: any } = {
    sir: '님',
    changePW: '비밀번호 변경',
    resign: '회원 탈퇴',
    label: {
      mail: '이메일',
      nickname: '닉네임',
      phone: '연락처',
      school: '학교',
      major: '전공',
      interested: '관심사',
    },
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
    placeholder: {
      phone: `'-' 제외하고 숫자만 입력`,
      school: '학교를 선택해 주세요.',
      major: '전공을 선택해 주세요.',
      interested: '관심사를 선택해 주세요.',
    },
    check: '중복확인',
  };

  const onSelect = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e.currentTarget.name === 'phoneNumber') {
      setUserInfo({
        ...userInfo,
        phone: e.currentTarget.value + phoneBehindNumber,
      });
    } else
      setUserInfo({
        ...userInfo,
        [e.currentTarget.name]: index + 1,
      });
  };

  const onPhoneBehindNumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneBehindNumber(e.target.value);
  };

  const onBlur = () => {
    setUserInfo({
      ...userInfo,
      phone: userInfo.phone.slice(0, 3) + phoneBehindNumber,
    });
  };

  const onCategrySelect = (
    index: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (userInfo.length === 3) {
      return;
    } else if (userInfo.categories.includes(index + 2)) {
      return;
    }
    setUserInfo({
      ...userInfo,
      categories: [...userInfo.categories, index + 2],
    });
    setIntersted([...intersted, e.currentTarget.value]);
  };

  const onSubmit = () => {
    for (let key in userInfo) {
      profileForm.append(key, userInfo[key]);
    }
    for (let key in userInfo) {
      console.log(profileForm.getAll(key));
    }
    console.log(profileForm.get('image'));
  };

  useEffect(() => {
    if (user.photo_url) {
      const getImages = async () => {
        await axios
          .get<Blob>(
            `https://mohae-image.s3.ap-northeast-2.amazonaws.com/${user.photo_url}`,

            { responseType: 'blob' },
          )
          .then(res => {
            const file = new File([res.data], user.photo_url, {
              type: res.data.type,
            });
            profileForm.append('image', file);
          });
      };
      getImages();
    }
  }, [user]);

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
      ${open.one
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    #two {
      ${open.two
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    #three {
      ${open.three
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    #four {
      ${open.four
        ? css`
            height: 240px;
          `
        : css`
            height: 52px;
          `}
    }
    > .wrapper {
      width: 100%;
      height: fit-content;
      ${radius[24]};
      display: flex;
      justify-content: space-between;
      padding: 48px 84px 0;
      font-size: 14px;
      margin-bottom: 24px;

      > .left {
        height: 291px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        margin-top: calc(82px - 48px);

        > .name {
          * {
            line-height: 130%;
          }
          width: 240px;
          text-align: center;
          font-size: 20px;
          > :first-child {
            font-size: 24px;
            ${font.weight[700]};
            margin-right: 4px;
          }
        }
        .light {
          color: ${color.dark3};
        }
      }
      .right {
        display: flex;
        flex-direction: column;

        justify-content: space-between;
        height: 392px;
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
    }
    > .footer {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      .btn {
        width: 74px;
        height: 43px;
      }
    }
  `;

  const contents = (
    <div className={cx(style)}>
      <div className={'wrapper'}>
        <div className={'left'}>
          <div className={'name'}>
            <span>{user.nickname}</span>
            <span>{text.sir}</span>
          </div>
          <div>
            <ProfileBox
              img={
                (user?.photo_url &&
                  'https://d2ffbnf2hpheay.cloudfront.net/' + user.photo_url) ||
                '/img/profile.png'
              }
              size={160}
              profileForm={profileForm}
            />
          </div>
          <div className={'light'}>{'비밀번호 변경'}</div>
        </div>
        <div className={'right'}>
          <Contents>
            <div className={'label'}>{text.label.mail}</div>
            <span>{user.email}</span>
          </Contents>
          <Contents>
            <div className={'label'}>{text.label.nickname}</div>
            <div className={'input'}>
              <input
                spellCheck={false}
                placeholder={user.nickname}
                className={''}
              />

              <div className={'btn'}>
                <Btn white>{text.check}</Btn>
              </div>
            </div>
          </Contents>
          <Contents>
            <div className={'label'}>{text.label.phone}</div>
            <div className={'phone'}>
              <div className={'btn white'}>
                <div id="one" onClick={toggleSelectBox}>
                  <PhoneNumberSelectBox
                    onSelect={onSelect}
                    userInfo={userInfo}
                  />
                </div>
              </div>
              <div className={'inset text'}>
                <input
                  spellCheck={false}
                  placeholder={text.placeholder.phone}
                  value={phoneBehindNumber}
                  onChange={onPhoneBehindNumChange}
                  onBlur={onBlur}
                  className={''}
                />
              </div>
            </div>
          </Contents>
          <div className={'line'}>
            <div className={'label'}>{text.label.school}</div>
            <div className={'input white'}>
              <div id="two" onClick={toggleSelectBox}>
                <DemoSelectBox>
                  <SelectButton>
                    <PlaceHolder>
                      {<span>{text.placeholder.school}</span>}
                    </PlaceHolder>
                    <Arrow>
                      <Img src="/img/arrow-down-dark3.png" />
                    </Arrow>
                    <Option>
                      <List>
                        {text.schools.map((school: string, index: number) => (
                          <ListButton
                            key={index}
                            value={school}
                            name="school"
                            onClick={e => onSelect(index, e)}
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
                      <span>{text.placeholder.major}</span>
                    </PlaceHolder>
                    <Arrow>
                      <Img src="/img/arrow-down-dark3.png" />
                    </Arrow>
                    <Option>
                      <List>
                        {text.majors.map((major: string, index: number) => (
                          <ListButton
                            key={index}
                            value={major}
                            name="major"
                            onClick={e => onSelect(index, e)}
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
                      {userInfo.categories.length
                        ? intersted.map((el: string, index: number) => (
                            <CategoryWrapper>
                              <Category
                                key={index}
                                select={index + 2}
                                intersted={userInfo.categories}
                              >
                                {el}
                              </Category>
                            </CategoryWrapper>
                          ))
                        : text.placeholder.intersted}
                    </PlaceHolder>
                    <Arrow>
                      <Img src="/img/arrow-down-dark3.png" />
                    </Arrow>
                    <CategoryOption>
                      <div className={'sub'}>
                        <span>{'관심사를 선택해주세요. (최대3개)'}</span>
                        <div>
                          <span>1</span>
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
                              intersted={userInfo.categories}
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
      </div>
      <div className={'footer'}>
        <div className={'btn'}>
          <Btn main onClick={onSubmit}>
            {'저장'}
          </Btn>
        </div>
      </div>
    </div>
  );

  return (
    <BasicModal small visible={true}>
      {contents}
    </BasicModal>
  );
}

const Contents = styled.div`
  display: flex;
  align-items: center;
  width: 480px;
  height: 52px;

  .phone {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    input {
      width: 268px;
      height: 52px;
      box-shadow: 0px 0px 8px 0px rgba(132, 131, 141, 0.2);
      border-radius: 8px;
      margin-right: 20px;
      display: flex;
      padding-left: 20px;
      color: ${color.dark1};
    }

    .btn {
      width: 100px;
      height: 43px;
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

  .input {
    display: flex;
    align-items: center;
    input {
      width: 268px;
      height: 52px;
      box-shadow: 0px 0px 8px 0px rgba(132, 131, 141, 0.2);
      border-radius: 8px;
      margin-right: 20px;
      display: flex;
      padding-left: 20px;
      color: ${color.dark1};
    }

    .btn {
      width: 100px;
      height: 43px;
    }
  }

  span {
    color: ${color.dark1};
  }
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
