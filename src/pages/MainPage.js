import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from 'swiper/modules'

// Components
import IndexHeader from '../components/IndexHeader';
import Popup from '../components/common/Popup';

// Images / Video
import { images } from '../assets/images';


const MainPage = () => {

   IndexHeader();

   // 모바일인지 확인
   const isMobile = window.innerWidth < 1024;

   // 메인배너 슬라이드 Swiper 설정
   const mainSwiper = {
      pagination: {
         el: ".index-pagination",
         clickable: false,
         renderBullet: function (index, className) {
            if (index >= 9) {
               return `<span class="${className}">${index + 1}</span>`;
            } else {
               return `<span class="${className}">0${index + 1}</span>`;
            }
         },
      },
      autoplay: {
         delay: 4000,
         disableOnInteraction: false,
      },
      speed: 3000,
      parallax: true,
      watchOverflow: true,
      loop: true,
   };

   // 마인드 인사이트 슬라이드 Swiper 설정
   const mindSwiper = {
      slidesPerView: "auto",
      spaceBetween: 24,
      freeMode: true,
      navigation: {
         nextEl: ".mind-slide-next",
         prevEl: ".mind-slide-prev",
      },
   };

   // 마음훈련 슬라이드 Swiper 설정
   const therapySwiper = {
      slidesPerView: 1,
      spaceBetween: 24,
      navigation: {
         nextEl: ".therapy-slide-next",
         prevEl: ".therapy-slide-prev",
      },
      breakpoints: {
         1440: {
            slidesPerView: 3,
            spaceBetween: 40,
         },
         768: {
            slidesPerView: 2,
         },
      },
   };

   const modalClose = () => {
      const modalEl = document.querySelectorAll(".R-popup")
      modalEl.forEach((element) => {
         element.style.display = "none"
      })
   }

   // 토큰
   useEffect(() => {
      // URL에서 쿼리 매개변수 추출
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token'); // 'token'을 쿼리 파라미터로 가져옴

      // 토큰이 있을 경우 쿠키에 저장
      if (token) {
         Cookies.set('authToken', token, { expires: 7 }); // 쿠키에 'authToken'이라는 이름으로 7일 동안 저장
      }
   }, []);

   // API
   const [mainData, setMainData] = useState();
   const fetchMainData = async () => {
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/main`)
         setMainData(response.data.data)
      } catch (error) {
         console.error(error)
         alert(error.response.data.msg)
      }
   }

   useEffect(() => {
      fetchMainData()
   }, [])

   return (
      <div>
         <div id="wrap">
            <main className="index">
               <Swiper
                  className="index-slide swiper"
                  {...mainSwiper}
                  modules={[Pagination, Autoplay]}
               >
                  <div className="swiper-pagination index-pagination"></div>
                  {mainData ? (
                     mainData.banner.map((banner, index) => {
                        const selectFile = isMobile ? banner.mb_file : banner.pc_file
                        return (
                           <SwiperSlide className="swiper-slide index-slide-item" key={index}>
                              {selectFile.file_type === 0 ? (
                                 <img className="bg-img" src={selectFile.file_addr} />
                              ) : (
                                 <video
                                    src={selectFile.file_addr} className="bg-img"
                                    autoPlay={true} loop muted playsInline
                                 />
                              )}
                              <div className="index-slide-txt-wrap row-group">
                                 <p className="sub-title">{banner.sub_title}</p>
                                 <h2 className="title">{banner.title}</h2>
                                 <p className="txt">{banner.content}</p>
                                 {banner.btn_name && banner.link &&
                                    <Link to={banner.link} target="_blank" className="btn">{banner.btn_name}</Link>
                                 }
                              </div>
                           </SwiperSlide>
                        )
                     })
                  ) : (
                     <SwiperSlide className='loading-wrap'>
                        <i className='xi-spinner-5 xi-spin icon-spin' />
                     </SwiperSlide>
                  )}
                  <div className="scroll-down">
                     Scroll Down
                     <div className="scroll-down-bar"></div>
                  </div>
               </Swiper>
               <div className="index-section index-section-01">
                  <div className="container">
                     <div className="index-section-title-wrap row-group">
                        <h3 className="title">
                           <span className="sub-title">
                              지금,
                           </span> <br />
                           이런 고민을 안고 있나요?
                        </h3>
                        <p className="txt">
                           마인드 아이티는 인간의 깊은 내면으로 들어가 마음을 점검하고 분석하며 치유하는 전 과정을 함께합니다.
                        </p>
                     </div>

                     <div className="R-step-list col-group">
                        <div className="R-step-item" onClick={() => document.querySelector('.R-popup-01').style.display = 'block'}>
                           <img src={images.R_step_item_01} alt="" className="bg-img" />
                           <button className="more-btn col-group">
                              <p className="txt">자세히보기</p>
                              <i className="icon"></i>
                           </button>
                           <div className="txt-wrap row-group">
                              <p className="label">
                                 # Revolution
                              </p>
                              <p className="title">
                                 갑자기 이런 생각이 드는 거예요. <br />
                                 <strong>
                                    '나 이렇게 살아도 되나? <br />
                                    잘살고 있는 거 맞나?'
                                 </strong>
                              </p>
                              <div className="txt-group col-group">
                                 <p className="txt">권지혜</p>
                                 <p className="txt">30대</p>
                              </div>
                           </div>
                        </div>
                        <div className="R-step-item" onClick={() => document.querySelector('.R-popup-02').style.display = 'block'}>
                           <img src={images.R_step_item_02} alt="" className="bg-img" />
                           <button className="more-btn col-group">
                              <p className="txt">자세히보기</p>
                              <i className="icon"></i>
                           </button>
                           <div className="txt-wrap row-group">
                              <p className="label">
                                 # Restart
                              </p>
                              <p className="title">
                                 엄마가 되었지만, <br />
                                 <strong>
                                    경력과 능력을 잃은 것 같아요.
                                 </strong>
                              </p>
                              <div className="txt-group col-group">
                                 <p className="txt">김은정</p>
                                 <p className="txt">40대</p>
                              </div>
                           </div>
                        </div>
                        <div className="R-step-item" onClick={() => document.querySelector('.R-popup-03').style.display = 'block'}>
                           <img src={images.R_step_item_03} alt="" className="bg-img" />
                           <button className="more-btn col-group">
                              <p className="txt">자세히보기</p>
                              <i className="icon"></i>
                           </button>
                           <div className="txt-wrap row-group">
                              <p className="label">
                                 # Reconstruction
                              </p>
                              <p className="title">
                                 한눈 팔지 않고 열심히 산 것 같은데, <br />
                                 <strong>
                                    왜 인생이 허무하게 느껴질까요
                                 </strong>
                              </p>
                              <div className="txt-group col-group">
                                 <p className="txt">정영식</p>
                                 <p className="txt">50대</p>
                              </div>
                           </div>
                        </div>
                        <div className="R-step-item" onClick={() => document.querySelector('.R-popup-04').style.display = 'block'}>
                           <img src={images.R_step_item_04} alt="" className="bg-img" />
                           <button className="more-btn col-group">
                              <p className="txt">자세히보기</p>
                              <i className="icon"></i>
                           </button>
                           <div className="txt-wrap row-group">
                              <p className="label">
                                 # Refresh
                              </p>
                              <p className="title">
                                 왜 나는 연인과 같은 문제에 <br />
                                 부딪히는 걸까? <strong> 반복되는 내 연애</strong> <br />
                                 <strong>패턴에는 무슨 문제가 있는 걸까?</strong>
                              </p>
                              <div className="txt-group col-group">
                                 <p className="txt">정소희</p>
                                 <p className="txt">20대</p>
                              </div>
                           </div>
                        </div>
                        <div className="R-step-item" onClick={() => document.querySelector('.R-popup-05').style.display = 'block'}>
                           <img src={images.R_step_item_05} alt="" className="bg-img" />
                           <button className="more-btn col-group">
                              <p className="txt">자세히보기</p>
                              <i className="icon"></i>
                           </button>
                           <div className="txt-wrap row-group">
                              <p className="label">
                                 # Recreation
                              </p>
                              <p className="title">
                                 ‘내 나이가 어때서’ 라지만, <br />
                                 <strong>
                                    나이 때문에 나는 자꾸만 <br />
                                    쪼그라듭니다
                                 </strong>
                              </p>
                              <div className="txt-group col-group">
                                 <p className="txt">이영숙</p>
                                 <p className="txt">60대</p>
                              </div>
                           </div>
                        </div>
                        <div className="R-step-item" onClick={() => document.querySelector('.R-popup-06').style.display = 'block'}>
                           <img src={images.R_step_item_06} alt="" className="bg-img" />
                           <button className="more-btn col-group">
                              <p className="txt">자세히보기</p>
                              <i className="icon"></i>
                           </button>
                           <div className="txt-wrap row-group">
                              <p className="label">
                                 # Reformation
                              </p>
                              <p className="title">
                                 내가 회사를 언제까지 다닐 수 있을까?<br />
                                 점점 나이가 드는데... <br />
                                 <strong>
                                    앞으로 뭐하고 살아야 하지?
                                 </strong>
                              </p>
                              <div className="txt-group col-group">
                                 <p className="txt">서혜진</p>
                                 <p className="txt">30대</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="index-section index-section-02">
                  <div className="container">
                     <div className="index-section-title-wrap col-group">
                        <h3 className="title">
                           <span className="sub-title">
                              Discover Yourself!
                           </span> <br />
                           마인드인사이트를 통해 진정한 '나'를 발견하세요.
                        </h3>
                        <div className="slide-btn-wrap col-group">
                           <i className="slide-btn mind-slide-prev">
                              
                           </i>
                           <i className="slide-btn mind-slide-next">
                              
                           </i>
                        </div>
                     </div>
                  </div>
                  <Swiper
                     className="mind-slide swiper"
                     {...mindSwiper}
                     modules={[Navigation, FreeMode]}
                  >
                     <SwiperSlide className="swiper-slide mind-slide-item active">
                        <div className="txt-wrap row-group">
                           <p className="sub-title">
                              1단계
                           </p>
                           <h3 className="title">
                              마인드 인사이트
                           </h3>
                           <div className="txt">
                              마인드 아이티 고유의 분석도구를 활용해 <br />
                              ‘나’를 심리적·영성적·교류적으로 융합분석
                           </div>
                           <Link to="sub02_mindInsight_02.html" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide className="swiper-slide mind-slide-item">
                        <div className="txt-wrap row-group">
                           <p className="sub-title">
                              2단계
                           </p>
                           <h3 className="title">
                              마인드 리포트
                           </h3>
                           <div className="txt">
                              과거의 나를 진단하고 현재의 나를 분석하여 <br />
                              건강한 미래의 나를 만들어가는 인생코칭 보고서
                           </div>
                           <Link to="sub02_mindInsight_02.html#anchor_2" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide className="swiper-slide mind-slide-item">
                        <div className="txt-wrap row-group">
                           <p className="sub-title">
                              3단계
                           </p>
                           <h3 className="title">
                              마인드 임팩트
                           </h3>
                           <div className="txt">
                              마인드 아이티 고유의 검사도구와 <br />
                              분석키트를 활용하여 융합심리분석상담 및 <br />
                              코칭에 최적화된 시스템
                           </div>
                           <Link to="sub02_mindInsight_02.html#anchor_3" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide className="swiper-slide mind-slide-item">
                        <div className="txt-wrap row-group">
                           <p className="sub-title">
                              4단계
                           </p>
                           <h3 className="title">
                              마인드 테라피
                           </h3>
                           <div className="txt">
                              내면의 ‘자기’에 집중하며 <br />
                              진정한 ‘나’를 찾아가는 마음 훈련 프로그램
                           </div>
                           <Link to="sub02_mindInsight_02.html#anchor_4" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                     </SwiperSlide>
                  </Swiper>
               </div>

               <div className="index-section index-section-03">
                  <div className="container">
                     <Link to="/mind-insight-test/index" target="_blank" className="life-score-btn">
                        <img src={images.life_score_btn} alt="" />
                     </Link>
                     <div className="index-section-title-wrap row-group">
                        <p className="label">
                           인생점수
                        </p>
                        <h3 className="title">
                           내 인생을 <span className="yellow">점수로 환산</span>하면 몇 점이나 될까?
                        </h3>
                        <p className="sub-title">
                           <strong>인생의 굴곡</strong>을 점수로 환산해봅니다.
                           나 스스로 만족도 점수를 주어 <strong>인생전반을 점검</strong>해봅니다.
                        </p>
                        <p className="txt">
                           이 과정은, 그동안 돌아보지 않았던 과거의 어느 시간 속으로 나를 이끌어 줍니다.
                           나에게 영향을 준 사람과 사건들을 되짚어보고 그때의 나를 대면합니다. <br />
                           ‘진정한 나’를 만나기 위해서는 과거를 제대로 인식하고 지금의 내가 재해석 할 수 있는 힘을 기르는 것이 무엇보다 중요합니다.
                        </p>
                     </div>
                     <div className="score-check-list row-group">
                        <div className="score-check-item col-group">
                           <img src={images.icon_checkbox} alt="" className="icon" />
                           <p className="txt">
                              지나온 내 삶을 어떻게 평가하고 있는지
                           </p>
                        </div>
                        <div className="score-check-item col-group">
                           <img src={images.icon_checkbox} alt="" className="icon" />
                           <p className="txt">
                              어느 부분을 행복하게 기억하고 어떤 상처를 안고 있는지
                           </p>
                        </div>
                        <div className="score-check-item col-group">
                           <img src={images.icon_checkbox} alt="" className="icon" />
                           <p className="txt">
                              부모와 형제자매를 비롯한 가족을 어떻게 인식하고 있는지
                           </p>
                        </div>
                        <div className="score-check-item col-group">
                           <img src={images.icon_checkbox} alt="" className="icon" />
                           <p className="txt">
                              친구와 동료, 일과 관계 등을 어떻게 받아들이고 있는지
                           </p>
                        </div>
                     </div>
                     <div className="life-score-wrap">
                        <h4 className="life-score-title">
                           인생 점수는 <span className="yellow">Meta Q</span>를 측정하는 하나의 지표입니다.
                        </h4>

                        <div className="life-score-group col-group">
                           <div className="life-score-group col-group">
                              <div className="life-score-item row-group">
                                 <p className="title">
                                    Emotion <br />
                                    Balance
                                 </p>
                                 <p className="txt">
                                    감정균형
                                 </p>
                              </div>
                              <i className="icon"></i>
                              <div className="life-score-item row-group">
                                 <p className="title">
                                    Personality <br />
                                    Balance
                                 </p>
                                 <p className="txt">
                                    성격균형
                                 </p>
                              </div>
                              <i className="icon"></i>
                              <div className="life-score-item row-group">
                                 <p className="title">
                                    Multiple Competance <br />
                                    Balance
                                 </p>
                                 <p className="txt">
                                    다중 역량 균형
                                 </p>
                              </div>
                              <i className="icon"></i>
                              <div className="life-score-item row-group">
                                 <p className="title">
                                    Communication <br />
                                    Balance
                                 </p>
                                 <p className="txt">
                                    교류 균형
                                 </p>
                              </div>
                              <i className="icon"></i>
                              <div className="life-score-item row-group">
                                 <p className="title">
                                    Life Cycle  <br />
                                    Balance
                                 </p>
                                 <p className="txt">
                                    생애주기 균형
                                 </p>
                              </div>
                           </div>
                           <i className="icon"></i>
                           <div className="meta-q">
                              <div className="info-btn" onClick={() => document.querySelector('.meta-q').classList.add('active')}>?</div>
                              <img src={images.metaQ} alt="" />
                              <div className="hover-box">
                                 <i className="close-btn" onClick={() => document.querySelector('.meta-q').classList.remove('active')}></i>
                                 <p className="title">
                                    Meta Q?
                                 </p>
                                 <p className="txt">
                                    Meta Q는 융합역량지수입니다. <br />
                                    IQ, EQ를 넘어서는 제3의 Q입니다. <br />
                                    지적 능력이나 지식수준, 감성능력을 넘어서는 <br />
                                    통합과 융합의 능력, 지혜인의 능력입니다.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="index-section index-section-04">
                  <div className="index-section-title-wrap row-group">
                     <p className="label">
                        Mind Therapy
                     </p>
                     <h3 className="title">
                        마음훈련
                     </h3>
                     <p className="txt">
                        번잡한 도시를 떠나 자연 안에 머무르며, <br />
                        내면의 '자기'에 집중합니다.
                     </p>
                     <div className="slide-btn-wrap col-group">
                        <i className="slide-btn therapy-slide-prev">
                           
                        </i>
                        <i className="slide-btn therapy-slide-next">
                           
                        </i>
                     </div>
                     <Link to="sub03_mindTherapy_01.html" className="more-btn type01 col-group">
                        자세히 보기
                        <i className="icon"></i>
                     </Link>
                  </div>
                  <Swiper
                     className="therapy-slide swiper"
                     {...therapySwiper}
                     modules={[Navigation]}
                  >
                     <SwiperSlide className="swiper-slide therapy-slide-item">
                        <div className="bg-img">
                           <img src={images.therapy_item_01} alt="" />
                           <div className="hover-box">
                              <i className="icon"></i>
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide className="swiper-slide therapy-slide-item">
                        <div className="bg-img">
                           <img src={images.therapy_item_02} alt="" />
                           <div className="hover-box">
                              <i className="icon"></i>
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide className="swiper-slide therapy-slide-item">
                        <div className="bg-img">
                           <img src={images.therapy_item_03} alt="" />
                           <div className="hover-box">
                              <i className="icon"></i>
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide className="swiper-slide therapy-slide-item">
                        <div className="bg-img">
                           <img src={images.therapy_item_04} alt="" />
                           <div className="hover-box">
                              <i className="icon"></i>
                           </div>
                        </div>
                     </SwiperSlide>
                     <SwiperSlide className="swiper-slide therapy-slide-item">
                        <div className="bg-img">
                           <img src={images.therapy_item_05} alt="" />
                           <div className="hover-box">
                              <i className="icon"></i>
                           </div>
                        </div>
                     </SwiperSlide>
                  </Swiper>
               </div>

               <div className="index-section index-section-05">
                  <div className="container">
                     <div className="index-section-title-wrap">
                        <h3 className="title">
                           사피엔자 아카데미아(Sapienza Academia) <br />
                           <span className="sub-title">
                              지식이 필요한 시대가 끝났습니다. 이제 지혜(Sapienza)가 필요한 세상입니다.
                           </span>
                        </h3>
                     </div>

                     <div className="section-category-list item4 col-group">
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.academia_item_01} alt="" />
                           </div>
                           <p className="title">
                              아카데미아 소개
                           </p>
                           <p className="txt">
                              이론과 실전 공부를 희망하는 사람들은 아카데미아에서 융합심리분석전문가 과정을 이수할 수 있습니다.
                           </p>
                           <Link to="sub04_sapienza_01.html" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.academia_item_02} alt="" />
                           </div>
                           <p className="title">
                              융합심리분석상담 전문가 과정
                           </p>
                           <p className="txt">
                              과거를 새롭게 해석하는 내적인 힘과 능력을 수련하고 연구하는 ‘융합심리분석상담치료’를 배울 수 있습니다.
                           </p>
                           <Link to="sub04_sapienza_02.html" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.academia_item_03} alt="" />
                           </div>
                           <p className="title">
                              마인드 임팩트 상담·코칭센터
                           </p>
                           <p className="txt">
                              아카데미아를 통해 양성된 전문 분석상담사들이 지역별 상담센터를 운영합니다.
                           </p>
                           <Link to="sub05_counselor.html" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.academia_item_04} alt="" />
                           </div>
                           <p className="title">
                              EAP
                           </p>
                           <p className="txt">
                              마인드 아이티 고유의 진단·분석 도구를 활용해 근로자들을 분석하고 조직 맞춤형 심리케어 솔루션을 제공합니다.
                           </p>
                           <Link to="sub03_mindTherapy_05.html" className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </main>

            <footer id="footer"></footer>
            <div id="top_menu"></div>
         </div>
         <div className='modal'>
            {/* 고민 클릭시 나타나는 팝업 */}
            <div className="modal-container R-popup R-popup-01" style={{ display: "none" }}>
               <div className="modal-wrap col-group">
                  <i onClick={() => modalClose()} className="close-btn"></i>
                  <div className="img-wrap">
                     <img src={images.R_popup_01} alt="" />
                  </div>
                  <div className="txt-wrap row-group">
                     <div className="label"># Revolution</div>
                     <div className="title-group row-group">
                        <p className="title">권지혜</p>
                        <div className="sub-title-group col-group">
                           <p className="sub-title">30대</p>
                           <p className="sub-title">#Revolution</p>
                        </div>
                     </div>
                     <div className="txt">
                        20대 중후반부터 사회생활을 시작해서 자리를 잡고, <br />
                        성실하게 직장생활을 하는 권지혜 씨. <br />
                        여행도 다니고 운동도 하면서 틈틈이 자기관리를 하고 있지만, <br />
                        마음 한편에 공허함을 느낀다는데... <br />
                        <br />
                        “아니, 평소처럼 퇴근을 하고 있는데 그런 생각이 드는 거예요. <br />
                        ‘나 이렇게 살아도 되나? 잘 살고 있는거 맞나?’” <br />
                        <br />
                        “지인들을 만나고 재밌는 시간 보내고 집에 왔거든요? <br />
                        근데 뭔가 허무하고 공허했어요. 왜 그럴까요?” <br />
                        <br />
                        권지혜씨는 최근 들어 마음 속에 질문들이 하나 둘 떠오른다고 합니다. <br />
                        ‘나 이렇게 살아도 되나?’, ‘내가 정말 원하는 건 뭐지?’… <br />
                        이 질문들을 따라가보고 싶은데 <br />
                        <br />
                        어떻게 해야 할지 막막하기만 합니다. <br />
                        권지혜씨에게는 나침반이 되어줄 무언가가 필요합니다.
                     </div>
                     <Link to="/mind-insight-test/index" target="_blank" className="btn col-group">
                        심리검사 받기
                        <i className="icon"></i>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="modal-container R-popup R-popup-02" style={{ display: "none" }}>
               <div className="modal-wrap col-group">
                  <i onClick={() => modalClose()} className="close-btn"></i>
                  <div className="img-wrap">
                     <img src={images.R_popup_02} alt="" />
                  </div>
                  <div className="txt-wrap row-group">
                     <div className="label"># Restart</div>
                     <div className="title-group row-group">
                        <p className="title">김은정</p>
                        <div className="sub-title-group col-group">
                           <p className="sub-title">40대</p>
                           <p className="sub-title">#Restart</p>
                        </div>
                     </div>
                     <div className="txt">
                        여성은 ‘엄마’가 되면 ‘나’를 잃기 쉽습니다. <br />
                        <br />
                        “엄마가 되었지만, 경력과 능력을 잃은 것 같아요”<br />
                        - 엄마라는 이름을 얻고, 나를 잃은 은정 씨<br />
                        <br />
                        나는 무엇을 잘 하는 사람이었을까요?<br />
                        엄마가 되기 전에 내가 했던 일들은 아직도 나에게 의미가 있을까요?<br />
                        <br />
                        사랑하는 사람을 만나 결혼하고 아이를 낳아 남부럽지 않은 가정을 이루었지만,<br />
                        아이가 클수록 마음 한구석에서 불안함이 올라왔어요.<br />
                        <br />
                        '이대로 나의 특기는 빨래, 청소, 설거지가 되는 걸까?'<br />
                        '내가 일 하고 싶다하면 어디서 나를 고용하기는 해줄까?'<br />
                        '연로하신 부모님 돌봄으로 이어져 계속 집에만 있게 되는건 아닐까'<br />
                        <br />
                        나도 내 이름으로 사회 일원이 되어 살아갈 수 있을지,<br />
                        과연 나는 무엇을 잘 하는 사람었고<br />
                        무엇에 행복감을 느끼며 어떤 가치를 추구하는 사람이었는지<br />
                        <br />
                        우선, 나를 제대로 알아야겠습니다.
                     </div>
                     <Link to="/mind-insight-test/index" target="_blank" className="btn col-group">
                        심리검사 받기
                        <i className="icon"></i>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="modal-container R-popup R-popup-03" style={{ display: "none" }}>
               <div className="modal-wrap col-group">
                  <i onClick={() => modalClose()} className="close-btn"></i>
                  <div className="img-wrap">
                     <img src={images.R_popup_03} alt="" />
                  </div>
                  <div className="txt-wrap row-group">
                     <div className="label"># Reconstruction</div>
                     <div className="title-group row-group">
                        <p className="title">정영식</p>
                        <div className="sub-title-group col-group">
                           <p className="sub-title">50대</p>
                           <p className="sub-title">#Reconstruction</p>
                        </div>
                     </div>
                     <div className="txt">
                        “한눈 팔지 않고 열심히 산 것 같은데, 왜 인생이 허무하게 느껴질까요” <br />
                        - 먹고 살기 바빴던 30년, 어느새 청년이 부러운 정영식씨 <br />
                        <br />
                        “같은 분야에서 30년쯤 경력을 쌓고 보니 할 줄 아는 거라곤 그거 하나뿐인 사람이 됐고, 그마저도 밥벌이로 삼을 날이 얼마 남지 않았어요. 정년이 다가올수록 불안감만 높아집니다. <br />
                        <br />
                        백세시대라는데, 그래서 정년 이후에도 할 일이 있어야 한다는데 저는 아무것도 준비 해 놓은게 없습니다. <br />
                        <br />
                        한 우물만 파느라 옆도 뒤도 돌아보지 않았고, 내 세울 만한 특별한 능력도 없는데 앞으로 남은 인생은 어찌 살아가야할지 그 생각만 하면 한숨부터 나옵니다.”<br />
                        <br />
                        나이 들면서 누군가에게 짐이 되고 싶지는 않다는 정영식씨는 죽는 날까지 건강하게 스스로 먹고 사는 문제는 해결하며 살고 싶다고 합니다.<br />
                        <br />
                        중년의 한 가운데에서 지나온 삶을 돌아보며 그동안 무엇을 위해 살았고, 무엇을 이루었는지, 어느 부분이 강점이고 어느 지점을 보완하면 좋을지 찬찬히 되짚어 보아야 겠습니다.
                     </div>
                     <Link to="/mind-insight-test/index" target="_blank" className="btn col-group">
                        심리검사 받기
                        <i className="icon"></i>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="modal-container R-popup R-popup-04" style={{ display: "none" }}>
               <div className="modal-wrap col-group">
                  <i onClick={() => modalClose()} className="close-btn"></i>
                  <div className="img-wrap">
                     <img src={images.R_popup_04} alt="" />
                  </div>
                  <div className="txt-wrap row-group">
                     <div className="label"># Refresh</div>
                     <div className="title-group row-group">
                        <p className="title">정소희</p>
                        <div className="sub-title-group col-group">
                           <p className="sub-title">20대</p>
                           <p className="sub-title">#Refresh</p>
                        </div>
                     </div>
                     <div className="txt">
                        정소희씨는 얼마 전 3년간 만난 연인에게 이별을 통보받았습니다. <br />
                        연인은 정소희씨에게 우리는 늘 같은 문제로 싸우는 것 같다며 더 만날 자신이 없다고 했습니다. <br />
                        생각해보면 이번 연애뿐 아니라 그 이전 연애에서도 비슷한 문제들로 갈등이 생겼던 것 같습니다. <br />
                        <br />
                        “왜 나는 연인과 같은 문제에 부딪히는 걸까?”<br />
                        “비슷하게 반복되는 내 연애 패턴에는 무엇이 있는 걸까?”<br />
                        <br />
                        정소희씨는 연인과의 관계에서 발견한 ‘나’에 대해 더 진지하게 생각해보고 싶습니다. 하지만 어떻게 ‘나’를 알아가야 할지 몰라서, 나에 대해 알려줄 지침서라도 있었으면 좋겠다는 생각이 듭니다.
                     </div>
                     <Link to="/mind-insight-test/index" target="_blank" className="btn col-group">
                        심리검사 받기
                        <i className="icon"></i>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="modal-container R-popup R-popup-05" style={{ display: "none" }}>
               <div className="modal-wrap col-group">
                  <i onClick={() => modalClose()} className="close-btn"></i>
                  <div className="img-wrap">
                     <img src={images.R_popup_05} alt="" />
                  </div>
                  <div className="txt-wrap row-group">
                     <div className="label"># Recreation</div>
                     <div className="title-group row-group">
                        <p className="title">이영숙</p>
                        <div className="sub-title-group col-group">
                           <p className="sub-title">60대</p>
                           <p className="sub-title"># Recreation</p>
                        </div>
                     </div>
                     <div className="txt">
                        "‘내 나이가 어때서’ 라지만, 나이 때문에 나는 자꾸만 쪼그라듭니다“ <br />
                        <br />
                        마음은 이팔청춘, 뭐든지 할 수 있을 것 같은데 사회에선 ‘늙은이’ 취급을 받아서 위축되고 서글퍼지는 이영숙씨. <br />
                        <br />
                        그렇지만 이영숙씨는 지금까지 경험이 쌓여 만들어진 연륜을 바탕으로 인생 이모작을 준비 중입니다. <br />
                        <br />
                        가족을 위해, 먹고 살기 위해 싫은 일도 참아냈고 만나기 싫은 관계도 이어왔습니다. 남은 인생은 쓸데 없이 낭비하거나 남을 위해 쓰고 싶지 않습니다. 건강하고 멋진 노년을 보내기 위해 저는 무엇을 버리고 무엇에 집중해야 할까요?<br />
                        <br />
                        인생 전반을 돌아보며 이후의 삶을 계획하고 싶습니다.
                     </div>
                     <Link to="/mind-insight-test/index" target="_blank" className="btn col-group">
                        심리검사 받기
                        <i className="icon"></i>
                     </Link>
                  </div>
               </div>
            </div>
            <div className="modal-container R-popup R-popup-06" style={{ display: "none" }}>
               <div className="modal-wrap col-group">
                  <i onClick={() => modalClose()} className="close-btn"></i>
                  <div className="img-wrap">
                     <img src={images.R_popup_06} alt="" />
                  </div>
                  <div className="txt-wrap row-group">
                     <div className="label"># Reformation</div>
                     <div className="title-group row-group">
                        <p className="title">서혜진</p>
                        <div className="sub-title-group col-group">
                           <p className="sub-title">20대</p>
                           <p className="sub-title">#Reformation</p>
                        </div>
                     </div>
                     <div className="txt">
                        20대 중후반부터 사회생활을 시작해서 자리를 잡고, 성실하게 직장생활을 하는 서혜진 씨. <br />
                        서혜진씨는 안정적인 직장생활을 하고 있지만, 결혼, 육아를 하느라 직장을 그만두고 경력이 끊긴 선배들을 보며 미래에 대한 고민이 생긴다는데...<br />
                        <br />
                        “내가 회사를 언제까지 다닐 수 있을까?”<br />
                        “점점 나이가 드는데... 앞으로 뭐하고 살아야 하지?”<br />
                        <br />
                        서혜진씨는 현재 직장을 다니면서 제2의 직업을 찾기로 합니다. 이왕이면, 자신에게도 다른 사람에게도 의미가 있고 가치가 있는 일을 하고 싶은데 무엇을 시작해야 할지 막막하기만 합니다. 서혜진씨에게는 나침반이 되어줄 무언가가 필요합니다.
                     </div>
                     <Link to="/mind-insight-test/index" target="_blank" className="btn col-group">
                        심리검사 받기
                        <i className="icon"></i>
                     </Link>
                  </div>
               </div>
            </div>
            {/* 고민 클릭시 나타나는 팝업 */}
         </div>
         <Popup mainData={mainData} />
      </div >
   )
}

export default MainPage