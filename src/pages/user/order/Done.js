import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import AccessToken from '../../../hooks/token/AccessToken';
import { useRecoilValue } from 'recoil';
import { LoginInfoAtom } from '../../../recoil/LoginInfoAtom';
import Loading from '../../../components/common/Loading';

const OrderDone = () => {

   const navigate = useNavigate();
   const [searchParams] = useSearchParams();
   const accessToken = AccessToken();
   const [loading, setLoading] = useState(true);

   const merchant_uid = searchParams.get('merchant_uid');

   // 유저 정보
   const LoginInfoAtomValue = useRecoilValue(LoginInfoAtom);

   useEffect(() => {
      if (!merchant_uid || !accessToken) return;

      // 결제가 됐는지 확인 (수량이 1개 일 때 2명이 동시에 구매하면 환불 되는 등의 경우 대비)
      const isComplete = async () => {
         try {
            await axios.post(`${process.env.REACT_APP_API_URL}/product/payment/complete`, {
               merchant_uid: merchant_uid
            }, {
               headers: {
                  Authorization: `Bearer ${accessToken}`
               }
            });
            setLoading(false);
         } catch (error) {
            console.error(error);
            alert(error.response?.data?.msg || "결제 완료 처리에 실패했습니다.");
            navigate('/')
         }
      };

      isComplete();
   }, [merchant_uid, accessToken]);

   if (loading || !LoginInfoAtomValue) return <Loading />

   return (
      <div className="subpage order">
         <div className="routeBox">
            <div className="container">
               <div className="le-wrap">
                  <i className="icon"></i>
                  <p className="title">결제완료</p>
               </div>
               <div className="ri-wrap">
                  <p className="route-title">장바구니</p>
                  <i className="route-icon"></i>
                  <p className="route-title">주문/결제</p>
                  <i className="route-icon"></i>
                  <p className="route-title now">완료</p>
               </div>
            </div>
         </div>
         <section className="user-section">
            <div className="container">
               <div className="result-wrap">
                  <div className="result-inner">
                     <i className="icon green"></i>
                     <p className="result-title">
                        <span className="green">결제</span>가 완료되었습니다. 감사합니다.
                     </p>
                     <div className="sub-wrap">
                        <p className="sub">
                           마인드 인사이트는 심리검사 상품으로 구매 후 직접 사용하거나 마이페이지에서 선물하기가 가능합니다. <br />
                           자세한 내용은 <a href="" className="link">자주 하는 질문</a>을 확인해 주세요.
                        </p>
                     </div>
                  </div>
                  <div className="btn-wrap col-group">
                     <Link to="/" className="btn">메인 화면으로</Link>
                     <Link
                        to={`${LoginInfoAtomValue.member_type === 0 ? '/my-page/general-user/code-use-gift' : '/my-page/counselor/code-send'}`}
                        className="btn green"
                     >
                        검사코드 사용하기
                     </Link>
                  </div>
               </div>
            </div>
         </section>
      </div>
   )
}

export default OrderDone