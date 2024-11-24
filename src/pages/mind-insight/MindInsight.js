import React, { useEffect, useState } from 'react'

// Components
import Loading from '../../components/common/Loading'
import Faq from '../../components/sub-page/Faq'
import ImagesPopup from '../../components/sub-page/ImagesPopup'
import CounselorOnly from '../../components/sub-page/CounselorOnly'
import PurchaseInfo from '../../components/sub-page/PurchaseInfo'
import FixedCart from '../../components/sub-page/FixedCart'

// Hooks
import useFixedItemOn from "../../hooks/FixCart"
import PageAnchor from '../../hooks/PageAnchor'
import useProductFetchData from '../../hooks/ProductDetailFetchData'

// Images, Vidoes
import { images } from '../../assets/images'

const MindInsight = () => {
   // Hooks 
   const fixedItemisOn = useFixedItemOn();
   PageAnchor();

   // fetchData
   const productId = 1;
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

   if (!data) return <Loading />

   return (
      <main className="subpage course">
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

         <div className="course-content-wrap mind-insight-about">
            <div className="tab-link-wrap">
               <div className="container w1280 col-group">
                  <a href="#anchor_1" id="tab_1" className="tab-link active">
                     마인드 인사이트
                  </a>
                  <a href="#anchor_2" id="tab_2" className="tab-link">
                     마인드 리포트
                  </a>
                  <a href="#anchor_3" id="tab_3" className="tab-link">
                     마인드 임팩트 상담
                  </a>
                  <a href="#anchor_4" id="tab_4" className="tab-link">
                     마인드 테라피
                  </a>
                  <a href="#anchor_5" id="tab_5" className="tab-link">
                     검사 안내
                  </a>
                  <a href="#anchor_6" id="tab_6" className="tab-link">
                     자주하는 질문
                  </a>
               </div>
            </div>
            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_1">
                  <div className="page-anchor-core page-anchor-1 page-anchor-item"></div>
               </div>

               <div className="section section-01">
                  <div className="container">
                     <div className="section-title-wrap row-group">
                        <p className="sub-title green">
                           융합심리분석 프로그램 운영
                        </p>
                        <h3 className="title">
                           마인드 인사이트
                        </h3>
                        <p className="txt">
                           융합심리분석 프로그램으로&nbsp;
                           <strong>Mind Insight -&gt; Mind Report -&gt; Mind Impact  -&gt; Mind Therapy</strong>
                           과정을 통해 <br />
                           과거를 나를 돌아보며 체크 하고, 현재의 나를 분석하여, 미래의 나를 위한 처방전과 같은 인생코칭 서비를 제공합니다.
                        </p>
                     </div>
                     <img src={images.mind_sight_about_section_01} alt="" className="img-pc" />
                     <img src={images.mind_sight_about_section_01_m} alt="" className="img-mb" />
                  </div>
               </div>

               <div className="section-wrap section section-03-01">
                  <div className="img-wrap">
                     <img src={images.mind_insight_02_02_01} alt="" />
                  </div>
                  <div className="container w1280">
                     <div className="txt-wrap">
                        <div className="section-title-wrap row-group">
                           <div className="num">01</div>
                           <p className="eng-title">
                              Mind insight
                           </p>
                           <h3 className="title">
                              마인드 인사이트
                           </h3>
                           <p className="sub-title">
                              첫 번째 단계인 마인드 인사이트입니다.
                           </p>
                           <p className="txt">
                              불안, 우울, 분노 검사를 통해 개인의 E·motion 정서생활을 체크합니다. <br />
                              이와 함께 디지털 의존도, 번아웃 증후군, 공황장애, 스트레스 지수를 체크하여 몸과 마음의 상관관계를 파악합니다. <br />
                              <br />
                              세상에 수많은 ‘나’들은 타자와의 관계 속에서 상처 입고, 헤매면서 성장합니다.<br className="pc" />
                              부모의 언어와 사고체계가 나에게 오염되어 물들고, 사회적 정의가 나의 선택을 왜곡합니다. <br className="pc" />
                              이 과정에서 입게 되는 상처는 나만의 문제가 아닙니다. <br />
                              <br />
                              마인드아이티 고유의 분석도구를 활용해 나를 심리적 · 영성적 · 교류적으로 융합분석 합니다. <br />
                              <br />
                              내 안에 숨겨진 역량을 분석하고, 내가 사용하는 에너지의 방향과 힘의 균형을 파악합니다.<br className="pc" />
                              또한, 내가 자주 사용하는 자아상태 파악을 통해 타인과 의사소통하고 관계맺는 방식을 분석합니다.
                           </p>
                        </div>
                     </div>
                     <div className="img-group row-group">
                        <img src={images.mind_insight_detail_01_01} alt="" className="img-pc" />
                        <img src={images.mind_insight_detail_01_01_m} alt="" className="img-mb" />
                        <img src={images.mind_insight_detail_01_02} alt="" className="img-pc" />
                        <img src={images.mind_insight_detail_01_02_m} alt="" className="img-mb" />
                     </div>
                  </div>

               </div>
            </div>

            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_2">
                  <div className="page-anchor-core page-anchor-2 page-anchor-item"></div>
               </div>
               <div className="section-wrap section-03-02">
                  <div className="img-wrap">
                     <img src={images.mind_insight_02_03_01} alt="" />
                  </div>
                  <div className="container w1280">
                     <div className="txt-wrap">
                        <div className="section-title-wrap row-group">
                           <div className="num">02</div>
                           <p className="eng-title">
                              Mind Report
                           </p>
                           <h3 className="title">
                              마인드 리포트
                           </h3>
                           <p className="sub-title">
                              두 번째 단계인 마인드 리포트입니다.
                           </p>
                           <p className="txt">
                              앞선, 두 과정을 통해 진단하고 분석한 자신만의 리포트를 완성합니다. <br />
                              과거의 나를 진단하고, 현재의 나를 분석하면서 만드는<br />
                              건강한 미래의 나를 위한 처방전과 같은 인생코칭 보고서입니다. <br />
                              <br />
                              나의 인생점수와 융합역량지수가 표시되며, <br />
                              갈등회피 전략, 관계 전략, 성장전략, 셀프코칭질문 등으로 구성된<br />
                              R약 처방을 받아볼 수 있습니다.
                           </p>
                           <a href="sub02_mindInsight_02.html#anchor_2" className="more-btn type02 col-group">
                              샘플보기
                           </a>
                        </div>
                     </div>
                     <div className="img-group col-group">
                        <div className="img-group">
                           <div className="img-container row">
                              <img src={images.mind_insight_02_03_02} alt="" />
                           </div>
                        </div>
                        <div className="img-group row-group">
                           <div className="img-container col">
                              <img src={images.mind_insight_02_03_03} alt="" />
                           </div>
                           <div className="img-container col">
                              <img src={images.mind_insight_02_03_04} alt="" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_3">
                  <div className="page-anchor-core page-anchor-3 page-anchor-item"></div>
               </div>
               <div className="section-wrap section section-03-03">
                  <div className="img-wrap">
                     <img src={images.mind_insight_02_04_01} alt="" />
                  </div>
                  <div className="container w1280">
                     <div className="txt-wrap">
                        <div className="section-title-wrap row-group">
                           <div className="num">03</div>
                           <p className="eng-title">
                              Mind Impact Counceling
                           </p>
                           <h3 className="title">
                              마인드 임팩트 상담
                           </h3>
                           <p className="sub-title">
                              세 번째 단계인 마인드 임팩트 상담입니다.
                           </p>
                           <p className="txt">
                              직영 평생교육시설을 통해 양성된 <br className="pc" />
                              전문 분석상담사들이 지역별 상담센터를 운영합니다. <br />
                              <br />
                              마인드 아이티만의 고유한 검사도구와 분석키트를 활용한 <br className="pc" />
                              융합심리분석상담과 융합심리분석치료에 최적화된 시스템을 <br className="pc" />
                              갖추고 있으며, 융합적 접근방식의 솔루션을 제공합니다.
                           </p>
                           <a href="sub02_mindInsight_02.html#anchor_3" className="more-btn type02 col-group">
                              샘플보기
                           </a>
                        </div>
                     </div>
                     <div className="img-group col-group">
                        <div className="img-group">
                           <div className="img-container row">
                              <img src={images.mind_insight_02_04_02} alt="" />
                           </div>
                        </div>
                        <div className="img-group row-group">
                           <div className="img-container col">
                              <img src={images.mind_insight_02_04_03} alt="" />
                           </div>
                           <div className="img-container col">
                              <img src={images.mind_insight_02_04_04} alt="" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="section section-04">
                  <div className="container col-group">
                     <button className="btn">
                        <img src={images.test_btn} alt="" />
                     </button>
                     <div className="img-wrap">
                        <img src={images.mind_sight_about_section_04} alt="" className="pc" />
                        <img src={images.mind_sight_about_section_04_mb} alt="" className="mb" />
                     </div>
                     <div className="section-title-wrap row-group">
                        <p className="sub-title green">
                           IQ? EQ? META Q!
                        </p>
                        <h3 className="title">
                           제3의 ‘Q’ <div className="col-group">
                              <img src={images.metaQ_green} alt="" />
                              (융합역량지수)
                           </div>
                        </h3>
                        <p className="txt">
                           인간과 사회, 자연 안에서 벌어지는 현상을 관찰하고, 분석하며 원인과 결과를 추론하고, <br className="pc" />
                           문제 해결을 위한 아이디어를 생성하여 실천할 수 있는 제 역량을 IQ, EQ만으로 담아내기에는 한계가 있습니다.
                        </p>
                        <p className="st-txt">
                           그래서 IQ(지능지수), EQ(정서지능)를 넘어서 있는 것, <br />
                           <span className="green">
                              그 이상의 어떤 것을 우리는 <strong className="green">‘융합역량’</strong>지능이라고 정의했습니다.
                           </span>
                        </p>
                        <div className="detail-txt-list row-group">
                           <div className="detail-txt-item col-group">
                              <img src={images.icon_check_green} alt="" className="icon" />
                              <p className="detail-txt">
                                 우리가 의미와 가치의 문제를 다루고 해결할 때 사용하는 지능
                              </p>
                           </div>
                           <div className="detail-txt-item col-group">
                              <img src={images.icon_check_green} alt="" className="icon" />
                              <p className="detail-txt">
                                 우리의 행동과 삶을 광범위하고 풍부한 의미의 맥락에 자리매김할 수 있게 하는 지능
                              </p>
                           </div>
                           <div className="detail-txt-item col-group">
                              <img src={images.icon_check_green} alt="" className="icon" />
                              <p className="detail-txt">
                                 일련의 행동이나 삶의 경로가 다른 것보다 의미 있다고 평가할 수 있게 하는 지능
                              </p>
                           </div>
                           <div className="detail-txt-item last col-group">
                              이것이 바로 <strong>‘융합역량 지능’</strong>입니다
                           </div>
                        </div>
                        <p className="txt">
                           ‘융합역량 지능’은 자아나 의식적인 생각을 초월하는, 자기의 깊은 부분에 존재하는 지혜와 연관된 지능이며 <br className="pc" />
                           기존의 가치를 인식하는 데 그치지 않고 새로운 가치를 창조적으로 발견하게 하는 지능입니다. <br />
                           융합적이고 통섭적이며 통합적이기도 한 ‘융합역량 지능’은 부분에 대한 인식의 한계를 뛰어넘어 <br className="pc" />
                           전체에 대한 이해와 융합적 사고능력을 요구합니다. <br />
                           <br />
                           개인의 정서지수와 다중지능지수, 그리고 에너지 방향과 의사소통 방식 등에 따른 기능지수를 통합적으로 분석하여 <br className="pc" />
                           ‘융합역량지수’로 나타냅니다. <br />
                           융합역량지수를 근거로, 미래에 건강한 나로 살아가기 위한 다양한 전략과 성장비전을 찾아봅니다.
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_4">
                  <div className="page-anchor-core page-anchor-4 page-anchor-item"></div>
               </div>
               <div className="section-wrap section-03-04">
                  <div className="img-wrap">
                     <img src={images.mind_insight_02_05_01} alt="" />
                  </div>
                  <div className="container w1280 row-group">
                     <div className="txt-wrap">
                        <div className="section-title-wrap row-group">
                           <div className="num">04</div>
                           <p className="eng-title">
                              Mind Therapy
                           </p>
                           <h3 className="title">
                              마인드 테라피
                           </h3>
                           <p className="sub-title">
                              네 번째 단계인 마인드 테라피입니다.
                           </p>
                           <p className="txt">
                              번잡한 도시를 떠나 자연 안에 머무르며 내면의 '자기'에 집중합니다. <br />
                              <br />
                              Soul Stay, Retreat, Walking Meditation, On-Offline Group Therapy 등을 통해 재해석을 위한 실마리를 찾고,<br className="pc" />
                              새로워지기 위한 구체적인 행동 목표를 설정합니다.
                           </p>
                        </div>
                     </div>

                     <div className="img">
                        <img src={images.mind_insight_detail_04_01} alt="" className="img-pc" />
                        <img src={images.mind_insight_detail_04_01_m} alt="" className="img-mb" />
                     </div>

                     <div className="section-category-list item3 col-group">
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.mind_insight_detail_04_02_01} alt="" />
                           </div>
                           <p className="title">
                              Soul Stay
                           </p>
                           <p className="txt">
                              번잡한 도시를 떠나 자연 안에 머무르기 <br />
                              피세정념(避世靜念, 피정 retreat) <br />
                              -하루愛 / 이틀愛 / 겨울살이 등
                           </p>
                           <div className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </div>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.mind_insight_detail_04_02_02} alt="" />
                           </div>
                           <p className="title">
                              오프라인 그룹 테라피
                           </p>
                           <p className="txt">
                              개인의 심리적 문제를 해결하기 위해 소집단 안에서 <br />
                              상호작용하며, 새로운 관계를 경험하고, <br />
                              더 나은 삶을 향해 노력하는 테라피
                           </p>
                           <div className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </div>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.mind_insight_detail_04_02_03} alt="" />
                           </div>
                           <p className="title">
                              조직문화 개선(팀 빌딩)
                           </p>
                           <p className="txt">
                              기업과 단체의 목표 도달과 성공은 구성원들의 협력과 <br />
                              조화에서 시작됩니다. 팀빌딩은 조직문화를 혁신하여 <br />
                              기업과 단체의 효율성을 제고합니다.
                           </p>
                           <div className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </div>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.mind_insight_detail_04_02_04} alt="" />
                           </div>
                           <p className="title">
                              성공하는 커뮤니케이션
                           </p>
                           <p className="txt">
                              커뮤니케이션(Communication)은 com(함께) <br />
                              +munere(세상)의 합성어입니다. 소통은 더불어 살아가는 <br />
                              세상에서 가장 중요한 존재의 방법입니다.
                           </p>
                           <div className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </div>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.mind_insight_detail_04_02_05} alt="" />
                           </div>
                           <p className="title">
                              온·오프라인 그룹 테라피
                           </p>
                           <p className="txt">
                              인지행동치료는 내담자가 가지고 있는 여러가지 인지의 <br />
                              오류들을 깨닫게 하고, 변경하거나 제거하는 작업입니다.<br />
                              함께 하면 훨씬 수월한 치료효과를 가져옵니다.
                           </p>
                           <div className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </div>
                        </div>
                        <div className="section-category-item row-group">
                           <div className="img-container">
                              <img src={images.mind_insight_detail_04_02_06} alt="" />
                           </div>
                           <p className="title">
                              교류분석 상담치료
                           </p>
                           <p className="txt">
                              타자와의 교류 방식을 분석하여 '타자와 외부에 의해 <br />
                              정의된 나'로부터 벗어나 '참 나'(진짜 자기)를 찾고, <br />
                              나를 힘들게 했던 과거를 재해석합니다.
                           </p>
                           <div className="more-btn col-group">
                              자세히 보기
                              <i></i>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_5">
                  <div className="page-anchor-core page-anchor-5 page-anchor-item"></div>
               </div>
               <div className="section-wrap section section-03-04">
                  <div className="img-wrap">
                     <img src={images.mind_insight_02_06_01} alt="" />
                  </div>
                  <div className="container w1280 row-group">
                     <div className="section-group">
                        <div className="txt-wrap">
                           <div className="section-title-wrap row-group">
                              <div className="num">05</div>
                              <p className="eng-title">
                                 Mind Therapy
                              </p>
                              <h3 className="title">
                                 마인드 인사이트 검사
                              </h3>
                              <p className="sub-title">
                                 건강한 내일을 맞이할 수 있는 융합심리분석상담
                              </p>
                           </div>
                        </div>

                        <div className="test-info-wrap col-group">
                           <div className="test-info-title-wrap row-group">
                              <p className="title">
                                 이런 분들께 <br />
                                 추천해요
                              </p>
                              <div className="test-info-title-group col-group">
                                 <div className="test-info-title-item row-group">
                                    <p className="item-title">
                                       검사 문항
                                    </p>
                                    <p className="item-txt">
                                       총 474문항
                                    </p>
                                 </div>
                                 <div className="test-info-title-item row-group">
                                    <p className="item-title">
                                       소요 시간
                                    </p>
                                    <p className="item-txt">
                                       40~50분
                                    </p>
                                 </div>
                              </div>
                           </div>
                           <div className="test-info-txt-wrap col-group">
                              <div className="test-info-txt">
                                 ‘누구의 엄마가 아닌, 나로 살고 싶어요’ 40대 경력보유 여성
                              </div>
                              <div className="test-info-txt">
                                 ‘아무것도 하고 싶지 않아요’ 번아웃 증후군
                              </div>
                              <div className="test-info-txt">
                                 ‘나는 어떤 사람일까요?’ 나를 알고 싶은 사람들
                              </div>
                              <div className="test-info-txt">
                                 ‘주변 사람들과 자꾸 갈등이 생겨요’ 대인관계로 힘든 사람들
                              </div>
                              <div className="test-info-txt">
                                 ‘애인과 비슷한 문제로 싸우게 돼요’ 연애로 고민하는 사람들
                              </div>
                              <div className="test-info-txt">
                                 ‘앞으로 어떻게 살아야 할까요?’ 삶의 방향을 찾는 사람들
                              </div>
                              <div className="test-info-txt wide">
                                 ‘이제 가족이 아닌 내 인생을 살아보려고 합니다’ 인생 이모작을 준비하는 중·장년
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="section-group">
                        <div className="txt-wrap">
                           <div className="section-title-wrap row-group">
                              <p className="eng-title">
                                 Psychological Test Step
                              </p>
                              <h3 className="title">
                                 심리검사 진행 단계
                              </h3>
                              <p className="sub-title">
                                 체계적인 검사를 통해 나를 알아가기
                              </p>
                           </div>
                        </div>

                        <div className="test-step-info-wrap row-group">
                           <div className="test-step-info-item col-group">
                              <div className="icon">1</div>
                              <p className="txt">
                                 마인드 인사이트를 구매 및 결제합니다.
                              </p>
                           </div>
                           <div className="test-step-info-item col-group">
                              <div className="icon">2</div>
                              <p className="txt">
                                 전송 받은 카카오톡/문자메시지를 통해 심리검사 실시 페이지에 접속합니다.
                              </p>
                           </div>
                           <div className="test-step-info-item col-group">
                              <div className="icon">3</div>
                              <p className="txt">
                                 심리검사 실시 안내에 따라 심리검사를 진행합니다.
                              </p>
                           </div>
                           <div className="test-step-info-item col-group">
                              <div className="icon">4</div>
                              <p className="txt">
                                 심리검사 완료! 결과지를 확인합니다.
                              </p>
                           </div>
                        </div>
                     </div>
                     <div className="section-group">
                        <div className="txt-wrap">
                           <div className="section-title-wrap row-group">
                              <p className="eng-title">
                                 Know Myself More Deeply
                              </p>
                              <h3 className="title">
                                 ‘나’를 더 깊이 만나고 싶다면?
                              </h3>
                              <p className="sub-title">
                                 진짜 나에 대해 알아가는 방법
                              </p>
                           </div>
                        </div>

                        <div className="section-category-list item2 col-group">
                           <div className="section-category-item row-group">
                              <div className="img-container">
                                 <img src={images.mind_insight_detail_04_02_01_png} alt="" />
                              </div>
                              <p className="title">
                                 1:1 해석상담
                              </p>
                              <p className="txt">
                                 1:1 나만을 위한 심리검사 해석상담으로 ‘나’를 더 깊이 만나보세요! <br />
                                 <span className="sub-txt green">
                                    ※ 해석상담, 마인드 리포트는 추가구매를 통해 진행할 수 있습니다.
                                 </span>
                              </p>
                           </div>
                           <div className="section-category-item row-group">
                              <div className="img-container">
                                 <img src={images.mind_insight_detail_04_02_02_png} alt="" />
                              </div>
                              <p className="title">
                                 마인드 리포트
                              </p>
                              <p className="txt">
                                 ‘나’의 모든 것이 담긴 ‘마인드 리포트’를 책으로 소장해보세요!
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="page-anchor-wrap">
               <div className="page-anchor" id="anchor_6">
                  <div className="page-anchor-core page-anchor-6 page-anchor-item"></div>
               </div>
               <div className="section dark-green">
                  <Faq data={data.faq} />
               </div>
            </div>
         </div>

         <footer id="footer"></footer>

         {/* 상담사 전용 옵션 선택>구매하기 클릭시 팝업 */}
         <CounselorOnly />

         {/* 이미지 클릭 시 나타나는 팝업 */}
         <ImagesPopup />
      </main>
   )
}

export default MindInsight