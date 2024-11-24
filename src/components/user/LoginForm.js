import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// Images, Vidoes
import { images } from '../../assets/images'
import axios from 'axios'

const LoginForm = ({ isCounselor }) => {
   // isCounselor 0일 때 개인, 1일 때 상담사

   const navigate = useNavigate();

   const [mailFormData, setMailFormData] = useState({
      c_identified: '',
      password: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target
      setMailFormData((prev) => ({
         ...prev,
         [name]: value
      }))
   }

   const mailLogin = async (e) => {
      e.preventDefault(); // 기본 동작 막음
      
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/login/${isCounselor}`,
            mailFormData, {
            withCredentials: true, // 쿠키 포함
         });

         if (response.status === 200) {
            alert(response.data.msg)
            navigate('/')
         }
      } catch (error) {
         console.error(error)
         alert(error.response.data.msg)
         if (error.response.status === 403) {
            navigate('/join/counselor/complete')
         }
      }
   }

   return (
      <div className="subpage">
         <section className="user-section">
            <div className="user-wrap">
               <div className="title-wrap row-group">
                  <h2 className="title">
                     {isCounselor ? '상담사 로그인' : '로그인'}
                  </h2>
                  <p className="txt">
                     마인드 인사이트를 통해 진정한 '나'를 발견하세요.
                  </p>
               </div>
               <form onSubmit={mailLogin}>
                  <fieldset>
                     <div className="input-wrap">
                        <input
                           onChange={handleChange}
                           name='c_identified'
                           className="form-input"
                           type="text"
                           placeholder="이메일(아이디)"
                        />
                        <input
                           onChange={handleChange}
                           name='password'
                           className="form-input"
                           type="password"
                           placeholder="비밀번호"
                        />
                     </div>
                     <button
                        // onClick={() => mailLogin()}
                        className="hi default-btn user-btn btn-bk login-btn"
                        type='submit'
                     >
                        로그인
                     </button>
                  </fieldset>
               </form>
               <div className="user-link-wrap">
                  <Link to={`/find-account/id/${isCounselor ? 'counselor' : ''}`} className="find-btn"> 아이디 찾기</Link>
                  <span className="div-mark"></span>
                  <Link to={`/find-account/pw/${isCounselor ? 'counselor' : ''}`} className="find-btn"> 비밀번호 찾기</Link>
               </div>

               {/* 상담사 회원 로그인 시 삭제 */}
               <div className="login-sns-wrap">
                  <Link to={`https://admin.mindimpact.kr/api/login/${isCounselor}/naver`} className="btn">
                     <img src={images.never_login} alt="" />
                  </Link>
                  <Link to={`https://admin.mindimpact.kr/api/login/${isCounselor}/kakao`} className="btn">
                     <img src={images.kakao_login} alt="" />
                  </Link>
               </div>
               {/* //상담사 회원 로그인 시 삭제 */}

               <p className="sub">
                  아직 <span className="green">마인드 인사이트</span>의 회원이 아니신가요?
               </p>
               <Link to="/join/select" className="join-btn">회원가입</Link>
            </div>
         </section>
      </div>
   )
}

export default LoginForm