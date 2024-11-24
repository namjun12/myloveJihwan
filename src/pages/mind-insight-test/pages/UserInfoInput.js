import React, { useEffect, useState } from 'react'
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

// Components
import CommonUi from '../../../components/insight-test/CommonUi';

const Content = () => {

   const navigate = useNavigate();

   // 생년월일을 한국 나이로 계산
   const [koreanAge, setKoreanAge] = useState(0);

   // inspectId 값
   const [inspectId, setInspectId] = useState('');

   // 유저 정보
   const [userInfo, setUserInfo] = useState({
      name: '',
      phone: '',
      birth: '',
      address: '',
      agreement: false,
   });

   // 상세 주소 정보
   const [addressDetail, setAddressDetail] = useState('');

   // 다음 주소 찾기 팝업
   const [daumPostIsVisible, setDaumPostIsVisible] = useState(false);

   // 개인정보 모달
   const [isVisiblePrivacy, setIsVisiblePrivacy] = useState(false);

   // 유저 정보 업데이트
   const handleChange = (e) => {
      const { name, value, checked } = e.target;

      // 상세주소 일 때 상세주소 useState를 수정
      if (name === 'address-detail') {
         setAddressDetail(value)
      } else {
         setUserInfo((prev) => ({
            ...prev,
            [name]: value
         }))
      }

      // 개인정보 수집 동의일 때 agreement값을 1또는 0으로
      if (name === 'agreement') {
         setUserInfo((prev) => ({
            ...prev,
            agreement: checked // ? 1 : 0
         }))
      }

      // 생년월일 일 때 생일 계산
      if (name === 'birth') {
         const selectedDate = new Date(value);

         const today = new Date();
         const currentYear = today.getFullYear();
         const birthYear = selectedDate.getFullYear();

         // 한국식 나이 계산 (태어난 해 기준 1살로 시작)
         const calculatedKoreanAge = currentYear - birthYear + 1;
         setKoreanAge(calculatedKoreanAge);
      }
   }

   // 다음 주소 찾기 클릭
   const openDaumPost = () => {
      setDaumPostIsVisible(true)
   }

   // ===== 유저 정보 데이터 관련 =====
   // 쿠키 값 암호화 
   const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

   const encrypt = (text) => {
      return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
   };

   // 데이터 쿠키에 저장
   const sendUserInfo = (e) => {
      e.preventDefault(); // 기본 동작 막음

      if (userInfo.address === '' || addressDetail === '') {
         alert('주소를 입력해 주세요.')
         return;
      }
      if (!userInfo.agreement) {
         alert('개인정보수집 및 이용에 동의해 주세요.')
         return;
      }

      const updateData = { ...userInfo }
      updateData.address = updateData.address + addressDetail // 기본 주소에 상세 주소 추가

      // 쿠키에 저장하는 함수 추가
      const saveUserInfoToCookie = () => {
         const encryptedName = encrypt(JSON.stringify({ name: updateData.name, phone: updateData.phone, age: koreanAge })); // 암호화
         Cookies.set('userData', encryptedName)
      }

      const confirmUserInfo = async () => {
         try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/inspect/insight/check-2`, {
               id: Number(inspectId),
               name: updateData.name,
               phone: updateData.phone,
               birth: updateData.birth,
               addr: updateData.address,
            })
            alert('정보가 확인 되었습니다.')
            // 쿠키에 진행률 추가
            Cookies.set('currentProgress', response.data.data)
            if (response.data.data === 0) {
               navigate('/mind-insight-test/guide')
            } else {
               navigate('/mind-insight-test/enter-answer')
            }
         } catch (error) {
            console.error(error)
            if (error.response?.data?.msg === '데이터(id)은(는) 필수값입니다.') {
               alert('비정상적인 접근입니다. 전달받은 알림 톡을 통해 접속해 주세요')
            } else {
               alert(error.response?.data?.msg || '일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
            }

            return;
         }
      }
      saveUserInfoToCookie();
      confirmUserInfo();
   }

   useEffect(() => {
      if (!Cookies) return;

      const inspectValue = Cookies.get('inspectId')
      setInspectId(inspectValue)

   }, [Cookies])

   return (
      <>
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
            <form onSubmit={sendUserInfo}>
               <fieldset>
                  <legend className='hide-g'>정보입력</legend>
                  <div className="form-wrap row-group">
                     <div className="form-item row-group">
                        <div className="item-default">
                           이름 <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <input
                              onChange={handleChange}
                              value={userInfo.name}
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
                           생년월일 <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <div className="form-input-wrap col-group">
                              <input
                                 onChange={handleChange}
                                 value={userInfo.birth}
                                 required={true}
                                 name='birth'
                                 type="date"
                                 className="form-date form-input"
                              />
                              <span className="green">&#40;{koreanAge}세&#41;</span>
                           </div>
                        </div>
                     </div>
                     <div className="form-item row-group">
                        <div className="item-default">
                           주소 <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <div className="form-btn-wrap col-group">
                              <input
                                 value={userInfo.address}
                                 required={true}
                                 readOnly={true}
                                 type="text"
                                 className="form-input"
                                 placeholder="주소"
                              />
                              <button
                                 onClick={openDaumPost}
                                 type='button'
                                 className="form-btn"
                              >
                                 주소 검색
                              </button>
                           </div>
                           <input
                              onChange={handleChange}
                              value={addressDetail}
                              name='address-detail'
                              type="text"
                              className="address-detail form-input"
                              placeholder='상세주소 입력'
                           />
                        </div>
                     </div>
                     <div className="form-item">
                        <div className="join-agree-item join-agree-item-all col-group">
                           <label htmlFor="agree_0">
                              <input
                                 onChange={handleChange}
                                 checked={userInfo.agreement}
                                 name='agreement'
                                 type="checkbox"
                                 className="form-checkbox"
                                 id="agree_0"
                              />
                              <div className="checked-item col-group">
                                 <div className="icon">
                                    <i className="xi-check"></i>
                                 </div>
                                 <p className="txt">
                                    개인정보수집 및 이용에 동의하시겠습니까?
                                 </p>
                              </div>
                           </label>
                           <button
                              onClick={() => setIsVisiblePrivacy(prev => !prev)}
                              type='button'
                              className="more-btn"
                           >
                              보기
                           </button>
                        </div>
                     </div>
                  </div>
                  <div className="form-footer">
                     <button
                        type='submit'
                        className="form-footer-btn"
                     >
                        다음
                     </button>
                  </div>
               </fieldset>
            </form>
         </div>
         <DaumPostModal
            daumPostIsVisible={daumPostIsVisible}
            setDaumPostIsVisible={setDaumPostIsVisible}
            setUserInfo={setUserInfo}
         />
         <PrivacyModal
            isVisiblePrivacy={isVisiblePrivacy}
            setIsVisiblePrivacy={setIsVisiblePrivacy}
         />
      </>
   )
}

// 주소찾기 팝업
const DaumPostModal = ({ daumPostIsVisible, setDaumPostIsVisible, setUserInfo }) => {
   // 주소 찾기 완료 됐을 때
   const onCompleteMap = (data) => {
      setDaumPostIsVisible(false)
      setUserInfo((prev) => ({
         ...prev,
         address: `${data.address}(${data.zonecode}) `
      }))
   }

   if (!daumPostIsVisible) return;

   return (
      <div id='daum-post-modal-wrap'>
         <div className='daum-post-wrap'>
            <button className='btn-close-modal' onClick={() => setDaumPostIsVisible(false)} >
               <i className='xi-close icon'></i>
            </button>
            <DaumPostcode
               className='daum-post'
               onComplete={onCompleteMap}
            />
         </div>
      </div>
   )
}

// 개인정보수집 및 이용 동의 보기 버튼 클릭 시 나타나는 팝업
export const PrivacyModal = ({ isVisiblePrivacy, setIsVisiblePrivacy }) => {

   if (!isVisiblePrivacy) return;

   return (
      <div className="modal-container">
         <div className="modal-wrap">
            <i onClick={() => setIsVisiblePrivacy(prev => !prev)} className="close-btn pc xi-close" />
            <i onClick={() => setIsVisiblePrivacy(prev => !prev)} className="close-btn mb xi-close" />
            <div className="modal-title-wrap">
               <p className="modal-title">
                  개인정보수집 및 이용 동의
               </p>
            </div>

            <div className="modal-table-wrap">
               <table>
                  <thead>
                     <tr>
                        <th>수집항목</th>
                        <th>수집목적</th>
                        <th>보유·이용기간</th>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>이름, 전화번호, 생년월일</td>
                        <td>회원식별</td>
                        <td>관련 법령에 따름</td>
                     </tr>
                     <tr>
                        <td>주소</td>
                        <td>상품배송</td>
                        <td>관련 법령에 따름</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <div className="modal-alert-txt">
               귀하는 위와 같이 개인정보를 수집•이용하는데 동의를 거부할 권리가 있습니다.  <br />
               필수 수집 항목에 대한 동의를 거절하는 경우 서비스 이용이 제한 될 수 있습니다.  <br />
               선택 수집 항목에 동의를 하지 않으시는 경우 별도의 불이익은 없습니다.
            </div>
         </div>
      </div >
   )
}

const UserInfoInput = () => {

   return (
      <CommonUi
         mainStep={0}
         content={<Content />}
      />
   )
}

export default UserInfoInput