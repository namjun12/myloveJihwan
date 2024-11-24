import React from 'react'

const mainBannerAni = () => {
   return (
      <div className="index-slide swiper">
         <div className="swiper-pagination index-pagination"></div>
         <div className="swiper-wrapper">
            <div className="swiper-slide index-slide-item">
               <video src="images/about.mp4" className="bg-img" autoPlay muted loop></video>
               <div className="index-slide-txt-wrap title_ani row-group">
                  <h2 className="title">
                     <span className="color">MIND I</span>nsigh<span className="color">T</span>
                  </h2>
               </div>
            </div>
         </div>

         <div className="scroll-down">
            Scroll Down
            <div className="scroll-down-bar"></div>
         </div>
      </div>
   )
}

export default mainBannerAni