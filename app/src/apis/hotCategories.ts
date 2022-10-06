import { Dispatch, SetStateAction } from 'react';
import { HotCategoriesType } from '../types/searchComponent/dataList/type';
import { ENDPOINT } from '../utils/ENDPOINT';
import { customAxios } from './instance';

const requestHotCategories = async (
  seter: Dispatch<SetStateAction<HotCategoriesType[]>>,
) => {
  try {
    await customAxios.get(`${ENDPOINT}categories/popular`).then(res => {
      const addRanking: HotCategoriesType[] = Object.keys(
        res.data.response,
      ).map(el => {
        return { ...res.data.response[el], ranking: Number(el) + 1 };
      });

      seter([...addRanking]);
    });
  } catch (err: any) {
    alert(err.response.data.error.message);
  }
};
export default requestHotCategories;
