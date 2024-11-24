import React from 'react'
import { Link } from 'react-router-dom'

// Images, Videos
import { images } from '../assets/images'

const Footer = () => {
   return (
      <footer>
         <div className="footer-wrap">
            <div className="container col-group">
               <div className="left row-group">
                  <Link to="index.html" className="footer-logo">
                     <img src={images.footer_logo} alt="" />
                  </Link>
                  <div className="footer-link-wrap col-group">
                     <Link to="" className="footer-link">
                        개인정보처리방침
                     </Link>
                     <Link to="" className="footer-link">
                        이용약관
                     </Link>
                  </div>
                  <div className="footer-txt-wrap row-group">
                     <div className="footer-txt-group col-group">
                        <p className="footer-txt">(주)마인드아이티</p>
                        <p className="footer-txt">대표이사 : 홍길동</p>
                        <p className="footer-txt">주소 : 경기도 고양시 덕양구 삼송로 240, 힐스테이트삼송역스칸센 202동 248호</p>
                     </div>
                     <div className="footer-txt-group col-group">
                        <p className="footer-txt">사업자등록번호 : 117-86-02993</p>
                        <p className="footer-txt">대표번호 : 02-381-2024</p>
                        <p className="footer-txt">이메일 : email@email.com</p>
                     </div>
                  </div>
                  <p className="footer-copy-txt">
                     Copyright 2024 (주)마인드아이티 All rights reserved.
                  </p>
                  <div className="sns-btn-wrap col-group">
                     <Link to="" className="sns-btn">
                        <img src={images.sns_btn_kc} alt="" />
                     </Link>
                     <Link to="" className="sns-btn">
                        <img src={images.sns_btn_insta} alt="" />
                     </Link>
                     <Link to="" className="sns-btn">
                        <img src={images.sns_btn_blog} alt="" />
                     </Link>
                     <Link to="" className="sns-btn">
                        <img src={images.sns_btn_ytb} alt="" />
                     </Link>
                     <Link to="" className="sns-btn">
                        <img src={images.sns_btn_ks} alt="" />
                     </Link>
                     <Link to="" className="sns-btn">
                        <img src={images.sns_btn_band} alt="" />
                     </Link>
                     <Link to="" className="sns-btn">
                        <img src={images.sns_btn_fb} alt="" />
                     </Link>
                  </div>
               </div>
               <div className="right row-group">
                  <p className="footer-inquiry-title">고객센터</p>
                  <Link to="tel:02-381-2024" className="footer-inquiry-num">
                     02-381-2024
                  </Link>
                  <p className="footer-inquiry-txt">
                     평일 10:00 ~ 15:00 (점심시간 12:00 ~13:00) <br />
                        주말 및 공휴일은 휴무입니다.
                  </p>
                  <Link to="mypage_03.html" className="footer-inquiry-btn">1:1 문의</Link>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default Footer