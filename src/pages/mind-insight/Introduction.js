import React from 'react'

// Components
import IndexHeader from '../../components/IndexHeader';

// Images / Videos
import { images } from '../../assets/images';

const Introduction = () => {

  IndexHeader();

  return (
    <main className="subpage mind-insight-about">
      <div className="index-slide swiper">
        <div className="swiper-pagination index-pagination"></div>
        <div className="swiper-wrapper">
          <div className="swiper-slide index-slide-item">
            <img src={images.mind_insight_about} alt="" className="bg-img" />
            <div className="index-slide-txt-wrap title_ani row-group">
              <h2 className="title">
                What is '<span className="color">Mind I</span>nsigh<span className="color">T</span>'?
              </h2>
            </div>
          </div>
        </div>

        <div className="scroll-down">
          Scroll Down
          <div className="scroll-down-bar"></div>
        </div>
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
              융합심리분석 프로그램으로
              <strong>Mind Insight -&#62; Mind Report -&#62; Mind Impact  -&#62; Mind Therapy</strong>
              과정을 통해 <br />
              과거를 나를 돌아보며 체크 하고, 현재의 나를 분석하여, 미래의 나를 위한 처방전과 같은 인생코칭 서비를 제공합니다.
            </p>
          </div>
          <img src={images.mind_sight_about_section_01} alt="" className="img-pc" />
          <img src={images.mind_sight_about_section_01_m} alt="" className="img-mb" />
        </div>
      </div>
      <div className="section section-02">
        <div className="container">
          <div className="section-title-wrap row-group">
            <p className="sub-title">
              REVOLUTION
            </p>
            <h3 className="title">
              너 자신을 <span className="yellow">‘R’</span>하라!
            </h3>
            <p className="txt">
              사람들은 나를 잘 모르며, 나조차 나를 설명하기 어렵습니다. <br />
              마인드 임팩트는 ‘진짜 나’를 알아가고 발견하는 과정입니다.
            </p>
          </div>
          <div className="strong-title">
            REVOLUTION
          </div>
          <div className="content-wrap row-group">
            <div className="Re-list col-group">
              <div className="Re-item">
                <div className="txt-wrap row-group">
                  <p className="num">01</p>
                  <p className="title">
                    <span className="green">R</span>e-member
                  </p>
                  <p className="txt">
                    기억하기
                  </p>
                </div>
              </div>
              <div className="Re-item">
                <div className="txt-wrap row-group">
                  <p className="num">02</p>
                  <p className="title">
                    <span className="green">R</span>e-formation
                  </p>
                  <p className="txt">
                    재해석하기
                  </p>
                </div>
              </div>
              <div className="Re-item">
                <div className="txt-wrap row-group">
                  <p className="num">03</p>
                  <p className="title">
                    <span className="green">R</span>e-creation
                  </p>
                  <p className="txt">
                    재창조하기
                  </p>
                </div>
              </div>
              <div className="Re-item">
                <div className="txt-wrap row-group">
                  <p className="num">04</p>
                  <p className="title">
                    <span className="green">R</span>e-fresh
                  </p>
                  <p className="txt">
                    새롭게하기
                  </p>
                </div>
              </div>
              <div className="Re-item">
                <div className="txt-wrap row-group">
                  <p className="num">05</p>
                  <p className="title">
                    <span className="green">R</span>e-volution
                  </p>
                  <p className="txt">
                    혁신적으로 변화하기
                  </p>
                </div>
              </div>
              <div className="Re-item">
                <div className="txt-wrap row-group">
                  <p className="num">06</p>
                  <p className="title">
                    <span className="green">R</span>e-start
                  </p>
                  <p className="txt">
                    다시 시작하기
                  </p>
                </div>
              </div>
            </div>
            <img src={images.mind_sight_about_section_02_arrow} alt="" className="arrow" />
            <div className="btn">
              Re-construction, Re-start
            </div>
          </div>
        </div>
      </div>
      <div className="section section-03">
        <div className="container">
          <div className="section-wrap section-03-01 col-group">
            <div className="img-wrap">
              <img src={images.mind_sight_about_section_03_01} alt="" />
            </div>
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
                  불안, 우울, 분노 검사를 통해 개인의 E·motion 정서생활을 체크합니다.  <br className="pc" />
                  이와 함께 디지털 의존도, 번아웃 증후군, 공황장애, 스트레스 지수를 체크하여 <br className="pc" />
                  몸과 마음의 상관관계를 파악합니다. <br />
                  <br />
                  세상에 수많은 ‘나’들은 타자와의 관계 속에서 상처 입고, 헤매면서 성장합니다.<br className="pc" />
                  부모의 언어와 사고체계가 나에게 영향을 주었고, 사회적 정의의 혼란이 나의 선택을 왜곡합니다.<br className="pc" />
                  이 과정에서 입게 되는 상처는 나만의 문제가 아닙니다. <br />
                  <br />
                  마인드아이티 고유의 분석도구를 활용해<br className="pc" />
                  나를 심리적 · 영성적 · 교류적으로 융합분석 합니다. <br />
                  <br />
                  내 안에 숨겨진 역량을 분석하고,<br className="pc" />
                  내가 사용하는 에너지의 방향과 힘의 균형을 파악합니다.<br className="pc" />
                  또한, 내가 자주 사용하는 자아상태 파악을 통해<br className="pc" />
                  타인과 의사소통하고 관계맺는 방식을 분석합니다.
                </p>
                <a href="sub02_mindInsight_02.html" className="more-btn type01 col-group">
                  자세히 보기
                  <i className="icon"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="section-wrap section-03-02 col-group">
            <div className="img-wrap">
              <img src={images.mind_sight_about_section_03_02} alt="" />
            </div>
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
                  앞선, 두 과정을 통해 진단하고 분석한 <br className="pc" />
                  자신만의 리포트를 완성합니다. <br className="pc" />
                  과거의 나를 진단하고, 현재의 나를 분석하면서 만드는 <br className="pc" />
                  건강한 미래의 나를 위한 처방전과 같은 인생코칭 보고서입니다. <br />
                  <br />
                  나의 인생점수와 융합역량지수가 표시되며, <br className="pc" />
                  갈등회피 전략, 관계 전략, 성장전략, 셀프코칭질문 등으로 구성된<br className="pc" />
                  R약 처방을 받아볼 수 있습니다.
                </p>
                <a href="sub02_mindInsight_03.html" className="more-btn type01 col-group">
                  자세히 보기
                  <i className="icon"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="section-wrap section-03-03 col-group">
            <div className="img-wrap">
              <img src={images.mind_sight_about_section_03_03} alt="" />
            </div>
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
                  세 번째 단계인 마인드 임팩트입니다.
                </p>
                <p className="txt">
                  직영 평생교육시설을 통해 양성된 <br className="pc" />
                  전문 분석상담사들이 지역별 상담센터를 운영합니다. <br />
                  <br />
                  마인드 아이티만의 고유한 검사도구와 분석키트를 활용한 <br className="pc" />
                  융합심리분석상담과 융합심리분석치료에 최적화된 시스템을 <br className="pc" />
                  갖추고 있으며, 융합적 접근방식의 솔루션을 제공합니다.
                </p>
                <a href="sub02_mindInsight_02.html#anchor_3" className="more-btn type01 col-group">
                  자세히 보기
                  <i className="icon"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="section-wrap section-03-04 col-group">
            <div className="img-wrap">
              <img src={images.mind_sight_about_section_03_04} alt="" />
            </div>
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
                  Soul Stay, Retreat, Walking Meditation, <br className="pc" />
                  On-Offline Group Therapy 등을 통해 재해석을 위한 실마리를 찾고, <br className="pc" />
                  새로워지기 위한 구체적인 행동 목표를 설정합니다.
                </p>
                <a href="sub02_mindInsight_02.html#anchor_4" className="more-btn type01 col-group">
                  자세히 보기
                  <i className="icon"></i>
                </a>
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
    </main>
  )
}

export default Introduction