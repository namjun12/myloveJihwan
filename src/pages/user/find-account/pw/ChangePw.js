import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Hooks
import ChangePwToken from '../../../../hooks/token/ChangePwToken'

const ChangePw = () => {

   const changePwToken = ChangePwToken()
   const navigate = useNavigate();

   useEffect(() => {
      if (!changePwToken) {
         window.location.href = '/'
         alert('잘못된 접근입니다.')
         return
      }
   }, [changePwToken]);

   const [passwordData, setPassWordData] = useState({
      password: '',
      confirmPassword: '',
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setPassWordData((prev) => {
         const updateData = { ...prev };
         updateData[name] = value;

         return updateData;
      })
   }

   const sendData = async () => {

      if (passwordData.password !== passwordData.confirmPassword) {
         alert('비밀번호가 일치하지 않습니다.')
         return
      }

      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/find/pwd/change`, {
            password: passwordData.password
         }, {
            withCredentials: true, // 쿠키 포함
         }
         )
         if (response.status === 200) {
            navigate('/find-account/change-pw-done')
         }
      } catch (error) {
         console.error(error)
         alert(error.response.data.msg)
      }
   }

   if (!changePwToken) {
      return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '24px' }}>잘못된 접근입니다.</div>
   }

   return (
      <div className="subpage">
         <section className="user-section">
            <div className="user-wrap">
               <div className="title-wrap row-group">
                  <h2 className="title">
                     비밀번호 변경
                  </h2>
                  <p className="txt">
                     새로운 비밀번호를 등록해 주세요
                  </p>
               </div>
               <div className="form-wrap account-form-wrap row-group">
                  <div className="form-item">
                     <div className="item-user">
                        <div className="form-input-wrap row-group">
                           <input
                              onChange={handleChange}
                              value={passwordData.password}
                              name='password'
                              type="password"
                              className="form-input"
                              placeholder="비밀번호"
                           />
                           <input
                              onChange={handleChange}
                              value={passwordData.confirmPassword}
                              name='confirmPassword'
                              type="password"
                              className="form-input"
                              placeholder="비밀번호 재확인"
                           />
                        </div>
                     </div>
                  </div>
                  <div className="mp-section-footer border">
                     <button
                        onClick={sendData}
                        className="form-footer-btn"
                     >
                        비밀번호 변경
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default ChangePw