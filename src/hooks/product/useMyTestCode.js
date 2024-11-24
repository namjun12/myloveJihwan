import React, { useEffect, useState } from 'react'
import AccessToken from '../token/AccessToken';
import { authState } from '../../recoil/LoginInfoAtom';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const useMyTestCode = () => {
   const accessToken = AccessToken();
   const authStateValue = useRecoilValue(authState);

   const navigate = useNavigate();
   const [userData, setUserData] = useState();
   const [isLoading, setIsLoading] = useState(false);

   // 상품 리스트 불러오기
   const myPageInsightTestList = async () => {
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/mypage/available/insight/list`, {}, {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
         })
         setUserData(response.data.data);
      } catch (error) {
         console.error(error);
         alert(error.response?.data.msg)
      }
   }
   useEffect(() => {
      if (authStateValue !== null && authStateValue === false) return; // 로그인 검증에서 통과 되지 않았으면 종료

      myPageInsightTestList();
   }, [authStateValue])

   // 사용하기 api 호출
   const handleUseProduct = async (index) => {
      setIsLoading(true);
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/mypage/use/insight`, {
            id: userData[index].id
         }, {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
         })
         if (response.status === 200) {
            navigate(`/mind-insight-test/index?inspect=${response.data.data}`)
         }
      } catch (error) {
         console.error(error);
         alert(error.response?.data.msg)
         window.location.reload();
      } finally {
         setIsLoading(false);
      }
   }

   // 선물(발송)하기 관련
   const [currentId, setCurrentId] = useState();
   const [recipientInfo, setRecipientInfo] = useState({
      name: '',
      phone: '',
      email: '',
      checked: false
   });
   const [giftArr, setGiftArr] = useState([]);

   const [showSendModal, setShowSendModal] = useState(false);

   // 선물(발송)하기 팝업
   const handleShowSendModal = (id) => {
      if (id) { setCurrentId(id) } // 현재 선물할 id를 저장함, 닫기 버튼에서도 호출하기 때문에 id 유무 확인

      setGiftArr([]);
      setShowSendModal(prev => !prev);
   }

   // 선물(발송)할 사람 추가
   const addRecipient = () => {

      if (recipientInfo.name === '') {
         alert('이름을 입력해 주세요.')
         return;
      }
      if (recipientInfo.phone === '') {
         alert('휴대폰 번호를 입력해 주세요.')
         return;
      }
      alert('목록에 추가 되었습니다.')

      setGiftArr((prev) => [
         ...prev,
         {
            name: recipientInfo.name,
            phone: recipientInfo.phone,
            email: recipientInfo.email,
            checked: recipientInfo.checked
         }
      ])
      setRecipientInfo({
         name: '',
         phone: '',
         email: ''
      })
   }

   // 선물(발송)할 사람 정보 업데이트
   const changeGiftArr = (e) => {
      const { name, value } = e.target;

      setRecipientInfo((prev) => ({
         ...prev,
         [name]: value
      }))
   }

   // ===== 선물(발송)할 사람 삭제 =====
   // 전체선택(해제)
   const handleCheckAll = (e) => {
      const checked = e.target.checked;

      setGiftArr((prev) =>
         prev.map((item) => ({
            ...item,
            checked: checked
         }))
      )
   }
   // 선택 삭제
   const selectedRecipientRemove = () => {
      if (window.confirm('선택한 항목을 삭제하시겠습니까?')) {
         setGiftArr((prev) => prev.filter((item) => !item.checked));
      }
   }
   // 전체 삭제
   const removeAllRecipient = () => {
      if (window.confirm('정말 모두 삭제하시겠습니까?')) { setGiftArr([]) }
   }

   // checked 값 변경
   const SelectToRemove = (index) => {
      setGiftArr((prev) => {
         const updateData = [...prev]

         updateData.forEach((item, itemIndex) => {
            if (itemIndex === index) {
               item.checked = !item.checked;
            }
         });

         return updateData;
      })
   }

   // 최신화 된 사용가능 수량
   const [useQuantity, setUseQuantity] = useState(false);

   // 선물(발송)하기 api 호출
   const handleSendProduct = async (isCounselor, switchOn) => {
      const apiType = isCounselor ? 'send' : 'gift'

      if (giftArr.length < 1) {
         alert('선물할 대상을 등록해 주세요.')
         return;
      }
      if (!window.confirm('발송 후 취소가 불가합니다. 발송하시겠습니까?')) return;

      setIsLoading(true)
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/mypage/${apiType}/insight`, {
            id: currentId,
            ...(!isCounselor && { giftArr: giftArr }), // 일반 회원일 때
            ...(isCounselor && { sendArr: giftArr }), // 상담사 회원일 때
            ...(isCounselor && { show_type: switchOn ? 0 : 1 }) // 상담사 회원일 때
         }, {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
         })
         setUseQuantity(response.data.data.use_quantity)
         if (response.status === 200) {
            if (response.data.data.failUserArr.length >= 1) {
               alert('전송이 완료되지 않은 선물이 있습니다. 목록에 남아 있는 항목을 확인 후 다시 시도해 주세요.')
               setGiftArr(() => [
                  ...response.data.data.failUserArr.map((item) => item)
               ]);
            } else {
               alert('선물이 모두 완료 되었습니다.')
               setShowSendModal(false);
            }
         }
      } catch (error) {
         console.error(error)
         if (error.status === 400) {
            alert(error.response?.data.msg)
         }
      } finally {
         setIsLoading(false);
         myPageInsightTestList();
      }
   }

   return {
      userData,
      isLoading,
      currentId,
      recipientInfo,
      giftArr,
      showSendModal,
      useQuantity,
      setUserData,
      handleUseProduct,
      handleShowSendModal,
      addRecipient,
      changeGiftArr,
      handleCheckAll,
      selectedRecipientRemove,
      removeAllRecipient,
      SelectToRemove,
      handleSendProduct
   }
}

export default useMyTestCode