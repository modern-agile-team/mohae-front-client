/** @format */
import styled from '@emotion/styled';
import { Slide, PostSlide } from './index';
import { Img, Box, Profile, FocusBar, Category } from '../../../../components';
import { useNavigate } from 'react-router-dom';
import ModifyProfile from '../ModifyProfile';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUserData, remove_user } from '../../../../redux/user/reducer';
import { AppDispatch } from '../../../../redux/root';
import { useSelector } from 'react-redux';
import { MyPageProps } from '../../../../types/myPage/myPage';
import { RootState } from '../../../../redux/root';
import { removeToken } from '../../../../utils/getToken';
import { ACCESS_TOKEN, REFESH_TOKEN } from '../../../../consts/tokenKey';

export default function MySelf({ posts, actions, checkSelf }: MyPageProps) {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!isOpen) {
      dispatch(getUserData(userInfo.userNo));
    }
  }, [isOpen]);

  const handleLogout = () => {
    removeToken(ACCESS_TOKEN);
    removeToken(REFESH_TOKEN);
    dispatch(remove_user());
    navigate('/');
  };

  return (
    <Container>
      {isOpen && <ModifyProfile setIsOpen={setIsOpen} />}
      <div className={'user'}>
        <Box className={'box'} size={[304, 724]}>
          <div className="profileHeader">
            <div className="blank"></div>
            <div className={'name'}>
              <div>{userInfo && userInfo.nickname}</div>
              <div>님</div>
            </div>
            <div
              className="modifyBtn"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <Img src={'/img/edit.png'} />
            </div>
          </div>
          <div className={'profile'}>
            <Profile
              size={146}
              img={
                (userInfo.photo_url !== null &&
                  'https://d2ffbnf2hpheay.cloudfront.net/' +
                    userInfo.photo_url) ||
                '/img/profile.png'
              }
              noneClick
            />
          </div>
          <div className={'register'}>
            <div>가입일</div>
            <div className={'date'}>{userInfo && userInfo.createdAt}</div>
          </div>
          <button className={'logout'} onClick={handleLogout}>
            로그아웃
          </button>
          <div className={'personal-info'}>
            <div className={'item'}>
              <div>
                <Img src={'/img/post.png'} />
              </div>
              <span>{`게시물 ${userInfo && userInfo.boardNum}`}</span>
            </div>
            <div className={'item'}>
              <div>
                <Img src={'/img/heart-main.png'} />
              </div>
              <span>{`좋아요 ${userInfo && userInfo.likedUserNum}`}</span>
            </div>
            <div className={'item'}>
              <div>
                <Img src={'/img/university.png'} />
              </div>
              <span>{(userInfo && userInfo.schoolName) || '-'}</span>
            </div>
            <div className={'item'}>
              <div>
                <Img src={'/img/study.png'} />
              </div>
              <span>{(userInfo && userInfo.majorName) || '-'}</span>
            </div>
          </div>
          <FocusBar thin light />
          <div className={'interest'}>관심사</div>
          <div className={'categories'}>
            {userInfo && userInfo.categories.length ? (
              userInfo.categories.map((category: any, index: number) => (
                <Box key={index} size={[80, 80]}>
                  <Category
                    shape={'square'}
                    img={`/img/category-${category.no - 1}.png`}
                    name={category.name}
                    id={category.no}
                  />
                </Box>
              ))
            ) : (
              <Intersted>
                <span>등록된 관심사가 없습니다</span>
              </Intersted>
            )}
          </div>
        </Box>
        <div className={'boards'}>
          <div className={'section'}>
            <div className={'title'}>내 스펙 관리</div>
            <Slide
              outsideBtn
              checkSelf={checkSelf}
              viewNumber={3}
              items={posts.profileSpecs}
              action={actions.specs}
              marginRight={32}
            />
          </div>
          <div className={'section'}>
            <div className={'title'}>해줄래요 이력</div>
            <PostSlide
              outsideBtn
              checkSelf={checkSelf}
              viewNumber={3}
              items={posts.profileToHelp}
              action={actions.toHelp}
              marginRight={32}
              isHelpPost
            />
          </div>
          <div className={'section'}>
            <div className={'title'}>구할래요 이력</div>
            <PostSlide
              outsideBtn
              checkSelf={checkSelf}
              viewNumber={3}
              items={posts.profileHelpMe}
              action={actions.helpMe}
              marginRight={32}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content;

  > .column {
    display: flex;
    flex-direction: column;
  }

  > .user {
    display: flex;
    width: 100%;
    justify-content: space-between;
    height: fit-content;
    margin: 40px 0 64px;
    > .box {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px 24px 73px;

      .profileHeader {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        .blank {
          width: 24px;
        }
        .name {
          padding-bottom: 24px;
          width: fit-content;
          position: static;
          * {
            display: inline-block;
          }
          > :nth-child(1) {
            font-size: 22px;
            line-height: 170%;
            font-family: 'Bold';
          }
        }

        .modifyBtn {
          width: 24px;
          height: 24px;
          background: #ffffff;
          box-shadow: 0px 0px 4px rgba(132, 131, 141, 0.25);
          border-radius: 6px;
          padding: 6px;
          cursor: pointer;
          &:hover {
            background: #e7e7e8;
          }
          &:active {
            background: #ff445e;
          }
        }
      }

      .profile {
        padding-bottom: 16px;
      }

      .register {
        * {
          display: inline-block;
        }
        padding-bottom: 16px;
        font-size: 12px;
        color: #a7a7ad;
      }
      .date {
        margin-left: 4px;
      }
    }
    .logout {
      font-size: 12px;
      color: #a7a7ad;
      padding-bottom: 32px;
    }
    .personal-info {
      width: 100%;
      height: fit-content;
      padding: 0 calc(56px - 24px) 32px;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      > :first-child {
        margin-bottom: 24px;
      }
      .item {
        width: 80px;
        height: 52px;
        color: #4f4e5c;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        line-height: 170%;
        div {
          width: 24px;
          height: 24px;
        }
      }
    }
    .interest {
      padding: 32px 0 16px;
      font-size: 14px;
      font-family: 'Bold';
    }
    .categories {
      width: 100%;
      height: fit-content;
      display: flex;
      justify-content: center;
      align-items: center;
      > :not(:last-child) {
        margin-right: 8px;
      }
    }
    > .boards {
      width: 748px;
      height: fit-content;

      > :not(:last-child) {
        margin-bottom: 32px;
      }
      > .section {
        width: 100%;
        height: fit-content;
        > .title {
          color: #4f4e5c;
          font-family: 'Bold';
          line-height: 170%;
          margin-bottom: 16px;
        }
        > .slide {
          width: 100%;
          height: 177px;
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
`;

const Intersted = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    font-size: 14px;
    font-weight: 400;
    color: #84838d;
    margin-top: 30px;
  }
`;

//TODO 정보수정 창 끈 후 다시 들어갈때 더블클릭 해야하는 이슈
