import React, { useState } from 'react'

// Components
import IndexHeader from '../../components/IndexHeader'
import SubTopNav from '../../components/sub-page/SubTopNav'
import { Sapienza } from '../../data/SubTopNavInfo'

// Images, Videos
import { images } from '../../assets/images'
import { Link } from 'react-router-dom'

const Center = () => {
  IndexHeader();

  const [tabIndex, setTabIndex] = useState(0);
  const handleTab = (index) => {
    setTabIndex(index)
  }

  const tabList = [
    '고양삼송점',
    '춘천점',
    '인천계양점',
    '제주점',
  ]
  const mapWrapInfo = [
    {
      mapPath: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.8333685723755!2d126.89835837652183!3d37.6531213720162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9704c8f4ebe7%3A0xf1d5405655a2ce61!2z6rK96riw64-EIOqzoOyWkeyLnCDrjZXslpHqtawg7IK87Iah66GcIDI0MA!5e0!3m2!1sko!2skr!4v1725523163973!5m2!1sko!2skr',
      title: '고양삼송점',
      location: '경기도 고양시 덕양구 삼송로 240, 힐스테이트삼송역스칸센 202동 248호',
      tel: '02-381-2024',
      link: 'https://naver.me/5VmNhkMf',
    },
    {
      mapPath: '',
      title: '',
      location: '',
      tel: '',
      link: '',
    },
    {
      mapPath: '',
      title: '',
      location: '',
      tel: '',
      link: '',
    },
    {
      mapPath: '',
      title: '',
      location: '',
      tel: '',
      link: '',
    },
  ]

  return (
    <main className="subpage center">
      <div className="sub-top">
        <img src={images.sub05_sub_top} alt="" className="bg-img" />
        <div className="sub-top-title-wrap row-group">
          <h2 className="sub-top-title">
            상담사 · 센터소개
          </h2>
          <p className="sub-top-txt">
            사피엔자 아카데미 상담 · 코칭센터
          </p>
        </div>
      </div>

      <SubTopNav SubTopNavInfo={Sapienza()} />

      <div className="section section-01">
        <div className="container">
          <div className="section-title-wrap row-group">
            <p className="sub-title green">
              직영 및 지역별 분점 상담센터 운영
            </p>
            <h3 className="title">
              마인드 임팩트 상담·코칭센터
            </h3>
            <p className="txt">
              직영 평생교육시설을 통해 양성된 전문 분석상담사들이 지역별 상담센터를 운영합니다. 마인드 아이티만의 고유한 검사도구와 <br />
              분석키트를 활용한 융합심리분석상담과 융합심리분석상담치료에 최적화된 시스템을 갖추고 있습니다.
            </p>
            <a href="/mind-insight-test/index" className="btn">상담 받기</a>
          </div>
          <img src={images.sub05_center_01} alt="" className="main-img img-pc" />
          <img src={images.sub05_center_01_m} alt="" className="main-img img-mb" />
          <div className="counseling-system-list row-group">
            <div className="counseling-system-item col-group">
              <div className="img">
                <img src={images.mind_report_02_01} alt="" />
              </div>
              <div className="txt-wrap row-group">
                <p className="num color">01</p>
                <p className="eng-title color">
                  Mindit Inspection Tool
                </p>
                <p className="title">
                  고유한 검사도구
                </p>
                <p className="sub-title color">
                  마인드아이티만의 고유한 검사도구
                </p>
                <p className="txt">
                  Psychological Analysis, Spiritual Analysis, Transactional Analysis <br className="pc" />
                  인드 아이티 고유의 ‘PST Convergence kit’를 활용해 <br className="pc" />
                  심리적·영성적·교류적 융합분석을 진행합니다.
                </p>
              </div>
            </div>
            <div className="counseling-system-item col-group">
              <div className="img">
                <img src={images.counseling_system_item_02} alt="" />
              </div>
              <div className="txt-wrap row-group">
                <p className="num color">02</p>
                <p className="eng-title color">
                  Psychological Counseling
                </p>
                <p className="title">
                  융합심리분석상담
                </p>
                <p className="sub-title color">
                  분석키트를 활용한 융합심리분석상담
                </p>
                <p className="txt">
                  사람의 에너지 방향을 파악하고 판단, 인식, 행동, 생활 유형을 <br className="pc" />
                  확인할 수 있으며 타인과의 교류 형태 등을 분석합니다.
                </p>
              </div>
            </div>
            <div className="counseling-system-item col-group">
              <div className="img">
                <img src={images.counseling_system_item_03} alt="" />
              </div>
              <div className="txt-wrap row-group">
                <p className="num color">03</p>
                <p className="eng-title color">
                  Convergence Psychology Counselor
                </p>
                <p className="title">
                  분석상담 전문가
                </p>
                <p className="sub-title color">
                  분석키트를 활용한 체계적인 상담
                </p>
                <p className="txt">
                  사피엔자 아카데미아를 통해 양성된 융합심리분석상담 전문가가 고유의 분석 키트를 활용하여 <br className="pc" />
                  체계적으로 상담합니다. 내담자를 병적인 문제를 지닌 존재로만 보지 않고, 스스로 전체성과 <br className="pc" />
                  완전성을 실현하고자 하는 통합적인 인간임을 강조하며 그 과정에 동반합니다.
                </p>
              </div>
            </div>
            <div className="counseling-system-item col-group">
              <div className="img">
                <img src={images.counseling_system_item_04} alt="" />
              </div>
              <div className="txt-wrap row-group">
                <p className="num color">04</p>
                <p className="eng-title color">
                  Mind Therapy
                </p>
                <p className="title">
                  마인드 테라피
                </p>
                <p className="sub-title color">
                  다양한 형태의 오프라인 테라피
                </p>
                <p className="txt">
                  분석상담의 과정과 더불어 다양한 형태의 오프라인 테라피 프로그램에 참여할 수 있습니다. <br className="pc" />
                  각자 자신의 단계에 맞는 프로그램에 참여하면서 내담자가 자신의 삶을 재해석 하고 <br className="pc" />
                  내면의 힘을 되찾아 조화로운 삶을 살 수 있도록 돕습니다.
                </p>
              </div>
            </div>
            <div className="counseling-system-item col-group">
              <div className="img">
                <img src={images.counseling_system_item_05} alt="" />
              </div>
              <div className="txt-wrap row-group">
                <p className="num color">05</p>
                <p className="eng-title color">
                  Optimized System
                </p>
                <p className="title">
                  최적화된 통합 솔루션 프로그램
                </p>
                <p className="sub-title color">
                  융합심리분석치료에 최적화된 시스템 제공
                </p>
                <p className="txt">
                  상담 통합관리 솔루션 프로그램을 이용하여 <br className="pc" />
                  최적화된 융합심리분석치료 시스템 제공합니다.
                </p>
              </div>
            </div>
          </div>
          <div className="txt-box">
            이러한 시스템을 갖춘 <strong className="yellow">마인드 임팩트 상담·코칭센터는 각 지역별로 설치</strong>되어 있습니다. <br />
            상담·코칭이 필요한 경우 <strong className="yellow">언제든 방문할 수 있습니다.</strong>
          </div>
        </div>
      </div>
      <div className="section section-02">
        <div className="container">
          <div className="section-title-wrap">
            <h3 className="title">
              센터 오시는길
            </h3>
          </div>
          <div className="tab-list col-group">
            {tabList.map((item, index) => (
              <button
                onClick={() => handleTab(index)}
                className={`${tabIndex === index ? 'active' : ''} tab`}
                key={index}
              >
                {item}
              </button>
            ))}
          </div>

          {mapWrapInfo.map((mapItem, index) => (
            <div className={`${tabIndex === index ? 'active' : ''} map-wrap`} key={index} data-index={index}>
              <div className="map-box">
                <iframe
                  src={mapItem.mapPath}
                  width="100%"
                  height="100%"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="map"
                />
              </div>
              {mapItem.location && mapItem.link &&
                <div className="txt-wrap col-group">
                  <div className="txt-group row-group">
                    <p className="title">{mapItem.title}</p>
                    <div className="detail-list row-group">
                      <div className="detail-item col-group">
                        <i className="icon"></i>
                        <div className="txt col-group">
                          {mapItem.location}
                          <Link to={mapItem.link} className="link" target='_blank' rel="noreferrer noopener">네이버 지도</Link>
                        </div>
                      </div>
                      <div className="detail-item col-group">
                        <i className="icon"></i>
                        <div className="txt">{mapItem.tel}</div>
                      </div>
                    </div>
                  </div>
                  <a href="/mind-insight-test/index" className="btn">상담 받기</a>
                </div>}
            </div>
          ))}
          {/* <div className="map-wrap active" id="mapWrap_1">
            <div className="map-box">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3158.8333685723755!2d126.89835837652183!3d37.6531213720162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c9704c8f4ebe7%3A0xf1d5405655a2ce61!2z6rK96riw64-EIOqzoOyWkeyLnCDrjZXslpHqtawg7IK87Iah66GcIDI0MA!5e0!3m2!1sko!2skr!4v1725523163973!5m2!1sko!2skr"
                width="100%"
                height="100%"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="txt-wrap col-group">
              <div className="txt-group row-group">
                <p className="title">
                  고양삼송점
                </p>
                <div className="detail-list row-group">
                  <div className="detail-item col-group">
                    <i className="icon"></i>
                    <div className="txt col-group">
                      경기도 고양시 덕양구 삼송로 240, 힐스테이트삼송역스칸센 202동 248호
                      <a href="" className="link">네이버 지도</a>
                    </div>
                  </div>
                  <div className="detail-item col-group">
                    <i className="icon"></i>
                    <div className="txt">
                      02-381-2024
                    </div>
                  </div>
                </div>
              </div>
              <a href="/mind-insight-test/index" className="btn">상담 받기</a>
            </div>
          </div>
          <div className="map-wrap" id="mapWrap_2">
            <div className="map-box"></div>
          </div>
          <div className="map-wrap" id="mapWrap_3">
            <div className="map-box"></div>
          </div>
          <div className="map-wrap" id="mapWrap_4">
            <div className="map-box"></div>
          </div> */}
        </div>
      </div>
    </main>
  )
}

export default Center