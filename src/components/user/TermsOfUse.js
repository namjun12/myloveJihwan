import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const TermsOfUse = ({ setIsrequiredChecked }) => {
   // ===== 이용약관 동의 =====
   // 체크 관리 배열
   const [marketingTypeArr, setMarketingTypeArr] = useState({
      checkAll: false,
      required1: false,
      required2: false,
      option: false,
      optionSMS: false,
      optionEmail: false,
      optionTel: false,
   });

   useEffect(() => {
      if (marketingTypeArr.required1 && marketingTypeArr.required2) {
         setIsrequiredChecked(true)
      } else {
         setIsrequiredChecked(false)
      }
   }, [marketingTypeArr.required1, marketingTypeArr.required2])

   // 이용약관 체크박스 onChange
   const handleMarketingCheck = (e, targetItem) => {
      const isChecked = e.target.checked;

      setMarketingTypeArr(prev => {
         const updateData = { ...prev, [targetItem]: isChecked };

         // option 체크(해제) 시 하위 항목들도 체크(해제)
         if (targetItem === 'option') {
            ['optionSMS', 'optionEmail', 'optionTel'].forEach(item => {
               updateData[item] = isChecked;
            });
         }

         // option 하위 항목이 하나라도 체크되어 있으면 option도 체크
         if (['optionSMS', 'optionEmail', 'optionTel'].some(item => updateData[item])) {
            updateData.option = true;
         } else {
            updateData.option = false;
         }

         // 전체선택 체크(해제) 시 모든 항목 체크(해제)
         if (targetItem === 'checkAll') {
            Object.keys(updateData).forEach(key => {
               updateData[key] = isChecked;
            });
         }

         // 모든 항목이 체크되었을 때 전체선택 자동 체크
         const allChecked = ['required1', 'required2', 'option', 'optionSMS', 'optionEmail', 'optionTel']
            .every(item => updateData[item]);

         updateData.checkAll = allChecked;

         return updateData;
      });
   };

   return (
      <div className="form-item row-group">
         <div className="item-default">이용약관</div>
         <div className="item-user">
            <div className="join-agree-wrap row-group">
               <div className="join-agree-item join-agree-item-all col-group">
                  <label htmlFor="agree_0">
                     <input
                        onChange={(e) => { handleMarketingCheck(e, 'checkAll') }}
                        checked={marketingTypeArr.checkAll}
                        type="checkbox"
                        className="form-checkbox"
                        id="agree_0"
                     />
                     <div className="checked-item col-group">
                        <div className="icon">
                           <i className="xi-check"></i>
                        </div>
                        <p className="txt">모두 동의합니다.</p>
                     </div>
                  </label>
               </div>
               <div className="join-agree-item col-group">
                  <label htmlFor="agree_1">
                     <input
                        onChange={(e) => { handleMarketingCheck(e, 'required1') }}
                        checked={marketingTypeArr.required1}
                        type="checkbox"
                        className="form-checkbox"
                        id="agree_1"
                     />
                     <div className="checked-item col-group">
                        <div className="icon">
                           <i className="xi-check"></i>
                        </div>
                        <p className="txt">[필수] 서비스이용약관에 동의합니다.</p>
                     </div>
                  </label>
                  <Link to="/policy/service" target="_blank" rel='noopener noreferrer' className="more-btn">
                     보기
                  </Link>
               </div>
               <div className="join-agree-item col-group">
                  <label htmlFor="agree_2">
                     <input
                        onChange={(e) => { handleMarketingCheck(e, 'required2') }}
                        checked={marketingTypeArr.required2}
                        type="checkbox"
                        className="form-checkbox"
                        id="agree_2"
                     />
                     <div className="checked-item col-group">
                        <div className="icon">
                           <i className="xi-check"></i>
                        </div>
                        <p className="txt">[필수] 개인정보처리방침 약관에 동의합니다.</p>
                     </div>
                  </label>
                  <Link to="/policy/privacy" target="_blank" rel='noopener noreferrer' className="more-btn">
                     보기
                  </Link>
               </div>
               <div className="join-agree-item col-group">
                  <label htmlFor="agree_3">
                     <input
                        onChange={(e) => { handleMarketingCheck(e, 'option') }}
                        checked={marketingTypeArr.option}
                        type="checkbox"
                        className="marketing-agreement form-checkbox"
                        id="agree_3"
                     />
                     <div className="checked-item col-group">
                        <div className="icon">
                           <i className="xi-check"></i>
                        </div>
                        <p className="txt">[선택] 마케팅 정보 수신에 동의합니다.</p>
                     </div>
                  </label>
                  <Link to="/policy/marketing" target="_blank" rel='noopener noreferrer' className="more-btn">
                     보기
                  </Link>
               </div>
               <div className="checked-item-sub col-group">
                  <label htmlFor="agree_4">
                     <input
                        onChange={(e) => { handleMarketingCheck(e, 'optionSMS') }}
                        checked={marketingTypeArr.optionSMS}
                        name="SMS/알림톡"
                        type="checkbox"
                        className="marketing-option form-checkbox"
                        id="agree_4"
                     />
                     <div className="checked-item col-group">
                        <div className="icon">
                           <i className="xi-check"></i>
                        </div>
                        <p className="txt">SMS/알림톡</p>
                     </div>
                  </label>
                  <label htmlFor="agree_5">
                     <input
                        onChange={(e) => { handleMarketingCheck(e, 'optionEmail') }}
                        checked={marketingTypeArr.optionEmail}
                        name="이메일"
                        type="checkbox"
                        className="marketing-option form-checkbox"
                        id="agree_5"
                     />
                     <div className="checked-item col-group">
                        <div className="icon">
                           <i className="xi-check"></i>
                        </div>
                        <p className="txt">이메일</p>
                     </div>
                  </label>
                  <label htmlFor="agree_6">
                     <input
                        onChange={(e) => { handleMarketingCheck(e, 'optionTel') }}
                        checked={marketingTypeArr.optionTel}
                        name="전화"
                        type="checkbox"
                        className="marketing-option form-checkbox"
                        id="agree_6"
                     />
                     <div className="checked-item col-group">
                        <div className="icon">
                           <i className="xi-check"></i>
                        </div>
                        <p className="txt">전화</p>
                     </div>
                  </label>
               </div>
            </div>
         </div>
      </div>
   )
}

export default TermsOfUse