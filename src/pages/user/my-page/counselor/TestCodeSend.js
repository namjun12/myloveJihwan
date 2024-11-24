import React from 'react'
import useMyTestCode from '../../../../hooks/product/useMyTestCode';
import TestCodeSendModal from '../../../../components/product/TestCodeSendModal';
import LongTimeLoading from '../../../../components/common/LongTimeLoading';

const TestCodeSend = () => {

   const myTestCode = useMyTestCode();

   if (!myTestCode.userData) return;

   // const updatedUseQuantity = myTestCode.useQuantity;
   // myTestCode.setUserData((prev) => [
   //    ...prev,
   //    prev.find((item) => item.id === myTestCode.currentId).use_quantity = updatedUseQuantity
   // ])

   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap">
            <h2 className="mp-main-title">
               <span className="mb">My 정보 <i></i></span>
               검사코드 발송
            </h2>
         </div>

         <div className="mp-guide-txt-wrap row-group">
            <p className="txt dot">
               아래 목록에서 발송하려는 항목을 선택한 후 목록 하단의 '검사코드 발송' 버튼을 클릭하세요.
            </p>
            <p className="txt dot">
               '검사코드 발송' 화면에서 이메일을 입력하시면 온라인 검사 코드를 이메일로도 보내드립니다.
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
            <h3 className="mp-section-title">
               상품선택
            </h3>

            <div className="table-wrap type01">
               <table>
                  <colgroup>
                     <col width="57%" />
                     <col width="15%" />
                     <col width="15%" />
                     <col width="13%" />
                  </colgroup>
                  <thead>
                     <tr>
                        <th className="left">상품명</th>
                        <th>구매수량</th>
                        <th>사용가능 수량</th>
                        <th>검사코드 발송</th>
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
                                 <div className="table-btn-wrap counselor col-group">
                                    <button
                                       onClick={() => myTestCode.handleShowSendModal(data.id)}
                                       className="table-btn green"
                                    >
                                       발송하기
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        ))) : (
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
               isCounselor={true}
               myTestCode={myTestCode}
            />
         }
         {myTestCode.isLoading && <LongTimeLoading />}
      </div>
   )
}

export default TestCodeSend