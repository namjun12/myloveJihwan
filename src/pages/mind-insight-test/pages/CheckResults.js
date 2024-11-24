import React, { useEffect, useState } from 'react'
import CommonUi from '../../../components/insight-test/CommonUi'
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';

const Content = () => {

   const [searchParams] = useSearchParams();
   const inspectId = searchParams.get('inspect');
   // 유저 정보
   const [userInfo, setUserInfo] = useState({
      name: '',
      phone: '',
      password: '',
   });

   // 유저정보 업데이트
   const handleChange = (e) => {
      const { name, value } = e.target;

      setUserInfo((prev) => ({
         ...prev,
         [name]: value
      }))
   }

   // 유저정보 검증, pdf주소 가져오기
   const confirmUserInfo = async () => {
      try {
         await axios.post(`${process.env.REACT_APP_API_URL}/inspect/insight/complete/check-1`, {
            id: inspectId
         });
      } catch (error) {
         console.error(error)
         alert(error.response?.data?.msg || '일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
         window.location.href = '/'
      }
   }

   // 결과보기 클릭
   const showResult = async (e) => {
      e.preventDefault(); // 기본 동작 막음

      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/inspect/insight/complete/check-2`, {
            id: inspectId,
            name: userInfo.name,
            phone: userInfo.phone,
            password: userInfo.password,
         });
         window.open(response.data.data, '_blank')
      } catch (error) {
         console.error(error)
         alert(error.response?.data?.msg || '일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
         window.location.href = '/'
      }
   }

   useEffect(() => {
      if (!inspectId) return;

      confirmUserInfo();
   }, [inspectId])

   return (
      <div className="content">
         <div className="content-title-wrap row-group border">
            <h3 className="content-title">
               정보입력
            </h3>
            <div className="sub-txt-group row-group">
               <p className="sub-txt">
                  검사자 본인의 정보를 정확하게 입력해주세요.
               </p>
               <p className="sub-txt">
                  정보가 일치해야 검사 진행이 가능합니다.
               </p>
               <p className="sub-txt">
                  사용하기를 통해 검사하는 경우 회원가입시 입력한 정보를 입력해 주세요.
               </p>
            </div>
         </div>
         <form onSubmit={showResult}>
            {/* <form> */}
            <fieldset>
               <legend className='hide-g'>정보입력</legend>
               <div className="form-wrap row-group">
                  <div className="form-item row-group">
                     <div className="item-default">
                        이름 <span className="red">*</span>
                     </div>
                     <div className="item-user">
                        <input
                           value={userInfo.name}
                           onChange={handleChange}
                           required={true}
                           name='name'
                           type="text"
                           className="form-input"
                           placeholder="이름"
                        />
                     </div>
                  </div>
                  <div className="form-item row-group">
                     <div className="item-default">
                        휴대폰 번호 <span className="red">*</span>
                     </div>
                     <div className="item-user">
                        <input
                           onChange={handleChange}
                           value={userInfo.phone}
                           required={true}
                           name='phone'
                           type="number"
                           className="form-input"
                           placeholder="휴대폰 번호"
                        />
                     </div>
                  </div>
                  <div className="form-item row-group">
                     <div className="item-default">
                        비밀번호 <span className="red">*</span>
                     </div>
                     <div className="item-user">
                        <input
                           onChange={handleChange}
                           value={userInfo.password}
                           required={true}
                           name='password'
                           type="password"
                           className="form-input"
                           placeholder="비밀번호를 입력하세요"
                        />
                     </div>
                  </div>
               </div>
               <div className="form-footer">
                  <button
                     type='submit'
                     className="form-footer-btn"
                  >
                     결과보기
                  </button>
               </div>
            </fieldset>
         </form>
      </div>
   )
}

const CheckResults = () => {
   return (
      <CommonUi
         content={<Content />}
         checkResultsPage={true}
      />
   )
}

export default CheckResults