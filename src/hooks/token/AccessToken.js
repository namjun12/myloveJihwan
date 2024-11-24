import Cookies from 'js-cookie';

const AccessToken = () => {
   const accessToken = Cookies.get('access_token');
   
   if (accessToken) {
      return accessToken
   }
}

export default AccessToken