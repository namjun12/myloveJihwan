import React from 'react'
import { images } from '../../assets/images'
import { Link } from 'react-router-dom'

const JoinOptions = ({ isCounselor }) => {
   return (
      <div className="subpage">
         <section className="user-section">
            <div className="user-wrap">
               <div className="title-wrap row-group">
                  <h2 className="title">
                     회원가입
                  </h2>
                  <p className="txt">
                     SNS 1초 간편가입으로 마인드 인사이트의 다양한 프로그램을 만나보세요!
                  </p>
               </div>
               <div
                  style={!isCounselor ? { borderBottom: '0px' } : {}}
                  className="login-sns-wrap"
               >
                  <Link
                     to={isCounselor ? 'https://admin.mindimpact.kr/api/login/1/naver' : 'https://admin.mindimpact.kr/api/login/0/naver'}
                     className="btn"
                  >
                     <img src={images.never_login} alt="" />
                  </Link>
                  <Link
                     to={isCounselor ? 'https://admin.mindimpact.kr/api/login/1/kakao' : 'https://admin.mindimpact.kr/api/login/0/kakao'}
                     className="btn"
                  >
                     <img src={images.kakao_login} alt="" />
                  </Link>
                  <Link
                     to={`${isCounselor ? '/join/counselor/email' : '/join/email'}`}
                     className="btn email">
                     <i className="icon"></i>
                     이메일로 계속하기
                  </Link>
               </div>
               {isCounselor &&
                  <>
                     <p className="sub">
                        상담사 회원이신가요?
                     </p>
                     <Link to="/login/counselor" className="join-btn">상담사 로그인</Link>
                  </>
               }
            </div>
         </section>
      </div>
   )
}

export default JoinOptions