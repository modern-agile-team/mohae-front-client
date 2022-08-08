import getToken from './getToken';
import { decodeToken } from 'react-jwt';

interface DecodingToken {
  email: string;
  exp: number;
  expiration: string;
  iat: number;
  issuer: string;
  manager: number;
  nickname: string;
  photoUrl: string;
  userNo: number;
}

const decodingToken = (): DecodingToken | null => {
  return decodeToken(getToken());
};

export default decodingToken;
