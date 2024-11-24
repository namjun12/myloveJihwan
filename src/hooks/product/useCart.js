import React, { useEffect, useState } from 'react'
import { CartItemsAtom, LoginInfoAtom } from '../../recoil/LoginInfoAtom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';

const useCart = (data) => {
   const pathname = useLocation().pathname;
   const LoginInfoValue = useRecoilValue(LoginInfoAtom);
   const [selectIndex, setSelectIndex] = useState(false);
   const [selectedItem, setSelectedItem] = useState("필수 옵션 선택");
   const [cartItems, setCartItems] = useRecoilState(CartItemsAtom);

   const purchasePrice = data.price - (data.discount === null ? 0 : data.discount);

   useEffect(() => {
      setCartItems({
         items: [],
         total: {
            quantity: 0,
            price: 0,
         }
      })
   }, [pathname])

   // 제품 id 2또는 3일 때
   useEffect(() => {
      const productType = data.id === 2 ? '마인드 리포트' : data.id === 3 ? '해석상담' : ''
      if (data.id === 2 || data.id === 3) {
         setCartItems((prev) => ({
            ...prev,
            items: [...prev.items, { name: productType, quantity: 1, price: data.price - data.discount }],
            total: {
               count: 1,
               price: data.price - data.discount
            }
         }));
      }
   }, [data])

   // 아이템 선택창 활성화/비활성화
   const handleSelectToggle = () => {
      setSelectIndex(prev => !prev);
   };

   // total 관련 데이터 업데이트
   const updateCartTotals = (updatedItems) => {
      // updatedItems 배열 안에 있는 item의 count 값을 모두 더함
      const totalItemsCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

      // updatedItems 배열 안에 있는 item의 price와 count를 곱함
      const totalPrice = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      // 총합 개수, 가격인 count, price를 반환
      return { count: totalItemsCount, price: totalPrice };
   };

   // 아이템을 선택했을 때
   const selectItem = (id, name, price, select_type, setIscounselorAlertVisible) => {
      // 이미 선택한 아이템이면 함수 종료
      if (cartItems.items.some(item => item.name === name)) {
         alert('이미 추가한 상품입니다.');
         return;
      }
      // 상담사 옵션 선택시 알림창 보여주기
      if (select_type === 1) {
         setIscounselorAlertVisible(true);
      }

      setSelectedItem(name); // UI적으로 현재 선택한 아이템을 보여줄 값 변경

      const newItem = { id: id, name, price: purchasePrice + price, quantity: 1 }; // 선택한 아이템
      const updatedItems = [...cartItems.items, newItem]; // 기존 아이템을 복사하고 선택한 아이템을 추가

      // 업데이트 된 데이터를 total 값을 구하는 함수에 담아서 호출, total 데이터를 업데이트
      const newTotals = updateCartTotals(updatedItems);

      // 최종 cartItems 데이터를 업데이트
      setCartItems((prev) => ({
         ...prev,
         items: updatedItems,
         total: newTotals
      }));
   };

   // 아이템 개수의 + 또는 - 버튼을 클릭하면
   const handleCountChange = (index, increment) => {
      setCartItems((prev) => {
         const updatedItems = prev.items.map((item, i) =>
            i === index ? { ...item, quantity: item.quantity + increment } : item
         ).filter(item => item.quantity > 0); // count: 0 이하 아이템 제거

         const newTotals = updateCartTotals(updatedItems);
         return { ...prev, items: updatedItems, total: newTotals };
      });
   };

   // 아이템 제거 버튼 클릭 시
   const handleRemoveCartItem = (index) => {
      setCartItems((prev) => {
         const updatedItems = prev.items.filter((_, i) => i !== index);
         const newTotals = updateCartTotals(updatedItems);

         return { ...prev, items: updatedItems, total: newTotals };
      });
   };

   // 구매하기 버튼 클릭 시
   const navigate = useNavigate();
   const handleSubmit = () => {
      if (cartItems.items.length < 1) {
         alert('옵션을 선택해 주세요.');
         return;
      }
      const selectedOptionData = encodeURIComponent(JSON.stringify(cartItems.items.map((item) => (item))))
      navigate(`/order?id=${data.id}&select-option=${selectedOptionData}`)
   }

   return {
      LoginInfoValue,
      cartItems,
      selectIndex,
      selectedItem,
      purchasePrice,
      handleSelectToggle,
      selectItem,
      handleCountChange,
      handleRemoveCartItem,
      handleSubmit
   }
}

export default useCart