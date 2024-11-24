import React, { useEffect, useState } from 'react'
import { images } from '../../assets/images'
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules'

// Components
import Faq from '../../components/sub-page/Faq';
import ImagesPopup from '../../components/sub-page/ImagesPopup'
import PurchaseInfo from '../../components/sub-page/PurchaseInfo';
import FixedCart from '../../components/sub-page/FixedCart';

// Hooks
import FixCart from '../../hooks/FixCart';
import PageAnchor from '../../hooks/PageAnchor';
import Loading from '../../components/common/Loading';
import useProductFetchData from '../../hooks/ProductDetailFetchData';

const MindReport = () => {
   // Hooks
   const fixedItemisOn = FixCart();
   PageAnchor();

   // fetchData
   const productId = 2;
   const data = useProductFetchData(productId);

   const purchaseInfo = {
      category: 'Mind Insight',
      orderSummaryWidth: 140,
      orderSummary: [
         {
            icon: "",
            title: "검사구성",
         },
         {
            icon: "",
            title: "소요시간",
         },
         {
            icon: "",
            title: "결과지 보관기간",
         },
      ],
   }

   //swiper
   var imgSwiper = {
      pagination: {
         el: ".swiper-pagination",
         type: "fraction",
      },
   };

   if (!data) return <Loading />

   return (
      <main className="subpage course mind-therapy mind-report">

         <div className="container w1280">

            <div className="course-top-wrap col-group">
               <div className="left">
                  <div className="img-box">
                     <img src={data.product.file.file_addr} alt="" />
                  </div>
               </div>
               <div className="right">
                  <PurchaseInfo
                     info={purchaseInfo}
                     data={data.product}
                  />
               </div>
               <FixedCart
                  isFixed={fixedItemisOn}
                  info={purchaseInfo}
                  data={data.product}
               />
            </div>
         </div>

         <div className="course-content-wrap">
            <div className="tab-link-wrap">
               <div className="container w1280 col-group">
                  <a href="#anchor_1" id="tab_1" className="tab-link active">
                     상품 소개
                  </a>
                  <a href="#anchor_2" id="tab_2" className="tab-link">
                     자주 하는 질문
                  </a>
               </div>
            </div>
            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_1">
                  <div className="page-anchor-core page-anchor-1 page-anchor-item"></div>
               </div>

               <div className="section section-01">
                  <div className="img-wrap">
                     <img src={images.mind_report_sub_top} alt="" />
                  </div>
                  <div className="container w1280">
                     <div className="section-title-wrap row-group">
                        <p className="eng-title">
                           Mind Report
                        </p>
                        <h3 className="title">
                           마인드 리포트
                        </h3>
                        <p className="sub-title green">
                           나를 알 수 있는 종합보고서
                        </p>
                        <p className="txt">
                           마인드 리포트에서는 IQ와 EQ를 넘어서는 ‘μετά Q’, 즉 융합역량지수를 제시합니다. <br className="pc" />
                           이 지수는 우리가 의미와 가치의 문제를 다루고 해결할 때 사용하는 역량입니다.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="section section-02">
                  <div className="container w1280 col-group">
                     <Swiper
                        className="img-wrap swiper"
                        {...imgSwiper}
                        modules={[Pagination]}
                     >
                        <div className="swiper-pagination"></div>
                        <SwiperSlide className="swiper-slide">
                           <div className="img-container">
                              <img src={images.mind_report_02_01} alt="" />
                           </div>
                        </SwiperSlide>
                     </Swiper>
                     <div className="txt-wrap row-group">
                        <p className="sub-title green">
                           마인드 인사이트 검사를 통해 진단하고 분석한,
                        </p>
                        <h4 className="title">
                           '나'에 대한 종합보고서
                        </h4>
                        <p className="txt">
                           나의 정서지수와 다중역량지수, 그리고 에너지 방향과 <br className="pc" />
                           의사소통 방식 등에 따른 기능지수를 통합적으로 분석한 결과를 <br className="pc" />
                           시각적으로 볼 수 있습니다. <br />
                           <br />
                           이를 통해 과거의 나를 진단하고 건강한 미래의 나를 위한 <br className="pc" />
                           처방전과 같은 인생코칭을 받을 수 있습니다.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="section section-03">
                  <img src={images.mind_report_03_01} alt="" className="img" />
                  <div className="container w1280">
                     <div className="txt-wrap row-group">
                        <img src={images.icon_comma} alt="" className="icon" />
                        <p className="txt">
                           융합역량지수는 자기의 깊은 부분에 존재하는 지혜와 연관된 역량이며 기존의 가치를 <br className="pc" />
                           인식하는 데 그치지 않고 새로운 가치를 창조적으로 발견하게 하는 역량입니다.
                        </p>
                        <p className="title serif">
                           마인드임팩트는 <span className="green serif">융합역량지수</span>를 높이기 위해 <br className="pc" />
                           <span className="green serif">다양한 전략을 제시</span>합니다.
                        </p>
                     </div>
                  </div>
                  <div className="txt-box">
                     나에게 최적화된 마인드 리포트에 따라 한 단계씩 과제를 해결하다보면 <br className="pc" />
                     어느새 깊어지고 단단해진, <strong className="yellow">새로운 나를 발견할 수 있을 것입니다.</strong>
                  </div>
               </div>

               <div className="section section-04">
                  <div className="container w1280">
                     <div className="img-group col-group">
                        <div className="img-group row-group">
                           <div className="img-container col">
                              <img src={images.mind_report_03_02} alt="" />
                           </div>
                           <div className="img-container col">
                              <img src={images.mind_report_03_03} alt="" />
                           </div>
                        </div>
                        <div className="img-group">
                           <div className="img-container row">
                              <img src={images.mind_report_03_04} alt="" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_2">
                  <div className="page-anchor-core page-anchor-2 page-anchor-item"></div>
               </div>
               <div className="section dark-green">
                  <Faq data={data.faq} />
               </div>
            </div>
         </div>

         <footer id="footer"></footer>
         <ImagesPopup />
      </main>
   )
}

export default MindReport;