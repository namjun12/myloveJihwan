import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import Cookies from 'js-cookie';

// Images
import { images } from '../../assets/images';
import Loading from '../../components/common/Loading';

const MindInsightTestIndex = () => {

   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const inspectId = searchParams.get('inspect');
   const [loading, setLoading] = useState(true);

   const checkIsTestDone = async () => {

      // inspectId가 없으면 메인으로 돌려보냄
      if (!inspectId) {
         alert('잘못된 접근입니다.')
         navigate('/')
         return;
      }

      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/inspect/insight/check-1`, {
            id: inspectId
         })
         if (response.data.data.is_complete) { // 검사가 완료 되었으면
            alert('검사가 이미 완료 되었습니다.')
            if (response.data.data.is_result_show) { // 그리고 검사 결과를 볼 수 있으면
               navigate('/mind-insight-test/check-results')
            } else {
               navigate('/')
            }
         }
      } catch (error) {
         console.error(error)
         alert(error.response?.data?.msg || '일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
         window.location.href = '/'
      } finally {
         setLoading(false);
      }
   }
   useEffect(() => {
      if (!inspectId) return;

      checkIsTestDone(); // 검사 완료인지 확인 함수 실행
      Cookies.set('inspectId', inspectId, { expires: 1, secure: true, sameSite: 'Strict' }); // 쿠키에 inspectId값 저장
   }, [inspectId])

   if (loading) return <Loading />

   return (
      <main>
         <div className="test-container">
            <div className="container row-group w860">

               <div className="intro-top">
                  <img src={images.intro_top} alt="" />
               </div>
               <div className="intro-content">
                  <div className="title-group row-group">
                     <p className="title green">
                        마인드 인사이트 검사 안내
                     </p>
                     <div className="txt-group row-group">
                        <div className="txt-item col-group">
                           <div className="item-default col-group">
                              <i className="icon"></i>
                              검사구성
                           </div>
                           <div className="item-user">
                              불안검사, 우울검사, 분노검사, 디지털 의존도, 융합역량지능 등
                           </div>
                        </div>
                        <div className="txt-item col-group">
                           <div className="item-default col-group">
                              <i className="icon"></i>
                              검사문항
                           </div>
                           <div className="item-user">
                              총 474문항
                           </div>
                        </div>
                        <div className="txt-item col-group">
                           <div className="item-default col-group">
                              <i className="icon"></i>
                              소요시간
                           </div>
                           <div className="item-user">
                              40~50분
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="sub-txt-group row-group">
                     <p className="sub-txt">
                        검사할 준비가 완료되었다면 아래 '검사시작' 버튼을 눌러 검사를 시작하세요.
                     </p>
                     <p className="sub-txt">
                        검사를 시작하시면 이후 구매하신 상품에 대한 환불이 불가합니다.(추가상품 포함)
                     </p>
                     <p className="sub-txt">
                        반드시 검사자 본인 정보를 입력해주세요. 정보가 일치해야 검사 진행이 가능합니다.
                     </p>
                     <p className="sub-txt">
                        사용하기를 통해 본인이 직접 검사하는 경우 회원가입시 입력한 정보를 입력해 주세요.
                     </p>
                  </div>
                  <div className="form-footer">
                     <Link to="/mind-insight-test/info-input" className="form-footer-btn">검사시작</Link>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}

export default MindInsightTestIndex;