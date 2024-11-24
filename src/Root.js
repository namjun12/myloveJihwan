import React, { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';

// Hooks
import { LoginInfoAtom } from './recoil/LoginInfoAtom';
import useConfirmToken from './hooks/token/ConfirmToken';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import TopMenu from './components/TopMenu';

// Style
import 'swiper/css';
import 'swiper/css/pagination';
import './css/common.css'
import './css/style.css'

const Root = () => {

  const pathname = useLocation().pathname;

  // 토큰 확인 API
  const setLoginInfoAtom = useSetRecoilState(LoginInfoAtom);
  const confirmTokenResult = useConfirmToken();

  useEffect(() => {
    if (confirmTokenResult) {
      setLoginInfoAtom((prev) => ({
        ...prev,
        id: confirmTokenResult.id,
        member_type: confirmTokenResult.member_type,
        login_type: confirmTokenResult.login_type,
        identified: confirmTokenResult.identified,
        name: confirmTokenResult.name,
        phone: confirmTokenResult.phone,
        birth: confirmTokenResult.birth
      }))
    } else {
      setLoginInfoAtom(false)
    }
  }, [pathname, confirmTokenResult, setLoginInfoAtom])

  return (
    <div>
      <Header />
      <Outlet />
      <TopMenu />
      <Footer />
    </div>
  )
}

export default Root