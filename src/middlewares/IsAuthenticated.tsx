import Cookies from 'js-cookie';

export const isAuthenticated = () => {
  // const token = Cookies.get('us_b2b_admin');
  const token = Cookies.get('cld_ath');
  return !!token; 
};
