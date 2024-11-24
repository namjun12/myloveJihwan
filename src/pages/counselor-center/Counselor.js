import React from 'react'

// Components
import IndexHeader from '../../components/IndexHeader'
import SubTopNav from '../../components/sub-page/SubTopNav'
import { Sapienza } from '../../data/SubTopNavInfo'

// Images, Videos
import { images } from '../../assets/images'

const Counselor = () => {
   IndexHeader();

   return (
      <main className="subpage counselor">
         <div className="sub-top">
            <img src={images.sub05_sub_top} alt="" className="bg-img" />
            <div className="sub-top-title-wrap row-group">
               <h2 className="sub-top-title">
                  상담사 · 센터소개
               </h2>
               <p className="sub-top-txt">
                  사피엔자 아카데미 융합심리분석상담사
               </p>
            </div>
         </div>

         <SubTopNav SubTopNavInfo={Sapienza()} />

         <div className="section section-01">
            <div className="container">
               <div className="section-title-wrap row-group">
                  <p className="sub-title green">
                     마인드 임팩트 상담·코칭센터
                  </p>
                  <h3 className="title">
                     전문 융합심리분석상담사
                  </h3>
                  <p className="txt">
                     ‘사피엔자 아카데미아’를 통해 양성된 융합심리분석상담사들이 마인드 아이티만의 고유한 검사도구와 분석키트를 <br /> 활용하여 융합심리분석상담과 융합심리분석상담치료를 진행합니다.
                  </p>
               </div>
               <img src={images.sub05_counselor_01} alt="" className="main-img img-pc" />
               <img src={images.sub05_counselor_01_m} alt="" className="main-img img-mb" />
            </div>
         </div>
         <div className="section section-02">
            <div className="container">
               <div className="section-title-wrap">
                  <h3 className="title">
                     Counseling · Coaching Staff
                  </h3>
               </div>
               <div className="counselor-list col-group">
                  <div className="counselor-item col-group">
                     <div className="img">
                        <img src="" alt="" />
                     </div>
                     <div className="txt-wrap row-group">
                        <div className="title-wrap row-group">
                           <p className="sub-title green">
                              고양삼송점
                           </p>
                           <p className="title">
                              고상담
                           </p>
                           <p className="txt">
                              있는 그대로 소중한 당신, 때로 삶이 힘겨울 때 잠시 <br />
                              쉬어갈 수 있도록 따뜻한 마음으로 함께 하겠습니다.
                           </p>
                        </div>
                        <div className="txt-group row-group">
                           <p className="txt">
                              청소년상담사 2급 (여성가족부)
                           </p>
                           <p className="txt">
                              전문상담사 2급 (한국상담학회)
                           </p>
                           <p className="txt">
                              성폭력전문상담사 (여성가족부)
                           </p>
                           <p className="txt">
                              사회복지사 1급 (보건복지부)
                           </p>
                           <p className="txt">
                              전문심리상담경력 (6년)
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="counselor-item col-group">
                     <div className="img">
                        <img src="" alt="" />
                     </div>
                     <div className="txt-wrap row-group">
                        <div className="title-wrap row-group">
                           <p className="sub-title green">
                              고양삼송점
                           </p>
                           <p className="title">
                              고상담
                           </p>
                           <p className="txt">
                              있는 그대로 소중한 당신, 때로 삶이 힘겨울 때 잠시 <br />
                              쉬어갈 수 있도록 따뜻한 마음으로 함께 하겠습니다.
                           </p>
                        </div>
                        <div className="txt-group row-group">
                           <p className="txt">
                              청소년상담사 2급 (여성가족부)
                           </p>
                           <p className="txt">
                              전문상담사 2급 (한국상담학회)
                           </p>
                           <p className="txt">
                              성폭력전문상담사 (여성가족부)
                           </p>
                           <p className="txt">
                              사회복지사 1급 (보건복지부)
                           </p>
                           <p className="txt">
                              전문심리상담경력 (6년)
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="counselor-item col-group">
                     <div className="img">
                        <img src="" alt="" />
                     </div>
                     <div className="txt-wrap row-group">
                        <div className="title-wrap row-group">
                           <p className="sub-title green">
                              고양삼송점
                           </p>
                           <p className="title">
                              고상담
                           </p>
                           <p className="txt">
                              있는 그대로 소중한 당신, 때로 삶이 힘겨울 때 잠시 <br />
                              쉬어갈 수 있도록 따뜻한 마음으로 함께 하겠습니다.
                           </p>
                        </div>
                        <div className="txt-group row-group">
                           <p className="txt">
                              청소년상담사 2급 (여성가족부)
                           </p>
                           <p className="txt">
                              전문상담사 2급 (한국상담학회)
                           </p>
                           <p className="txt">
                              성폭력전문상담사 (여성가족부)
                           </p>
                           <p className="txt">
                              사회복지사 1급 (보건복지부)
                           </p>
                           <p className="txt">
                              전문심리상담경력 (6년)
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="counselor-item col-group">
                     <div className="img">
                        <img src="" alt="" />
                     </div>
                     <div className="txt-wrap row-group">
                        <div className="title-wrap row-group">
                           <p className="sub-title green">
                              고양삼송점
                           </p>
                           <p className="title">
                              고상담
                           </p>
                           <p className="txt">
                              있는 그대로 소중한 당신, 때로 삶이 힘겨울 때 잠시 <br />
                              쉬어갈 수 있도록 따뜻한 마음으로 함께 하겠습니다.
                           </p>
                        </div>
                        <div className="txt-group row-group">
                           <p className="txt">
                              청소년상담사 2급 (여성가족부)
                           </p>
                           <p className="txt">
                              전문상담사 2급 (한국상담학회)
                           </p>
                           <p className="txt">
                              성폭력전문상담사 (여성가족부)
                           </p>
                           <p className="txt">
                              사회복지사 1급 (보건복지부)
                           </p>
                           <p className="txt">
                              전문심리상담경력 (6년)
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="section-footer">
            <div className="container col-group">
               <p className="title">
                  마인드임팩트의 <strong>융합심리분석상담</strong>으로 <strong>'나'</strong>를 찾아보세요
               </p>
               <a href="login.html" className="btn col-group">
                  상담사 로그인
                  <i></i>
               </a>
            </div>
         </div>
      </main>
   )
}

export default Counselor