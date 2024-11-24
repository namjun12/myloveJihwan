import DOMPurify from 'dompurify'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// Components
import Loading from '../common/Loading';

// Recoil
import { useRecoilState } from 'recoil';
import { PriceBox, ProductCart, SubmitBtn } from './ProductCart';

// Hooks
import useCart from '../../hooks/product/useCart';

const PurchaseInfo = ({ info, data }) => {
   const cartData = useCart(data ? data : false);

   if (!cartData) return <Loading />

   return (
      <div className="right-con">
         <div className="con-wrap">
            <div className="title-wrap">
               <p className="sub-title green">{info.category}</p>
               <h2 className="title">{data.name}</h2>
               <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content_1) }} className="guide-txt"></p>
            </div>

            <div className="detail-list row-group">
               {info.orderSummary.map((item, index) => (
                  <div className="detail-item col-group" key={index}>
                     <p className={`item-default ${info.orderSummaryWidth === 140 ? "w140" : ""}`}>
                        <i className="icon">{item.icon}</i>
                        {item.title}
                     </p>
                     <p className="item-user">{data[`content_${index + 2}`]}</p>
                  </div>
               ))}
            </div>

            <PriceBox
               cartData={cartData}
               data={data}
            />

            <div className="course-select-container">
               <ProductCart
                  cartData={cartData}
                  data={data}
               />
            </div>
         </div>
         <SubmitBtn
            cartData={cartData}
            data={data}
         />
      </div >
   );
}

export default PurchaseInfo;
