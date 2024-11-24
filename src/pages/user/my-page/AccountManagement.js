import React from 'react'

const AccountManagement = () => {
   return (
      <div className="myPageContent">
         <div className="mp-main-title-wrap border">
            <h2 className="mp-main-title">
               <span className="mb">My 정보 <i></i></span>
               계정 정보 관리
            </h2>
         </div>

         <div className="form-wrap account-form-wrap row-group">
            <div className="form-list row-group border">
               <div className="form-item">
                  <div className="sns-icon kakao"></div>
                  <div className="sns-icon naver"></div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     이메일
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <input type="text" className="form-input disable" value="email@email.com" disable />
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     비밀번호
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <div className="form-btn-wrap col-group">
                        <input type="text" className="form-input disable" value="●●●●●●●●●●●●●" disable />
                        <button className="form-btn">비밀번호 변경</button>
                     </div>
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     이름
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <input type="text" className="form-input" value="김지은" />
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     휴대폰 번호
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <div className="form-btn-wrap col-group">
                        <input type="text" className="form-input disable" value="01012341234" disable />
                        <button className="form-btn">재인증</button>
                     </div>
                  </div>
               </div>
            </div>

            <div className="form-item row-group">
               <div className="item-default">
                  마케팅 정보 수신 동의
               </div>
               <div className="item-user">
                  <div className="join-agree-wrap row-group">
                     <div className="join-agree-item col-group">
                        <label for="agree_3">
                           <input type="checkbox" className="form-checkbox" id="agree_3" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 [선택] 마케팅 정보 수신에 동의합니다.
                              </p>
                           </div>
                        </label>
                        <a href="privacy_policy.html" target="_blank" className="more-btn">
                           보기
                        </a>
                     </div>
                     <div className="checked-item-sub col-group">
                        <label for="agree_4">
                           <input type="checkbox" className="form-checkbox" id="agree_4" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 SMS/알림톡
                              </p>
                           </div>
                        </label>
                        <label for="agree_5">
                           <input type="checkbox" className="form-checkbox" id="agree_5" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 이메일
                              </p>
                           </div>
                        </label>
                        <label for="agree_6">
                           <input type="checkbox" className="form-checkbox" id="agree_6" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 전화
                              </p>
                           </div>
                        </label>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mp-section-footer border">
               <button className="form-footer-btn">
                  정보저장
               </button>
               <button className="form-footer-leave-btn">
                  회원탈퇴
               </button>
            </div>
         </div>

         {/* 상담사 회원 정보 관리 */}
         <div className="form-wrap account-form-wrap row-group">
            <div className="form-list row-group border">
               <div className="form-item">
                  <p className="account-guide-txt">
                     ※ 가입시 입력하신 <span className="red">자격증/학과 정보</span>의 변경을 원하신다면 <a href="mypage_03.html" className="link blue">1:1 문의</a>를 이용해 주세요.
                  </p>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     이메일
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <input type="text" className="form-input disable" value="email@email.com" disable />
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     비밀번호
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <div className="form-btn-wrap col-group">
                        <input type="text" className="form-input disable" value="●●●●●●●●●●●●●" disable />
                        <button className="form-btn">비밀번호 변경</button>
                     </div>
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     이름
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <input type="text" className="form-input" value="김지은" />
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     휴대폰 번호
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <div className="form-btn-wrap col-group">
                        <input type="text" className="form-input disable" value="01012341234" disable />
                        <button className="form-btn">재인증</button>
                     </div>
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     생년월일
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <input type="date" className="form-date" />
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     상담 분야
                     <span className="red">*</span>
                     <p className="guide-txt">
                        중복선택이 가능합니다.
                     </p>
                  </div>
                  <div className="item-user">
                     <div className="form-label-wrap half col-group">
                        <label for="field_01">
                           <input type="checkbox" className="form-checkbox" id="field_01" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 심리적 증상(우울, 불안, 분노 등)
                              </p>
                           </div>
                        </label>
                        <label for="field_02">
                           <input type="checkbox" className="form-checkbox" id="field_02" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 성격 및 자기 이해
                              </p>
                           </div>
                        </label>
                        <label for="field_03">
                           <input type="checkbox" className="form-checkbox" id="field_03" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 가족 관계
                              </p>
                           </div>
                        </label>
                        <label for="field_04">
                           <input type="checkbox" className="form-checkbox" id="field_04" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 대인관계
                              </p>
                           </div>
                        </label>
                        <label for="field_05">
                           <input type="checkbox" className="form-checkbox" id="field_05" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 직장 생활
                              </p>
                           </div>
                        </label>
                        <label for="field_06">
                           <input type="checkbox" className="form-checkbox" id="field_06" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 학업 진로
                              </p>
                           </div>
                        </label>
                        <label for="field_07">
                           <input type="checkbox" className="form-checkbox" id="field_07" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 중독 및 섭식장애
                              </p>
                           </div>
                        </label>
                        <label for="field_08">
                           <input type="checkbox" className="form-checkbox" id="field_08" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 정서 및 행동 문제
                              </p>
                           </div>
                        </label>
                        <label for="field_09">
                           <input type="checkbox" className="form-checkbox" id="field_09" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 자녀양육
                              </p>
                           </div>
                        </label>
                        <label for="field_10">
                           <input type="checkbox" className="form-checkbox" id="field_10" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 또래 관계
                              </p>
                           </div>
                        </label>
                        <label for="field_11">
                           <input type="checkbox" className="form-checkbox" id="field_11" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 성문제
                              </p>
                           </div>
                        </label>
                        <label for="field_12">
                           <input type="checkbox" className="form-checkbox" id="field_12" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 기타(직접입력)
                              </p>
                           </div>
                        </label>
                        <input type="text" className="form-input" />
                     </div>
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     소개 문구
                     <span className="red">*</span>
                  </div>
                  <div className="item-user">
                     <div className="form-textarea-wrap">
                        <textarea name="" id="" className="form-textarea h200"></textarea>
                        <div className="sticker">
                           <span>0</span>/500
                        </div>
                     </div>
                  </div>
               </div>
               <div className="form-item row-group">
                  <div className="item-default">
                     주요 약력
                     <span className="red">*</span>
                     <p className="guide-txt">
                        최대 5개까지 입력 가능하며, 입력할 내용이 없는 경우 '없음'이라고 입력해 주세요.
                     </p>
                  </div>
                  <div className="item-user">
                     <div className="form-input-add-wrap row-group">
                        <div className="form-input-add col-group">
                           <input type="text" className="form-input" placeholder="약력" />
                           <button className="btn add-btn">
                              <i></i>
                           </button>
                        </div>
                        <div className="form-input-add col-group">
                           <input type="text" className="form-input" placeholder="약력" />
                           <button className="btn del-btn">
                              <i></i>
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="form-item row-group">
               <div className="item-default">
                  마케팅 정보 수신 동의
               </div>
               <div className="item-user">
                  <div className="join-agree-wrap row-group">
                     <div className="join-agree-item col-group">
                        <label for="agree_3">
                           <input type="checkbox" className="form-checkbox" id="agree_3" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 [선택] 마케팅 정보 수신에 동의합니다.
                              </p>
                           </div>
                        </label>
                        <a href="privacy_policy.html" target="_blank" className="more-btn">
                           보기
                        </a>
                     </div>
                     <div className="checked-item-sub col-group">
                        <label for="agree_4">
                           <input type="checkbox" className="form-checkbox" id="agree_4" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 SMS/알림톡
                              </p>
                           </div>
                        </label>
                        <label for="agree_5">
                           <input type="checkbox" className="form-checkbox" id="agree_5" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 이메일
                              </p>
                           </div>
                        </label>
                        <label for="agree_6">
                           <input type="checkbox" className="form-checkbox" id="agree_6" />
                           <div className="checked-item col-group">
                              <div className="icon">
                                 <i className="xi-check"></i>
                              </div>
                              <p className="txt">
                                 전화
                              </p>
                           </div>
                        </label>
                     </div>
                  </div>
               </div>
            </div>

            <div className="mp-section-footer border">
               <button className="form-footer-btn">
                  정보저장
               </button>
               <button className="form-footer-leave-btn">
                  회원탈퇴
               </button>
            </div>
         </div>
      </div>
   )
}

export default AccountManagement