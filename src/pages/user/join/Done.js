import React from 'react'
import { Link } from 'react-router-dom'

const Done = () => {
   return (
      <div className="subpage">
         <section className="user-section">
            <div className="container">
               <div className="result-wrap">
                  <div className="result-inner">
                     <i className="icon green"></i>
                     <p className="result-title">
                        <span className="green">회원가입</span>이 완료되었습니다.
                     </p>
                     <div className="sub-wrap">
                        <p className="sub">
                           모든 회원 가입 절차가 완료되었습니다. <br />
                           이제 마인드 인사이트의 다양한 프로그램을 만나보세요!
                        </p>
                     </div>
                  </div>
                  <div className="btn-wrap col-group">
                     <Link to="/" className="btn">메인화면으로</Link>
                     <Link to="/" className="btn green">상담사 등록 신청</Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Done