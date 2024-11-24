import React from 'react'
import { Link } from 'react-router-dom';

// components
import IndexHeader from '../../components/IndexHeader';

// images / video
import { images } from '../../assets/images';
import { videos } from '../../assets/videos';

const About = () => {
   IndexHeader();

   return (
      <main className="subpage about">
         <div className="index-slide">
            <div className="swiper-slide index-slide-item">
               <video src={videos.about} className="bg-img" autoPlay muted loop></video>
               <div className="index-slide-txt-wrap title_ani row-group">
                  <h2 className="title">
                     <span className="color">MIND I</span>nsigh<span className="color">T</span>
                  </h2>
               </div>
            </div>

            <div className="scroll-down">
               Scroll Down
               <div className="scroll-down-bar"></div>
            </div>
         </div>

         <div className="section section-00">
            <div className="container">
               <img src={images.about_section_01} alt="" className="img-pc" />
               <img src={images.about_section_01_m} alt="" className="img-mb" />
            </div>
         </div>

         <div className="section section-01">
            <div className="container col-group">
               <div className="section-title-wrap row-group">
                  <img src={images.icon_about_section_01} alt="" className="img-icon" />
                  <div className="num">01</div>
                  <p className="sub-title">
                     Mind Insight
                  </p>
                  <h3 className="title">
                     마인드 인사이트
                  </h3>
                  <p className="txt">
                     마인드아이티 고유의 분석도구를 활용한 <br />
                     심리적·영성적·교류적 융합분석
                  </p>
                  <a href="sub02_mindInsight_01.html" className="btn">자세히보기</a>
               </div>
            </div>
         </div>
         <div className="section section-02">
            <div className="container">
               <div className="section-title-wrap col-group">
                  <div className="row-group">
                     <div className="num">02</div>
                     <img src={images.icon_about_section_02} alt="" className="img-icon" />
                  </div>
                  <div className="row-group">
                     <p className="sub-title">
                        평생교육시설 운영
                     </p>
                     <h3 className="title">
                        사피엔자 아카데미아
                     </h3>
                     <p className="txt">
                        개인을 둘러싼 사람과 환경을 포괄 분석하고 상담할 수 있도록 양성하는 체계적 교육 시스템입니다.
                     </p>
                     <a href="sub04_sapienza_01.html" className="btn">자세히보기</a>
                  </div>
               </div>
               <div className="sapienza-list col-group">
                  <div className="sapienza-item row-group">
                     <img src={images.sapienza_item_01} alt="" className="bg-img" />
                     <p className="num">01</p>
                     <p className="title">
                        인문융합치료
                     </p>
                     <p className="txt">
                        신체적, 정신적, 사회적, 영적 성장을 통한 <br />
                        건강한 상태의 인간을 지향합니다.
                     </p>
                  </div>
                  <div className="sapienza-item row-group">
                     <img src={images.sapienza_item_02} alt="" className="bg-img" />
                     <p className="num">02</p>
                     <p className="title">
                        융합심리학
                     </p>
                     <p className="txt">
                        자아초월심리학(transpersonal Psychology)의 <br />
                        학문적 성과에 영성(spirituality)을 융합하는  <br />
                        제5세대 심리학
                     </p>
                  </div>
                  <div className="sapienza-item row-group">
                     <img src={images.sapienza_item_03} alt="" className="bg-img" />
                     <p className="num">03</p>
                     <p className="title">
                        발달심리분석
                     </p>
                     <p className="txt">
                        인간의 출생부터 사망까지 연령 및 환경에 따른<br />
                        인간존재의 역동을 영성(Spirituality)과 <br />
                        융합하여 이해하는 과정
                     </p>
                  </div>
                  <div className="sapienza-item row-group">
                     <img src={images.sapienza_item_04} alt="" className="bg-img" />
                     <p className="num">04</p>
                     <p className="title">
                        메타영성
                     </p>
                     <p className="txt">
                        인간의 몸과 마음, 정신과 영혼이 어떻게<br />
                        내적으로 다이내믹하게 역동하고 융합하는가
                     </p>
                  </div>
                  <div className="sapienza-item row-group">
                     <img src={images.sapienza_item_05} alt="" className="bg-img" />
                     <p className="num">05</p>
                     <p className="title">
                        융합심리분석상담
                     </p>
                     <p className="txt">
                        인간의 신체적, 정신적, 사회적 영적인 주제들을<br />
                        홀리스틱한 관점에서 이해합니다.
                     </p>
                  </div>
                  <div className="sapienza-item row-group">
                     <img src={images.sapienza_item_06} alt="" className="bg-img" />
                     <p className="num">06</p>
                     <p className="title">
                        융합심리분석치료
                     </p>
                     <p className="txt">
                        ‘보여지는 나’를 넘어선 ‘진짜 ‘나’를<br />
                        찾아나가는 회복의 여정입니다.
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className="section section-03">
            <div className="container">
               <div className="section-title-wrap col-group">
                  <div className="row-group">
                     <div className="num">03</div>
                     <img src={images.icon_about_section_03} alt="" className="img-icon" />
                  </div>
                  <div className="row-group">
                     <p className="sub-title">
                        치유프로그램 개발 운영
                     </p>
                     <h3 className="title">
                        마인드 테라피
                     </h3>
                     <p className="txt">
                        본점 외 지역별 분점을 운영하고 있으며, 내면의 '자기'에 집중할 수 있는 다양한 치유 프로그램이 준비되어 있습니다.
                     </p>
                     <a href="sub03_mindTherapy_01.html" className="btn">자세히보기</a>
                  </div>
               </div>
               <div className="mind-therapy-list col-group">
                  <div className="mind-therapy-item">
                     <div className="bg-img">
                        <img src={images.mind_theraphy_item_01} alt="" />
                        <p className="title center">Soul Stay</p>
                     </div>
                  </div>
                  <div className="mind-therapy-item">
                     <div className="bg-img">
                        <img src={images.mind_theraphy_item_02} alt="" />
                        <p className="title center">Retreat</p>
                     </div>
                  </div>
                  <div className="mind-therapy-item wide">
                     <div className="bg-img">
                        <img src={images.mind_theraphy_item_03} alt="" />
                        <p className="title center">Walking Meditation</p>
                     </div>
                  </div>
                  <div className="mind-therapy-item">
                     <div className="bg-img">
                        <img src={images.mind_theraphy_item_04} alt="" />
                        <p className="title center black">
                           On-Off line <br />
                           Group Therapy
                        </p>
                     </div>
                  </div>
                  <div className="mind-therapy-item wide">
                     <div className="bg-img">
                        <img src={images.mind_theraphy_item_05} alt="" />
                        <p className="title top">춘천 석파령 치유센터</p>
                     </div>
                  </div>
                  <div className="mind-therapy-item">
                     <div className="bg-img">
                        <img src={images.mind_theraphy_item_06} alt="" />
                        <p className="title center">EAP Workshop</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="section section-04">
            <div className="container col-group">
               <div className="section-title-wrap row-group">
                  <div className="num">04</div>
                  <img src={images.icon_about_section_04} alt="" className="img-icon" />
                  <p className="sub-title">
                     직영 및 지역별 분점 상담센터 운영
                  </p>
                  <h3 className="title">
                     마인드 임팩트 <br />
                     상담코칭센터
                  </h3>
                  <p className="txt">
                     직영 평생교육시설을 통해 양성된 <br />
                     전문 분석상담사들이 지역별 상담센터 운영<br />
                     <br />
                     마인드아이티만의 고유한 검사도구와<br />
                     분석키트를 활용한 융합심리분석상담과<br />
                     융합심리분석치료에 최적화된 시스템<br />
                     <br />
                     융합적 접근방식의 솔루션 제공
                  </p>
               </div>
               <div className="map-wrap">
                  <div className="tab-list col-group">
                     <div className="tab active" data-tab="mapWrap_1">
                        고양삼송점
                     </div>
                     <div className="tab" data-tab="mapWrap_2">
                        춘천점
                     </div>
                     <div className="tab" data-tab="mapWrap_3">
                        인천계양점
                     </div>
                     <div className="tab" data-tab="mapWrap_4">
                        제주점
                     </div>
                  </div>

                  <div className="tab-content active" id="mapWrap_1">
                     <div className="map-txt-list row-group">
                        <div className="map-txt-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              경기도 고양시 덕양구 삼송로 240, 힐스테이트삼송역스칸센 202동 248호
                              <Link to='' className="link">네이버 지도</Link>
                           </p>
                        </div>
                        <div className="map-txt-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              02-381-2024
                           </p>
                        </div>
                     </div>
                     <div className="map">
                        <iframe
                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.8333685723755!2d126.89835837652183!3d37.6531213720162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9704c8f4ebe7%3A0xf1d5405655a2ce61!2z6rK96riw64-EIOqzoOyWkeyLnCDrjZXslpHqtawg7IK87Iah66GcIDI0MA!5e0!3m2!1sko!2skr!4v1725523163973!5m2!1sko!2skr"
                           width="100%"
                           height="100%"
                           loading="lazy"
                           referrerPolicy="no-referrer-when-downgrade"
                           title="map"
                        />
                     </div>
                  </div>

                  <div className="tab-content" id="mapWrap_2">
                     <div className="map"></div>
                  </div>
                  <div className="tab-content" id="mapWrap_3">
                     <div className="map"></div>
                  </div>
                  <div className="tab-content" id="mapWrap_4">
                     <div className="map"></div>
                  </div>
               </div>
            </div>
         </div>
         <div className="section section-05">
            <div className="container">
               <div className="txt-wrap row-group">
                  <div className="txt-group row-group">
                     <h3 className="title">
                        OUR <span className="color">VISION</span>
                     </h3>
                     <p className="txt">
                        몸과 마음의 중심은 가장 아픈 곳입니다. <br className="mb" /> 아픈 곳은 성장과 변화가 있는 곳입니다. <br />
                        사람의 아픈 곳과 세상의 아픈 곳을 치유하며, <br className="mb" /> 공동선을 향해 나아갑니다.
                     </p>
                     <div className="tag-list col-group">
                        <div className="tag">#마인드케어</div>
                        <div className="tag">#정신건강 패러다임</div>
                        <div className="tag">#정신건강 패러다임</div>
                     </div>
                  </div>
                  <div className="txt-group row-group">
                     <h3 className="title">
                        OUR <span className="color">MISSION</span>
                     </h3>
                     <p className="txt">
                        마음을 진단하고 분석하고 해석하며 <br className="mb" />치료하는 모든 서비스를 제공합니다.<br />
                        조직을 진단하고 혁신하며 개인의 능률과 <br className="mb" />생산성을 제고하는 기업 EAP 프로그램을 제공합니다.<br />
                        사람과 세상을 혁신하는 문화콘텐츠를 제공합니다.
                     </p>
                     <div className="tag-list col-group">
                        <div className="tag">#관계성회복</div>
                        <div className="tag">#삶의재해석</div>
                        <div className="tag">#진단 · 분석 · 치료 · 치유</div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}

export default About