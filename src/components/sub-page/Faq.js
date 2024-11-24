import React, { useEffect } from 'react'
import $ from 'jquery'
import DOMPurify from 'dompurify';

const Faq = ({ data }) => {

   useEffect(() => {
      //자주묻는질문
      $('.q-box').click(function () {
         $(this).parent('.qna-item').toggleClass('active');
      });
   }, [])

   return (
      <div className="container w1280">
         <h3 className="sec-title">
            자주 하는 질문
         </h3>
         <div className="sec-con-wrap">
            <div className="qna-list row-group">
               {data.map((faqInfo, index) => (
                  <div className="qna-item" key={index}>
                     <div className="q-box col-group">
                        <p className="txt">
                           <span className="icon">Q</span>
                           {faqInfo.title}
                        </p>
                        <div className="more-btn">
                           <i className="xi-angle-down"></i>
                        </div>
                     </div>
                     <div className="a-box">
                        <p
                           dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(faqInfo.content) }}
                           className="txt"
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
}

export default Faq