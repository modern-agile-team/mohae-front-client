/** @format */

import { useState } from 'react';
import { css, cx } from '@emotion/css';

import { color, radius, font, shadow } from '../../../styles';
import { Btn } from '../../../components';
import SelectBox from '../../profile/SelectBox';

interface Object {
  [key: string]: any;
}

export default function SelectInfo({ part, next }: Object) {
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
      'all',
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

  return (
    <div className={cx(style)}>
      <div className={'wrapper'}>
        <div className={'description'}>{text.description}</div>
        <div className={'line'}>
          <div className={'label'}>{text.label.phone}</div>
          <div className={'input'}>
            <div className={'btn white'}>
              <div id="one" onClick={toggleSelectBox}>
                <SelectBox open={open.one} noneScroll list={text.phoneNumbers}>
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
              <SelectBox open={open.two} list={text.schools}>
                {text.placeholder.school}
              </SelectBox>
            </div>
          </div>
        </div>
        <div className={'line'}>
          <div className={'label'}>{text.label.major}</div>
          <div className={'input white'}>
            <div id="three" onClick={toggleSelectBox}>
              <SelectBox open={open.three} list={text.majors}>
                {text.placeholder.major}
              </SelectBox>
            </div>
          </div>
        </div>
        <div className={'line'}>
          <div className={'label'}>{text.label.interested}</div>
          <div className={'input white'}>
            <div id="four" onClick={toggleSelectBox}>
              <SelectBox open={open.four} blocks list={text.categories}>
                {text.placeholder.interested}
              </SelectBox>
            </div>
          </div>
        </div>
      </div>
      <div className={'btn ignore'}>
        <Btn white>{text.ignore}</Btn>
      </div>
      <div className={'btn'}>
        <Btn white>{text.finish}</Btn>
      </div>
    </div>
  );
}
