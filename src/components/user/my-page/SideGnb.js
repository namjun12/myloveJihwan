import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SideGnb = ({ loginInfo }) => {
   const isCounselor = loginInfo.member_type === 1;
   // const navigate = useNavigate();

   const handleLogout = () => {
      console.log('로그아웃')
      // navigate('/', { replace: true })
   }

   return (
      <div className="myPageMenu">

         <div className="mp-inner-wrap">
            <p className="mp-title">
               마인드 인사이트
            </p>
            {isCounselor ? (
               <div className="mp-list"> {/* 상담사 회원 메뉴 */}
                  <Link className="mp-item" to="/my-page/counselor/code-send">
                     검사코드 발송
                  </Link>
                  <Link className="mp-item" to="/my-page/counselor/send-history">
                     발송 내역
                  </Link>
                  <Link className="mp-item" to="/my-page/counselor/test-result">
                     심리검사 진행/결과
                  </Link>
               </div>
            ) : (
               <div className="mp-list"> {/* 일반 회원 메뉴 */}
                  <Link className="mp-item" to="/my-page/general-user/code-use-gift">
                     검사코드 사용/선물
                  </Link>
                  <Link className="mp-item" to="/my-page/general-user/use-gift-history">
                     사용/선물 내역
                  </Link>
                  <Link className="mp-item" to="/my-page/general-user/progress">
                     심리검사 진행/결과
                  </Link>
               </div>
            )}
         </div>
         <div className="mp-inner-wrap">
            <p className="mp-title">
               구매내역
            </p>
            <div className="mp-list">
               <Link className="mp-item" to="/my-page/purchase/history">
                  구매내역
               </Link>
               <Link className="mp-item" to="/my-page/refund/history">
                  환불내역
               </Link>
            </div>
         </div>
         <div className="mp-inner-wrap">
            <p className="mp-title">
               1:1 문의
            </p>
            <div className="mp-list">
               <Link className="mp-item" to="/my-page/inquiry">
                  1:1 문의
               </Link>
            </div>
         </div>
         <div className="mp-inner-wrap">
            <p className="mp-title">
               나의 정보
            </p>
            <div className="mp-list">
               <Link className="mp-item" to="/my-page/account-management">
                  계정 정보 관리
               </Link>
            </div>
         </div>

         <button
            onClick={handleLogout}
            className="default-btn logOut-btn col-group"
         >
            <p className="btn-title">로그아웃</p>
            <i className="xi-log-out"></i>
         </button>

      </div>
   )
}

export default SideGnb