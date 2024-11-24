import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const FindIdDone = () => {

   const [searchParams] = useSearchParams();

   const name = searchParams.get('name')
   const email = searchParams.get('email')

   if (!name || !email) {
      alert('잘못된 접근입니다.')
      window.location.href = '/';
      return;
   }

   return (
      <div className="subpage">
         <section className="user-section">
            <div className="container">
               <div className="result-wrap">
                  <div className="result-inner">
                     <i className="icon green"></i>
                     <p className="result-title">
                        {name}님의 아이디는 <br />
                        <span className="green">{email}</span> 입니다.
                     </p>

                     <div className="sub-wrap">
                        <p className="sub">
                           비밀번호가 기억나지 않으신가요?
                        </p>
                     </div>
                  </div>
                  <div className="btn-wrap row-group">
                     <Link to="/find-account/pw" className="sub-btn">
                        비밀번호 재설정하기
                     </Link>
                     <Link to="/login" className="btn green">로그인</Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default FindIdDone