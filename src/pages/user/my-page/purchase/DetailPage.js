import React from 'react'

const PurchaseDetailPage = () => {
   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap col-group">
            <h2 className="mp-main-title">
               <span className="mb">My 쇼핑 <i></i></span>
               구매내역 상세
            </h2>
            <div className="mp-main-txt-group col-group">
               <p className="mp-main-txt">
                  <strong>
                     2024.12.01 08:00 주문
                  </strong>
               </p>
               <p className="mp-main-txt">
                  주문번호 A123456789
               </p>
            </div>
         </div>

         <div className="mp-section-wrap row-group">
            <div className="mp-section">
               <div className="table-wrap prod-table-wrap">
                  <table className="prod-table">
                     <colgroup>
                        <col width="60%" />
                     </colgroup>
                     <thead>
                        <tr>
                           <th className="left">
                              상품정보
                           </th>
                           <th>
                              결제금액
                           </th>
                           <th>
                              상태
                           </th>
                           <th>
                              관리
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
                                    <p className="prod-table-item-option mb">
                                       <strong>결제완료</strong>
                                    </p>
                                 </div>
                              </div>
                           </td>
                           <td>
                              <div className="mb-prod-item-title">
                                 결제금액
                              </div>
                              <p className="prod-item-txt">
                                 <strong>300,000</strong>원
                              </p>
                           </td>
                           <td>
                              <div className="mb-prod-item-title">
                                 상태
                              </div>
                              <p className="prod-item-txt">
                                 <strong>결제완료</strong>
                              </p>
                           </td>
                           <td>
                              <div className="prod-table-btn-group row-group">
                                 <button className="prod-table-btn gray cancel_btn">
                                    환불요청
                                 </button>
                              </div>
                           </td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
            <div className="mp-section">
               <div className="mp-section-title">
                  최종 결제 정보
               </div>
               <div className="order-detail-list row-group">
                  <div className="order-detail-item col-group">
                     <div className="item-default">
                        상품 합계
                     </div>
                     <div className="item-user">
                        <strong>340,000</strong>원
                     </div>
                  </div>
                  <div className="order-detail-item col-group">
                     <div className="item-default red">
                        상품 할인
                     </div>
                     <div className="item-user red">
                        <strong className="red">- 100,000</strong>원
                     </div>
                  </div>
                  <div className="order-detail-item col-group">
                     <div className="item-default">
                        <strong>최종 결제 금액</strong>
                     </div>
                     <div className="item-user">
                        <div className="total-price blue">
                           <strong className="blue">240,000</strong>원
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PurchaseDetailPage