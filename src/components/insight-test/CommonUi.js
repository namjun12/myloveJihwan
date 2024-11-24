import React from 'react'

// Images, Videos
import { images } from '../../assets/images'

const CommonUi = ({ isAnswerPage, mainStep, content, checkResultsPage }) => {
   return (
      <main>
         <div className="test-container">
            <div className="container row-group w1280">
               <nav className="nav col-group">
                  <h2 className="nav-title">
                     {checkResultsPage ? '마인드 인사이트 검사 결과확인' : '마인드 인사이트 검사'}
                  </h2>
                  {checkResultsPage ? ( // 검사 결과 확인 페이지
                     <div className="nav-step-list col-group">
                        <div className='nav-step col-group active'>
                           <i className="icon"></i>
                           <p className="txt">정보입력</p>
                           <i className="txt"></i>
                        </div>
                        <div className='nav-step col-group'>
                           <i className="xi-file-check icon"/>
                           <p className="txt">결과보기</p>
                        </div>
                     </div>
                  ) : ( // 마인드 인사이트 검사 정보 입력 페이지
                     <div className="nav-step-list col-group">
                        <div className={`${mainStep >= 0 ? 'active' : ''} nav-step col-group`}>
                           <i className="icon"></i>
                           <p className="txt">정보입력</p>
                           <i className="txt"></i>
                        </div>
                        <div className={`${mainStep >= 1 ? 'active' : ''} nav-step col-group`}>
                           <i className="icon"></i>
                           <p className="txt">작성방법</p>
                           <i className="txt"></i>
                        </div>
                        <div className={`${mainStep >= 2 ? 'active' : ''} nav-step col-group`}>
                           <i className="icon"></i>
                           <p className="txt">답안입력</p>
                           <i className="txt"></i>
                        </div>
                        <div className={`${mainStep >= 3 ? 'active' : ''} nav-step col-group`}>
                           <i className="icon"></i>
                           <p className="txt">완료</p>
                        </div>
                     </div>
                  )}
               </nav>

               {isAnswerPage ? (
                  content
               ) : (
                  <section className="col-group section">
                     <div className="side side-img">
                        <img src={images.side_img} alt="" className="side-img" />
                     </div>
                     {content}
                  </section>
               )}

            </div>
         </div>
      </main>
   )
}

export default CommonUi