import React, { useState } from 'react'

const TestCodeSendModal = ({ myTestCode, isCounselor }) => {

   // 결과 확인 스위치
   const [switchOn, setSwitchOn] = useState(true);
   const switchChange = () => {
      setSwitchOn(prev => !prev)
   }

   const currentType = myTestCode.userData.find((item) => item.id === myTestCode.currentId).type
   const noResult = currentType === 1 || currentType === 2

   return (
      <div className="modal-container">
         <div className="modal-wrap">
            <i onClick={myTestCode.handleShowSendModal} className="close-btn pc"></i>
            <i onClick={myTestCode.handleShowSendModal} className="close-btn mb"></i>
            <div className="modal-title-wrap center">
               <p className="modal-title">
                  검사코드 선물하기
               </p>
            </div>
            <div className="modal-scroll-wrap test-modal-content">
               <div className="title-group row-group">
                  <p className="title">
                     마인드 인사이트 + 해석상담 30분
                  </p>
                  <p className="txt">
                     발송 가능 수량 :
                     {myTestCode.useQuantity
                        ? myTestCode.useQuantity
                        : myTestCode.userData.find((item) => item.id === myTestCode.currentId).use_quantity
                     }
                  </p>
               </div>
               <div className="form-wrap row-group">
                  <div className="form-item row-group">
                     <div className="item-default">
                        이름
                        <span className="red">*</span>
                     </div>
                     <div className="item-user">
                        <input
                           onChange={myTestCode.changeGiftArr}
                           value={myTestCode.recipientInfo.name}
                           name='name'
                           type="text"
                           className="form-input"
                           placeholder="이름"
                        />
                     </div>
                  </div>
                  <div className="form-item row-group">
                     <div className="item-default">
                        휴대폰 번호
                        <span className="red">*</span>
                     </div>
                     <div className="item-user">
                        <input
                           onChange={myTestCode.changeGiftArr}
                           value={myTestCode.recipientInfo.phone}
                           name='phone'
                           type="number"
                           className="form-input"
                           placeholder="휴대폰 번호"
                        />
                     </div>
                  </div>
                  <div className="form-item row-group">
                     <div className="item-default">
                        이메일
                     </div>
                     <div className="item-user">
                        <input
                           onChange={myTestCode.changeGiftArr}
                           value={myTestCode.recipientInfo.email}
                           name='email'
                           type="email"
                           className="form-input"
                           placeholder="이메일"
                        />
                     </div>
                  </div>
                  <button
                     onClick={myTestCode.addRecipient}
                     type='button'
                     className="form-btn"
                  >
                     등록하기
                  </button>
               </div>

               <div className="table-container">
                  <div className="table-wrap">
                     <table>
                        <colgroup>
                           <col width="40px" />
                        </colgroup>
                        <thead>
                           <tr>
                              <th>
                                 <label for="check_all">
                                    <input
                                       onChange={myTestCode.handleCheckAll}
                                       type="checkbox"
                                       className="form-checkbox"
                                       id="check_all"
                                    />
                                    <div className="checked-item col-group">
                                       <div className="icon">
                                          <i className="xi-check"></i>
                                       </div>
                                    </div>
                                 </label>
                              </th>
                              <th className="left">이름</th>
                              <th className="left">휴대폰 번호</th>
                              <th className="left">이메일</th>
                           </tr>
                        </thead>
                        <tbody>
                           {myTestCode.giftArr.length >= 1 && myTestCode.giftArr.map((item, index) => (
                              <tr key={index}>
                                 <td>
                                    <label for={`check_0${index}`}>
                                       <input
                                          onChange={() => myTestCode.SelectToRemove(index)}
                                          checked={item.checked}
                                          type="checkbox"
                                          className="form-checkbox"
                                          id={`check_0${index}`}
                                       />
                                       <div className="checked-item col-group">
                                          <div className="icon">
                                             <i className="xi-check"></i>
                                          </div>
                                       </div>
                                    </label>
                                 </td>
                                 <td>
                                    <strong>{item.name}</strong>
                                 </td>
                                 <td>{item.phone}</td>
                                 <td>{item.email}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
                  {myTestCode.giftArr.length >= 1 &&
                     <div className="table-btn-wrap col-group">
                        <button
                           onClick={myTestCode.selectedRecipientRemove}
                           type='button'
                           className="btn gray"
                        >
                           선택삭제
                        </button>
                        <button
                           onClick={myTestCode.removeAllRecipient}
                           type='button'
                           className="btn white"
                        >
                           전체삭제
                        </button>
                     </div>
                  }
               </div>
            </div>
            {isCounselor && !noResult &&
               <div style={{ padding: '20px 0px' }} className="form-item row-group">
                  <div className="item-default">
                     결과확인
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <label for="switch">
                        <input
                           onChange={switchChange}
                           checked={switchOn}
                           type="checkbox"
                           className="form-switch"
                           id="switch"
                        />
                        <div className="checked-item col-group">
                           <div className="icon"></div>
                           <div className="txt">
                              {switchOn
                                 ? '피검사자에게 검사 결과가 보여집니다.'
                                 : '피검사자에게 검사 결과가 보여지지 않습니다.'
                              }
                           </div>
                        </div>
                     </label>
                  </div>
               </div>
            }
            <div className="modal-footer">
               <button
                  onClick={() => myTestCode.handleSendProduct(isCounselor, switchOn)}
                  className="modal-footer-btn wide green"
               >
                  {isCounselor ? '발송하기' : '선물하기'} {/* 상담사일 때는 발송하기 */}
               </button>
            </div>
         </div>
      </div >
   )
}

export default TestCodeSendModal