import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

export interface Spec {
  paramNo?: string;
  takeParam: number;
}

export interface FindSpec extends Spec {
  target: string;
}

export const getSpecData = (paramNo: string | undefined, takeParam: number) => {
  return setInterceptors(customAxios).get(
    `specs/profile?user=${paramNo}&take=${takeParam}&page=1`,
  );
};

export const getFindSpecData = (
  paramNo: string | undefined,
  takeParam: number,
  target: string,
) => {
  return setInterceptors(customAxios).get(
    `boards/profile?user=${paramNo}&take=${takeParam}&page=1${target}`,
  );
};
