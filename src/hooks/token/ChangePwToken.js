import Cookies from 'js-cookie';

const ChangePwToken = () => {
  const token = Cookies.get('ch_pwd_member')
  return token && token;
}

export default ChangePwToken