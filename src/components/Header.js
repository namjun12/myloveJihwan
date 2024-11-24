import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AccessToken from '../hooks/token/AccessToken';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { authState, LoginInfoAtom } from '../recoil/LoginInfoAtom';
import { images } from '../assets/images';

const Header = () => {
   const pathname = useLocation().pathname;
   const navigate = useNavigate();

   // 로그인 정보
   const loginInfo = useRecoilValue(LoginInfoAtom);

   // 상담사인지 확인
   const isCounselor = loginInfo?.member_type === 1;

   // 엑세스 토큰
   const accessToken = AccessToken();

   // 헤더 index 설정 후 뷰 조작
   const [headerIndex, setHeaderIndex] = useState(false);

   // 햄버거 메뉴 버튼 클릭시 헤더 조작
   const sitemapHandle = () => {
      setHeaderIndex(prev => !prev)
   }

   // 로그아웃 클릭 시
   const handleLogout = () => {
      navigate('/join/counselor')
      window.location.reload()
   }

   // 모바일 gnb item
   // const mobileGnbItems = [
   //    {

   //    }
   // ]
   const handleGnbMenuClick = (e) => {
      const gnbMenuEls = document.querySelectorAll('.gnb-menu')
      const subGnbWraps = document.querySelectorAll('.sub-gnb-wrap')

      gnbMenuEls.forEach((element) => {
         element.classList.remove('active')
      })
      subGnbWraps.forEach((element) => {
         element.classList.remove('active')
      })

      const clickedEl = e.target;
      const clickedElNextEl = clickedEl.nextElementSibling;
      clickedEl.classList.add('active')
      clickedElNextEl.classList.add('active')
   }

   // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

   // 페이지 이동 시 스크롤 맨 위로 이동
   useEffect(() => {
      window.scrollTo(0, 0);

   }, [pathname]);

   return (
      <header id="header">
         <div className="header-wrap col-group">
            <h1 className="logo">
               <Link to="/"></Link>
            </h1>
            <div className={`gnb col-group ${headerIndex ? "sitemap" : ""}`}>
               <div className="gnb-item">
                  <p className="gnb-menu">
                     회사소개
                     <span className="icon mb"></span>
                  </p>
                  <div className="sub-gnb-wrap">
                     <div className="sub-gnb row-group">
                        <Link className="sub-gnb-item" to="/company/about">
                           회사소개
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="gnb-item">
                  <p className="gnb-menu">
                     마인드 인사이트
                     <span className="icon mb"></span>
                  </p>
                  <div className="sub-gnb-wrap">
                     <div className="sub-gnb row-group">
                        <Link className="sub-gnb-item" to="/mind-insight/introduction">
                           소개
                        </Link>
                        <Link className="sub-gnb-item" to="/mind-insight/mind-insight">
                           마인드 인사이트
                        </Link>
                        <Link className="sub-gnb-item" to="/mind-insight/mind-report">
                           마인드 리포트 구매
                        </Link>
                        <Link className="sub-gnb-item" to="/mind-insight/consultation">
                           해석상담 구매
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="gnb-item">
                  <p className="gnb-menu">
                     마인드 테라피
                     <span className="icon mb"></span>
                  </p>
                  <div className="sub-gnb-wrap">
                     <div className="sub-gnb row-group">
                        <Link className="sub-gnb-item" to="/mind-therapy/walking-meditation">
                           걷기 명상
                        </Link>
                        <Link className="sub-gnb-item" to="/mind-therapy/meditation-reflection">
                           명상과 관상
                        </Link>
                        <Link className="sub-gnb-item" to="/mind-therapy/daily-love">
                           하루愛
                        </Link>
                        <Link className="sub-gnb-item" to="/mind-therapy/confession">
                           고백해
                        </Link>
                        <Link className="sub-gnb-item" to="/mind-therapy/eap">
                           EAP
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="gnb-item">
                  <p className="gnb-menu">
                     사피엔자 아카데미아
                     <span className="icon mb"></span>
                  </p>
                  <div className="sub-gnb-wrap">
                     <div className="sub-gnb row-group">
                        <Link className="sub-gnb-item" to="/sapienza-academia/program-overview">
                           교육소개
                        </Link>
                        <Link className="sub-gnb-item" to="/sapienza-academia/level-3-course">
                           3급 과정
                        </Link>
                        <Link className="sub-gnb-item" to="/sapienza-academia/level-2-course">
                           2급 과정
                        </Link>
                        <Link className="sub-gnb-item" to="/sapienza-academia/level-1-course">
                           1급 과정
                        </Link>
                        <Link className="sub-gnb-item" to="/sapienza-academia/supervisor">
                           슈퍼바이저
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="gnb-item">
                  <p className="gnb-menu">
                     상담사 · 센터소개
                     <span className="icon mb"></span>
                  </p>
                  <div className="sub-gnb-wrap">
                     <div className="sub-gnb row-group">
                        <Link className="sub-gnb-item" to="/counselor-center/counselor">
                           상담사
                        </Link>
                        <Link className="sub-gnb-item" to="/counselor-center/center">
                           상담·코칭센터
                        </Link>
                     </div>
                  </div>
               </div>
            </div>

            <div className="btn-wrap col-group">
               {loginInfo && !isCounselor &&
                  <button className="inquiry-btn col-group" onClick={() => document.querySelector('.inquiry-modal').style.display = 'block'}>
                     <i></i>
                     상담사 등록
                  </button>
               }
               {loginInfo !== null && loginInfo &&
                  // 로그인 정보가 있을 때
                  <>
                     <Link to={`${isCounselor ? '/my-page/counselor/code-send' : '/my-page/general-user/code-use-gift'}`} className="user-btn pc"> {/* PC 로그인 후에 보이는 버튼*/}
                        <i></i>
                     </Link>
                     <Link to={`${isCounselor ? '/my-page/counselor/code-send' : '/my-page/general-user/code-use-gift'}`} className="user-btn mb"> {/* MB 로그인 후에 보이는 버튼*/}
                        <i></i>
                     </Link>
                  </>
               }
               {loginInfo !== null && !loginInfo &&
                  // 로그인 안되었을 때
                  <Link to="/login/select" className="user-btn"> {/* 로그인 전에 보이는 버튼 */}
                     <i></i>
                  </Link>
               }
            </div>
            <div
               onClick={() => sitemapHandle()}
               className={`sitemap-btn ${headerIndex ? "active" : ""}`}
            >
               <span></span>
               <span></span>
               <span></span>
            </div>

            <div className={`sitemap-bg ${headerIndex ? "active" : ""}`}></div>
         </div>
         <div className={`mb-gnb ${headerIndex ? "active" : ""}`}>
            <div className="mb-gnb-container">
               <div className="gnb-home">
                  <img src="/images/logo.png" alt="" className="gnb-home-logo" />
               </div>
               <div className="mb-gnb-wrap">
                  {/* mobileGnbItems */}
                  <div className="gnb-item">
                     <button
                        onClick={handleGnbMenuClick}
                        type='button'
                        className="gnb-menu"
                     >
                        회사소개
                        <i className="icon"></i>
                     </button>
                     <div className="sub-gnb-wrap">
                        <div className="sub-gnb row-group">
                           <Link className="sub-gnb-item" to="/company/about">
                              회사소개
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="gnb-item">
                     <button
                        onClick={handleGnbMenuClick}
                        type='button'
                        className="gnb-menu"
                     >
                        마인드 인사이트
                        <i className="icon"></i>
                     </button>
                     <div className="sub-gnb-wrap">
                        <div className="sub-gnb row-group">
                           <Link className="sub-gnb-item" to="/mind-insight/introduction">
                              소개
                           </Link>
                           <Link className="sub-gnb-item" to="/mind-insight/mind-insight">
                              마인드 인사이트
                           </Link>
                           <Link className="sub-gnb-item" to="/mind-insight/mind-report">
                              마인드 리포트 구매
                           </Link>
                           <Link className="sub-gnb-item" to="/mind-insight/consultation">
                              해석상담 구매
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="gnb-item">
                     <button
                        onClick={handleGnbMenuClick}
                        type='button'
                        className="gnb-menu"
                     >
                        마인드 테라피
                        <i className="icon"></i>
                     </button>
                     <div className="sub-gnb-wrap">
                        <div className="sub-gnb row-group">
                           <Link className="sub-gnb-item" to="/mind-therapy/walking-meditation">
                              걷기 명상
                           </Link>
                           <Link className="sub-gnb-item" to="/mind-therapy/meditation-reflection">
                              명상과 관상
                           </Link>
                           <Link className="sub-gnb-item" to="/mind-therapy/daily-love">
                              하루愛
                           </Link>
                           <Link className="sub-gnb-item" to="/mind-therapy/confession">
                              고백해
                           </Link>
                           <Link className="sub-gnb-item" to="/mind-therapy/eap">
                              EAP
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="gnb-item">
                     <button
                        onClick={handleGnbMenuClick}
                        type='button'
                        className="gnb-menu"
                     >
                        사피엔자 아카데미아
                        <i className="icon"></i>
                     </button>
                     <div className="sub-gnb-wrap">
                        <div className="sub-gnb row-group">
                           <Link className="sub-gnb-item" to="/sapienza-academia/program-overview">
                              교육소개
                           </Link>
                           <Link className="sub-gnb-item" to="/sapienza-academia/level-3-course">
                              3급 과정
                           </Link>
                           <Link className="sub-gnb-item" to="/sapienza-academia/level-2-course">
                              2급 과정
                           </Link>
                           <Link className="sub-gnb-item" to="/sapienza-academia/level-1-course">
                              1급 과정
                           </Link>
                           <Link className="sub-gnb-item" to="/sapienza-academia/supervisor">
                              슈퍼바이저
                           </Link>
                        </div>
                     </div>
                  </div>
                  <div className="gnb-item">
                     <button
                        onClick={handleGnbMenuClick}
                        type='button'
                        className="gnb-menu"
                     >
                        상담사 · 센터소개
                        <i className="icon"></i>
                     </button>
                     <div className="sub-gnb-wrap">
                        <div className="sub-gnb row-group">
                           <Link className="sub-gnb-item" to="/counselor-center/counselor">
                              상담사
                           </Link>
                           <Link className="sub-gnb-item" to="/counselor-center/center">
                              상담·코칭센터
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="sns-btn-wrap col-group">
                  <Link to="" className="sns-btn">
                     <img src={images.sns_btn_kc} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                     <img src={images.sns_btn_insta} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                     <img src={images.sns_btn_blog} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                     <img src={images.sns_btn_ytb} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                     <img src={images.sns_btn_ks} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                     <img src={images.sns_btn_band} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                     <img src={images.sns_btn_fb} alt="" />
                  </Link>
               </div>
            </div>
         </div>

         <div className="modal-container inquiry-modal" style={{ display: "none" }}>
            <div className="modal-wrap modal-alert-wrap">
               <i className="close-btn" onClick={() => document.querySelector('.inquiry-modal').style.display = 'none'}></i>
               <div className="modal-title-wrap">
                  <i className="icon red"></i>
                  <p className="title">상담사 등록 안내</p>
               </div>
               <p className="modal-alert-txt">
                  마인드 임팩트 상담사 등록을 원하시면 <br />
                  상담사 회원가입을 하셔야 합니다. <br />
                  아래 로그아웃 버튼을 누르시면 <br />
                  상담사 회원가입 페이지로 이동됩니다. <br />
                  지금 로그아웃 하시겠습니까?
               </p>
               <div className="modal-footer col-group">
                  <button
                     onClick={() => { handleLogout() }}
                     className="modal-footer-btn gray"
                  >
                     로그아웃
                  </button>
               </div>
            </div>
         </div>
      </header>
   )
}

export default Header