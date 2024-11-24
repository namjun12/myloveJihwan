import React, { useState } from 'react'
import useIsMobile from '../../hooks/useIsMobile'
import CounselorOptionAlert from '../common/CounselorOptionAlert'

const ProductCart = ({ cartData, data }) => {

   const selectType = cartData.LoginInfoValue === false ? '비회원' : cartData.LoginInfoValue.member_type === 0 ? '일반' : '상담사'
   const noOptions = data.option.length < 1
   const therapyIdList = [4, 5, 6, 7, 8]
   const isTherapy = therapyIdList.some((item) => item === data.id);

   // 상담사 옵션 선택시 알림창
   const [iscounselorAlertVisible, setIscounselorAlertVisible] = useState(false);

   return (
      <>
         {!noOptions &&
            <div
               onClick={cartData.handleSelectToggle}
               className={`course-select-wrap ${cartData.selectIndex ? "active" : ''}`}
            >
               <div className="course-select col-group">
                  <div className="select-value">{cartData.selectedItem}</div>
               </div>
               <div className="option-list row-group">
                  {data.option
                     .filter(item => selectType !== '비회원' && selectType !== '일반' || item.select_type !== 1)
                     .filter(item => !isTherapy || item.show_type === 1).length < 1 ? (
                     <div className="option-item">현재 구매 가능한 옵션이 없습니다.</div>
                  ) : (
                     data.option
                        .filter(item => selectType !== '비회원' && selectType !== '일반' || item.select_type !== 1)
                        .filter(item => !isTherapy || item.show_type === 1).map((item, index) => (
                           <div
                              onClick={() => cartData.selectItem(item.id, item.name, item.price, item.select_type, setIscounselorAlertVisible)}
                              className="option-item"
                              key={index}
                           >
                              {item.name}
                              <span>
                                 &nbsp;&#40;+{item.price.toLocaleString()}원&#41;
                              </span>
                              {isTherapy && <span>&nbsp;&#40;{item.out_limit_people}/{item.limit_people}&#41;</span>}
                           </div>
                        )
                        ))}
               </div>
            </div>
         }
         <div className="prod-option-list row-group">
            {cartData.cartItems.items.map((cartItem, index) => (
               <div className="prod-option-item row-group" key={index}>
                  <p className="prod-option-title">{cartItem.name}</p>
                  <div className="prod-option-group col-group">
                     <div className="prod-option-amount-group col-group">
                        <button
                           onClick={() => cartData.handleCountChange(index, -1)}
                           className="prod-option-amount-btn amount-minus"
                           disabled={cartItem.quantity <= 1}
                        >
                           <i className="xi-minus"></i>
                        </button>
                        <span className="prod-option-amount-count">{cartItem.quantity}</span>
                        <button
                           onClick={() => cartData.handleCountChange(index, 1)}
                           className="prod-option-amount-btn amount-plus"
                        >
                           <i className="xi-plus"></i>
                        </button>
                     </div>
                     <div className="col-group">
                        <p className="prod-option-price">
                           <strong>{cartItem.price.toLocaleString()}</strong>원
                        </p>
                        {data.id !== 2 && data.id !== 3 &&
                           <button onClick={() => cartData.handleRemoveCartItem(index)}>
                              <i className="xi-close-thin del-btn"></i>
                           </button>
                        }
                     </div>
                  </div>
               </div>
            ))}
         </div>
         <div className="price-box price-total-box col-group">
            <p className="item-default">총 상품 금액</p>
            <div className="item-user col-group">
               <p className="amount">총 수량 {cartData.cartItems.total.count}개</p>
               <p className="price red">{cartData.cartItems.total.price.toLocaleString()}원</p>
            </div>
         </div>
         {iscounselorAlertVisible &&
            <CounselorOptionAlert
               iscounselorAlertVisible={iscounselorAlertVisible}
               setIscounselorAlertVisible={setIscounselorAlertVisible}
            />
         }
      </>
   )
}

const SubmitBtn = ({ cartData, data, isActive, setIsActive }) => {

   const isMobile = useIsMobile();

   return (
      <div className="btn-wrap col-group">
         <button className="btn share-btn" type="button">
            <i></i>
         </button>
         {data.buy_btn_type === 0 ? (
            <button onClick={() => { alert('현재 구매가 불가능한 상품입니다.'); return }} className="btn submit-btn confirm disable">구매하기</button>
         ) : !isMobile || isActive ? (
            <button
               onClick={cartData.handleSubmit}
               className="btn submit-btn confirm"
            >
               구매하기
            </button>
         ) : (
            <button
               onClick={() => setIsActive(true)}
               className="btn submit-btn confirm"
            >
               구매하기
            </button>
         )}
      </div>
   )
}

const PriceBox = ({ cartData, data }) => {
   return (
      <div className="detail-item price-box col-group">
         <p className="item-default">기본가</p>
         <div className="item-user col-group">
            {data.percent !== null && <p className="percent">{data.percent}%</p>}
            <p className="price">{cartData.purchasePrice.toLocaleString()}원</p>
            {data.discount !== null && <p className="before">{data.price.toLocaleString()}원</p>}
         </div>
      </div>
   )
}

export { ProductCart, SubmitBtn, PriceBox };