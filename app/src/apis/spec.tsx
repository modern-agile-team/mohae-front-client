import setInterceptors from './common/setInterceptors';
import { customAxios } from './instance';

export interface Spec {
  paramNo?: string;
  takeParam: number;
}

export const getSpecData = (paramNo: string | undefined, takeParam: number) => {
  return setInterceptors(customAxios).get(
    `specs/profile?user=${paramNo}&take=${takeParam}&page=1`,
  );
};
