import React from 'react'
import { Link } from 'react-router-dom'

// Images, Videos
import { images } from '../../../assets/images'

const LoginSelect = () => {
   return (
      <div className="subpage login_index">

         <div className="login-index-title-wrap row-group">
            <h2 className="title">
               마인드 인사이트 로그인
            </h2>
            <p className="txt">
               마인드 인사이트에 오신 것을 환영합니다. <br />
               회원 유형을 선택해 주세요.
            </p>
         </div>

         <div className="login-select-group col-group">
            <Link to="/login" className="login-select-item row-group">
               <img src={images.login_select_01} alt="" className="img" />
               <p className="title">
                  개인 회원 로그인
               </p>
               <i className="icon"></i>
            </Link>
            <Link to="/login/counselor" className="login-select-item row-group">
               <img src={images.login_select_02} alt="" className="img" />
               <p className="title">
                  상담사 회원 로그인
               </p>
               <i className="icon"></i>
            </Link>
         </div>

      </div>
   )
}

export default LoginSelect