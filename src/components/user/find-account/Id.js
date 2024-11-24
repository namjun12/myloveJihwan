import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Hooks
import { inputPhoneNum, currentVerificationStep, getVerificationCode, verifyAuth, handleVerificationCode } from '../../../hooks/VerificationCode';
import axios from 'axios';

const Id = ({ isCounselor }) => {

   const navigate = useNavigate();

   // 휴대폰 인증
   const memberType = isCounselor ? 1 : 0 // 0: 일반 | 1: 상담사
   const certType = 2 // id 찾기
   const [formData, setFormData] = useState({ phone: '' })
   const [verificationStep, setVerificationStep] = useState(0);

   // 인증번호
   const [verificationCode, setVerificationCode] = useState("");

   // input 입력 시 formData에 저장
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   // 휴대폰 번호를 입력했을 때만 step1로 변경
   useEffect(() => {
      inputPhoneNum(formData, setVerificationStep);
   }, [formData.phone])


   const fetchFindId = async () => {
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/find/${memberType}/id`, { phone: formData.phone })
         if (response.status === 200) {
            alert('아이디 찾기에 성공했습니다.')
            navigate(`/find-account/id-done?name=${response.data.data.name}&email=${response.data.data.email}`)
         } else {
            alert('일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
            window.location.reload()
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
                     {isCounselor ? '상담사 아이디 찾기' : '아이디 찾기'}
                  </h2>
                  <p className="txt">
                     가입시 등록하신 휴대폰 번호를 입력해주세요.
                  </p>
               </div>
               <div className="form-wrap account-form-wrap row-group">
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
                  <div className="mp-section-footer border">
                     <button
                        onClick={fetchFindId}
                        className="form-footer-btn"
                     >
                        다음
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default Id