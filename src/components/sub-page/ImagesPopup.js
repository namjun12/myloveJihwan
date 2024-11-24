import React, { useEffect } from 'react'
import $ from 'jquery'

// Images, Video
import { images } from '../../assets/images'

const ImagesPopup = () => {
   useEffect(() => {
      // 모달
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
      if ($('.img-container')) {
         //이미지 클릭 시 팝업
         $('.img-container').click(function () {
            $('.modal_slide').show();
         });
      }
   }, [])
   return (
      <div className="modal-container modal_slide" style={{ display: "none" }}>
         <div className="modal-wrap modal-slide-wrap">
            <i className="xi-close close-btn"></i>
            <div className="slide_popup">
               <img src={images.academia_item_01} />
            </div>
         </div>
      </div>
   )
}

export default ImagesPopup