/** @format */

const getToken = () => {
  return sessionStorage.getItem('userAccessToken') || '';
};

export default getToken;
