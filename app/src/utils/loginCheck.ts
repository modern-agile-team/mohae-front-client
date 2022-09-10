import store from '../redux/root';
import decodingToken from './decodingToken';
import { getUserData, remove_user } from '../redux/user/reducer';

export const loginCheck = () => {
  const data = decodingToken();

  try {
    store.dispatch(getUserData(data?.userNo));
  } catch (err: any) {
    console.log(err);
  }
};
