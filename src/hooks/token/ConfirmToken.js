import axios from 'axios'
import AccessToken from './AccessToken'

// Recoil
import { authState } from '../../recoil/LoginInfoAtom';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';

const useConfirmToken = () => {
   const accessToken = AccessToken();
   const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
   const [tokenData, setTokenData] = useState();

   useEffect(() => {
      const fetchData = async () => {
         // accessToken이 없으면 함수 종료, false 반환
         if (!accessToken) {
            setIsAuthenticated(false)
            return;
         };

         // accessToken을 헤더에 담아서 post 요청
         try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/token/check`, {}, {
               headers: {
                  Authorization: `Bearer ${accessToken}`
               }
            })

            if (response.status === 200) {
               setIsAuthenticated(true);
               setTokenData(response.data.data)
            }
         } catch (error) {
            setIsAuthenticated(false);
            console.error(error)
            if (error.response?.status === 400) {
               alert('유효하지 않은 토큰입니다.');
               // window.location.href = '/';
            }
         }
      }
      fetchData();
   }, [accessToken, setIsAuthenticated])

   return tokenData;
}

export default useConfirmToken;