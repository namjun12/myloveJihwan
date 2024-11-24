import React from 'react'
import { Link } from 'react-router-dom';

// Components
import PurchaseInfo from '../../components/sub-page/PurchaseInfo';
import FixedCart from '../../components/sub-page/FixedCart';
import Loading from '../../components/common/Loading';
import Faq from '../../components/sub-page/Faq'

// Hooks
import useProductFetchData from '../../hooks/ProductDetailFetchData';
import PageAnchor from '../../hooks/PageAnchor';
import FixCart from '../../hooks/FixCart';

// Images, Videos
import { images } from '../../assets/images';

const MeditationReflection = () => {
  const fixedItemisOn = FixCart();
  PageAnchor();

  // fetchData
  const productId = 5;
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
    <main className="subpage course mind-therapy type-a">

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
              <img src={images.mind_therapy_02_01} alt="" />
            </div>
            <div className="container w1280">
              <div className="section-title-wrap row-group">
                <p className="eng-title">
                  Retreat
                </p>
                <h3 className="title">
                  명상과 관상
                </h3>
                <p className="sub-title green">
                  세상을 피해 마음을 모아들이다
                </p>
                <p className="txt">
                  ‘Retreat’, 피정(避靜)은 피세정념(避世靜念)의 줄임말입니다. <br className="pc" />
                  세상을 피해 마음을 모아들인다는 말입니다. ‘Retreat’는 전쟁 중에 후퇴한다는 의미도 있습니다.<br />
                  <br />
                  세상은 온통 전쟁터 같습니다.<br />
                  <br />
                  날마다 벌어지는 많은 일들이 우리들의 마음을 혼란하게 합니다. <br className="pc" />
                  집을 떠나 작고 고요한 자리에 머물러 그동안 살아온 인생을 돌아보고 성찰하며 <br className="pc" />
                  새로운 삶을 다짐하고 자신을 변화시킬 수 있는 시간이 필요합니다.
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
              <div className="img-wrap">
                <img src={images.mind_therapy_02_03_01} alt="" />
              </div>
              <div className="txt-wrap row-group">
                <p className="sub-title green">
                  Retreat Programs
                </p>
                <div className="title-group row-group">
                  <h4 className="title border-left">
                    고백해
                  </h4>
                  <h4 className="title border-left">
                    너 자신을 R하라
                  </h4>
                </div>
                <p className="txt">
                  마인드테라피가 제공하는 Retreat 프로그램에서는 <br className="pc" />
                  인생을 총결산하며 성찰하는 ‘고백해’ 프로그램과 <br className="pc" />
                  자신의 과거를 돌아보며, 현재의 나를 발견하고, 미래의 나를 기획하는 <br className="pc" />
                  ‘너 자신을 R(evolution)하라’ 프로그램이 있습니다. <br />
                  <br />
                  전문 상담/코칭 선생님께서 자기분석(Self Analysis)과 <br className="pc" />
                  자기치유(Self Therapy)를 이끌어주실 것입니다.
                </p>
              </div>
            </div>
          </div>

          <div className="section section-03">
            <div className="container w1280">
              <img src={images.mind_therapy_02_03_02} alt="" className="img" />
              <div className="txt-wrap row-group">
                <img src={images.icon_comma} alt="" className="icon" />
                <p className="title serif">
                  <span className="green serif">피세정념(避世靜念)</span>, <br />
                  세상을 피해 마음을 모아들인다는 말입니다.
                </p>
                <p className="txt">
                  집을 떠나 작고 고요한 자리에 머물러 그동안 살아온 인생을 돌아보고 성찰하며 <br className="pc" />
                  새로운 삶을 다짐하고 자신을 변화시킬 수 있는 시간이 필요합니다.
                </p>
              </div>
              <div className="txt-box">
                <strong>
                  전문 상담/코칭 선생님께서 <span className="yellow">자기분석(Self Analysis)</span>과 <span className="yellow">자기치유(Self Therapy)</span>를 이끌어주실 것입니다.
                </strong>
              </div>
            </div>
          </div>

          <div className="section section-04">
            <div className="container w1280">
              <div className="img-group col-group">
                <div className="img-container col">
                  <img src={images.mind_therapy_02_04_01} alt="" />
                </div>
                <div className="img-container col">
                  <img src={images.mind_therapy_02_04_02} alt="" />
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

export default MeditationReflection