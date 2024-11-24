import React, { useState } from 'react'

// Components
import { PriceBox, ProductCart, SubmitBtn } from './ProductCart';
import Loading from '../common/Loading';

// Hooks
import useCart from '../../hooks/product/useCart';

const FixedCart = ({ isFixed, info, data }) => {

   const [isVisible, setIsVisible] = useState(true);
   const cartData = useCart(data ? data : false);

   const [isActive, setIsActive] = useState(false);

   const handleVisible = () => {
      setIsVisible(prev => !prev);
      setIsActive(false);
   }

   if (!cartData) return <Loading />

   return (
      <div className={`right fixed ${isFixed ? "active" : ""} ${!isVisible ? "close" : ""}`}>
         <div className="right-con">
            <div className={`${isActive ? 'active' : ''} con-wrap`}>
               <div
                  onClick={() => { handleVisible() }}
                  className="course-toggle-btn"
               >
                  <i></i>
               </div>
               <div className="title-wrap">
                  <p className="sub-title green">{info.category}</p>
                  <h2 className="title">{data.name}</h2>
               </div>
               <PriceBox
                  cartData={cartData}
                  data={data}
               />
               <ProductCart
                  cartData={cartData}
                  data={data}
               />
            </div>
            <SubmitBtn
               cartData={cartData}
               data={data}
               isActive={isActive}
               setIsActive={setIsActive}
            />
         </div>
      </div>
   )
}

export default FixedCart