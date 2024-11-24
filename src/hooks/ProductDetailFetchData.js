import axios from 'axios';
import { useEffect, useState } from 'react';

const useProductFetchData = (productId) => {
   const [fetchData, setFetchData] = useState();
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/detail`, { id: productId })
            setFetchData(response.data.data)
         } catch (error) {
            console.error(error)
            if (error.response?.status === 500) {
               alert('일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
               window.location.href = '/'
            }
            return null;
         }
      }
      fetchData();
   }, [])
   return fetchData;
}

export default useProductFetchData;