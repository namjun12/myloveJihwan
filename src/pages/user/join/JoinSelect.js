import React from 'react'
import { Link } from 'react-router-dom'

// Images, Videos
import { images } from '../../../assets/images'

const JoinSelect = () => {
   return (
      <div className="subpage login_index">

         <div className="login-index-title-wrap row-group">
            <h2 className="title">
               마인드 인사이트 회원가입
            </h2>
            <p className="txt">
               마인드 인사이트의 회원가입을 환영합니다. <br />
               회원유형에 따라 가입유형을 선택해 주세요.
            </p>
         </div>

         <div className="login-select-group col-group">
            <Link to="/join" className="login-select-item row-group">
               <img src={images.login_select_01} alt="" className="img" />
               <p className="title">
                  개인 회원가입
               </p>
               <p className="txt">
                  <strong>SNS 1초 간편가입</strong>으로 마인드 인사이트의 <br />
                  다양한 프로그램을 만나보세요!
               </p>
               <i className="icon"></i>
            </Link>
            <Link to="/join/counselor" className="login-select-item row-group">
               <img src={images.login_select_02} alt="" className="img" />
               <p className="title">
                  상담사 회원가입
               </p>
               <p className="txt">
                  <strong>'증빙 서류 첨부 &gt; 확인 &gt; 관리자 승인'</strong> <br />
                  상담사 서비스 이용이 가능합니다.
               </p>
               <i className="icon"></i>
            </Link>
         </div>

      </div>
   )
}

export default JoinSelect