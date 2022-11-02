/** @format */

import { color, shadow } from '../../../styles';
import { css } from '@emotion/css';

export const style = (isOpen: any) => css`
  height: fit-content;
  > .sub-description {
    margin-top: 16px;
    font-size: 14px;
    > :first-child {
      color: ${color.main};
      margin-right: 16px;
    }
  }
  > .inputs {
    li {
      margin: 8px 0;
      position: relative;
      height: 52px;
      display: flex;
      align-items: flex-start;
      .label {
        width: 96px;
        text-align: center;
        margin-top: calc((52px - 27px) / 2);
      }
      .select {
        position: relative;
        .arrow-down {
          width: 24px;
          height: 24px;
          position: absolute;
          top: 14px;
          right: 14px;
        }
        > .box {
          overflow: auto;
          display: flex;
          flex-direction: column;
        }
        &.phone {
          width: 100px;
          position: relative;
          > .arrow-down {
            position: absolute;
          }
          ~ input {
            margin-left: 8px;
            width: 276px;
            height: 100%;
            padding: 16px;
            border-radius: 6px;
            ${shadow.inputGray};
          }
        }
        * {
          color: ${color.dark2};
          font-size: 14px;
          background-color: white;
        }
        width: calc(100% - 96px);
        height: 52px;
        display: flex;
        flex-direction: column;

        background-color: white;
        ${shadow.normal}
        border-radius: 6px;
        overflow: hidden;
        transition: 0.2s all ease-in-out;
        .option {
          padding: 8px 0;
          :hover {
            background-color: ${color.subtle};
          }
          :active {
            background-color: ${color.lighter};
          }
        }
        > :first-child {
          padding: 14px 0 14px 16px;
          /* z-index: 1; */
          text-align: left;
          ${shadow.normal};
        }
      }

      > .phone {
        height: ${`${isOpen.phone ? '200px' : '52px'}`};
        z-index: ${`${isOpen.phone ? '5' : '2'}`};
        > :first-child {
          z-index: ${`${isOpen.phone ? '6' : '3'}`};
        }
        .arrow-down {
          z-index: ${`${isOpen.phone ? '7' : '4'}`};
        }
      }
      > .school {
        height: ${`${isOpen.school ? '156px' : '52px'}`};
        z-index: ${`${isOpen.school ? '5' : '2'}`};
        > :first-child {
          z-index: ${`${isOpen.school ? '6' : '3'}`};
        }
        .arrow-down {
          z-index: ${`${isOpen.school ? '7' : '4'}`};
        }
      }
      > .major {
        height: ${`${isOpen.major ? '240px' : '52px'}`};
        z-index: ${`${isOpen.major ? '5' : '2'}`};
        > :first-child {
          z-index: ${`${isOpen.major ? '6' : '3'}`};
        }
        .arrow-down {
          z-index: ${`${isOpen.major ? '7' : '4'}`};
        }
      }
      > .interested {
        height: ${`${isOpen.interested ? '100px' : '52px'}`};
        z-index: ${`${isOpen.interested ? '5' : '2'}`};
      }
    }
  }

  .next-btn {
    height: 52px;
  }
`;
