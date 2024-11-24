import React from 'react'
import { Link } from 'react-router-dom'

// Components
import Faq from '../../components/sub-page/Faq'
import PurchaseInfo from '../../components/sub-page/PurchaseInfo'
import FixedCart from '../../components/sub-page/FixedCart'

// Hooks
import FixCart from '../../hooks/FixCart'
import PageAnchor from '../../hooks/PageAnchor'
import useProductFetchData from '../../hooks/ProductDetailFetchData'

// Images, Vidoes
import { images } from '../../assets/images'
import Loading from '../../components/common/Loading'

const DailyLove = () => {
  // Hooks 
  const fixedItemisOn = FixCart();
  PageAnchor();

  // fetchData
  const productId = 6;
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
    <main className="subpage course mind-therapy type-b">

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
              <img src={images.mind_therapy_03_01} alt="" />
            </div>
            <div className="container w1280">
              <div className="section-title-wrap row-group">
                <p className="eng-title">
                  Path Of The Heart
                </p>
                <h3 className="title">
                  하루愛
                </h3>
                <p className="sub-title green">
                  마음의 길을 찾아
                </p>
                <p className="txt">
                  바쁘게 살아가는 우리들의 영혼은 삶에 지치고 사람들에게 부대끼며 상처받아 아파합니다. <br className="pc" />
                  소울 스테이는 고요한 집에 머물러 세상을 멍하게 바라봅니다.
                </p>
                <Link to="https://calendar.google.com/calendar/embed?src=c_21eca979ba4f77b65ed7f9a90507b4981b292d274a9949fcc8a0ba78446802a4%40group.calendar.google.com&ctz=Asia%2FSeoul" className="more-btn type03" rel='noreferrer noopener' >
                  연간 일정표 보기
                  <i></i>
                </Link>
              </div>
            </div>
          </div>

          <div className="section section-02">
            <div className="container w1280 col-group">
              <div className="img-item wide">
                <img src={images.mind_therapy_03_02_01} alt="" />
                <div className="txt-wrap row-group">
                  <p className="title">
                    ‘석파령너미길’에 있는 <br />
                    고요한 집, ‘휴선정’
                  </p>
                  <p className="txt">
                    ‘석파령너미길’에 있는 고요한 집, ‘휴선정’은 <br className="pc" />
                    산에 기대어, 나무에 기대어, 고요히 머물러 있는 공간입니다.
                  </p>
                </div>
              </div>
              <div className="img-group col-group">
                <div className="img-item min">
                  <img src={images.mind_therapy_03_02_02} alt="" />
                </div>
                <div className="img-item min">
                  <img src={images.mind_therapy_03_02_03} alt="" />
                </div>
                <div className="img-item min">
                  <img src={images.mind_therapy_03_02_04} alt="" />
                </div>
                <div className="img-item min">
                  <img src={images.mind_therapy_03_02_05} alt="" />
                </div>
              </div>
            </div>
          </div>

          <div className="section section-03">
            <div className="container w1280">
              <div className="txt-wrap col-group">
                <img src={images.mind_therapy_03_03_01} alt="" className="img" />
                <div className="txt-group row-group">
                  <img src={images.icon_comma} alt="" className="icon" />
                  <p className="txt serif">
                    산을 바라보며 산멍,<br />
                    물을 바라보며 물멍,<br />
                    불을 바라보며 불멍,<br />
                    내리는 비를 바라보며 비멍,
                  </p>
                  <p className="title serif">
                    멍하게 머물며 <br />
                    <span className="green serif">내 마음의 길</span>을 찾아나갑니다.
                  </p>
                </div>
              </div>
            </div>
            <div className="txt-box">
              <strong>
                호수가 잔잔하면 깊이 들여다 볼 수 있습니다. <br />
                마음과 영혼이 잔잔해지고 고요해지면 <span className="yellow">진짜 ‘나’를 찾아볼 수 있습니다.</span>
              </strong>
            </div>
          </div>

          <div className="section section-04">
            <div className="container w1280">
              <div className="img-group col-group">
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_01} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_02} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_03} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_04} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_05} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_06} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_07} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_03_04_08} alt="" />
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

export default DailyLove