import store from '../redux/root';
import decodingToken from './decodingToken';
import { getUserData } from '../redux/user/reducer';

export const loginCheck = () => {
  const data = decodingToken();
  
  if (data) {
    try {
      store.dispatch(getUserData(data?.userNo));
    } catch (err: any) {
      console.log(err);
    }
  }
};
