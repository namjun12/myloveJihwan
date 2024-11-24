import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

// Components
import TermsOfUse from '../TermsOfUse';

const IndividaulForm = ({ isSocial }) => {

   const navigate = useNavigate();
   const [searchParams] = useSearchParams();

   const [formData, setFormData] = useState({
      // social_token: '',
      identified: '',
      // password: '',
      name: '',
      phone: '',
      marketing: 0,
      marketing_type: '',
      ...(isSocial ? { social_token: '' } : { password: "" })
   })

   // 이용약관 필수 항목 체크 여부 확인
   const [isrequiredChecked, setIsrequiredChecked] = useState(false)

   // 이메일, 네이버, 카카오 로그인 구분
   const socialType = searchParams.get('social_type');
   let socialTypeInfo = socialType ? socialType : 0;

   // 소셜 로그인 시 자동입력
   const socialToken = searchParams.get('social_token');
   const email = searchParams.get('email');
   const phone = searchParams.get('phone');
   const name = searchParams.get('name');

   useEffect(() => {
      if (socialToken && email && phone && name) {
         setFormData(({ prev }) => ({
            ...prev,
            social_token: socialToken,
            identified: email,
            phone: phone,
            name: name
         }));
      }
   }, [])


   const handleChange = (e) => {
      const { name, value } = e.target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   // 비밀번호 재확인 
   const [matchingPw, setMatchingPw] = useState(false);
   const handleCheckPw = (e) => {
      if (formData.password === e.target.value) {
         setMatchingPw(true)
      } else {
         setMatchingPw(false)
      }
   }

   // 회원가입 데이터 전송
   const SendData = async () => {

      // 비밀번호 확인이 일치하지 않으면 종료
      if (!isSocial && !matchingPw) {
         alert('비밀번호가 일치하지 않습니다.')
         return;
      };

      // 이용약관 필수 항목에 동의하지 않았으면 종료
      if (isrequiredChecked === false) {
         alert('이용약관 필수 항목에 동의해주세요.')
         return;
      }

      // ===== 이용약관 데이터 저장 =====
      const optionEls = document.querySelectorAll('.marketing-option')
      const optionChecked = []

      optionEls.forEach((optionEl) => {
         if (optionEl.checked) {
            optionChecked.push(optionEl.name)
         }
      })
      // optionChecked 배열을 문자열로 변환
      const optionCheckedString = optionChecked.join('&nbsp;')

      // 마케팅 동의 여부
      const marketingCheckEl = document.querySelector('.marketing-agreement')
      const marketingAgreement = marketingCheckEl.checked ? 1 : 0

      // =====- 최종 폼데이터 =====-
      // proveArr가 포함된 최종 formData 객체 생성
      const updatedFormData = {
         ...formData,
         marketing: marketingAgreement,
         marketing_type: optionCheckedString
      };

      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/join/${socialTypeInfo}/email`, updatedFormData)
         alert(response.data.msg)
         if (response.status === 200) {
            // navigate('/join/done');
            navigate('/');
         }
      } catch (error) {
         console.error(error)
         alert(error.response.data.msg)
      }
   }

   // 휴대폰 인증
   const memberType = 0; // 일반인 0, 상담사 1
   const certType = isSocial ? 1 : 0;
   const [verificationStep, setVerificationStep] = useState(0);

   // 휴대폰 번호를 입력했을 때만 step1로 변경
   useEffect(() => {
      if (formData.phone !== '') {
         setVerificationStep(1)
      } else {
         setVerificationStep(0)
      }
   }, [formData.phone])

   // 현재 step에 맞는 class명과 text
   const currentVerificationStep = () => {
      if (verificationStep === 0) {
         return { className: 'disable', text: '인증번호 받기' }
      } else if (verificationStep === 1) {
         return { className: '', text: '인증번호 받기' }
      } else if (verificationStep === 2) {
         return { className: 'black', text: '인증번호 재발송' }
      } else if (verificationStep === 3) {
         return { className: 'gray', text: '인증완료' }
      }
   }

   // 인증번호
   const [verificationCode, setVerificationCode] = useState('')

   // 휴대폰 인증번호 전송 API
   const getVerificationCode = async () => {
      if (verificationStep === 0 || verificationStep === 3) return;
      try {
         await axios.post(`${process.env.REACT_APP_API_URL}/send/cert/${memberType}/${certType}`, { phone: formData.phone })
         setVerificationStep(2)
      } catch (error) {
         console.error(error)
         alert(error.response.data.msg)
      }
   }
   // 휴대폰 인증번호 확인 API
   const verifyAuth = async () => {
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/check/cert/${memberType}/${certType}`, { phone: formData.phone, cert_code: verificationCode })
         if (response.status === 200) {
            setVerificationStep(3)
         }
      } catch (error) {
         console.error(error)
         alert(error.response.data.msg)
      }
   }

   // 인증번호 입력시 값 변경
   const handleVerificationCode = (e) => {
      setVerificationCode(e.target.value)
   }

   return (
      <div className="subpage">
         <section className="user-section">
            <div className="user-wrap">
               <div className="title-wrap row-group">
                  <h2 className="title">
                     회원가입
                  </h2>
                  <p className="txt">
                     마인드 인사이트를 통해 진정한 '나'를 발견하세요.
                  </p>
               </div>
               <div className="guide-txt">
                  <span className="red">*</span> 표시는 필수입력 항목입니다.
               </div>
               <div className="form-wrap account-form-wrap row-group">
                  <div className="form-list row-group border">
                     <div className="form-item row-group">
                        <div className="item-default">
                           이메일
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <input
                              onChange={handleChange}
                              value={formData.identified}
                              type="text"
                              className="form-input"
                              name='identified'
                              placeholder='이메일(아이디)'
                              required={true}
                           />
                        </div>
                     </div>
                     {isSocial ? (
                        ''
                     ) : (
                        <div className="form-item row-group">
                           <div className="item-default">
                              비밀번호
                              <span className="red">*</span>
                           </div>
                           <div className="item-user">
                              <div className="form-input-wrap row-group">
                                 <input
                                    onChange={handleChange}
                                    type="password"
                                    className="form-input"
                                    placeholder="비밀번호"
                                    name='password'
                                    required={true}
                                 />
                                 <input
                                    onChange={handleCheckPw}
                                    type="password"
                                    className="form-input"
                                    placeholder="비밀번호 재확인"
                                 />
                                 <p className={`${matchingPw ? '' : 'hide-g'} guide-txt blue`}>
                                    비밀번호가 일치합니다.
                                 </p>
                                 <p className={`${matchingPw ? 'hide-g' : ''} guide-txt red`}>
                                    비밀번호가 일치하지 않습니다.
                                 </p>
                              </div>
                           </div>
                        </div>
                     )}
                     <div className="form-item row-group">
                        <div className="item-default">
                           이름
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <input
                              onChange={handleChange}
                              value={formData.name}
                              type="text"
                              className="form-input"
                              placeholder="이름"
                              name='name'
                              required={true}
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
                                    onWheel={event => (event.target).blur()}
                                    type="number"
                                    className="form-input"
                                    placeholder="휴대폰 번호"
                                    name='phone'
                                    required={true}
                                 />
                                 <button
                                    onClick={getVerificationCode}
                                    className={`${currentVerificationStep().className} form-btn`}
                                 >
                                    {currentVerificationStep().text}
                                 </button>
                              </div>

                              {/* 인증번호 받기 버튼 클릭 시 활성화 / 인증 완료 후 숨김 */}
                              <div className={`${verificationStep === 2 ? '' : 'hide-g'} form-input-wrap row-group`}>
                                 <div className="form-btn-wrap col-group">
                                    <input
                                       onChange={handleVerificationCode}
                                       value={verificationCode}
                                       type="number"
                                       className="form-input"
                                       placeholder="인증번호"
                                    />
                                    <button
                                       onClick={verifyAuth}
                                       className={`${verificationCode !== '' ? '' : 'disable'} form-btn `}
                                    >
                                       인증확인
                                    </button>
                                 </div>

                                 {/* //인증번호 받기 버튼 클릭 시 활성화 / 인증 완료 후 숨김 */}
                                 <p className="guide-txt red">
                                    휴대폰으로 발송된 인증번호를 입력해주세요.
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <TermsOfUse setIsrequiredChecked={setIsrequiredChecked} />
                  <div className="mp-section-footer border">
                     <button
                        onClick={() => { SendData() }}
                        className="form-footer-btn"
                     >
                        회원가입
                     </button>
                  </div>
               </div>
            </div >
         </section >
      </div >
   )
}

export default IndividaulForm