import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

// Components
import TermsOfUse from "../TermsOfUse";

// Hooks
import { inputPhoneNum, currentVerificationStep, getVerificationCode, verifyAuth, handleVerificationCode } from '../../../hooks/VerificationCode';
import DOMPurify from "dompurify";

const IndexPage = ({ isView, isSocial, setCurrentPage, formData, setFormData, etcValue, setEtcValue }) => {
   const [searchParams] = useSearchParams();

   // 소셜 로그인 시 자동입력
   const socialToken = searchParams.get("social_token");
   const email = searchParams.get("email");
   const phone = searchParams.get("phone");
   const birth = searchParams.get("birth");
   const name = searchParams.get("name");

   // input 입력 시 formData에 저장
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
         ...formData,
         [name]: value,
      });
   };

   // 소셜 토큰, 소셜 타입 formData에 저장
   useEffect(() => {
      if (socialToken && email && phone && birth && name) {
         setFormData((prev) => ({
            ...prev,
            social_token: socialToken,
            identified: email,
            phone: phone,
            birth: birth,
            name: name,
         }));
      }
   }, []);

   // 휴대폰 인증
   const memberType = 1; // 0: 일반인, 1: 상담사
   let certType = isSocial ? 1 : 0; // 0: 일반 회원가입, 1: 소셜 회원가입

   const [verificationStep, setVerificationStep] = useState(0);

   // 휴대폰 번호를 입력했을 때만 step1로 변경
   useEffect(() => {
      inputPhoneNum(formData, setVerificationStep);
   }, [formData.phone])


   // 인증번호
   const [verificationCode, setVerificationCode] = useState("");

   // 비밀번호 재확인
   const [matchingPw, setMatchingPw] = useState(false);
   const handleCheckPw = (e) => {
      if (formData.password === e.target.value) {
         setMatchingPw(true);
      } else {
         setMatchingPw(false);
      }
   };

   // 상담 분야 체크시 formData에 추가
   const CounselTypeInfo = [
      { name: "심리적 증상(우울, 불안, 분노 등)" },
      { name: "성격 및 자기 이해" },
      { name: "가족 관계" },
      { name: "대인관계" },
      { name: "직장 생활" },
      { name: "학업 진로" },
      { name: "중독 및 섭식장애" },
      { name: "정서 및 행동 문제" },
      { name: "자녀양육" },
      { name: "또래 관계" },
      { name: "성문제" },
      { name: "기타(직접입력)" },
   ];
   const [isCheckedEtc, setIsCheckedEtc] = useState(false);
   // const [etcValue, setEtcValue] = useState('');

   // 상담 분야 체크박스 onChange시
   const handleCounselType = (e) => {
      const { name, checked } = e.target;

      if (name === "기타(직접입력)" && checked) {
         setIsCheckedEtc(true);
      } else if (name === "기타(직접입력)" && !checked) {
         setIsCheckedEtc(false);
      } else if (name !== "기타(직접입력)") {
         setFormData((prevFormData) => {
            let updatedCounselType = prevFormData.counsel_type
               ? prevFormData.counsel_type.split("&nbsp;")
               : [];

            if (checked) {
               // 체크된 경우 해당 name 추가
               updatedCounselType.push(name);
            } else {
               // 체크 해제된 경우 해당 name 제거
               updatedCounselType = updatedCounselType.filter(
                  (item) => item !== name
               );
            }

            return {
               ...prevFormData,
               counsel_type: updatedCounselType.join("&nbsp;"),
            };
         });
      }
   };

   // 기타 직접 입력 내용 변수에 저장
   const handleEtcValue = (e) => {
      const value = e.target.value;
      setEtcValue(value);
   };
   const saveEtcValue = () => {
      const isEtcValue = etcValue === '' ? false : true

      // 기타입력에 적은 내용이 없으면 함수 종료
      if (isCheckedEtc && !isEtcValue) {
         alert('기타의 내용을 입력해 주세요.')
         return false;
      }
      if (!isCheckedEtc) {
         setEtcValue('')
      }
   };

   // formData에 중간 저장
   const saveFormData = async () => {
      // 비밀번호 확인이 일치하지 않으면 종료
      if (!isSocial && !matchingPw) {
         alert('비밀번호가 일치하지 않습니다.')
         return;
      };

      const saveEtcValueResult = saveEtcValue()
      if (saveEtcValueResult === false) {
         return
      }
      saveMajorHistory();
      setCurrentPage(2);
   };

   //  ===== 주요약력 =====
   const [majorHistoryInput, setMajorHistoryInput] = useState([]);

   const handleAddMajorHistory = () => {
      if (majorHistoryInput.length < 4) {
         setMajorHistoryInput([...majorHistoryInput, { value: "" }]);
      } else {
         alert("최대 5개까지 입력 가능합니다");
      }
   };

   // 현재 수정중인 input의 index와 데이터 배열에 있는 index가 일치하면, value를 현재 value로 저장
   // 그렇지 않으면 기존 아이템을 그대로 반환
   const handleInputChange = (index, event) => {
      const newInputValues = majorHistoryInput.map((item, i) => (i === index ? { value: event.target.value } : item));
      setMajorHistoryInput(newInputValues);
   };

   // 클릭한 요소 삭제
   const handleDelMajorHistory = (index) => {
      setMajorHistoryInput((prev) => prev.filter((_, i) => i !== index));
   };

   const saveMajorHistory = () => {
      let ElValue = [];

      const majorHistoryEl = document.querySelectorAll(".major-history");
      majorHistoryEl.forEach((element, index) => {
         ElValue[index] = element.value;
      });

      setFormData((prev) => {
         const updatedFormData = {
            ...prev,
            briefHistoryArr: ElValue,
         };
         return updatedFormData;
      });
   };

   return (
      <div
         style={!isView ? ({ display: 'none' }) : {}}
         className="subpage"
      >
         <section className="user-section">
            <div className="user-wrap">
               <div className="title-wrap row-group">
                  <h2 className="title">상담사 회원가입</h2>
                  <p className="txt">마인드 인사이트 상담사 등록을 위한 기본 정보를 입력해 주세요.</p>
                  <div className="join-tab-list col-group">
                     <div className="join-tab active">1. 기본 정보 입력</div>
                     <div className="join-tab">2. 자격증/학과 입력</div>
                     <div className="join-tab">3. 신청완료</div>
                  </div>
               </div>

               <div className="guide-txt">
                  <span className="red">*</span> 표시는 필수입력 항목입니다.
               </div>

               <div className="form-wrap account-form-wrap row-group">
                  <div className="form-list row-group">
                     <div className="form-item row-group">
                        <div className="item-default">
                           이메일
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <input
                              value={formData.identified}
                              onChange={handleChange}
                              name="identified"
                              type="text"
                              className="form-input"
                              placeholder="이메일(아이디)"
                           />
                        </div>
                     </div>
                     {isSocial ? (
                        ""
                     ) : (
                        <div className="form-item row-group">
                           <div className="item-default">
                              비밀번호
                              <span className="red">*</span>
                           </div>
                           <div className="item-user">
                              <div className="form-input-wrap row-group">
                                 <input
                                    onChange={handleChange}
                                    type="password"
                                    className="form-input"
                                    placeholder="비밀번호"
                                    name="password"
                                    required={true}
                                 />
                                 <input
                                    onChange={handleCheckPw}
                                    type="password"
                                    className="form-input"
                                    placeholder="비밀번호 재확인"
                                 />
                                 <p className={`${matchingPw ? "" : "hide-g"} guide-txt blue`}>비밀번호가 일치합니다.</p>
                                 <p className={`${matchingPw ? "hide-g" : ""} guide-txt red`}>비밀번호가 일치하지 않습니다.</p>
                              </div>
                           </div>
                        </div>
                     )}
                     <div className="form-item row-group">
                        <div className="item-default">
                           이름
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <input
                              value={formData.name}
                              onChange={handleChange}
                              name="name"
                              type="text"
                              className="form-input"
                              placeholder="이름"
                           />
                        </div>
                     </div>
                     <div className="form-item row-group">
                        <div className="item-default">
                           휴대폰 번호
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <div className="form-input-wrap row-group">
                              <div className="form-btn-wrap col-group">
                                 <input
                                    value={formData.phone}
                                    onChange={handleChange}
                                    onWheel={(event) => event.target.blur()}
                                    type="number"
                                    className="form-input"
                                    placeholder="휴대폰 번호"
                                    name="phone"
                                    required={true}
                                 />
                                 <button
                                    onClick={getVerificationCode(
                                       memberType,
                                       verificationStep,
                                       setVerificationStep,
                                       certType,
                                       formData
                                    )}
                                    className={`${currentVerificationStep(verificationStep).className} form-btn`}
                                 >
                                    {currentVerificationStep(verificationStep).text}
                                 </button>
                              </div>

                              {/* 인증번호 받기 버튼 클릭 시 활성화 / 인증 완료 후 숨김 */}
                              <div className={`${verificationStep === 2 ? "" : "hide-g"} form-input-wrap row-group`}>
                                 <div className="form-btn-wrap col-group">
                                    <input
                                       onChange={handleVerificationCode(setVerificationCode)}
                                       value={verificationCode}
                                       type="number"
                                       className="form-input"
                                       placeholder="인증번호"
                                    />
                                    <button
                                       onClick={verifyAuth(memberType, certType, formData, verificationCode, setVerificationStep)}
                                       className={`${verificationCode !== "" ? "" : "disable"} form-btn `}
                                    >
                                       인증확인
                                    </button>
                                 </div>

                                 {/* //인증번호 받기 버튼 클릭 시 활성화 / 인증 완료 후 숨김 */}
                                 <p className="guide-txt red">휴대폰으로 발송된 인증번호를 입력해주세요.</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="form-item row-group">
                        <div className="item-default">
                           생년월일
                           <span className="red">*</span>
                        </div>
                        <div className="item-user">
                           <input
                              value={formData.birth}
                              onChange={handleChange}
                              name="birth"
                              type="date"
                              className="form-date"
                           />
                        </div>
                     </div>
                     <div className="form-item row-group">
                        <div className="item-default">
                           상담 분야
                           <span className="red">*</span>
                           <p className="guide-txt">중복선택이 가능합니다.</p>
                        </div>
                        <div className="item-user">
                           <div className="form-label-wrap half col-group" id="form_data3">
                              {CounselTypeInfo.map((item, index) => (
                                 <label htmlFor={`field_0${index + 1}`} key={index}>
                                    <input
                                       onChange={handleCounselType}
                                       name={item.name}
                                       type="checkbox"
                                       className="form-checkbox"
                                       id={`field_0${index + 1}`}
                                    />
                                    <div className="checked-item col-group">
                                       <div className="icon">
                                          <i className="xi-check"></i>
                                       </div>
                                       <p className="txt">{item.name}</p>
                                    </div>
                                 </label>
                              ))}
                              {isCheckedEtc && (
                                 <input
                                    onChange={handleEtcValue}
                                    value={etcValue}
                                    name="기타(직접입력)"
                                    type="text"
                                    className="form-input"
                                    placeholder="기타 내용을 입력해주세요"
                                 />
                              )}
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
                              <textarea onChange={handleChange} name="intro_text" className="form-textarea h200" />
                              {/* <div className="sticker">
                                 <span>0</span>/500
                              </div> */}
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
                                 <input type="text" className="form-input major-history" placeholder="약력" />
                                 <button onClick={() => handleAddMajorHistory()} className="btn add-btn why">
                                    <i></i>
                                 </button>
                              </div>
                              {majorHistoryInput.map((item, index) => (
                                 <div className="form-input-add col-group" key={index}>
                                    <input
                                       value={item.value}
                                       onChange={(event) => handleInputChange(index, event)}
                                       name="majorHistory"
                                       type="text"
                                       className="form-input major-history"
                                       placeholder="약력"
                                    />
                                    <button onClick={() => handleDelMajorHistory(index)} className="btn del-btn">
                                       <i></i>
                                    </button>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="mp-section-footer border">
                     <button
                        onClick={() => {
                           saveFormData();
                        }}
                        className="form-footer-btn"
                     >
                        다음
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

const NextPage = ({ isView, formData, setFormData, setCurrentPage, etcValue }) => {

   const [searchParams] = useSearchParams();
   const navigate = useNavigate();

   // 이용약관 필수 항목 체크 여부 확인
   const [isrequiredChecked, setIsrequiredChecked] = useState(false)

   // 이메일, 네이버, 카카오 로그인 구분
   const socialType = searchParams.get("social_type");
   let socialTypeInfo = socialType ? socialType : 0;

   const proveDataTotal = [];

   // type1 체크 박스 titles, files
   const [type01Info, setType01Info] = useState([
      { name: "수퍼바이저", checked: false },
      { name: "융합심리분석상담전문가 1급", checked: false },
      { name: "융합심리분석상담전문가 2급", checked: false },
      { name: "융합심리분석상담전문가 3급", checked: false },
   ]);

   // type2~6 체크 박스 titles, files
   const [type02Info, setType02Info] = useState({
      titles: [
         '상담심리사1급',
         '상담심리사2급',
         '1급전문상담사',
         '2급전문상담사',
         '임상심리전문가',
         '산업및조직심리전문가',
         '산업및조직심리사',
         '범죄심리전문가',
         '범죄심리사',
         '발달심리사1급',
         '발달심리사2급',
         '건강심리전문가',
         '중독심리전문가 ',
         '중독심리사',
         '학교심리사1급',
         '학교심리사2급',
         '코칭심리사1급',
         '코칭심리사2급',
         '코칭심리사3급',
         '인지학습심리사1급',
         '인지학습심리사2급',
         '인지행동지도사1급',
         '인지행동지도사2급',
         '부부가족상담전문가1급',
         '부부가족상담전문가2급',
         '장애인재활상담사1급',
         '장애인재활상담사2급',
      ],
      files: []
   })
   const [type03Info, setType03Info] = useState({
      titles: [
         '음악치료사',
         '놀이치료사',
         '미술치료사',
      ],
      files: []
   })
   const [type04Info, setType04Info] = useState({
      titles: [
         '정신건강임상심리사1급',
         '정신건강임상심리사2급',
         '정신건강사회복지사1급',
         '정신건강사회복지사2급',
         '1급언어재활사',
         '2급언어재활사',
         '정신건강간호사 1급',
         '정신건강간호사 2급',
         '정신건강의학과 전문의',
         '신경과 전문의',
         '작업치료사',
         '사회복지사1급',
         '사회복지사2급',
         '사회복지사3급',
         '임상심리사1급',
         '임상심리사2급',
         '직업상담사1급',
         '직업상담사2급',
         '청소년상담사1급',
         '청소년상담사2급',
         '청소년상담사3급',
         '청소년지도사1급',
         '청소년지도사2급',
         '청소년지도사3급',
         '전문상담교사1급',
         '전문상담교사2급',
      ],
      files: []
   })
   const [type05Info, setType05Info] = useState({
      titles: [
         '심리학',
         '교육학',
         '사회복지학',
         '상담학',
         '이외 관련학과<span class="sub-txt">(특수교육학, 유아교육학, 청소년지도학, 아동학, 작업재활 등)</span>',
      ],
      files: []
   })
   const [type06Info, setType06Info] = useState({
      titles: [
         '대학원생 (석사)',
         '대학원생 (박사)',
      ],
      files: []
   })


   // type1 파일 배열
   const [fileItemsType01, setFileItemsType01] = useState([
      null,
      null,
      null,
      null,
   ])

   // type1 체크박스 체크 시 비활성화 설정
   const handleCheckType01 = (e, index) => {
      const checked = e.target.checked
      setType01Info(prev => {
         const updateData = [...prev]
         updateData[index].checked = checked
         return updateData
      })
   }

   // type1 파일 선택 시 파일 배열 변경
   const handleFileChangeType1 = (e, index) => {
      setFileItemsType01(prev => {
         const file = e.target.files[0]
         const updateData = [...prev]
         updateData[index] = file

         return updateData;
      })
   }

   // type1 파일 제거 버튼 클릭시 제거
   const handleFileDelType01 = (index) => {
      const inputEl = document.querySelector(`.prove_01_0${index + 1}_file`)
      inputEl.value = ''
      setFileItemsType01(prev => {
         const updateData = [...prev]
         updateData[index] = null

         return updateData;
      })
   }

   // type2~6 파일 선택 시 파일 배열 변경
   const handleFileChange = (type, e) => {
      const files = e.target.files;
      const updateState = (setter) => {
         setter(prev => {
            const updateData = { ...prev };
            updateData.files = Array.from(files);
            return updateData;
         });
      }

      const stateSetters = {
         2: setType02Info,
         3: setType03Info,
         4: setType04Info,
         5: setType05Info,
         6: setType06Info
      };

      if (stateSetters[type]) {
         updateState(stateSetters[type]);
      }
   };

   // type2~6 파일 제거 버튼 클릭시 제거
   const handleFileDel = (type, index) => {
      const inputFile = document.getElementById(`cert_0${type}_file`);
      inputFile.value = '';

      const stateSetters = {
         2: setType02Info,
         3: setType03Info,
         4: setType04Info,
         5: setType05Info,
         6: setType06Info
      };

      if (stateSetters[type]) {
         stateSetters[type](prev => {
            const updateData = { ...prev };
            updateData.files = updateData.files.filter((_, i) => i !== index);
            return updateData;
         });
      }
   };

   // type1 데이터 저장
   const saveData1 = () => {
      const proveElements = document.querySelectorAll(".prove_01");
      for (let i = 0;i < proveElements.length;i++) {
         if (proveElements[i].checked) {
            const title = document.querySelector(`.prove_01_0${i + 1}_name`).innerText;
            const date = document.querySelector(`.prove_01_0${i + 1}_date`).value;
            const file = document.querySelector(`.prove_01_0${i + 1}_file`).files[0];


            if (title && date && file) {
               proveDataTotal.push({
                  type: 1,
                  content: `${title}&nbsp;${date}`,
                  file: Array(fileItemsType01[i]),
               });
            } else if ((title && !date) || (title && !file)) {
               alert(`${title}의 취득 연월이 선택되지 않았거나 파일이 등록되지 않았습니다.`)
               return false;
            }
         }
      }

   };
   // type2~6 데이터 저장
   const saveDataForm = (typeNum) => {
      const parents = document.querySelector(`#next_page_form_data${typeNum}`);
      const length = parents.childElementCount;
      const files = document.querySelector(`#cert_0${typeNum}_file`).files;
      const titleAdd = [];

      const setStatter = {
         2: type02Info,
         3: type03Info,
         4: type04Info,
         5: type05Info,
         6: type06Info,
      }
      const sendFiles = setStatter[typeNum] ? Array.from(setStatter[typeNum].files) : []

      for (var i = 0;i < length;i++) {
         if (parents.querySelector(`label:nth-child(${i + 1}) > input`).checked) {
            const title = parents.querySelector(`label:nth-child(${i + 1}) .txt`).textContent;
            titleAdd.push(title);

            if (files.length === 0) {
               alert(`${title}의 파일 등록이 등록되지 않았습니다.`)
               return false;
            }
         }
      }

      let content = "";
      for (let i = 0;i < titleAdd.length;i++) {
         content += titleAdd[i];
         if (i < titleAdd.length - 1) {
            content += "&nbsp;";
         }
      }

      const result = {
         type: typeNum,
         content: content,
         file: sendFiles,
      };

      // content와 file이 있을 때만 배열에 담기
      if (result.content && result.file) {
         proveDataTotal.push(result)
      } else {
         return
      }

   };

   // 저장한 데이터 서버에 전송
   const sendData = async () => {

      // 이용약관 필수 항목에 동의하지 않았으면 종료
      if (isrequiredChecked === false) {
         alert('이용약관 필수 항목에 동의해주세요.')
         return;
      }

      // type1 함수 호출
      const saveDataResult = saveData1();
      if (saveDataResult === false) {
         return;
      }

      // type2~6 함수 호출
      for (let i = 2;i < 7;i++) {
         const saveDataFormResult = saveDataForm(i);
         if (saveDataFormResult === false) {
            return;
         }
      }

      // ===== 이용약관 데이터 저장 =====
      const optionEls = document.querySelectorAll('.marketing-option')
      const optionChecked = []

      optionEls.forEach((optionEl) => {
         if (optionEl.checked) {
            optionChecked.push(optionEl.name)
         }
      })
      // optionChecked 배열을 문자열로 변환
      const optionCheckedString = optionChecked.join('&nbsp;')

      // 마케팅 동의 여부
      const marketingCheckEl = document.querySelector('.marketing-agreement')
      const marketingAgreement = marketingCheckEl.checked ? 1 : 0

      // ===== 최종 폼데이터 =====
      // proveArr가 포함된 최종 formData 객체 생성
      const prevFormData = { ...formData }
      const updatedFormData = {
         ...formData,
         proveArr: proveDataTotal,
         marketing: marketingAgreement,
         marketing_type: optionCheckedString,
         // etcValue의 값이 있으면 기타입력 내용 추가
         ...(etcValue !== '' && { counsel_type: prevFormData.counsel_type === "" ? etcValue : prevFormData.counsel_type += `&nbsp;${etcValue}`})
      };

      // FormData 객체 생성
      const formDataToSend = new FormData();

      // 일반 데이터 추가
      formDataToSend.append('social_token', updatedFormData.social_token);
      formDataToSend.append('identified', updatedFormData.identified);
      formDataToSend.append('password', updatedFormData.password);
      formDataToSend.append('name', updatedFormData.name);
      formDataToSend.append('phone', updatedFormData.phone);
      formDataToSend.append('birth', updatedFormData.birth);
      formDataToSend.append('counsel_type', updatedFormData.counsel_type);
      formDataToSend.append('intro_text', updatedFormData.intro_text);
      formDataToSend.append('marketing', updatedFormData.marketing);
      formDataToSend.append('marketing_type', updatedFormData.marketing_type);

      // proveArr 데이터 추가
      updatedFormData.proveArr.forEach((prove, index) => {
         formDataToSend.append(`proveArr[${index}][type]`, prove.type);
         formDataToSend.append(`proveArr[${index}][content]`, prove.content);

         // 파일 추가
         prove.file.forEach((file, fileIndex) => {
            formDataToSend.append(`proveArr[${index}][file][${fileIndex}]`, file);
         });
      });

      // briefHistoryArr 데이터 추가
      updatedFormData.briefHistoryArr.forEach((briefHistory, index) => {
         formDataToSend.append(`briefHistoryArr[${index}]`, briefHistory)
      })

      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/join/${socialTypeInfo}/counselor`, formDataToSend, {
            headers: {
               'Content-Type': 'multipart/form-data',
            }
         });
         if (response.status === 200) {
            alert(response.data.msg)
            // navigate('/join/done')
            navigate('/')
         }
      } catch (error) {
         console.error(error);

         setFormData(prev => {
            const updateData = { ...prev }
            updateData.proveArr = []

            return updateData
         })

         if (error.response && error.response.data && error.response.data.msg) {
            alert(error.response.data.msg);
            if (error.response.data.msg.includes('오류')) {
               window.location.reload()
            }
         } else {
            alert('일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.');
            window.location.reload()
         }
      }

   };

   // 버튼 클릭시 탭 on, off
   useEffect(() => {
      const buttons = document.querySelectorAll(".form-toggle-btn");

      buttons.forEach((button) => {
         const toggleClass = (event) => {
            const formWrap = event.target.closest(".form-toggle-wrap");
            formWrap.classList.toggle("active");
         };

         button.addEventListener("click", toggleClass);

         return () => {
            button.removeEventListener("click", toggleClass);
         };
      });
   }, []);

   return (
      <div
         style={!isView ? ({ display: 'none' }) : {}}
         className="subpage"
      >
         <section className="user-section">
            <div className="user-wrap">
               <div className="title-wrap row-group">
                  <h2 className="title">상담사 회원가입</h2>
                  <p className="txt">마인드 인사이트 상담사 등록을 위한 기본 정보를 입력해 주세요.</p>
                  <div className="join-tab-list col-group">
                     <div className="join-tab">1. 기본 정보 입력</div>
                     <div className="join-tab active">2. 자격증/학과 입력</div>
                     <div className="join-tab">3. 신청완료</div>
                  </div>
               </div>

               <div className="guide-txt">
                  <span className="red">*</span> 표시는 필수입력 항목입니다.
               </div>

               <div className="form-wrap account-form-wrap row-group">
                  <div className="join-guide-txt-wrap row-group">
                     <p className="join-guide-txt">
                        '관련 자격증(1~4)' 또는 '관련 학과(5~6)' 등록은 <strong className="red">필수</strong>입니다.
                     </p>
                     <p className="join-guide-txt">
                        '1~6' 중 <strong className="red">1개 이상</strong>의 정보를 등록해 주세요.
                     </p>
                     <p className="join-guide-txt">
                        '2~6'의 자격증 사본, 졸업증명서 등은 하단 '증명 서류 등록'에 등록해 주세요.(여러장 등록이 가능합니다.)
                     </p>
                     <p className="join-guide-txt">
                        선택된 항목이 없으면 해당 항목과 관련된 파일은 등록되지 않습니다.
                     </p>
                  </div>

                  <div className="form-list row-group">
                     <div className="form-item row-group">
                        <div className="item-default">
                           관련 자격증
                           <span className="red">*</span>
                           <p className="guide-txt">중복선택이 가능합니다.</p>
                        </div>
                        <div className="item-user">
                           <div className="form-toggle-wrap active">
                              <div className="form-toggle-btn col-group">
                                 <p className="txt">1. 한국영성심리분석상담학회 자격증</p>
                                 <i className="icon"></i>
                              </div>
                              <div className="form-toggle-content">
                                 <div className="form-toggle-table">
                                    <div className="form-toggle-table-head col-group">
                                       <p className="th">구분</p>
                                       <p className="th">취득연월</p>
                                       <p className="th">자격증 사본</p>
                                    </div>
                                    <div className="form-toggle-table-body">
                                       {type01Info.map((item, index) => (
                                          <div className={`${item.checked ? '' : 'disable'}  tr col-group`} key={index}>
                                             <div className="td">
                                                <label htmlFor={`cert_01_0${index + 1}`}>
                                                   <input
                                                      name={item.name}
                                                      checked={item.checked}
                                                      onChange={(e) => { handleCheckType01(e, index) }}
                                                      type="checkbox"
                                                      id={`cert_01_0${index + 1}`}
                                                      className={`form-checkbox prove_01 prove_01_0${index + 1}`}
                                                   />
                                                   <div className="checked-item col-group">
                                                      <div className="icon">
                                                         <i className="xi-check"></i>
                                                      </div>
                                                      <p className={`txt prove_01_0${index + 1}_name`}>{item.name}</p>
                                                   </div>
                                                </label>
                                             </div>
                                             <div className="td">
                                                <input
                                                   disabled={!item.checked}
                                                   name={item.name}
                                                   type="date"
                                                   className={`form-input prove_01_0${index + 1}_date`}
                                                />
                                             </div>
                                             <div className="td">
                                                <label htmlFor={`cert_01_0${index + 1}_file`} className="btn">
                                                   <input
                                                      onChange={(e) => handleFileChangeType1(e, index)}
                                                      disabled={!item.checked}
                                                      name={item.name}
                                                      type="file"
                                                      id={`cert_01_0${index + 1}_file`}
                                                      className={`prove_01_0${index + 1}_file`}
                                                   />
                                                   등록
                                                </label>
                                             </div>
                                             {fileItemsType01[index] &&
                                                <div className="td" key={index}>
                                                   <div className="file-name col-group">
                                                      <p className="txt">{fileItemsType01[index].name}</p>
                                                      <button onClick={() => { handleFileDelType01(index) }}>
                                                         <i className="del-btn"></i>
                                                      </button>
                                                   </div>
                                                </div>
                                             }
                                          </div>
                                       ))}
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="form-toggle-wrap active">
                              <div className="form-toggle-btn col-group">
                                 <p className="txt">2. 상담·임상심리 관련 학회 자격증</p>
                                 <i className="icon"></i>
                              </div>
                              <div className="form-toggle-content">
                                 <div className="form-label-wrap half col-group" id="next_page_form_data2">
                                    {type02Info.titles.map((title, index) => (
                                       <label htmlFor={`cert_02_${index + 1}`} key={index}>
                                          <input
                                             name='type02Checkbox'
                                             data-type={2}
                                             type="checkbox"
                                             className="form-checkbox"
                                             id={`cert_02_${index + 1}`}
                                          />
                                          <div className="checked-item col-group">
                                             <div className="icon">
                                                <i className="xi-check"></i>
                                             </div>
                                             <p className="txt">{title}</p>
                                          </div>
                                       </label>
                                    ))}
                                 </div>
                                 <div className="form-item row-group">
                                    <div className="item-default">
                                       증명 서류 등록
                                       <p className="guide-txt">중복 등록이 가능합니다.</p>
                                    </div>
                                    <div className="item-user">
                                       <div className="form-input-wrap row-group">
                                          <label htmlFor="cert_02_file" className="form-btn gray">
                                             <input
                                                onChange={(e) => { handleFileChange(2, e) }}
                                                type="file"
                                                id="cert_02_file"
                                                multiple
                                             />
                                             파일등록
                                          </label>
                                          <div className="form-input-wrap row-group">
                                             {type02Info.files.map((file, index) => (
                                                <div className="file-name col-group" key={index}>
                                                   <p className="txt">{file.name}</p>
                                                   <button
                                                      onClick={() => { handleFileDel(2, index) }}
                                                   >
                                                      <i className="del-btn"></i>
                                                   </button>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="form-toggle-wrap active">
                              <div className="form-toggle-btn col-group">
                                 <p className="txt">3. 예술 관련 치료사 자격증</p>
                                 <i className="icon"></i>
                              </div>
                              <div className="form-toggle-content">
                                 <div className="form-label-wrap half col-group" id="next_page_form_data3">
                                    {type03Info.titles.map((item, index) => (
                                       <label htmlFor={`cert_03_0${index + 1}`} key={index}>
                                          <input type="checkbox" className="form-checkbox" id={`cert_03_0${index + 1}`} />
                                          <div className="checked-item col-group">
                                             <div className="icon">
                                                <i className="xi-check"></i>
                                             </div>
                                             <p className="txt">{item}</p>
                                          </div>
                                       </label>
                                    ))}
                                 </div>
                                 <div className="form-item row-group">
                                    <div className="item-default">
                                       증명 서류 등록
                                       <p className="guide-txt">중복 등록이 가능합니다.</p>
                                    </div>
                                    <div className="item-user">
                                       <div className="form-input-wrap row-group">
                                          <label htmlFor="cert_03_file" className="form-btn gray">
                                             <input
                                                onChange={(e) => { handleFileChange(3, e) }}
                                                type="file"
                                                id="cert_03_file"
                                                multiple
                                             />
                                             파일등록
                                          </label>
                                          <div className="form-input-wrap row-group">
                                             {type03Info.files.map((file, index) => (
                                                <div className="file-name col-group" key={index}>
                                                   <p className="txt">{file.name}</p>
                                                   <button
                                                      onClick={() => { handleFileDel(3, index) }}
                                                   >
                                                      <i className="del-btn"></i>
                                                   </button>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="form-toggle-wrap active">
                              <div className="form-toggle-btn col-group">
                                 <p className="txt">4. 국가자격증</p>
                                 <i className="icon"></i>
                              </div>
                              <div className="form-toggle-content">
                                 <div className="form-label-wrap half col-group" id="next_page_form_data4">
                                    {type04Info.titles.map((item, index) => (
                                       <label htmlFor={`cert_04_0${index + 1}`} key={index}>
                                          <input type="checkbox" className="form-checkbox" id={`cert_04_0${index + 1}`} />
                                          <div className="checked-item col-group">
                                             <div className="icon">
                                                <i className="xi-check"></i>
                                             </div>
                                             <p className="txt">{item}</p>
                                          </div>
                                       </label>
                                    ))}
                                 </div>
                                 <div className="form-item row-group">
                                    <div className="item-default">
                                       증명 서류 등록
                                       <p className="guide-txt">중복 등록이 가능합니다.</p>
                                    </div>
                                    <div className="item-user">
                                       <div className="form-input-wrap row-group">
                                          <label htmlFor="cert_04_file" className="form-btn gray">
                                             <input
                                                onChange={(e) => { handleFileChange(4, e) }}
                                                type="file"
                                                id="cert_04_file"
                                                multiple
                                             />
                                             파일등록
                                          </label>
                                          <div className="form-input-wrap row-group">
                                             {type04Info.files.map((file, index) => (
                                                <div className="file-name col-group" key={index}>
                                                   <p className="txt">{file.name}</p>
                                                   <button
                                                      onClick={() => { handleFileDel(4, index) }}
                                                   >
                                                      <i className="del-btn"></i>
                                                   </button>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="form-item row-group">
                        <div className="item-default">
                           관련 학과
                           <span className="red">*</span>
                           <p className="guide-txt">중복선택이 가능합니다.</p>
                        </div>
                        <div className="item-user">
                           <div className="form-toggle-wrap active">
                              <div className="form-toggle-btn col-group">
                                 <p className="txt">5. 관련 학과 대학교수</p>
                                 <i className="icon"></i>
                              </div>
                              <div className="form-toggle-content">
                                 <div className="form-label-wrap half col-group" id="next_page_form_data5">
                                    {type05Info.titles.map((item, index) => (
                                       index !== 4 ? (
                                          <label htmlFor={`cert_05_0${index + 1}`} key={index}>
                                             <input type="checkbox" className="form-checkbox" id={`cert_05_0${index + 1}`} />
                                             <div className="checked-item col-group">
                                                <div className="icon">
                                                   <i className="xi-check"></i>
                                                </div>
                                                <p
                                                   className="txt"
                                                   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
                                                />
                                             </div>
                                          </label>
                                       ) : (
                                          <label htmlFor={`cert_05_0${index + 1}`} className="wide" key={index}>
                                             <input type="checkbox" className="form-checkbox" id={`cert_05_0${index + 1}`} />
                                             <div className="checked-item col-group">
                                                <div className="icon">
                                                   <i className="xi-check"></i>
                                                </div>
                                                <p
                                                   className="txt"
                                                   dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
                                                />
                                             </div>
                                          </label>
                                       )
                                    ))}
                                 </div>
                                 <div className="form-item row-group">
                                    <div className="item-default">
                                       증명 서류 등록
                                       <p className="guide-txt">중복 등록이 가능합니다.</p>
                                    </div>
                                    <div className="item-user">
                                       <div className="form-input-wrap row-group">
                                          <label htmlFor="cert_05_file" className="form-btn gray">
                                             <input
                                                onChange={(e) => { handleFileChange(5, e) }}
                                                type="file"
                                                id="cert_05_file"
                                                multiple
                                             />
                                             파일등록
                                          </label>
                                          <div className="form-input-wrap row-group">
                                             {type05Info.files.map((file, index) => (
                                                <div className="file-name col-group" key={index}>
                                                   <p className="txt">{file.name}</p>
                                                   <button onClick={() => { handleFileDel(5, index) }}>
                                                      <i className="del-btn"></i>
                                                   </button>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="form-toggle-wrap active">
                              <div className="form-toggle-btn col-group">
                                 <p className="txt">6. 관련 학과 재학 이상</p>
                                 <i className="icon"></i>
                              </div>
                              <div className="form-toggle-content">
                                 <div className="form-label-wrap half col-group" id="next_page_form_data6">
                                    {type06Info.titles.map((item, index) => (
                                       <label htmlFor={`cert_06_0${index + 1}`} key={index}>
                                          <input type="checkbox" className="form-checkbox" id={`cert_06_0${index + 1}`} />
                                          <div className="checked-item col-group">
                                             <div className="icon">
                                                <i className="xi-check"></i>
                                             </div>
                                             <p className="txt">{item}</p>
                                          </div>
                                       </label>
                                    ))}
                                 </div>
                                 <div className="form-item row-group">
                                    <div className="item-default">
                                       증명 서류 등록
                                       <p className="guide-txt">중복 등록이 가능합니다.</p>
                                    </div>
                                    <div className="item-user">
                                       <div className="form-input-wrap row-group">
                                          <label htmlFor="cert_06_file" className="form-btn gray">
                                             <input
                                                onChange={(e) => { handleFileChange(6, e) }}
                                                type="file"
                                                id="cert_06_file"
                                                multiple
                                             />
                                             파일등록
                                          </label>
                                          <div className="form-input-wrap row-group">
                                             {type06Info.files.map((file, index) => (
                                                <div className="file-name col-group">
                                                   <p className="txt">{file.name}</p>
                                                   <button onClick={() => { handleFileDel(6, index) }}>
                                                      <i className="del-btn"></i>
                                                   </button>
                                                </div>
                                             ))}
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <TermsOfUse setIsrequiredChecked={setIsrequiredChecked} />
                  </div>

                  <div className="counselor-control-wrap mp-section-footer border">
                     <button
                        onClick={() => { setCurrentPage(1) }}
                        className="btn-prev form-footer-btn"
                     >
                        이전
                     </button>
                     <button onClick={() => sendData()} className="form-footer-btn">
                        상담사 등록 신청
                     </button>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

const CounselorForm = ({ isSocial }) => {
   const [currentPage, setCurrentPage] = useState(1);

   const [formData, setFormData] = useState({
      identified: "",
      name: "",
      phone: "",
      birth: "",
      counsel_type: "",
      intro_text: "",
      briefHistoryArr: [],
      proveArr: [],
      marketing: 0,
      marketing_type: "",
      ...(!isSocial && { password: "" }),
   });

   const [etcValue, setEtcValue] = useState('');

   // 페이지 이동 시 스크롤 맨위로 이동하기 위함
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [currentPage]);

   return (
      <>
         <IndexPage
            isView={currentPage === 1}
            isSocial={isSocial}
            formData={formData}
            setFormData={setFormData}
            setCurrentPage={setCurrentPage}
            etcValue={etcValue}
            setEtcValue={setEtcValue}
         />
         <NextPage
            isView={currentPage === 2}
            formData={formData}
            setFormData={setFormData}
            setCurrentPage={setCurrentPage}
            etcValue={etcValue}
         />
      </>
   )
};

export default CounselorForm;
