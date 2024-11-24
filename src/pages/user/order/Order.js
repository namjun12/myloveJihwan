import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

// Hooks
import AccessToken from '../../../hooks/token/AccessToken';

// Components
import Loading from '../../../components/common/Loading';

// Images, Videos
import { images } from '../../../assets/images'
import DOMPurify from 'dompurify';

const Order = () => {

   const accessToken = AccessToken();

   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const productId = JSON.parse(decodeURIComponent(searchParams.get('id')))
   const optionData = JSON.parse(decodeURIComponent(searchParams.get('select-option')));
   const noOption = productId === 2 || productId === 3

   // 페이지 접속했을 때 정보 불러오는 API 호출
   const [orderData, setOrderData] = useState();
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/payment`, {
               id: productId,
               ...(!noOption && { selectOptionArr: optionData }),
               ...(noOption && { no_option_quantity: optionData[0].quantity })
            }, {
               headers: {
                  Authorization: `Bearer ${accessToken}`
               }
            })
            setOrderData(response.data.data)
         } catch (error) {
            console.error(error)
            if (error.response?.status === 400) {
               alert(error.response?.data.msg);
               window.history.back();
            }
            if (error.response?.status === 500) {
               alert('일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
               window.location.href = '/'
            }
         }
      }
      fetchData();
   }, [])

   const [resultData, setResultData] = useState({
      totalPrice: 0,
      totalDiscount: 0
   });
   useEffect(() => {
      if (!orderData) return;

      const baseCost = orderData.product.price;
      const discountPrice = orderData.product.discount ? orderData.product.discount : 0;

      if (noOption) {
         setResultData((prev) => ({
            ...prev,
            totalPrice: baseCost * orderData.product.select_quantity,
            totalDiscount: (discountPrice * orderData.product.select_quantity)
         }))
      } else {
         orderData.option.map((option) => (
            setResultData((prev) => ({
               ...prev,
               totalPrice: prev.totalPrice + (option.price + baseCost) * option.select_quantity,
               totalDiscount: prev.totalDiscount + (discountPrice * option.select_quantity)
            }))
         ))
      }
   }, [orderData])

   // ===== 필수항목 동의 =====
   const [agreementInfo, setAgreementInfo] = useState({
      checkAll: false,
      checkType1: false,
      checkType2: false,
      checkType3: false,
   });

   const handleAgreementChange = (e) => {
      const { name, checked } = e.target;

      if (name === 'checkAll') {
         setAgreementInfo((prev) => ({
            ...prev,
            checkAll: checked,
            checkType1: checked,
            checkType2: checked,
            checkType3: checked,
         }))
      } else {
         setAgreementInfo((prev) => {
            const updateData = {
               ...prev,
               [name]: checked
            };

            const isAllChecked = updateData.checkType1 && updateData.checkType2 && updateData.checkType3
            return { ...updateData, checkAll: isAllChecked }
         })
      }
   }

   // ===== 결제하기 =====
   const [payType, setPayType] = useState(null);
   const [payData, setPayData] = useState(null);

   const handlePayTypeChange = (type) => {
      if (payType !== type) {
         setPayType(type)
      }
   }

   // 결제하기 클릭했을 때
   const orderSubmit = async () => {
      if (payType === null) {
         alert('결제방식을 선택해 주세요.');
         return;
      }

      const isAgreementAllCheck = agreementInfo.checkAll
      if (!isAgreementAllCheck) {
         alert('필수 항목에 모두 동의해 주세요.')
         return;
      }

      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/payment/before`, {
            id: productId,
            pay_type: payType,
            pay_money: resultData.totalPrice - resultData.totalDiscount,
            ...(noOption && { no_option_quantity_payment: optionData[0].quantity }),
            ...(!noOption && { purchaseArr: optionData })
         }, {
            headers: {
               Authorization: `Bearer ${accessToken}`
            }
         })
         setPayData(response.data.data);
      } catch (error) {
         console.error(error)
         alert(error.response?.data.msg)
      }
   }

   // 포트원 연결 API
   useEffect(() => {
      if (!payData) return

      const fetchPortOne = async () => {

         const IMP = window.IMP;
         IMP.init(payData.imp);
         IMP.request_pay(
            {
               pg: payData.pg,
               pay_method: payData.pay_method,
               merchant_uid: payData.merchant_uid,
               name: payData.name,
               amount: payData.amount,
               notice_url: payData.notice_url,
               m_redirect_url: 'https://mindimpact.kr/order/done',
            },
            function (response) {
               // 결제 종료 시 호출되는 콜백 함수
               if (response.success) {
                  navigate(`/order/done?merchant_uid=${payData.merchant_uid}`)
               }
               if (!response.success) {
                  alert(response.error_msg)
               }
            },
         );
      }
      fetchPortOne();

   }, [payData])

   // 필수 정보가 없을 때
   if (!productId && !optionData) {
      alert('잘못된 접근입니다.')
      window.location.href = '/'

      return;
   }
   // 데이터가 없으면 로딩 표시
   if (!orderData) {
      return <Loading />
   }

   const therapyIdList = [4, 5, 6, 7, 8]
   const isTherapy = therapyIdList.some((item) => item === orderData.product.id);

   return (
      <div className="subpage order">
         <div className="routeBox">
            <div className="container">
               <div className="le-wrap">
                  <i className="icon"></i>
                  <p className="title">주문/결제</p>
               </div>
               <div className="ri-wrap">
                  <p className="route-title">장바구니</p>
                  <i className="route-icon"></i>
                  <p className="route-title now">주문/결제</p>
                  <i className="route-icon"></i>
                  <p className="route-title">완료</p>
               </div>
            </div>
         </div>
         <div className="container">
            <div className="order-container col-group">
               <div className="order-wrap row-group">
                  <div className="order-section">
                     <div className="order-sec-title-wrap col-group">
                        <h2 className="order-sec-title">
                           상품정보
                        </h2>
                     </div>
                     <div className="order-detail-list row-group">
                        <div className="order-detail-item">
                           <div className="prod-item col-group">
                              <div className="img-box">
                                 <img src={orderData.product.file.file_addr} alt="" />
                              </div>
                              <div className="txt-wrap row-group">
                                 <div className="title-group row-group">
                                    <p className="eng-title">
                                       Mind Insight
                                    </p>
                                    <p className="title">{orderData.product.name}</p>
                                    <p
                                       dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(orderData.product.content_1) }}
                                       className="txt"
                                    />
                                 </div>
                                 <div className="prod-price-wrap col-group">
                                    <p className="title">
                                       기본가
                                    </p>
                                    <div className="prod-price-group col-group">
                                       {orderData.product.percent !== null && <p className="percent">{orderData.product.percent}%</p>}
                                       <p className="price">
                                          <strong>{(orderData.product.price - orderData.product.discount).toLocaleString()}</strong>원
                                       </p>
                                       {orderData.product.discount !== null && <p className="before">{orderData.product.price.toLocaleString()}원</p>}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {noOption ? (
                           <div div className="order-detail-item">
                              <div className="prod-option-wrap col-group">
                                 <div className="prod-option-group row-group">
                                    <p className="title">{orderData.product.name}</p>
                                    <p className="txt">수량&nbsp;:&nbsp;{orderData.product.select_quantity}</p>
                                 </div>
                                 <p className="price">
                                    <strong>
                                       {((orderData.product.price - orderData.product.discount) * orderData.product.select_quantity).toLocaleString()}
                                    </strong>원
                                 </p>
                              </div>
                           </div>
                        ) : (
                           orderData.option.map((option, index) => (
                              <div className="order-detail-item" key={index}>
                                 <div className="prod-option-wrap col-group">
                                    <div className="prod-option-group row-group">
                                       <p className="title">
                                          {option.name}&nbsp;&#40;+&nbsp;{option.price.toLocaleString()}원&#41;
                                          {isTherapy &&
                                             <span className="red">{option.no_refund_date} 이후 환불불가</span> //마인드 테라피에서만 보여지는 텍스트
                                          }
                                       </p>
                                       <p className="txt">수량&nbsp;:&nbsp;{option.select_quantity}</p>
                                    </div>
                                    <p className="price">
                                       <strong>
                                          {((orderData.product.price - orderData.product.discount + option.price) * option.select_quantity).toLocaleString()}
                                       </strong>원
                                    </p>
                                 </div>
                              </div>
                           )))}
                     </div>
                  </div>
                  <div className="order-section">
                     <div className="order-sec-title-wrap">
                        <h2 className="order-sec-title">
                           결제 방법
                        </h2>
                     </div>
                     <div className="payment-method-group col-group">
                        <label
                           onClick={() => { handlePayTypeChange(0) }}
                           for="payment_1"
                           className="payment-method"
                        >
                           <input type="radio" id="payment_1" name="payment_type" className="form-checkbox" />
                           <div className="payment-method-item col-group">
                              <p className="payment-method-title">신용/체크카드</p>
                           </div>
                        </label>
                        {/* <label for="payment_2" className="payment-method">
                           <input type="radio" id="payment_2" name="payment_type" className="form-checkbox" />
                           <div className="col-group"></div>
                           <div className="payment-method-item col-group">
                              <img src={images.icon_naver_pay} alt="" className="img" />
                              <p className="payment-method-title">네이버페이</p>
                           </div>
                        </label> */}
                        <label
                           onClick={() => { handlePayTypeChange(2) }}
                           for="payment_3"
                           className="payment-method"
                        >
                           <input type="radio" id="payment_3" name="payment_type" className="form-checkbox" />
                           <div className="payment-method-item col-group">
                              <img src={images.icon_kakao_pay} alt="" className="img" />
                              <p className="payment-method-title">카카오페이</p>
                           </div>
                        </label>
                     </div>
                  </div>
               </div>
               <div className="order-sticky-wrap">
                  <h2 className="order-sec-title">
                     결제정보
                  </h2>
                  <div className="order-price-wrap row-group">
                     <div className="order-price-group row-group">
                        <div className="order-price-item col-group">
                           <p className="item-default">
                              <strong>상품합계</strong>
                           </p>
                           <p className="item-user">
                              {resultData.totalPrice.toLocaleString()} 원
                           </p>
                        </div>
                     </div>
                     <div className="order-price-group row-group">
                        <div className="order-price-item col-group">
                           <p className="item-default">
                              상품할인
                           </p>
                           <p className="item-user">
                              <span className="blue">
                                 - {resultData.totalDiscount.toLocaleString()} 원
                              </span>
                           </p>
                        </div>
                     </div>
                     <div className="order-price-group order-total-price-group row-group">
                        <div className="order-price-item col-group">
                           <p className="item-default">
                              최종 결제금액
                           </p>
                           <p className="item-user">
                              <strong className="red">{(resultData.totalPrice - resultData.totalDiscount).toLocaleString()}</strong> 원
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="policy-agree-wrap row-group">
                     <label for="agree_all">
                        <input
                           onChange={handleAgreementChange}
                           checked={agreementInfo.checkAll}
                           name='checkAll'
                           type="checkbox"
                           className="form-checkbox"
                           id="agree_all"
                        />
                        <div className="checked-item checked-all-item col-group">
                           <div className="icon">
                              <i className="xi-check"></i>
                           </div>
                           <p className="txt">
                              전체 동의하기
                           </p>
                        </div>
                     </label>
                     <label for="agree_1">
                        <input
                           onChange={handleAgreementChange}
                           checked={agreementInfo.checkType1}
                           name='checkType1'
                           type="checkbox"
                           className="form-checkbox"
                           id="agree_1"
                        />
                        <div className="checked-item col-group">
                           <div className="icon">
                              <i className="xi-check"></i>
                           </div>
                           <div className="txt col-group">
                              [필수] 개인정보 수집 및 이용 동의
                              <Link to="" className="link">상세보기</Link>
                           </div>
                        </div>
                     </label>
                     <label for="agree_2">
                        <input
                           onChange={handleAgreementChange}
                           checked={agreementInfo.checkType2}
                           name='checkType2'
                           type="checkbox"
                           className="form-checkbox"
                           id="agree_2"
                        />
                        <div className="checked-item col-group">
                           <div className="icon">
                              <i className="xi-check"></i>
                           </div>
                           <div className="txt col-group">
                              [필수] 개인정보 제 3자 제공 동의
                              <Link to="" className="link">상세보기</Link>
                           </div>
                        </div>
                     </label>
                     <label for="agree_3">
                        <input
                           onChange={handleAgreementChange}
                           checked={agreementInfo.checkType3}
                           name='checkType3'
                           type="checkbox"
                           className="form-checkbox"
                           id="agree_3"
                        />
                        <div className="checked-item col-group">
                           <div className="icon">
                              <i className="xi-check"></i>
                           </div>
                           <div className="txt col-group">
                              [필수] 전자결제대행 이용 동의
                              <Link to="" className="link">상세보기</Link>
                           </div>
                        </div>
                     </label>
                  </div>

                  <button
                     onClick={() => orderSubmit()}
                     className="submit-btn"
                  >
                     결제하기
                  </button>
               </div>
               <div className="test-guide-txt-wrap">
                  <p className="title">
                     마인드 아이티 상품 환불 정책
                  </p>
                  <div className="test-guide-txt-group row-group">
                     <div className="test-guide-txt row-group">
                        <p className="default">
                           1. 마인드 인사이트
                        </p>
                        <p className="user">
                           마인드 인사이트를 시작했거나 완료한 경우에는 환불되지 않습니다.
                        </p>
                     </div>
                     <div className="test-guide-txt row-group">
                        <p className="default">
                           2. 마인드 리포트
                        </p>
                        <p className="user">
                           주문 제작 상품으로 환불 및 반품이 불가합니다.
                        </p>
                     </div>
                     <div className="test-guide-txt row-group">
                        <p className="default">
                           3. 해석상담
                        </p>
                        <p className="user">
                           아래와 같은 경우 환불이 불가합니다. <br />
                           1&#41; 상담이 시작된 경우 <br />
                           2&#41; 상담 당일에 사전 협의 없이 참석하지 않은 경우
                        </p>
                     </div>
                     <div className="test-guide-txt row-group">
                        <p className="default">
                           4. 마인드 테라피
                        </p>
                        <p className="user">
                           1&#41; 10일전 100% 환불 <br />
                           2&#41; 7일전 50% 환불 <br />
                           3&#41; 3일전부터 환불불가
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div >
   )
}

export default Order