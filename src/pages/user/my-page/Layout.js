import React from 'react'
import { Outlet } from 'react-router-dom'

// Components
import SideGnb from '../../../components/user/my-page/SideGnb'
import AccessToken from '../../../hooks/token/AccessToken'

// Recoil
import { useRecoilValue } from 'recoil'
import { LoginInfoAtom } from '../../../recoil/LoginInfoAtom'
import Loading from '../../../components/common/Loading'

const MyPagelayout = () => {

   const isAccessToken = AccessToken();
   const loginInfo = useRecoilValue(LoginInfoAtom);

   if (!loginInfo) {
      return (<Loading />)
   }
   return (
      <div className="subpage">

         <section className="myPage-section mypage_code">

            <div className="stateBox">
               <div className="container">
                  <div className="le-wrap col-group">
                     <i className="icon"></i>
                     <p className="title">마이페이지</p>
                     <p className="sub">
                        안녕하세요,&nbsp;<span className="txt-bold">{loginInfo.name} 님!</span>
                     </p>
                  </div>
               </div>
            </div>
            <div className="container inner-container">
               <SideGnb loginInfo={loginInfo} />
               <Outlet />
            </div>
         </section>

      </div>
   )
}

export default MyPagelayout