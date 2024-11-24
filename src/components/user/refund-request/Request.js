import React from 'react'

const Request = ({requestPopupIndex, setRequestPopupIndex}) => {

   if (!requestPopupIndex) return;

   return (
      <div className="modal-container">
         <div className="modal-wrap">
            <i onClick={() => setRequestPopupIndex(false)} className="close-btn pc"></i>
            <i onClick={() => setRequestPopupIndex(false)} className="close-btn mb"></i>
            <div className="modal-title-wrap center border">
               <p className="modal-title">
                  환불요청
               </p>
            </div>
            <div className="refund-modal-content">
               <div className="form-wrap">
                  <div className="form-list border">
                     <div className="prod-table-item col-group">
                        <div className="img-box">
                           <img src="images/mainbanner.jpg" alt="" />
                        </div>
                        <div className="txt-wrap row-group">
                           <div className="title-group row-group">
                              <p className="prod-item-label">
                                 Mind Insight
                              </p>
                              <p className="prod-item-title">
                                 마인드 인사이트
                              </p>
                           </div>
                           <div className="title-group row-group">
                              <p className="prod-table-item-option">
                                 옵션 : 마인드 인사이트 + 마인드 리포트
                              </p>
                              <p className="prod-table-item-option">
                                 수량 : 4
                              </p>
                              <p className="prod-table-item-option">
                                 <strong className="red">환불가능수량 : 2</strong>
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="form-item row-group">
                     <div className="item-default">
                        어떤 문제가 있나요?
                     </div>
                     <div className="item-user">
                        <div className="form-textarea-wrap">
                           <textarea name="" id="" className="form-textarea h200" placeholder="환불사유를 입력해 주세요"></textarea>
                           <div className="sticker">
                              <span>0</span>/200
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="modal-footer">
               <button className="modal-footer-btn wide green">환불요청</button>
            </div>
         </div>
      </div>
   )
}

export default Request