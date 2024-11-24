import React from 'react'
import { Link } from 'react-router-dom'

const ChangePwDone = () => {
   return (
      <div className="subpage">
         <section className="user-section">
            <div className="container">
               <div className="result-wrap">
                  <div className="result-inner">
                     <i className="icon green"></i>
                     <p className="result-title">
                        <span className="green">비밀번호</span>가 변경 되었습니다
                     </p>
                     <div className="sub-wrap">
                        <p className="sub">
                           새로운 비밀번호로 로그인해주세요.
                        </p>
                     </div>
                  </div>
                  <div className="btn-wrap row-group">
                     <Link to="/login/select" className="btn green">로그인</Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default ChangePwDone