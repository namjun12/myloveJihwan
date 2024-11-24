import React, { useEffect } from 'react'
import $ from 'jquery'

const CounselorOnly = () => {

   useEffect(() => {
      if ($('.modal-container .close-btn')) {
         //모달 닫기
         $('.modal-container .close-btn').click(function () {
            $(this).closest('.modal-container').hide();
         })

         $('.modal-container').click(function (e) {
            if (e.target === this) {
               $(".modal-container").hide();
            }
         });
      }
   }, [])

   return (
      <div className="modal-container" style={{display:"none"}}>
         <div className="modal-wrap modal-alert-wrap">
            <i className="close-btn pc"></i>
            <i className="close-btn mb"></i>
            <div className="modal-title-wrap">
               <i className="icon red"></i>
               <p className="title">
                  묶음 상품 안내
               </p>
            </div>
            <div className="modal-alert-txt">
               묶음 상품은 상담사 전용 상품으로 <br />
               환불이 불가합니다.
            </div>
            <div className="modal-footer col-group">
               <button className="modal-footer-btn green">
                  확인했습니다
               </button>
            </div>
         </div>
      </div>
   )
}

export default CounselorOnly