import React from 'react'

const InquiryDetail = () => {
   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap border">
            <h2 className="mp-main-title">
               1:1 문의 상세
            </h2>
         </div>
         <div className="inquiry-detail">
            <div className="inquiry-detail-que">
               <div className="inquiry-detail-title-wrap row-group">
                  <div className="title-group col-group">
                     <p className="state complete"> {/* 답변 완료 시 complete 클래스 추가 */}
                        답변완료
                     </p>
                     <p className="date">
                        2024.01.01 오전 09:00
                     </p>
                  </div>
                  <p className="inquiry-detail-title">
                     아크릴+알류미늄 소재 거치대 제조 가능한 공장을 찾고 있습니다.
                  </p>
               </div>
               <div className="inquiry-detail-txt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
               </div>
               <div className="file-download-group row-group">
                  <a href="" download="" className="file-download-wrap col-group">
                     <i className="xi-folder-open icon"></i>
                     <p className="file-title">
                        2. 제출서류.hwp
                     </p>
                     <i className="xi-download icon"></i>
                  </a>
                  <a href="" download="" className="file-download-wrap col-group">
                     <i className="xi-folder-open icon"></i>
                     <p className="file-title">
                        1. 참가기업 모집공고 및 프로그램 설명문_기획 및 컨설팅 (1).hwp
                     </p>
                     <i className="xi-download icon"></i>
                  </a>
               </div>
            </div>
            <div className="inquiry-detail-ans">
               <i className="icon xi-subdirectory-arrow"></i>
               <p className="inquiry-detail-title">
                  공장서치 고객센터
               </p>
               <div className="inquiry-detail-txt">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                  ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                  cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                  <p className="inquiry-detail-date">
                     2024.01.01 오전 09:00
                  </p>
               </div>

            </div>
         </div>
      </div>
   )
}

export default InquiryDetail