import React from 'react'

// Images, Videos
import { images } from '../../../../assets/images'
import Pagination from '../../../../components/common/Pagination'

const TestResult = () => {
   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap border col-group">
            <h2 className="mp-main-title">
               <span className="mb">My 정보 <i></i></span>
               심리검사 진행/결과
            </h2>
            <div className="search-wrap">
               <input type="text" className="search-input" placeholder="이름을 입력하세요" />
               <button className="search-btn">
                  <i></i>
               </button>
            </div>
         </div>

         <div className="test-result-list row-group">
            <div className="test-result-item col-group">
               <div className="img">
                  <img src={images.academia_item_04} alt="" />
               </div>
               <div className="txt-wrap row-group">
                  <div className="title-group row-group">
                     <div className="name-group col-group">
                        <p className="name">
                           홍길동
                        </p>
                        <p className="sub-title">
                           마인드 인사이트
                        </p>
                     </div>
                     <div className="detail-list col-group">
                        <div className="detail-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              1999.09.09
                           </p>
                        </div>
                        <div className="detail-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              01012341234
                           </p>
                        </div>
                        <div className="detail-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              email123543@email.com
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="test-result-step">
                     <div className="test-title-group col-group">
                        <p className="test-title">검사 진행률</p>
                        <p className="test-title green">50%</p>
                     </div>
                     <div className="test-step-group col-group">
                        <div className="test-step-item row-group active"> {/* 진행 완료 시 active 클래스 추가 */}
                           <div className="item-user"></div>
                           <p className="item-default">STEP 01</p>
                        </div>
                        <div className="test-step-item row-group active"> {/* 진행 완료 시 active 클래스 추가 */}
                           <div className="item-user"></div>
                           <p className="item-default">STEP 02</p>
                        </div>
                        <div className="test-step-item row-group active">
                           <div className="item-user"></div>
                           <p className="item-default">STEP 03</p>
                        </div>
                        <div className="test-step-item row-group active">
                           <div className="item-user"></div>
                           <p className="item-default">STEP 04</p>
                        </div>
                     </div>
                  </div>
               </div>
               <a href="" className="btn active"> {/* 진행률 100% 일 시 active 클래스 추가 */}
                  결과보기
               </a>
            </div>
            <div className="test-result-item col-group">
               <div className="img">
                  <img src={images.academia_item_04} alt="" />
               </div>
               <div className="txt-wrap row-group">
                  <div className="title-group row-group">
                     <div className="name-group col-group">
                        <p className="name">
                           홍길동
                        </p>
                        <p className="sub-title">
                           마인드 인사이트
                        </p>
                     </div>
                     <div className="detail-list col-group">
                        <div className="detail-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              1999.09.09
                           </p>
                        </div>
                        <div className="detail-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              01012341234
                           </p>
                        </div>
                        <div className="detail-item col-group">
                           <i className="icon"></i>
                           <p className="txt">
                              email123543@email.com
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="test-result-step">
                     <div className="test-title-group col-group">
                        <p className="test-title">검사 진행률</p>
                        <p className="test-title green">50%</p>
                     </div>
                     <div className="test-step-group col-group">
                        <div className="test-step-item row-group active"> {/* 진행 완료 시 active 클래스 추가 */}
                           <div className="item-user"></div>
                           <p className="item-default">STEP 01</p>
                        </div>
                        <div className="test-step-item row-group active"> {/* 진행 완료 시 active 클래스 추가 */}
                           <div className="item-user"></div>
                           <p className="item-default">STEP 02</p>
                        </div>
                        <div className="test-step-item row-group">
                           <div className="item-user"></div>
                           <p className="item-default">STEP 03</p>
                        </div>
                        <div className="test-step-item row-group">
                           <div className="item-user"></div>
                           <p className="item-default">STEP 04</p>
                        </div>
                     </div>
                  </div>
               </div>
               <a href="" className="btn"> {/* 진행률 100% 일 시 active 클래스 추가 */}
                  결과보기
               </a>
            </div>
         </div>
         <Pagination />
      </div>
   )
}

export default TestResult