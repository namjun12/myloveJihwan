import React from 'react'
import Pagination from '../../../../components/common/Pagination'
import { Link } from 'react-router-dom'

const Inquiry = () => {
   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap col-group">
            <h2 className="mp-main-title">
               1:1 문의
               <p className="mp-main-sub-title">
                  마인드임팩트에 궁금한 점이 있으신가요? 오른쪽 '문의등록' 버튼을 눌러 문의 내용을 등록해 주세요.
               </p>
            </h2>
         </div>

         <div className="table-wrap inquiry-table-wrap">
            <table>
               <colgroup>
                  <col width="10%" />
                  <col width="75%" />
                  <col width="15%" />
               </colgroup>
               <thead>
                  <th className="left">
                     상태
                  </th>
                  <th className="left">
                     제목
                  </th>
                  <th className="left">
                     등록일자
                  </th>
               </thead>
               <tbody>
                  <tr>
                     <td colspan="3">
                        <Link to="/my-page/inquiry/1" className="inquiry-table-item col-group">
                           <div className="state">
                              <strong className="red">
                                 답변대기
                              </strong>
                           </div>
                           <div className="title">
                              1:1 문의 제목이 들어가는 자리입니다.
                           </div>
                           <div className="date">
                              2024.12.12 16:00
                           </div>
                        </Link>
                     </td>
                  </tr>
                  <tr>
                     <td colspan="3">
                        <Link to="/my-page/inquiry/1" className="inquiry-table-item col-group">
                           <div className="state">
                              <strong className="blue">
                                 답변완료
                              </strong>
                           </div>
                           <div className="title">
                              1:1 문의 제목이 들어가는 자리입니다.
                           </div>
                           <div className="date">
                              2024.12.12 16:00
                           </div>
                        </Link>
                     </td>
                  </tr>
               </tbody>
            </table>
            <Link to="/my-page/inquiry/create" className="mp-footer-btn mp-inquiry-btn green">
               문의등록
            </Link>
         </div>

         <Pagination />
      </div>
   )
}

export default Inquiry