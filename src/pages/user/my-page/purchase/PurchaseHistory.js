import React, { useState } from 'react'

// Components
import Pagination from '../../../../components/common/Pagination'
import Request from '../../../../components/user/refund-request/Request'
import { Link } from 'react-router-dom';

const PurchaseHistory = () => {

   const [requestPopupIndex, setRequestPopupIndex] = useState(false);

   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap border col-group">
            <h2 className="mp-main-title">
               <span className="mb">My 쇼핑 <i></i></span>
               구매내역
            </h2>
            <a href="mypage_02_02_01.html" className="mp-main-btn">환불내역</a>
            <div className="search-wrap">
               <input type="text" className="search-input" placeholder="주문번호를 입력하세요" />
               <button className="search-btn">
                  <i></i>
               </button>
            </div>
         </div>

         <div className="mp-date-search-wrap col-group">
            <div className="mp-date-search-item col-group">
               <div className="mp-date-search-group col-group">
                  <label htmlFor="type_01" className="mp-month-item">
                     <input type="radio" id="type_01" name="type" className="form-checkbox" />
                     <p className="mp-month-title row-group">전체보기</p>
                  </label>
                  <label htmlFor="type_02" className="mp-month-item">
                     <input type="radio" id="type_02" name="type" className="form-checkbox" />
                     <p className="mp-month-title row-group">마인드 인사이트</p>
                  </label>
                  <label htmlFor="type_03" className="mp-month-item">
                     <input type="radio" id="type_03" name="type" className="form-checkbox" />
                     <p className="mp-month-title row-group">마인드 테라피</p>
                  </label>
               </div>
            </div>
            <div className="mp-date-search-item col-group">
               <p className="mp-date-search-txt">
                  기간 조회
               </p>
               <div className="mp-date-search-group mp-date-input-group col-group">
                  <input type="date" className="mp-date-input" />
                  -
                  <input type="date" className="mp-date-input" />
               </div>
               <button className="mp-date-search-btn">
                  조회
               </button>
            </div>
         </div>

         <div className="mp-section-wrap row-group">
            <div className="mp-section">
               <div className="table-wrap prod-table-wrap prod-table-top">
                  <table className="prod-table">
                     <colgroup>
                        <col width="40%" />
                     </colgroup>
                     <thead>
                        <tr>
                           <th className="left">
                              상품정보
                           </th>
                           <th>
                              주문번호/주문일자
                           </th>
                           <th>
                              수량
                           </th>
                           <th>
                              결제금액
                           </th>
                           <th>
                              상세
                           </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td>
                              <div className="prod-table-item col-group">
                                 <div className="img-box">
                                    <img src="images/mainbanner.jpg" alt="" />
                                 </div>
                                 <div className="txt-wrap row-group">
                                    <p className="prod-item-label">
                                       Mind Insight
                                    </p>
                                    <p className="prod-item-title">
                                       마인드 인사이트
                                    </p>
                                    <p className="prod-table-item-option">
                                       옵션 : 마인드 인사이트 + 마인드 리포트 (+ 20,000원)
                                       <span className="mb">/ 2개</span>
                                    </p>
                                    <p className="prod-table-item-option mb">
                                       <span className="before">200,000원</span>
                                       <strong>140,000</strong>원
                                    </p>
                                    <p className="prod-table-item-option red">
                                       2024.12.19. 00:00 이후 환불불가
                                    </p>
                                 </div>
                              </div>
                           </td>
                           <td className="top">
                              <div className="prod-item-order-group row-group">
                                 <Link to="/my-page/purchase/detail" className="prod-item-order-number">
                                    A12345678910
                                 </Link>
                                 <p className="prod-item-txt">
                                    2024.12.01 08:00
                                 </p>
                              </div>
                           </td>
                           <td>
                              <p className="prod-item-txt">
                                 <strong>2</strong>
                              </p>
                           </td>
                           <td>
                              <p className="prod-item-txt">
                                 <strong>300,000</strong>원
                              </p>
                           </td>
                           <td>
                              <div className="prod-table-btn-group row-group">
                                 <button className="prod-table-btn gray cancel_btn">
                                    환불요청
                                 </button>
                                 <Link to="/my-page/purchase/detail" className="prod-table-btn">
                                    상세보기
                                 </Link>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>

               <Pagination />
            </div>
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
                     마인드 인사이트는 구매 후 4주 동안 유효합니다. 유효기간 동안 진행하지 않았다면 결제한 수단으로 환불 가능합니다. <br />
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
         <div className='popup-wrap'>
            <Request
               requestPopupIndex={requestPopupIndex}
               setRequestPopupIndex={setRequestPopupIndex}
            />
         </div>
      </div>
   )
}

export default PurchaseHistory