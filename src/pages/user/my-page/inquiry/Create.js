import React from 'react'

const InquiryCreate = () => {
   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap border">
            <h2 className="mp-main-title">
               1:1 문의 등록
            </h2>
         </div>

         <div className="form-wrap row-group">
            <div className="form-item row-group">
               <div className="item-default">
                  제목
                  <span className="red">*</span>
               </div>
               <div className="item-user">
                  <input type="text" className="form-input" placeholder="제목" />
               </div>
            </div>
            <div className="form-item row-group">
               <div className="item-default">
                  내용
                  <span className="red">*</span>
               </div>
               <div className="item-user">
                  <div className="form-textarea-wrap">
                     <textarea name="" id="" className="form-textarea" placeholder="문의 내용을 입력해 주세요."></textarea>
                     <div className="sticker">
                        <strong>0</strong> / 2000
                     </div>
                  </div>

               </div>
            </div>
            <div className="form-item row-group">
               <div className="item-default">
                  파일첨부
               </div>
               <div className="item-user">
                  <div className="file-upload-wrap single col-group">
                     <input type="file" id="list_file" accept="image/*" />
                     <input type="text" className="form-input" placeholder="5MB이하" readonly="" />
                     <label className="file-upload-btn" htmlfor="list_file">
                        파일 업로드
                     </label>
                  </div>
               </div>
            </div>
            <div className="mp-section-footer border">
               <button className="mp-footer-btn green">문의등록</button>
            </div>
         </div>
      </div>
   )
}

export default InquiryCreate