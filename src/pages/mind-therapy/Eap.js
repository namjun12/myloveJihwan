import React from 'react'
import { Link } from 'react-router-dom'

// Components
import Faq from '../../components/sub-page/Faq'
import PurchaseInfo from '../../components/sub-page/PurchaseInfo'
import FixedCart from '../../components/sub-page/FixedCart'

// Hooks
import FixCart from "../../hooks/FixCart"
import PageAnchor from '../../hooks/PageAnchor'
import useProductFetchData from '../../hooks/ProductDetailFetchData'

// Images, Vidoes
import { images } from '../../assets/images'
import Loading from '../../components/common/Loading'

const Eap = () => {

  // Hooks 
  const fixedItemisOn = FixCart();
  PageAnchor();

  // fetchData
  const productId = 8;
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
    <main className="subpage course mind-therapy type-d">

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
              <img src={images.mind_therapy_05_01} alt="" />
            </div>
            <div className="container w1280">
              <div className="section-title-wrap row-group">
                <p className="eng-title">
                  Employee Assistance Program
                </p>
                <h3 className="title">
                  근로자 지원 프로그램
                </h3>
                <p className="sub-title green">
                  기업들을 위한 전문적인 복지서비스
                </p>
                <p className="txt">
                  EAP (Employee Assistance Program, 근로자 지원 프로그램)는 <br className="pc" />
                  기업의 건강한 경영문화를 위해 기획된 전문화된 복지서비스입니다.
                </p>
                <Link to="https://calendar.google.com/calendar/embed?src=c_21eca979ba4f77b65ed7f9a90507b4981b292d274a9949fcc8a0ba78446802a4%40group.calendar.google.com&ctz=Asia%2FSeoul" className="more-btn type03" rel='noreferrer noopener'>
                  연간 일정표 보기
                  <i></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="section section-02">
            <div className="container w1280">
              <img src={images.mind_therapy_05_02} alt="" />
            </div>
          </div>

          <div className="section section-03">
            <div className="container w1280">
              <div className="txt-wrap row-group">
                <img src={images.icon_comma} alt="" className="icon" />
                <p className="txt">
                  근로자의 업무성과에 영향을 미치는 <strong>다양한 심리적 이슈들을 해결</strong>하고 <br />
                  효율적으로 업무를 수행할 수 있도록 기업 차원에서 제공하는 종합 심리지원 프로그램입니다.
                </p>
              </div>
            </div>
            <div className="txt-box">
              <strong>
                <span className="yellow">마인드아이티 고유의 진단 · 분석 도구</span>를 활용해 근로자들을 분석하고
                사피엔자 아카데미아를 통해 양성된 <span className="yellow">분석상담사, 코칭 전문가들이 조직 맞춤형 심리케어 솔루션을 제공</span>합니다.
              </strong>
            </div>
          </div>

          <div className="section section-04">
            <div className="container w1280">
              <div className="img-group col-group">
                <div className="img-group row-group">
                  <div className="img-container col">
                    <img src={images.mind_therapy_05_04_01} alt="" />
                  </div>
                  <div className="img-container col">
                    <img src={images.mind_therapy_05_04_02} alt="" />
                  </div>
                </div>
                <div className="img-group">
                  <div className="img-container row">
                    <img src={images.mind_therapy_05_04_03} alt="" />
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

export default Eap