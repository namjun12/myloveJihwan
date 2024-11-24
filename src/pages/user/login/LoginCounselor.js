import React from 'react'

// Components
import LoginForm from '../../../components/user/LoginForm'

const LoginCounselor = () => {
   return (
      // isCounselor: 일반 0, 상담사 1
      <LoginForm isCounselor={1} />
   )
}

export default LoginCounselor