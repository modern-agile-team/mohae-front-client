/** @format */

import { useState } from 'react';
import { css, cx } from '@emotion/css';

import { color, radius, font, shadow } from '../../styles';
import { Profile, BasicModal, Btn } from '../../components';
import SelectBox from './SelectBox';

interface Object {
  [key: string]: any;
}

export default function Edit() {
  const [open, setOpen] = useState<Object>({
    one: false,
    two: false,
    three: false,
    four: false,
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
    placeholder: {
      nickname: '닉네임을 입력해 주세요. (3~8자)',
      phone: `'-' 제외하고 숫자만 입력`,
      school: '학교를 선택해 주세요.',
      major: '전공을 선택해 주세요.',
      interested: '관심사를 선택해 주세요.',
    },
    check: '중복확인',
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
            <span>{'모던애자일'}</span>
            <span>{'님'}</span>
          </div>
          <div>
            <Profile size={160} />
          </div>
          <div className={'light'}>{'비번변경'}</div>
          <div className={'light'}>{'회원 탈탈퇴'}</div>
        </div>
        <div className={'right'}>
          <div className={'line'}>
            <div className={'label'}>{text.label.mail}</div>
            <div className={'input'}>{'사용자'}</div>
          </div>
          <div className={'line'}>
            <div className={'label'}>{text.label.nickname}</div>
            <div className={'input'}>
              <div className={'inset text'}>
                <input
                  spellCheck={false}
                  placeholder={text.placeholder.nickname}
                  className={''}
                />
              </div>

              <div className={'btn'}>
                <Btn white>{text.check}</Btn>
              </div>
            </div>
          </div>
          <div className={'line'}>
            <div className={'label'}>{text.label.phone}</div>
            <div className={'input'}>
              <div className={'btn white'}>
                <div id="one" onClick={toggleSelectBox}>
                  <SelectBox
                    open={open.one}
                    noneScroll
                    list={['010', '011', '016', '017', '031']}
                  >
                    {'선택'}
                  </SelectBox>
                </div>
              </div>
              <div className={'inset text'}>
                <input
                  spellCheck={false}
                  placeholder={text.placeholder.phone}
                  className={''}
                />
              </div>
            </div>
          </div>
          <div className={'line'}>
            <div className={'label'}>{text.label.school}</div>
            <div className={'input white'}>
              <div id="two" onClick={toggleSelectBox}>
                <SelectBox
                  open={open.two}
                  list={[
                    '광운',
                    '인덕',
                    'ㅈ덕',
                    '읏덕',
                    '망덕',
                    'aa',
                    'bb',
                    'cc',
                    'dd',
                  ]}
                >
                  {text.placeholder.school}
                </SelectBox>
              </div>
            </div>
          </div>
          <div className={'line'}>
            <div className={'label'}>{text.label.major}</div>
            <div className={'input white'}>
              <div id="three" onClick={toggleSelectBox}>
                <SelectBox
                  open={open.three}
                  list={[
                    '컴전',
                    '시디',
                    '컴소',
                    '디산디',
                    '정통',
                    '읏덕',
                    '망덕',
                    'aa',
                    'bb',
                    'cc',
                    'dd',
                  ]}
                >
                  {text.placeholder.major}
                </SelectBox>
              </div>
            </div>
          </div>
          <div className={'line'}>
            <div className={'label'}>{text.label.interested}</div>
            <div className={'input white'}>
              <div id="four" onClick={toggleSelectBox}>
                <SelectBox
                  open={open.four}
                  blocks
                  list={[
                    '카테고리1',
                    '카테고리2',
                    '카테고리3',
                    '카테고리4',
                    '카테고리5',
                    '카테고리6',
                    '카테고리7',
                    '카테고리8',
                    '카테고리9',
                    '카테고리10',
                    '카테고리11',
                    '광운',
                    '인덕',
                    'ㅈ덕',
                    '읏덕',
                    '망덕',
                    'aa',
                    'bb',
                    'cc',
                    'dd',
                  ]}
                >
                  {text.placeholder.interested}
                </SelectBox>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={'footer'}>
        <div className={'btn'}>
          <Btn main>{'저장'}</Btn>
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
