import React from 'react'
import { Link } from 'react-router-dom'

// Components
import Faq from '../../components/sub-page/Faq'
import PurchaseInfo from '../../components/sub-page/PurchaseInfo'
import FixedCart from '../../components/sub-page/FixedCart'
import Loading from '../../components/common/Loading'

// Hooks
import FixCart from "../../hooks/FixCart"
import PageAnchor from '../../hooks/PageAnchor'
import useProductFetchData from '../../hooks/ProductDetailFetchData'

// Images, Vidoes
import { images } from '../../assets/images'

const Confession = () => {
  // Hooks 
  const fixedItemisOn = FixCart();
  PageAnchor();

  // fetchData
  const productId = 7;
  const data = useProductFetchData(productId);

  const purchaseInfo = {
    category: 'Mind Therapy',
    orderSummaryWidth: 140,
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

  if (!data) {
    return <Loading />
  }

  return (
    <main className="subpage course mind-therapy type-c">

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
            <Link to="#anchor_1" id="tab_1" className="tab-link active">
              상품 소개
            </Link>
            <Link to="#anchor_2" id="tab_2" className="tab-link">
              자주 하는 질문
            </Link>
          </div>
        </div>
        <div className="page-anchor-wrap">
          <div className="page-anchor" id="anchor_1">
            <div className="page-anchor-core page-anchor-1 page-anchor-item"></div>
          </div>

          <div className="section section-01">
            <div className="img-wrap">
              <img src={images.mind_therapy_04_01} alt="" />
            </div>
            <div className="container w1280">
              <div className="section-title-wrap row-group">
                <p className="eng-title">
                  Narrative Therapy
                </p>
                <h3 className="title">
                  고백해
                </h3>
                <p className="sub-title green">
                  그룹으로 진행되는 치유 모임
                </p>
                <p className="txt">
                  사람들이 둘러앉아 자신의 이야기를 하며, 때로는 눈물을 흘리기도 하고 <br className="pc" />
                  서로에게 용기와 힘을 북돋아 주기도 하며, 갈등을 경험하고 해결하기도 하는 장면을 본 적이 있나요?<br />
                  <br />
                  ‘그룹 테라피’는 상담자와 내담자가 일 대 일로 진행하는 개인 상담과 달리, <br className="pc" />
                  한두 명의 상담자와 다수의 내담자(구성원)들이 진행하는 상담치료 형식입니다.
                </p>
                <Link to="https://calendar.google.com/calendar/embed?src=c_21eca979ba4f77b65ed7f9a90507b4981b292d274a9949fcc8a0ba78446802a4%40group.calendar.google.com&ctz=Asia%2FSeoul" className="more-btn type03" rel="noreferrer noopener">
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
                      <img src={images.mind_therapy_04_02} alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="txt-wrap row-group">
                <p className="sub-title green">
                  대인관계 문제에 효과적인
                </p>
                <h4 className="title">
                  그룹 테라피
                </h4>
                <p className="txt">
                  그룹 테라피는 무엇보다 대인관계 문제를 다루는데 있어서 <br className="pc" />
                  때로는 개인 상담보다 효과적입니다. <br />
                  <br />
                  개인 상담에서는 내담자의 주관적인 보고에 근거해 ‘그때-그곳’의 문제를 다루지만, <br className="pc" />
                  집단 상담에서는 구성원의 대인관계 패턴이 집단 구성원들 사이에 그대로 <br className="pc" />
                  재현되기 때문에 ‘지금-여기’의 문제를 다룰 수 있다는 장점이 있습니다.<br />
                  <br />
                  또한, 상담에서 얻게 된 통찰이 실제적 효과로 이어지게 하려면 <br className="pc" />
                  실제 관계에서 새로운 시도를 해보아야 합니다. <br className="pc" />
                  개인 상담의 경우 이것이 온전히 내담자의 몫으로 남지만, <br className="pc" />
                  ‘그룹 테라피’에서는 상담자가 지켜보는 가운데 집단원들을 대상으로 <br className="pc" />
                  직접 시현(示現)해볼 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          <div className="section section-03">
            <div className="container w1280">
              <div className="section-category-list item3 col-group">
                <div className="section-category-item row-group">
                  <div className="img-container">
                    <img src={images.mind_therapy_04_03_01} alt="" />
                  </div>
                </div>
                <div className="section-category-item row-group">
                  <div className="img-container">
                    <img src={images.mind_therapy_04_03_02} alt="" />
                  </div>
                </div>
                <div className="section-category-item row-group">
                  <div className="img-container">
                    <img src={images.mind_therapy_04_03_03} alt="" />
                  </div>
                </div>
                <div className="section-category-item row-group">
                  <div className="img-container">
                    <img src={images.mind_therapy_04_03_04} alt="" />
                  </div>
                </div>
                <div className="section-category-item row-group">
                  <div className="img-container">
                    <img src={images.mind_therapy_04_03_05} alt="" />
                  </div>
                </div>
                <div className="section-category-item row-group">
                  <div className="img-container">
                    <img src={images.mind_therapy_04_03_06} alt="" />
                  </div>
                </div>
              </div>
              <div className="txt-wrap row-group">
                <img src={images.icon_comma} alt="" className="icon" />
                <p className="txt">
                  우리들은 누구나 불안과 우울, 분노를 경험합니다. <br />
                  <br />
                  코로나19 시대를 겪으며 줌(Zoom)을 통한 온라인 연결이 대중화되면서 많은 사람은 ‘온택(on-tact)’이라는 <br className="pc" />
                  새로운 연결 방식을 통해 상호교류와 공감, 이해, 치료의 효과를 얻기 시작했습니다. <br className="pc" />
                  우리는 <strong>온라인과 오프라인을 통해 그룹을 형성하여 서로의 마음을 돌보고 치유하는 작업</strong>을 시작했습니다.
                </p>
              </div>
            </div>
            <div className="txt-box">
              <strong>
                다양한 어려움을 가지는 내담자들 <span className="yellow">그룹을 형성하여 치유 모임을 조직</span>합니다. <br />
                시, 군, 구 등의 지자체나 그 밖의 기관(실버타운, 요양병원 등)과 <span className="yellow">시설 운영자들이 신청</span>할 수 있습니다.
              </strong>
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

export default Confession