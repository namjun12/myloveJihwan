import React from 'react'

// Components
import LoginForm from '../../../components/user/LoginForm'

const LoginGeneralUser = () => {
   return (
      // isCounselor: 일반 0, 상담사 1
      <LoginForm isCounselor={0} />
   )
}

export default LoginGeneralUser