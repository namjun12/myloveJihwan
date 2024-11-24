import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

// Images
import { images } from '../assets/images';
import { useRecoilValue } from 'recoil';
import { LoginInfoAtom } from '../recoil/LoginInfoAtom';

const TopMenu = () => {

   useEffect(() => {

      const topScrollBtn = document.querySelector('.Top_Scroll_btn');

      if (topScrollBtn) {
         topScrollBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
         });

         document.addEventListener('scroll', function () {
            if (document.documentElement.scrollTop > 88) {
               topScrollBtn.classList.add('active');
            } else {
               topScrollBtn.classList.remove('active');
            }

            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            const color = getColorFromPercentage(scrollPercent);

            const progressBar = topScrollBtn.querySelector('.progress_bar');
            if (progressBar) {
               progressBar.style.background = `conic-gradient(${color} 0% ${scrollPercent}%, #fff ${scrollPercent}% 100%)`;
            }
         });
      }

      function getColorFromPercentage(percentage) {
         const startColor = [0, 117, 74]; // RGB 값으로 작성해야함!
         const endColor = [0, 117, 74];

         const color = startColor.map((start, i) => {
            return Math.round(start + (endColor[i] - start) * (percentage / 100));
         });

         return `rgb(${color.join(',')})`;
      }
   }, [])

   const LoginInfoAtomValue = useRecoilValue(LoginInfoAtom);

   if (!LoginInfoAtomValue) return;

   return (
      <div className="top-btn-wrap">
         <Link
            to={`${LoginInfoAtomValue.member_type === 0 ? '/my-page/general-user/code-use-gift' : '/my-page/counselor/code-send'}`}
            className="btn test-btn"
         >
            <div className="hover-btn">
               <p>검사하기</p>
            </div>
            <div className="basic-btn">
               <img src={images.icon_pen} alt="" />
            </div>
         </Link>
         <Link
            to="http://pf.kakao.com/_wZlxkG"
            target="_blank"
            className="btn inquiry-btn"
            rel='noreferrer noopener'
         >
            <div className="hover-btn">
               <p>문의하기</p>
            </div>
            <div className="basic-btn">
               <img src={images.icon_message} alt="" />
            </div>
         </Link>
         <button className="Top_Scroll_btn">
            <i className="xi-arrow-up"></i>
            <div className="progress_bar"></div>
         </button>
      </div>

   )
}

export default TopMenu