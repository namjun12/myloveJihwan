import React from 'react'
import { Link } from 'react-router-dom'

// Components
import PurchaseInfo from '../../components/sub-page/PurchaseInfo'
import FixedCart from '../../components/sub-page/FixedCart'
import Faq from '../../components/sub-page/Faq'
import Loading from '../../components/common/Loading'

// Hooks
import FixCart from '../../hooks/FixCart'
import PageAnchor from '../../hooks/PageAnchor'
import useProductFetchData from '../../hooks/ProductDetailFetchData'

// Images, Videos
import { images } from '../../assets/images'

const WalkingMeditation = () => {

   // Hooks
   const fixedItemisOn = FixCart();
   PageAnchor();

   // fetchData
   const productId = 4;
   const data = useProductFetchData(productId);

   const purchaseInfo = {
      category: 'Mind Therapy',
      orderSummary: [
         {
            icon: "",
            title: "구성",
         },
         {
            icon: "",
            title: "일정",
         },
         {
            icon: "",
            title: "장소",
         },
      ],
   }

   if (!data) return <Loading />

   return (
      <main className="subpage course mind-therapy">

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
                     <img src={images.mind_therapy_sub_top_01} alt="" />
                  </div>
                  <div className="container w1280">
                     <div className="section-title-wrap row-group">
                        <p className="eng-title">
                           Walking Meditation
                        </p>
                        <h3 className="title">
                           걷기 명상
                        </h3>
                        <p className="sub-title green">
                           신체적, 정신적 마음챙김
                        </p>
                        <p className="txt">
                           걷기 명상은 걷기의 신체적 효과에, 정신적 건강을 위한 ‘명상의 마음챙김’을 합친 개념입니다. <br className="pc" />
                           미국 가정의학 전문의이자 명상 지도자인 라슈미 슈람 박사는 “걷기 명상의 개념은 몸이 느끼는 방식에 주의를 기울이고, <br className="pc" />
                           하늘, 나무 등 사물을 알아차리고, 모든 감각에 맞추고, 온갖 호기심을 갖되 판단하지 않는 것”이라고 말했습니다.<br />
                           <br />
                           걷기 명상의 효과를 위해서 바쁜 도시를 벗어난 아름다운 길을 선택하는 일 은 중요합니다. <br className="pc" />
                           걸으면서 자신을 돌아봅니다. 몸을 관찰하면서 주변 세상과 ‘혼연일체’가 돼야 합니다. <br className="pc" />
                           소리를 듣고, 냄새를 맡고, 사물을 봐야 합니다. 발이 땅에 어떻게 닿는지도 유심히 관찰하고 생각해 봅니다.<br />
                           <br />
                           이런 감각에 완전히 몰입하려고 애써야 합니다. 다른 생각을 과감히 떨쳐내야 합니다. <br className="pc" />
                           서서히 삶을 새롭게 자각할 수 있는 단순한 행동을 취하며 복잡한 마음을 정돈합니다. <br />
                           <span className="sub-txt green">
                              ※ 봄과 가을에 마인드 아이티의 정기프로그램이 있고, 기업이나 그룹이 원할 때는 맞춤프로그램을 기획, 진행합니다.
                           </span>
                        </p>
                        <Link to="https://calendar.google.com/calendar/embed?src=c_21eca979ba4f77b65ed7f9a90507b4981b292d274a9949fcc8a0ba78446802a4%40group.calendar.google.com&ctz=Asia%2FSeoul" className="more-btn type03" rel='noreferrer noopener'>
                           연간 일정표 보기
                           <i></i>
                        </Link>
                     </div>
                  </div>
               </div>

               <div className="section section-02">
                  <div className="container w1280 col-group">
                     <div className="img-wrap swiper">
                        <div className="swiper-pagination"></div>
                        <div className="swiper-wrapper">
                           <div className="swiper-slide">
                              <div className="img-container">
                                 <img src={images.mind_therapy_01_02} alt="" />
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="txt-wrap row-group">
                        <p className="sub-title green">
                           철학적이며 사색을 위한 최적의 길,
                        </p>
                        <h4 className="title">
                           춘천의 물레길과 봄내길
                        </h4>
                        <p className="txt">
                           춘천의 물레길과 봄내길은 길의 구성과 흐름이 철학적이며 <br className="pc" />
                           사색을 위한 최적의 길로 손꼽힙니다.<br />
                           <br />
                           다산 정약용이 걸었던 ‘다산길 3구간(의암댐에서 소양정까지)’은 <br className="pc" />
                           알려지지 않은 아름다운 비경이 펼쳐지는 명품 길입니다.<br />
                           <br />
                           이 길을 걸으며 명상은 더욱 깊어지고 선명해집니다. <br className="pc" />
                           걷기 전에 안내자가 전해주는 ‘화두’를 부여잡고 하루를 걷습니다.<br />
                           <br />
                           하루 코스(8시간), 반나절 걷기(3시간) 등 <br className="pc" />
                           자신의 신체적 능력과 건강에 따라 다양한 프로그램이 설계됩니다.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="section section-03">
                  <div className="container w1280">
                     <img src={images.mind_therapy_01_03_01} alt="" className="img" />
                     <div className="txt-wrap row-group">
                        <img src={images.icon_comma} alt="" className="icon" />
                        <p className="txt">
                           인간은 직립보행을 시작하면서 진화의 결정적인 기회를 맞이합니다.
                        </p>
                        <p className="title serif">
                           인간에게 <span className="green serif">‘걷는다’</span>는 것은, <br />
                           가장 원초적이고, <span className="green serif">본래의 ‘나’</span>를 찾아 나가는 훌륭한 운동입니다.
                        </p>
                     </div>
                  </div>
                  <div className="txt-box">
                     <strong className="yellow">걷기 명상</strong>을 통해 우리는 자기 자신에게 더 친절해지고 자신의 정체성과 행위에 대한 <br className="pc" />
                     <strong>섣부른 판단을 줄이고 집중력을 높일 수 있었다</strong>는 <strong className="yellow">고백</strong>을 듣게 됩니다.
                  </div>
               </div>

               <div className="section section-04">
                  <div className="container w1280">
                     <div className="img-group col-group">
                        <div className="img-group row-group">
                           <div className="img-container col">
                              <img src={images.mind_therapy_01_04_01} alt="" />
                           </div>
                           <div className="img-container col">
                              <img src={images.mind_therapy_01_04_02} alt="" />
                           </div>
                        </div>
                        <div className="img-group">
                           <div className="img-container row">
                              <img src={images.mind_therapy_01_04_03} alt="" />
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
      </main>
   )
}

export default WalkingMeditation