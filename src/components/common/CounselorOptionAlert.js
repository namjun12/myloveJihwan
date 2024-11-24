import React from 'react'

const CounselorOptionAlert = ({ iscounselorAlertVisible, setIscounselorAlertVisible }) => {

   const closeCounselorAlert = () => {
      if (iscounselorAlertVisible) {
         setIscounselorAlertVisible(false)
      }
   }

   return (
      <div className="modal-container">
         <div className="modal-wrap modal-alert-wrap">
            <i
               onClick={closeCounselorAlert}
               className="close-btn pc xi-close"
            />
            <i
               onClick={closeCounselorAlert}
               className="close-btn mb xi-close"
            />
            <div className="modal-title-wrap">
               <i className="icon red xi-warning"></i>
               <p className="title">
                  상담사 전용 상품 안내
               </p>
            </div>
            <div className="modal-alert-txt">
               해당 상품은 상담사 전용 상품으로 <br />
               환불이 불가합니다.
            </div>
            <div className="modal-footer col-group">
               <button
                  onClick={closeCounselorAlert}
                  className="modal-footer-btn green"
               >
                  확인했습니다
               </button>
            </div>
         </div>
      </div>
   )
}

export default CounselorOptionAlert