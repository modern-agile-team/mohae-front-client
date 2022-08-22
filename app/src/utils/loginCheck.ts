import store from '../redux/root';
import decodingToken from './decodingToken';
import { getUserData } from '../redux/user/reducer';

export const loginCheck = () => {
  const data = decodingToken();

  try {
    store.dispatch(getUserData(data?.userNo));
  } catch (err: any) {
    if (err.response.status === 410) {
      alert('세션이 만료되었습니다');
      sessionStorage.clear();
    }
  }
};
