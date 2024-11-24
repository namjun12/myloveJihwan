import React from 'react'

const UseOrGiftHistory = () => {
   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap col-group">
            <h2 className="mp-main-title">
               <span className="mb">My 정보 <i></i></span>
               사용/선물 내역
            </h2>
            <div className="search-wrap">
               <input type="text" className="search-input" placeholder="이름을 입력하세요" />
               <button className="search-btn">
                  <i></i>
               </button>
            </div>
         </div>

         <div className="table-wrap list-table-wrap">
            <table>
               <colgroup>
                  <col width="6%" />
                  <col width="8%" />
                  <col width="12%" />
                  <col width="20%" />
                  <col width="40%" />
                  <col width="14%" />
               </colgroup>
               <thead>
                  <tr>
                     <th className="left">구분</th>
                     <th className="left">이름</th>
                     <th className="left">연락처</th>
                     <th className="left">이메일</th>
                     <th className="left">상품명</th>
                     <th className="left">발송일자</th>
                  </tr>
               </thead>
               <tbody>
                  <tr>
                     <td colSpan="6">
                        <div className="null-txt row-group">
                           <i className="icon"></i>
                           내용이 존재하지 않습니다.
                        </div>
                     </td>
                  </tr>
                  <tr>
                     <td>
                        사용
                     </td>
                     <td>
                        홍길동
                     </td>
                     <td>
                        01012341234
                     </td>
                     <td>
                        email123543@email.com
                     </td>
                     <td>
                        마인드 인사이트 + 해석상담
                     </td>
                     <td>
                        2024.12.12 16:00
                     </td>
                  </tr>
                  <tr>
                     <td>
                        선물
                     </td>
                     <td>
                        김지은
                     </td>
                     <td>
                        01012341234
                     </td>
                     <td>
                        email123543@email.com
                     </td>
                     <td>
                        마인드 인사이트+마인드 리포트(책)+해석상담
                     </td>
                     <td>
                        9999.99.99 99:99
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>

         <div id="pagination"></div>
      </div>
   )
}

export default UseOrGiftHistory