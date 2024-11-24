import React, { useEffect, useState } from 'react'
import PurchaseInfo from '../../components/sub-page/PurchaseInfo'
import FixedCart from '../../components/sub-page/FixedCart'
import FixCart from '../../hooks/FixCart'
import PageAnchor from '../../hooks/PageAnchor'
import Faq from '../../components/sub-page/Faq'

// Images, Videos
import { images } from '../../assets/images'
import Loading from '../../components/common/Loading'
import useProductFetchData from '../../hooks/ProductDetailFetchData'

const Consultation = () => {
   const fixedItemisOn = FixCart();
   PageAnchor();

   // fetchData
   const productId = 3;
   const data = useProductFetchData(productId);

   const purchaseInfo = {
      category: "Mind Insight",
      title: "해석상담",
      desc: "융합심리분석상담사와 함께 자신을 더 깊이,<br/>풍부하게 이해하는 시간입니다.",
      orderSummary: [
         {
            icon: "",
            title: "구성",
            content: "마인드 인사이트 완료 후 상담사와 상담",
         },
         {
            icon: "",
            title: "일정",
            content: "상담사와 협의",
         },
         {
            icon: "",
            title: "장소",
            content: "대면 / 비대면",
         },
      ],
      price: {
         netPrice: 100000,
         discount: 50,
      }
   }

   if (!data) return <Loading />

   return (
      <main className="subpage course mind-therapy mind-counseling">

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
                     <img src={images.mind_insight_counseling_sub_top} alt="" />
                  </div>
                  <div className="container w1280">
                     <div className="section-title-wrap row-group">
                        <p className="eng-title">
                           Interpretation counseling
                        </p>
                        <h3 className="title">
                           해석상담
                        </h3>
                        <p className="sub-title green">
                           자신을 깊이 이해하는 과정
                        </p>
                        <p className="txt">
                           마인드 인사이트 결과를 바탕으로 자신을 깊이 이해하는 과정입니다. <br />
                           결과로 드러난 현재 자신의 정서, 성격, 에너지 방향, 교류 방식 등을 이해하고 자신의 내적 균형상태를 분석합니다.  <br />
                           <br />
                           자가분석만으로는 파악할 수 없었던, 사회 속에서의 ‘나’의 모습과 자신도 알지 못 했던 ‘나’, 자신이 보는 ‘나’와 타인이 보는 ‘나’ 등 다양하고 입체적인 ‘나’를 발견할 수 있습니다.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="section section-02">
                  <div className="container w1280">
                     <img src={images.mind_insight_counseling_01} alt="" className="img-pc" />
                     <img src={images.mind_insight_counseling_01_m} alt="" className="img-mb" />
                  </div>
               </div>

               <div className="section section-03">
                  <div className="container w1280">
                     <div className="section-title-wrap row-group">
                        <p className="sub-title green">
                           Interpretation counseling
                        </p>
                        <h3 className="title">
                           해석상담 진행 안내
                        </h3>
                     </div>
                     <div className="counseling-guide-list row-group">
                        <div className="counseling-guide-item col-group">
                           <div className="num">1</div>
                           <div className="txt">
                              먼저, 마인드 인사이트(심리검사)를 구매하고 검사를 완료해주세요!
                              <p className="sub-txt">
                                 ※ 상담사가 마인드 인사이트 결과를 꼼꼼하게 분석할 수 있는 시간이 필요합니다. 원하시는 해석상담 일정 최소 3일 전까지 완료해주세요.
                              </p>
                           </div>
                        </div>
                        <div className="counseling-guide-item col-group">
                           <div className="num">2</div>
                           <div className="txt">
                              상담 일정 예약을 위한 연락을 드립니다. 상담사와 함께 해석상담 일정, 장소(대면/비대면)를 조율하세요.
                           </div>
                        </div>
                        <div className="counseling-guide-item col-group">
                           <div className="num">3</div>
                           <div className="txt">
                              결과지를 보면서 궁금한 점, 이해가 잘 되지 않는 점 등을 미리 생각해보세요. 상담사와 함께 이야기 나누면서 자신을 깊이 이해할 수 있습니다.
                           </div>
                        </div>
                        <div className="counseling-guide-item col-group">
                           <div className="num">4</div>
                           <div className="txt">
                              예약된 날짜, 장소에서 해석상담을 진행합니다. 결과에 대한 상담사의 해석과 상담을 받을 수 있습니다.
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

      </main>
   )
}

export default Consultation