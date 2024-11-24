import React from 'react'
import { images } from '../../assets/images'

const ProgramOverview = () => {
  return (
    <main className="subpage sapienza-about">
      <div className="index-slide swiper">
        <div className="swiper-pagination index-pagination"></div>
        <div className="swiper-wrapper">
          <div className="swiper-slide index-slide-item">
            <img src={images.sub04_sapienza_main} alt="" className="bg-img" />
            <div className="index-slide-txt-wrap row-group">
              <h2 className="title">
                Sapienza Academia
              </h2>
              <p className="txt">
                사피엔자 아카데미아를 운영합니다.
              </p>
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
              Sapienza Academia
            </p>
            <h3 className="title">
              사피엔자 아카데미아 소개
            </h3>
            <p className="txt">
              마인드 인사이트를 통해 ‘진정한 나’를 발견하는 길에 들어선 사람 가운데, 본격적으로 이론과 실전 공부를 희망하는 사람들은 사피엔자 아카데미아에서 융합심리분석전문가 과정을 이수할 수 있습니다. <br className="pc" />
              전문가 과정은 단계별로 3급, 2급, 1급, 슈퍼바이저 과정으로 구성되어 있으며 필수 과정을 모두 이수하고, 자격검정시험에 합격하면 보건복지부 직능원에서 인증하는 자격증을 발급합니다. <br />
              <br />
              양성된 융합심리분석상담사들은 이후, 마인드임팩트 상담코칭센터에서 일할 수 있습니다.
            </p>
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
      <div className="section section-02">
        <div className="container col-group">
          <div className="img">
            <img src={images.sub04_sapienza_02} alt="" />
          </div>
          <div className="section-title-wrap row-group">
            <p className="eng-title green">
              Counseling
            </p>
            <h3 className="title">
              융합심리분석상담
            </h3>
            <img src={images.icon_comma_brown} alt="" className="icon" />
            <p className="sub-title">
              과거를 새롭게 해석하는 내적인 힘과 능력을 수련하고 연구하는 <br className="pc" />
              실천적 학문의 영역이 바로 <span className="green">‘융합심리분석상담치료’</span>입니다.
            </p>
            <p className="txt">
              융합심리분석상담은 인생의 의미와 목적을 새로운 관점에서 바라볼 수 있도록 합니다. <br className="pc" />
              지나간 시간을 새롭게 해석할 수 있도록 안내하고 ‘지금 여기’를 바르게 자각하도록 도와 <br className="pc" />
              건강한 내일을 맞이할 수 있는 힘을 갖게 합니다. <br />
              <br />
              내담자를, 병적인 문제를 지닌 존재로만 볼 것이 아니라 스스로 전체성과 완전성을 <br className="pc" />
              실현하고자 하는 전인적, 통합적인 인간으로 바라볼 것을 강조합니다. <br className="pc" />
              바로 여기에서 영성적 통합의 과정이 시작됩니다. <br className="pc" />
              이것은 자아실현을 넘어선 자아초월의 과정이며 자아완성의 길로 나아가는 출발점입니다.
            </p>
          </div>
        </div>
      </div>
      <div className="section section-03">
        <div className="container">
          <div className="section-title-wrap row-group">
            <p className="eng-title green">
              Vision
            </p>
            <h3 className="title">
              융합심리분석상담 비전
            </h3>
            <p className="txt">
              융합심리학을 기반으로 인문융합치료적 방법을 통해 건강하고 성숙한 인간됨을 목표로 하는 심리분석 연구과정입니다. <br className="pc" />
              전인적 치유와 성장을 통해 건강한 사회를 지향함이 융합심리분석상담치료 과정의 목표이자 비전입니다.
            </p>
          </div>
          <div className="sap-vision-list col-group">
            <div className="sap-vision-item row-group">
              <img src={images.sub04_sapienza_03_01} alt="" className="bg-img" />
              <div className="num">01</div>
              <div className="txt-wrap row-group">
                <p className="title">
                  인문융합치료와 <br />
                  융합심리학
                </p>
                <div className="txt-group row-group">
                  <p className="txt dot">
                    심리치료에서 영적차원 다루기
                  </p>
                  <p className="txt dot">
                    정신분석과 분석심리학의 융합
                  </p>
                  <p className="txt dot">
                    자아초월 심리학과 영성의 통섭
                  </p>
                  <p className="txt dot">
                    제 5세대 심리학-융합심리학
                  </p>
                </div>
              </div>
            </div>
            <div className="sap-vision-item row-group">
              <img src={images.sub04_sapienza_03_02} alt="" className="bg-img" />
              <div className="num">02</div>
              <div className="txt-wrap row-group">
                <p className="title">
                  융합심리분석상담과 <br />
                  인지행동치료
                </p>
                <div className="txt-group row-group">
                  <p className="sub-title">
                    영성이란 무엇인가?
                  </p>
                  <p className="txt">
                    심리학과 영성, 과학의 통섭(consilience) <br />
                    인지행동치료적 이해와 해결전략 MBTI, <br />
                    Enneagram, TA & 영성의 융합
                  </p>
                </div>
              </div>
            </div>
            <div className="sap-vision-item row-group">
              <img src={images.sub04_sapienza_03_03} alt="" className="bg-img" />
              <div className="num">03</div>
              <div className="txt-wrap row-group">
                <p className="title">
                  융합심리분석상담 <br />
                  전문가 양성과정
                </p>
                <div className="txt-group row-group">
                  <p className="txt dot">
                    슈퍼바이저
                  </p>
                  <p className="txt dot">
                    전문가 1급(1년 임상)
                  </p>
                  <p className="txt dot">
                    전문가 2급(1년 수련)
                  </p>
                  <p className="txt dot">
                    전문가 3급(1년양성)
                  </p>
                </div>
              </div>
            </div>
            <div className="sap-vision-item row-group">
              <img src={images.sub04_sapienza_03_04} alt="" className="bg-img" />
              <div className="num">04</div>
              <div className="txt-wrap row-group">
                <p className="title">
                  융합심리분석 상담사의 <br />
                  활동과 역할
                </p>
                <div className="txt-group row-group">
                  <p className="txt dot">
                    개인의 심리분석과 상담을 하는 직무
                  </p>
                  <p className="txt dot">
                    상담사로 자립하여 직영 상담센터 운영
                  </p>
                  <p className="txt dot">
                    사회복지관, 시설 등의 상담프로그램 기획 진행
                  </p>
                  <p className="txt dot">
                    군, 구청이나 시청 등의 심리지원프로그램 운영
                  </p>
                  <p className="txt dot">
                    기업이나 학교 등의 기업연수 프로그램 기획
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section section-04">
        <div className="container">
          <div className="section-title-wrap row-group">
            <p className="eng-title green">
              Access
            </p>
            <h3 className="title">
              인문융합치료적 접근
            </h3>
            <p className="txt">
              치료(治療, 다스릴 치, 병 고칠 료)는 일반적으로 누군가 타자에 의해서 병이나 상처(傷處)를 낫게 하는 것이고, <br className="pc" />
              병 자체를 고치려고 하는 행위 전반을 말합니다.<br />
              <br />
              반면 치유(治癒, 다스릴 치, 병 나을 유)는 스스로 병을 낫게 한다는 의미로 병의 원인을 알고 그것을 풀어나가는 것, <br className="pc" />
              자신의 본질로 되돌아가므로 스스로 병을 낫게 한다는 뜻으로 구별하여 이해할 수 있습니다.
            </p>
          </div>

          <div className="txt-group row-group">
            <img src={images.icon_comma_brown} alt="" className="icon" />
            <p className="txt">
              곧, 치유는 내면의 힘이 발현하여 조화와 균형을 잃어버린 <br className="pc" />
              <strong className="green">‘생체항상성’</strong>을 회복하고 자신의 병을 스스로 고쳐 나가는 ‘자기치료’의 과정이며, <br className="pc" />
              스스로의 힘으로 병이 낫는 것이기 때문에 <strong className="green">‘자연치유’</strong>의 한 과정으로 이해할 수 있습니다.
            </p>
          </div>

          <img src={images.sub04_sapienza_04} alt="" className="img-pc" />
          <img src={images.sub04_sapienza_04_m} alt="" className="img-mb" />
        </div>
      </div>
      <div className="section section-05">
        <div className="container row-group">
          <img src={images.icon_comma_white_opacity} alt="" className="icon" />
          <p className="title">
            <strong>상담자를 통한 치료과정과 내담자의 자기치유과정이 융합되는 <span className="yellow">‘융합심리분석상담치료’</span>는</strong> <br className="pc" />
            현대인들이 직면한 정서적 심리적, 영성적 위기를 균형 있고 조화로운 통합된 실존으로 <br className="pc" />
            유지해 나갈 수 있는 내면의 힘을 줄 것입니다.
          </p>
          <a href="/mind-insight-test/index" className="btn">
            심리검사 받기
          </a>
        </div>
      </div>
    </main>
  )
}

export default ProgramOverview