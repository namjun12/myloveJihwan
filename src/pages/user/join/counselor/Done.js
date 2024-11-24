import React from 'react'
import { Link } from 'react-router-dom'

const CounselorDone = () => {
   return (
      <div className="subpage">
         <section className="user-section">
            <div className="container">
               <div className="result-wrap">
                  <div className="result-inner">
                     <i className="icon green"></i>
                     <p className="result-title">
                        <span className="green">상담사 등록신청</span>이 완료되었습니다
                     </p>
                     <div className="sub-wrap">
                        <p className="sub">
                           관리자 승인 후 상담사 회원 로그인이 가능합니다. <br />
                           관리자 승인은 1~3일(주말제외)정도 소요됩니다. 감사합니다.
                        </p>
                     </div>
                  </div>
                  <div className="btn-wrap col-group">
                     <Link to="/" className="btn green">메인화면으로</Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default CounselorDone