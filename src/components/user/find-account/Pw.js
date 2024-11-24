import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Hooks
import { inputPhoneNum, currentVerificationStep, getVerificationCode, verifyAuth, handleVerificationCode } from '../../../hooks/VerificationCode';

const FindPwComponent = ({ isCounselor }) => {

   const navigate = useNavigate();

   const [formData, setFormData] = useState({
      c_identified: '',
      phone: ''
   })
   const memberType = isCounselor ? 1 : 0 // 0: 일반 | 1: 상담사
   const certType = 3 // pw 찾기

   // 휴대폰 번호를 입력했을 때만 step1로 변경
   const [verificationStep, setVerificationStep] = useState(0);
   useEffect(() => {
      inputPhoneNum(formData, setVerificationStep);
   }, [formData.phone])

   // input 입력 시 formData에 저장
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   // 인증번호
   const [verificationCode, setVerificationCode] = useState("");

   const findPwAuth = async () => {
      try {
         const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/find/${memberType}/pwd`, {
            c_identified: formData.c_identified, phone: formData.phone
         }, {
            withCredentials: true, // 쿠키 포함
         }
         )
         if (response.status === 200) {
            alert(response.data.msg)
            navigate('/find-account/change-pw')
         }
      } catch (error) {
         console.error(error)
         alert(error.response.data.msg)
      }
   }


   return (
      <div className="subpage">
         <section className="user-section">
            <div className="user-wrap">
               <div className="title-wrap row-group">
                  <h2 className="title">
                     {isCounselor ? '상담사 비밀번호 찾기' : '비밀번호 찾기'}
                  </h2>
                  <p className="txt">
                     비밀번호를 찾으려는 아이디와 휴대폰 번호를 입력해주세요.
                  </p>
               </div>
               <div className="form-wrap account-form-wrap row-group">
                  <div className="form-list row-group">
                     <div className="form-item row-group">
                        <div className="item-default">
                           이메일
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <input
                              onChange={handleChange}
                              value={formData.c_identified}
                              name='c_identified'
                              type="text"
                              className="form-input"
                              placeholder="이메일(아이디)"
                           />
                        </div>
                     </div>
                     <div className="form-item row-group">
                        <div className="item-default">
                           휴대폰 번호
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <div className="form-input-wrap row-group">
                              <div className="form-btn-wrap col-group">
                                 <input
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onWheel={(event) => event.target.blur()}
                                    type="number"
                                    className="form-input"
                                    placeholder="휴대폰 번호"
                                    name="phone"
                                    required={true}
                                 />
                                 <button
                                    onClick={getVerificationCode(
                                       memberType,
                                       verificationStep,
                                       setVerificationStep,
                                       certType,
                                       formData
                                    )}
                                    className={`${currentVerificationStep(verificationStep).className} form-btn`}
                                 >
                                    {currentVerificationStep(verificationStep).text}
                                 </button>
                              </div>

                              {/* 인증번호 받기 버튼 클릭 시 활성화 / 인증 완료 후 숨김 */}
                              <div className={`${verificationStep === 2 ? "" : "hide-g"} form-input-wrap row-group`}>
                                 <div className="form-btn-wrap col-group">
                                    <input
                                       onChange={handleVerificationCode(setVerificationCode)}
                                       value={verificationCode}
                                       type="number"
                                       className="form-input"
                                       placeholder="인증번호"
                                    />
                                    <button
                                       onClick={verifyAuth(memberType, certType, formData, verificationCode, setVerificationStep)}
                                       className={`${verificationCode !== "" ? "" : "disable"} form-btn `}
                                    >
                                       인증확인
                                    </button>
                                 </div>

                                 {/* //인증번호 받기 버튼 클릭 시 활성화 / 인증 완료 후 숨김 */}
                                 <p className="guide-txt red">휴대폰으로 발송된 인증번호를 입력해주세요.</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mp-section-footer border">
                     <button
                        onClick={findPwAuth}
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

export default FindPwComponent