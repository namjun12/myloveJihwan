import axios from "axios";

// 휴대폰 번호를 입력했을 때만 step1로 변경
export const inputPhoneNum = (formData, setVerificationStep) => {
   if (formData.phone !== '') {
      setVerificationStep(1)
   } else {
      setVerificationStep(0)
   }
}

// 현재 step에 맞는 class명과 text
export const currentVerificationStep = (verificationStep) => {
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


// 휴대폰 인증번호 전송 API
export const getVerificationCode = (memberType, verificationStep, setVerificationStep, certType, formData) => async () => {
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
export const verifyAuth = (memberType, certType, formData, verificationCode, setVerificationStep) => async () => {
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
export const handleVerificationCode = (setVerificationCode) => (e) => {
   setVerificationCode(e.target.value)
}