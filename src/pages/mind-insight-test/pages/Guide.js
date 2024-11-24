import React, { useEffect } from 'react'
import CommonUi from '../../../components/insight-test/CommonUi'
import { Link } from 'react-router-dom'
import CryptoJS from 'crypto-js'
import Cookies from 'js-cookie'

const Content = () => {

   return (
      <div className="content">
         <div className="content-section border">
            <div className="content-title-wrap row-group">
               <h3 className="content-title">
                  작성방법
               </h3>
               <p className="content-title-txt">
                  각 문항에 대한 답지는 5개로 되어 있습니다. <br />
                  5개답지 중 지난 한 달 동안 자신을 가장 잘 설명하는 1개를 선택하십시오.
               </p>
            </div>
            <div className="question active"> {/* 답변한 항목 - prev , 답변할 항목 - active, 그 외 항목은 클래스 삭제 */}
               <div className="example-label">
                  예시
               </div>
               <div className="q_title">
                  <div className="num">01.</div>
                  <div className="title">
                     몸이 저리고 쑤시며 감각이 마비된 느낌을 받는다.
                  </div>
               </div>
               <div className="q_item">
                  <label htmlFor="example_0" className="score">
                     <input type="radio" id="example_0" name="example" value="0" />
                     <div className="check">
                        <div className="num">0</div>
                        <div className="txt">매우 아니다</div>
                     </div>
                  </label>
                  <label htmlFor="example_1" className="score">
                     <input type="radio" id="example_1" name="example" value="0" />
                     <div className="check">
                        <div className="num">1</div>
                        <div className="txt">약간 아니다</div>
                     </div>
                  </label>
                  <label htmlFor="example_2" className="score">
                     <input type="radio" id="example_2" name="example" value="0" />
                     <div className="check">
                        <div className="num">2</div>
                        <div className="txt">보통</div>
                     </div>
                  </label>
                  <label htmlFor="example_3" className="score">
                     <input type="radio" id="example_3" name="example" value="0" />
                     <div className="check">
                        <div className="num">3</div>
                        <div className="txt">약간 그렇다</div>
                     </div>
                  </label>
                  <label htmlFor="example_4" className="score">
                     <input type="radio" id="example_4" name="example" value="0" />
                     <div className="check">
                        <div className="num">4</div>
                        <div className="txt">매우 그렇다</div>
                     </div>
                  </label>
               </div>
            </div>
         </div>
         <div className="content-section">
            <div className="content-title-wrap row-group">
               <h3 className="content-title">
                  검사실시 안내
               </h3>
               <p className="content-title-txt">
                  본 검사는 개인의 성격적 특성을 알아보기 위한 것으로 맞는 답과 틀린 답이 없습니다. <br />
                  자신에게 더 편안하고 익숙한 답을 선택해주세요.
               </p>
            </div>
            <div className="guide-txt-list row-group">
               <div className="guide-txt col-group">
                  <div className="num">1</div>
                  <p className="txt">
                     본 검사는 개인의 성격적 특성을 알아보기 위한 것으로 자신이 맞다고 생각하는 답에 응답해주세요.
                  </p>
               </div>
               <div className="guide-txt col-group">
                  <div className="num">2</div>
                  <p className="txt">
                     평소 생각이나 행동 등 자신에게 더 편안하고 익숙한 것에 응답해주세요.
                  </p>
               </div>
               <div className="guide-txt col-group">
                  <div className="num">3</div>
                  <p className="txt">
                     시간제한은 없으나 너무 깊이 생각하지 말고 편안하게 응답해주세요.
                  </p>
               </div>
               <div className="guide-txt col-group">
                  <div className="num">4</div>
                  <p className="txt">
                     한 문항도 빠짐없이 모든 문항에 응답해주세요.
                  </p>
               </div>
            </div>
         </div>
         <div className="form-footer">
            <Link to="/mind-insight-test/enter-answer" className="form-footer-btn">
               검사시작
            </Link>
         </div>
      </div>
   )
}

const Guide = () => {

   return (
      <CommonUi
         mainStep={1}
         content={<Content />}
      />
   )
}

export default Guide