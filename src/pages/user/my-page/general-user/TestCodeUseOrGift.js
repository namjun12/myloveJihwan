import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useMyTestCode from '../../../../hooks/product/useMyTestCode.js';
import TestCodeSendModal from '../../../../components/product/TestCodeSendModal.js';
import LongTimeLoading from '../../../../components/common/LongTimeLoading.js';

const TestCodeUseOrGift = () => {

   const myTestCode = useMyTestCode();

   if (!myTestCode.userData) return;

   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap">
            <h2 className="mp-main-title">
               <span className="mb">My 정보 <i></i></span>
               검사코드 사용/선물
            </h2>
         </div>

         <div className="mp-guide-txt-wrap row-group">
            <p className="txt dot">
               아래 목록에서 사용/선물 하려는 항목을 선택한 후 목록 하단의 '사용하기' 또는 '선물하기' 버튼을 클릭하세요.
            </p>
            <p className="txt dot">
               '선물하기'화면에서 이메일을 입력하시면 온라인 검사 코드를 이메일로도 보내드립니다.
            </p>
            <p className="txt dot">
               '마인드 인사이트'는 온라인 심리 검사입니다. 검사를 진행하셔야 마인드 리포트, 해석상담 진행이 가능합니다.
            </p>
            <p className="txt dot">
               '마인드 리포트'는 마인드 인사이트 검사 결과를 책으로 발송해 드리는 실물 제품으로, 온라인 코드 수신시 주소를 입력하셔야 합니다.
            </p>
            <p className="txt dot">
               '해석상담'은 전문 상담사가 마인드 인사이트 검사 결과를 기반으로 1:1 상담을 해드리는 상품입니다.
            </p>
         </div>

         <div className="mp-section">
            <div className="table-wrap type01">
               <table>
                  <colgroup>
                     <col width="52%" />
                     <col width="15%" />
                     <col width="15%" />
                     <col width="18%" />
                  </colgroup>
                  <thead>
                     <tr>
                        <th className="left">상품명</th>
                        <th>구매수량</th>
                        <th>사용가능 수량</th>
                        <th>사용/선물</th>
                     </tr>
                  </thead>
                  <tbody>
                     {myTestCode.userData.length >= 1 ? (
                        myTestCode.userData.map((data, index) => (
                           <tr key={index}>
                              <td>{data.option_name} </td>
                              <td className="center">
                                 <span className="mb">구매수량 :</span>
                                 {data.buy_quantity}
                              </td>
                              <td className="center">
                                 <strong className="mb">사용가능 수량 :</strong>
                                 <strong>{data.use_quantity}</strong>
                              </td>
                              <td className="center">
                                 <div className="table-btn-wrap col-group">
                                    <button
                                       onClick={() => myTestCode.handleUseProduct(index)}
                                       className="table-btn green"
                                    >
                                       사용하기
                                    </button>
                                    <button
                                       onClick={() => myTestCode.handleShowSendModal(data.id)}
                                       className="table-btn white"
                                    >
                                       선물하기
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))
                     ) : (
                        <tr>
                           <td colSpan="4" className="null">
                              <div className="null-txt row-group">
                                 <i className="icon"></i>
                                 내용이 존재하지 않습니다.
                              </div>
                           </td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>
         {myTestCode.showSendModal &&
            <TestCodeSendModal
               isCounselor={false}
               myTestCode={myTestCode}
            />
         }
         {myTestCode.isLoading && <LongTimeLoading />}
      </div>
   )
}

export default TestCodeUseOrGift