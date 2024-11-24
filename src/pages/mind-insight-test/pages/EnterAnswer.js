import React, { useState, useEffect } from 'react';
import CommonUi from '../../../components/insight-test/CommonUi';
import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

// Components
import Loading from '../../../components/common/Loading';
import axios from 'axios';
import LongTimeLoading from '../../../components/common/LongTimeLoading';
import PageContainer from '../result-pages/PageContainer';

const TestList = ({ currentStep, currentPage, finalQuestions, setFinalQuestions, importCheckedData }) => {

   // page가 바뀌면 맨위로 자동 스크롤
   useEffect(() => {
      const container = document.querySelector('.test-content.insight-test');
      container.scrollTop = 0;
      window.scrollTo(0, 0);
   }, [])

   // 체크했을 때 자동 스크롤
   useEffect(() => {
      const container = document.querySelector('.test-content.insight-test');
      const questions = document.querySelectorAll('.question');

      if (!container) return;

      function scrollToElement(element, offset = 0) {
         if (window.innerWidth <= 1024) {
            // 윈도우 사이즈가 1024 이하일 때 윈도우 스크롤
            window.scrollTo({
               top: element.getBoundingClientRect().top + window.scrollY - offset,
               behavior: 'smooth'
            });
         } else {
            // 컨테이너 스크롤
            container.scrollTo({
               top: element.offsetTop - container.offsetTop - offset,
               behavior: 'smooth'
            });
         }
      }

      const cleanUpFns = [];
      questions.forEach((question, index) => {
         const radios = question.querySelectorAll('input[type="radio"]');

         radios.forEach(radio => {
            const handleChange = () => {
               question.classList.add('prev');
               question.classList.remove('active');

               if (index < questions.length - 1) {
                  const nextQuestion = questions[index + 1];
                  nextQuestion.classList.add('active');

                  scrollToElement(nextQuestion, 112);
               }
            }
            radio.addEventListener('change', handleChange);

            // Clean-up 함수에 추가
            cleanUpFns.push(() => {
               radio.removeEventListener('change', handleChange);
            });
         });
      });

      // Clean-up 함수
      return () => {
         cleanUpFns.forEach(fn => fn());
      };
   }, [finalQuestions.currentPage])

   // 값 선택
   const radioChange = (questionIndexParms, scoreIndexParms) => {

      setFinalQuestions((prev) => {
         // 이전 데이터를 깊은 복사
         const updateData = [...prev.data];

         // 현재 페이지의 items를 선택 후 반복문
         const currentPageItems = updateData[currentPage - 1].items.map((item) => {
            // 바꿔야 할 item 데이터를 questionIndex값과 questionIndexParms를 비교해서 찾음
            if (item.questionIndex === questionIndexParms) {
               // 바꿔야할 데이터를 찾았으면 score를 반복문
               const updatedScores = item.score.map((score, index) => {
                  // 바꿔야할 score 데이터를 index값과 scoreIndexParms를 비교해서 찾음
                  if (index === scoreIndexParms) {
                     // 바꿔야할 데이터를 찾았으면 checked를 true로 변경
                     return { ...score, checked: true };
                  }
                  return { ...score, checked: false }; // 다른 score의 checked는 false로 변경
               });

               // 업데이트 된 score 데이터와 함께 반환
               return { ...item, score: updatedScores };
            }
            return item; // 업데이트 되지 않은 다른 item은 그대로 유지
         });

         // 업데이트된 데이터를 현재 페이지에 반영
         updateData[currentPage - 1] = {
            ...updateData[currentPage - 1],
            items: currentPageItems,
         };

         return { ...prev, data: updateData };
      });
   };

   // 불러온 데이터로 업데이트
   useEffect(() => {
      if (!importCheckedData) return;

      setFinalQuestions((prev) => {
         // 이전 데이터를 복사
         const updateData = [...prev.data];
         // 불러온 데이터의 order_number, value를 배열로 만듦
         const importCheckedDataValue = importCheckedData.map((data) => ({
            orderNumber: data.order_number,
            value: data.value
         }));


         // 현재 페이지에 대한 items
         const currentItems = updateData[prev.currentPage - 1].items;

         // 업데이트 될 items 데이터
         const updateItems = currentItems.map((item) => {

            const selectedData = importCheckedDataValue.find((selectedItem) => selectedItem.orderNumber === parseInt(item.questionIndex, 10))
            const updateScore = item.score.map((score) => ({
               ...score,
               checked: selectedData?.value === score.number
            }))

            return { ...item, score: updateScore }
         });

         updateData[currentPage - 1] = {
            ...updateData[currentPage - 1],
            items: updateItems
         };

         // 변경된 데이터가 이전 상태와 동일한지 확인
         if (JSON.stringify(prev) === JSON.stringify(updateData)) {
            return prev; // 상태가 같으면 업데이트하지 않음
         }

         return { ...prev, data: updateData };
      });

   }, [currentPage, importCheckedData])

   return (
      <div className="test-list">
         {finalQuestions.currentPage > 0 && finalQuestions.currentPage <= finalQuestions.data.length &&
            finalQuestions.data[finalQuestions.currentPage - 1].items.map((question, index) => (
               <div className={`${index === 0 ? 'active' : ''} question`} key={index}>
                  <div className="q_title">
                     <div className="num">{question.questionIndex}.</div>
                     <div className="title">{question.title}</div>
                  </div>
                  {currentStep !== 4 ? (
                     <div className="q_item">
                        {question.score.map((score, scoreIndex) => (
                           <label htmlFor={`q_${question.questionIndex}_${scoreIndex + 1}`} className="score" key={scoreIndex}>
                              <input
                                 onChange={() => radioChange(question.questionIndex, scoreIndex)}
                                 checked={score.checked}
                                 type="radio"
                                 id={`q_${question.questionIndex}_${scoreIndex + 1}`}
                                 name={`q_${question.questionIndex}`}
                              // className={`q_${question.questionIndex}`}
                              // value={score.number}
                              />
                              <div className="check">
                                 <div className="num">{score.number}</div>
                                 <div className="txt">{score.label}</div>
                              </div>
                           </label>
                        ))}
                     </div>
                  ) : (
                     <div className="q_item life">
                        {question.score.map((score, scoreIndex) => {
                           if (!score.label) {
                              return (
                                 <label htmlFor={`q_${question.questionIndex}_${scoreIndex + 1}`} className="score" key={scoreIndex}>
                                    <input
                                       onChange={() => radioChange(question.questionIndex, scoreIndex)}
                                       checked={score.checked}
                                       type="radio"
                                       id={`q_${question.questionIndex}_${scoreIndex + 1}`}
                                       name={`q_${question.questionIndex}`}
                                    // className={`q_${question.questionIndex}`}
                                    // value={score.number}
                                    />
                                    <div className="check">
                                       <div className="bar"></div>
                                       <div className="bar-core"></div>
                                       <div className="num">{score.number}</div>
                                    </div>
                                 </label>
                              )
                           } else return '';
                        })}
                     </div>
                  )}
               </div>
            ))}
      </div>
   )
}

const Content = () => {
   const SECRET_KEY = process.env.REACT_APP_SECRET_KEY; // 쿠키 데이터 복호화에 쓸 키

   const [currentStep, setCurrentStep] = useState(1);
   const [currentPage, setCurrentPage] = useState(1);
   const [userData, setUserData] = useState();
   const inspectId = Cookies.get('inspectId');

   const [finalQuestions, setFinalQuestions] = useState({});
   const [loadingFinalData, setLoadingFinalData] = useState(true);

   // 복호화 함수
   const decrypt = (cipherText) => {
      const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
      return bytes.toString(CryptoJS.enc.Utf8);
   };

   // 쿠키에서 JSON 데이터를 읽어와 복호화
   useEffect(() => {
      const encryptedData = Cookies.get('userData');
      if (encryptedData) {
         const decryptedData = decrypt(encryptedData); // 복호화
         setUserData(JSON.parse(decryptedData)); // 문자열을 JSON 객체로 변환
      } else {
         alert("잘못된 접근입니다.");
         window.location.href = '/';

         return;
      }
   }, []);

   // 검사 답변 내용
   const scoreType1 = [
      {
         checked: false,
         number: 0,
         label: '매우 아니다',
      },
      {
         checked: false,
         number: 1,
         label: '약간 아니다'
      },
      {
         checked: false,
         number: 2,
         label: '보통'
      },
      {
         checked: false,
         number: 3,
         label: '약간 그렇다'
      },
      {
         checked: false,
         number: 4,
         label: '매우 그렇다'
      },
   ];
   const scoreType2 = [
      {
         checked: false,
         number: 1,
         label: '전혀 그렇지 않다'
      },
      {
         checked: false,
         number: 2,
         label: '별로 그렇지 않다'
      },
      {
         checked: false,
         number: 3,
         label: '보통이다'
      },
      {
         checked: false,
         number: 4,
         label: '대체로 그렇다'
      },
      {
         checked: false,
         number: 5,
         label: '매우 그렇다'
      },
   ];
   const scoreType3 = [
      { checked: false, number: 10 },
      { checked: false, number: 9 },
      { checked: false, number: 8 },
      { checked: false, number: 7 },
      { checked: false, number: 6 },
      { checked: false, number: 5 },
      { checked: false, number: 4 },
      { checked: false, number: 3 },
      { checked: false, number: 2 },
      { checked: false, number: 1 },
   ];

   const stepQuestions = {
      step1: [
         {
            name: '불안검사',
            stpeType: 0,
            items: [
               { type: 1, questionIndex: "01", title: "몸이 저리고 쑤시며 감각이 마비된 느낌을 받는다.", score: scoreType1 },
               { type: 1, questionIndex: "02", title: "심장이 두근거리고 빨리 뛰며 흥분된 느낌을 받는다.", score: scoreType1 },
               { type: 1, questionIndex: "03", title: "숨쉬기가 곤란할때가 있다.", score: scoreType1 },
               { type: 1, questionIndex: "04", title: "손이 떨리거나 다리가 떨리곤 한다.", score: scoreType1 },
               { type: 1, questionIndex: "05", title: "어지러움(현기증)을 느끼고, 몽롱하거나 균형을 상실한 느낌이 든다.", score: scoreType1 },
               { type: 1, questionIndex: "06", title: "숨이 막혀 질식할 것 같고, 목에 무언가 걸린 느낌이 든다.", score: scoreType1 },
               { type: 1, questionIndex: "07", title: "소화가 잘 안되고, 배 속이 불편하다.", score: scoreType1 },
               { type: 1, questionIndex: "08", title: "덥지 않은 상황에서도 땀을 흘리거나 얼굴이 붉어지곤 한다.", score: scoreType1 },
               { type: 0, questionIndex: "09", title: "매우 나쁜 일이 일어날 것 같은 두려움을 느낀다.", score: scoreType1 },
               { type: 1, questionIndex: "10", title: "죽을 것 같은, 혹은 미칠 것 같은 두려움을 느낀다.", score: scoreType1 },
               { type: 0, questionIndex: "11", title: "편안하게 쉴 수가 없고, 안절부절못한다.", score: scoreType1 },
               { type: 0, questionIndex: "12", title: "불안한 상태에 있고, 흥분되어 침착하지 못하다.", score: scoreType1 },
               { type: 0, questionIndex: "13", title: "신경이 과민되어 있다고 생각한다.", score: scoreType1 },
               { type: 0, questionIndex: "14", title: "겁을 먹고 무서움을 느낀다.", score: scoreType1 },
               { type: 0, questionIndex: "15", title: "신체적 질병이나 심장마비, 또는 죽음에 대한 공포를 느낀다.", score: scoreType1 },
               { type: 0, questionIndex: "16", title: "비난 받거나 거절당할 것에 대한 두려움을 느낀다.", score: scoreType1 },
               { type: 0, questionIndex: "17", title: "고독감을 느끼고, 버림받지 않을까 하는 두려움을 갖는다.", score: scoreType1 },
               { type: 0, questionIndex: "18", title: "무언가 끔찍한 일이 벌어질 것 같은 두려움을 갖는다.", score: scoreType1 },
               { type: 1, questionIndex: "19", title: "갑자기 주변 환경이 낯설게 보이거나 비현실적이라는 느낌이 든다.", score: scoreType1 },
               { type: 1, questionIndex: "20", title: "몸의 일부 또는 전부로부터 분리되었다는 느낌을 받는다.", score: scoreType1 }
            ]
         },
         {
            name: '우울검사',
            stpeType: 1,
            items: [
               { type: 0, questionIndex: "21", title: "너무 슬프고 기분이 울적하다.", score: scoreType1 },
               { type: 0, questionIndex: "22", title: "나의 앞날은 절망적이고 희망이 없다고 느껴진다.", score: scoreType1 },
               { type: 0, questionIndex: "23", title: "내 자신이 가치없는 실패자라고 생각된다.", score: scoreType1 },
               { type: 0, questionIndex: "24", title: "모든 일에 불만스럽고 만족이나 행복을 잘 느끼지 못한다.", score: scoreType1 },
               { type: 0, questionIndex: "25", title: "나는 다른 사람에 비해 열등하고 뭔가 잘못되었다고 느낀다.", score: scoreType1 },
               { type: 0, questionIndex: "26", title: "주위에서 일어난 안 좋은 일은 내 탓이고 내가 문제라고 생각한다.", score: scoreType1 },
               { type: 0, questionIndex: "27", title: "어떤 일을 판단하고 결정하기가 어렵다.", score: scoreType1 },
               { type: 0, questionIndex: "28", title: "쉽게 화가나고 짜증이 난다.", score: scoreType1 },
               { type: 0, questionIndex: "29", title: "울고싶은 기분이 들고 자주 눈물이 난다.", score: scoreType1 },
               { type: 0, questionIndex: "30", title: "가족이나 친구, 취미, 진로나 미래에 대한 관심을 잃었다.", score: scoreType1 },
               { type: 0, questionIndex: "31", title: "나의 외모는 추하고, 비호감이라고 생각한다.", score: scoreType1 },
               { type: 0, questionIndex: "32", title: "어떤 일에 내 자신을 억지로 내몰지 않으면 일을 하기가 힘들다.", score: scoreType1 },
               { type: 0, questionIndex: "33", title: "쉽게 잠들지 못하고, 자고 일어나도 개운하지 않거나 지나치게 많이 잔다.", score: scoreType1 },
               { type: 0, questionIndex: "34", title: "식욕이 떨어져 먹기가 싫거나 또는 지나치게 많이 먹는다.", score: scoreType1 },
               { type: 0, questionIndex: "35", title: "조금만 집중해도 쉽게 피곤해져서 일하기가 어렵다.", score: scoreType1 },
               { type: 0, questionIndex: "36", title: "몸무게가 많이 줄거나 갑자기 늘었다.", score: scoreType1 },
               { type: 0, questionIndex: "37", title: "건강에 대한 불안으로 일에 집중을 하기가 어렵다.", score: scoreType1 },
               { type: 0, questionIndex: "38", title: "성(sex)에 대한 관심을 잃었다.", score: scoreType1 },
               { type: 0, questionIndex: "39", title: "인생은 살아볼 가치가 없으며 죽는게 낫다는 생각을 한다.", score: scoreType1 },
               { type: 0, questionIndex: "40", title: "어떤 일에서나 죄책감을 느낀다.", score: scoreType1 }
            ]
         },
         {
            name: '분노검사',
            stpeType: 2,
            items: [
               { type: 1, questionIndex: "41", title: "나는 성미가 급하다.", score: scoreType1 },
               { type: 1, questionIndex: "42", title: "다른 사람을 해치고 싶은 충동을 억제할 수 없다.", score: scoreType1 },
               { type: 0, questionIndex: "43", title: "상대방과 다른 의견이 있다면 나의 입장을 말하고 주장한다.", score: scoreType1 },
               { type: 0, questionIndex: "44", title: "사람들이 나에게 동의하지 않을 때는 논쟁할 수밖에 없다.", score: scoreType1 },
               { type: 0, questionIndex: "45", title: "누가 먼저 나를 때린다면 나도 때리겠다.", score: scoreType1 },
               { type: 1, questionIndex: "46", title: "다른 사람이 잘못해서 내 일이 늦어지게 되면 화가 난다.", score: scoreType1 },
               { type: 1, questionIndex: "47", title: "일을 잘하고도 다른 사람으로부터 인정받지 못하면 분통이 터진다.", score: scoreType1 },
               { type: 1, questionIndex: "48", title: "나는 쉽게 화를 낸다.", score: scoreType1 },
               { type: 1, questionIndex: "49", title: "화가 나면 욕을 한다.", score: scoreType1 },
               { type: 1, questionIndex: "50", title: "다른 사람 앞에서 비판을 받게 되면 격분한다.", score: scoreType1 },
               { type: 1, questionIndex: "51", title: "하고 있는 일이 막히면, 물건을 집어던지고 때려 치우고 싶다.", score: scoreType1 },
               { type: 1, questionIndex: "52", title: "매우 흥분하면 누군가를 때릴 수 있다.", score: scoreType1 },
               { type: 0, questionIndex: "53", title: "내가 싫어하는 사람에게는 좀 무례하게 행동한다.", score: scoreType1 },
               { type: 0, questionIndex: "54", title: "나를 곤란하게 만든 사람을 알게 되면 그 사람과 싸운다.", score: scoreType1 },
               { type: 1, questionIndex: "55", title: "어떤 일에 반박해 논쟁하기보다는 차라리 상대편의 의견에 따른다.", score: scoreType1 },
               { type: 1, questionIndex: "56", title: "다른 사람들에 대한 나의 좋지 않은 견해를 보통 내색하지 않는다.", score: scoreType1 },
               { type: 1, questionIndex: "57", title: "누가 괘씸해 혼내줘야 할 때라도 차마 자존심을 상하게 할 순 없다.", score: scoreType1 },
               { type: 1, questionIndex: "58", title: "무슨 일이 있든지 다른 사람을 때려서는 안 된다고 생각한다.", score: scoreType1 },
               { type: 1, questionIndex: "59", title: "누가 나를 때린다고 할지라도 좀처럼 맞서 같이 때리진 않는다.", score: scoreType1 },
               { type: 1, questionIndex: "60", title: "아무리 화가 나도 결코 물건을 던지지 않는다.", score: scoreType1 }
            ]
         },
         {
            under40s: true,
            name: '디지털 의존도',
            stpeType: 3,
            items: [
               { type: 0, questionIndex: "61", title: "처음에 마음먹었던 것보다 더 오래 인터넷을 하게 된다.", score: scoreType1 },
               { type: 0, questionIndex: "62", title: "인터넷으로 시간을 보내느라 다른 해야 할 일을 소홀히 한다.", score: scoreType1 },
               { type: 0, questionIndex: "63", title: "인터넷으로 많은 시간을 보내는 것에 대해 가까운 사람들이 불평한다.", score: scoreType1 },
               { type: 0, questionIndex: "64", title: "해야 할 일을 하기 전에 메신저나 SNS확인을 먼저 한다.", score: scoreType1 },
               { type: 0, questionIndex: "65", title: "인터넷이 없다면 생활이 지루하고 허전하며 기쁨이 없을 것이라고 걱정한다.", score: scoreType1 },
               { type: 0, questionIndex: "66", title: "인터넷 서핑중에 다른 사람이 방해하면 화가 난다.", score: scoreType1 },
               { type: 0, questionIndex: "67", title: "인터넷 하는 시간을 줄이려고 노력하지만 실패한다.", score: scoreType1 },
               { type: 0, questionIndex: "68", title: "밤 늦게까지 인터넷을 하느라 잠을 못 잔다.", score: scoreType1 },
               { type: 0, questionIndex: "69", title: "인터넷을 얼마나 오래 했는지 숨기려고 한다.", score: scoreType1 },
               { type: 0, questionIndex: "70", title: "스마트 기기를 두고 나오면 불안해서 한시라도 빨리 찾는다.", score: scoreType1 }
            ]
         },
         {
            over40s: true,
            name: '디지털 의존도',
            stpeType: 3,
            items: [
               { type: 0, questionIndex: "61", title: "외우고 있는 전화번호가 3개 이하다.", score: scoreType1 },
               { type: 0, questionIndex: "62", title: "애창곡이어도 가사가 없으면 잘 부르지 못한다.", score: scoreType1 },
               { type: 0, questionIndex: "63", title: "전에 만났던 사람을 처음 만나는 사람으로 착각한 적이 있다.", score: scoreType1 },
               { type: 0, questionIndex: "64", title: "서명할 때를 제외하면 거의 손으로 글씨를 쓰지 않는다.", score: scoreType1 },
               { type: 0, questionIndex: "65", title: "전날 먹은 식사 메뉴가 생각나지 않는다.", score: scoreType1 },
               { type: 0, questionIndex: "66", title: "같은 이야기를 자꾸 반복한다는 지적을 받은 적이 있다.", score: scoreType1 },
               { type: 0, questionIndex: "67", title: "하루 대화 중, 모바일 메신저나 이메일 대화가 80% 이상이다.", score: scoreType1 },
               { type: 0, questionIndex: "68", title: "아는 길도 네비게이션 없이는 스스로 길을 찾아가려면 불안하다.", score: scoreType1 },
               { type: 0, questionIndex: "69", title: "아는 영어나 한자가 기억나지 않은 일이 있다.", score: scoreType1 },
               { type: 0, questionIndex: "70", title: "몇 년째 사용하는 전화번호가 기억나지 않는 적이 있다.", score: scoreType1 }
            ]
         },
         {
            name: '스트레스 정도',
            stpeType: 4,
            items: [
               { type: 0, questionIndex: "71", title: "지난 한 달 동안 살아가는 데, 정신적·신체적으로 감당하기 힘들다고 느끼신 적이 있습니까?", score: scoreType1 },
               { type: 0, questionIndex: "72", title: "지난 한 달 동안 자신의 생활 표준에 따라 살아가려고 애쓰다가 좌절을 느낀 적이 있습니까?", score: scoreType1 },
               { type: 0, questionIndex: "73", title: "지난 한 달 동안 한 인간으로서의 기본적인 요구가 충족되지 않았다고 느낀 적이 있습니까?", score: scoreType1 },
               { type: 0, questionIndex: "74", title: "지난 한 달 동안 미래에 대해 불확실하게 느끼거나 불안해한 적이 있습니까?", score: scoreType1 },
               { type: 0, questionIndex: "75", title: "지난 한 달 동안 할 일들이 너무 많아 정말 중요한 일들을 잊은 적이 있습니까?", score: scoreType1 }
            ]
         },
         {
            name: '번아웃 증후군',
            stpeType: 5,
            items: [
               { type: 0, questionIndex: "76", title: "아침에 일어나면 답답하고 한숨이 나온다.", score: scoreType1 },
               { type: 0, questionIndex: "77", title: "임무를 완수해도 성취감이 없다.", score: scoreType1 },
               { type: 0, questionIndex: "78", title: "일을 할 수 없을 만큼 몸이 지쳤다.", score: scoreType1 },
               { type: 0, questionIndex: "79", title: "갑자기 떠나고 싶거나 현실에서 도피하고 싶어진다.", score: scoreType1 },
               { type: 0, questionIndex: "80", title: "쉽게 피로를 느낀다.", score: scoreType1 },
               { type: 0, questionIndex: "81", title: "현재 하는 일에 흥미를 잃었다.", score: scoreType1 },
               { type: 0, questionIndex: "82", title: "짜증이 늘고, 불안감이 느껴지고 작은 일에도 화가 치솟는다.", score: scoreType1 },
               { type: 0, questionIndex: "83", title: "해야 하는 일에 소극적이며 방어적인 태도를 취하게 된다.", score: scoreType1 },
               { type: 0, questionIndex: "84", title: "하고 있는 일에 부담감과 긴장감을 느낀다.", score: scoreType1 },
               { type: 0, questionIndex: "85", title: "스트레스를 풀기 위해 폭식, 음주, 흡연, 쇼핑 등 쾌락적 요소를 자주 찾는다.", score: scoreType1 }
            ]
         },
      ],
      step2: [
         {
            name: '융합역량지능',
            stpeType: 6,
            items: [
               { type: 0, questionIndex: "01", title: "책은 나에게 대단히 중요하다.", score: scoreType2 },
               { type: 0, questionIndex: "02", title: "나는 읽고, 말하고, 쓰기 전에 이미 머릿속에서 어떤 낱말들이 들린다.", score: scoreType2 },
               { type: 0, questionIndex: "03", title: "TV나 영화보다는 라디오나 음악감상을 통해서 많은 정보를 얻는다.", score: scoreType2 },
               { type: 0, questionIndex: "04", title: "나는 가로세로 낱말맞추기, 끝말잇기와 같은 단어게임을 즐긴다.", score: scoreType2 },
               { type: 0, questionIndex: "05", title: "나는 혼자서 또는 다른 사람과 함께, 한 번 더 생각해야 뜻을 이해할 수 있는 언어유희를 즐긴다.", score: scoreType2 },
               { type: 0, questionIndex: "06", title: "다른 사람들은 종종 내가 말하고 글을 쓸 때 사용하는 단어의 뜻을 설명해 달라고 요청한다.", score: scoreType2 },
               { type: 0, questionIndex: "07", title: "학창 시절 나에게 영어, 사회, 역사과목은 수학이나 과학과목보다 더 쉬웠다.", score: scoreType2 },
               { type: 0, questionIndex: "08", title: "나는 고속도로를 달릴 때 경치보다는 게시판 위에 써 있는 말에 더 관심이 간다.", score: scoreType2 },
               { type: 0, questionIndex: "09", title: "나의 대화는 주로 내가 읽거나 혹은 들었던 것들이 주가 된다.", score: scoreType2 },
               { type: 0, questionIndex: "10", title: "나는 최근에 다른 사람들로부터 인정을 받거나 혹은 내가 자랑으로 여기고 있는 것들을 글로 써 왔다.", score: scoreType2 }
            ]
         },
         {
            name: '융합역량지능',
            stpeType: 7,
            items: [
               { type: 0, questionIndex: "11", title: "나는 쉽게 암산할 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "12", title: "수학과 과학은 학교 다닐 때 내가 좋아하던 과목 중에 하나였다.", score: scoreType2 },
               { type: 0, questionIndex: "13", title: "논리적 사고를 필요로 하는 게임과 수수께끼를 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "14", title: "새로운 발견과 과학적 진보에 관심이 있다.", score: scoreType2 },
               { type: 0, questionIndex: "15", title: "나는 “만약 무엇을 한다면 어떻게 될까?”와 같은 실험을 해 보기를 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "16", title: "나는 사물 속에서 질서, 논리적 계열 및 유형을 찾고자 한다.", score: scoreType2 },
               { type: 0, questionIndex: "17", title: "나는 거의 모든 것들을 합리적으로 설명할 수 있다고 믿는다.", score: scoreType2 },
               { type: 0, questionIndex: "18", title: "나는 때때로 아주 추상적이고, 말이나 어떤 영상으로 표현할 수 없는 개념을 생각한다.", score: scoreType2 },
               { type: 0, questionIndex: "19", title: "나는 집이나 직장에서 사람들이 말하고 행동하는 것들 중에서 논리적 오류를 발견하는 것을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "20", title: "나는 무엇이든지 어떠한 방식으로 측정되고, 범주화되고, 양적으로 분석될 때 만족감을 느낀다.", score: scoreType2 },
            ]
         },
         {
            name: '융합역량지능',
            stpeType: 8,
            items: [
               { type: 0, questionIndex: "21", title: "나는 눈을 감았을 때 종종 생생한 시각적 영상을 본다.", score: scoreType2 },
               { type: 0, questionIndex: "22", title: "나는 색깔에 민감하다.", score: scoreType2 },
               { type: 0, questionIndex: "23", title: "나는 종종 내 주위에서 본 것을 사진과 동영상 등으로 기록한다.", score: scoreType2 },
               { type: 0, questionIndex: "24", title: "나는 테트리스, 스도쿠 게임, 미로나 기타 시각적 퍼즐 게임을 즐긴다.", score: scoreType2 },
               { type: 0, questionIndex: "25", title: "나는 밤에 생동감 있는 꿈을 꾼다.", score: scoreType2 },
               { type: 0, questionIndex: "26", title: "나는 일반적으로 낯선 장소에서도 길을 잘 찾는 편이다.", score: scoreType2 },
               { type: 0, questionIndex: "27", title: "나는 그림을 그리거나 낙서하는 것을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "28", title: "학교 다닐 때 지리는 대수학보다 더 쉬웠다.", score: scoreType2 },
               { type: 0, questionIndex: "29", title: "어떤 사물을 위에서 직접 조감하면 그것이 어떤 형태가 될 것인지 쉽게 상상할 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "30", title: "나는 삽화가 많이 들어 있는 읽을거리를 더 좋아한다.", score: scoreType2 },
            ]
         },
         {
            name: '융합역량지능',
            stpeType: 9,
            items: [
               { type: 0, questionIndex: "31", title: "나는 정기적으로 한 가지의 스포츠나 혹은 신체적 활동에 참여한다.", score: scoreType2 },
               { type: 0, questionIndex: "32", title: "나는 오랫동안 한 자리에 조용히 앉아 있지 못한다.", score: scoreType2 },
               { type: 0, questionIndex: "33", title: "나는 바느질, 뜨개질, 조각, 목공일, 모형 빌딩 만들기와 같은 손으로 하는 구체적인 활동을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "34", title: "나는 오래 걷거나, 조깅을 하든지 혹은 다른 종류의 신체적 활동을 할 때 가장 좋은 생각이 떠오르곤 한다.", score: scoreType2 },
               { type: 0, questionIndex: "35", title: "나는 종종 자유시간을 바깥에서 보내기를 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "36", title: "나는 누군가와 대화를 나눌 때 손동작이나 다른 형태의 신체 언어를 사용한다.", score: scoreType2 },
               { type: 0, questionIndex: "37", title: "나는 어떤 것을 좀 더 이해하기 위하여 직접 만져 본다.", score: scoreType2 },
               { type: 0, questionIndex: "38", title: "나는 저돌적인 말타기나 그와 유사한 박진감 넘치는 신체적 체험을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "39", title: "나는 나의 몸을 잘 조절할 수 있다고 생각한다.", score: scoreType2 },
               { type: 0, questionIndex: "40", title: "나는 새로운 기술이 적힌 책이나 동영상을 보는 것보다 그것을 직접 실행한다.", score: scoreType2 },
            ]
         },
         {
            name: '융합역량지능',
            stpeType: 10,
            items: [
               { type: 0, questionIndex: "41", title: "나는 즐겁게 노래할 수 있는 좋은 목소리를 가지고 있다.", score: scoreType2 },
               { type: 0, questionIndex: "42", title: "나는 음조가 맞지 않을 때 그것을 쉽게 알 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "43", title: "나는 종종 라디오, CD, 스마트기기 등으로 음악을 듣는다.", score: scoreType2 },
               { type: 0, questionIndex: "44", title: "어떤 악기라도 연주법을 비교적 쉽게 배운다.", score: scoreType2 },
               { type: 0, questionIndex: "45", title: "음악이 없다면 나의 인생은 불행할 것이다.", score: scoreType2 },
               { type: 0, questionIndex: "46", title: "나는 때때로 텔레비전 광고에서 나오는 음악이나 혹은 내 마음속에서 흘러나오는 곡조를 흥얼거리면서 거리를 걷고 있는 나 자신을 발견하게 된다.", score: scoreType2 },
               { type: 0, questionIndex: "47", title: "나는 간단한 타악기로 쉽게 악보의 박자를 맞출 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "48", title: "나는 다양한 노래를 듣거나 악보를 보면 그 음조를 알 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "49", title: "나는 음악을 한두 번 들으면 그것을 거의 정확하게 따라 부를 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "50", title: "나는 종종 일하거나, 공부할 때, 혹은 새로운 것을 학습하는 동안 장단을 맞추거나 멜로디에 맞추어 노래를 부른다.", score: scoreType2 },
            ]
         },
         {
            name: '융합역량지능',
            stpeType: 11,
            items: [
               { type: 0, questionIndex: "51", title: "직장이나 이웃 동네에서 나에게 상담을 요청하고 조언을 구하러 오는 사람이 있다.", score: scoreType2 },
               { type: 0, questionIndex: "52", title: "나는 수영이나 조깅과 같이 혼자서 하는 운동보다는 배드민턴, 배구 혹은 소프트볼 같은 집단 스포츠를 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "53", title: "문제가 생겼을 때, 나는 혼자서 그 문제를 해결하기보다는 다른 사람에게 도움을 요청하는 편이다.", score: scoreType2 },
               { type: 0, questionIndex: "54", title: "나에게는 적어도 세 명의 절친한 친구가 있다.", score: scoreType2 },
               { type: 0, questionIndex: "55", title: "나는 혼자 하는 놀이보다 카드와 같이 여럿이서 하는 오락을 더 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "56", title: "회사나 조직 생활에서 발생하는 문제를 해결하는 절차와 방법을 잘 알고 있다.", score: scoreType2 },
               { type: 0, questionIndex: "57", title: "나는 내 자신을 리더(지도자)라고 생각한다. (혹은 종종 다른 사람들이 나를 그렇게 부른다.)", score: scoreType2 },
               { type: 0, questionIndex: "58", title: "나는 군중 속에 있으면 편안하다.", score: scoreType2 },
               { type: 0, questionIndex: "59", title: "나는 밤에 집에서 혼자 지내기보다는 생동감이 넘치는 파티나 단체모임에서 시간 보내기를 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "60", title: "나는 내가 아는 것을 다른 사람(들)에게 가르치기를 좋아한다.", score: scoreType2 },
            ]
         },
         {
            name: '융합역량지능',
            stpeType: 12,
            items: [
               { type: 0, questionIndex: "61", title: "나는 주기적으로 혼자서 중요한 인생의 문제에 관해 사색하고, 반성하는 시간을 갖는다.", score: scoreType2 },
               { type: 0, questionIndex: "62", title: "나는 나 자신을 좀 더 알기 위해서 자아 성장 프로그램이나 상담에 참여하곤 한다.", score: scoreType2 },
               { type: 0, questionIndex: "63", title: "나는 좌절하지 않고 실패에 대처할 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "64", title: "나는 나에게 알맞은 특별한 취미와 관심이 있다.", score: scoreType2 },
               { type: 0, questionIndex: "65", title: "나는 항상 잊지 않고 다짐하는 중요한 인생 목표를 가지고 있다.", score: scoreType2 },
               { type: 0, questionIndex: "66", title: "나는 나의 장점과 단점을 잘 알고 있다.", score: scoreType2 },
               { type: 0, questionIndex: "67", title: "나는 주말에 사람들이 많이 모이는 휴양지보다 편안하고 조용한 공간에서 보내기를 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "68", title: "나는 나 자신을 의지가 강하고, 독립적으로 생활할 수 있는 사람이라고 생각한다.", score: scoreType2 },
               { type: 0, questionIndex: "69", title: "나는 나 자신의 내적인 삶을 기록하기 위하여 일기나 일지 등을 쓴다.", score: scoreType2 },
               { type: 0, questionIndex: "70", title: "나는 자유업이나 개인사업을 시작해 볼까 하고 심각하게 고려해 본 적이 있다.", score: scoreType2 },
            ]
         },
         {
            name: '융합역량지능',
            stpeType: 13,
            items: [
               { type: 0, questionIndex: "71", title: "내가 가장 좋아하는 프로그램은 자연을 소재로 한 다큐멘터리다.", score: scoreType2 },
               { type: 0, questionIndex: "72", title: "나는 수의사, 원예사, 조련사 등 자연과 관련된 직업을 갖고싶다.", score: scoreType2 },
               { type: 0, questionIndex: "73", title: "나는 새로운 곳을 탐험하는 것을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "74", title: "곤충이나 식물 관찰 일기를 써 본적이 있다.", score: scoreType2 },
               { type: 0, questionIndex: "75", title: "집에서 화분이나 곤충, 애완동물 등 무언가를 기르고 있다.", score: scoreType2 },
               { type: 0, questionIndex: "76", title: "날씨의 변화, 기후, 그리고 음식의 맛을 잘 알아차린다.", score: scoreType2 },
               { type: 0, questionIndex: "77", title: "나는 정원에서 일하는 것이 즐겁다.", score: scoreType2 },
               { type: 0, questionIndex: "78", title: "들판이나 바다 등 자연을 통해서 직접 영어를 배우는 것이 좋다.", score: scoreType2 },
               { type: 0, questionIndex: "79", title: "나에게는 생태학적 문제들이 중요하다.", score: scoreType2 },
               { type: 0, questionIndex: "80", title: "동물이나 식물에 관하여 많은 정보를 알고 있다.", score: scoreType2 },
            ]
         },
      ],
      step3: [
         {
            name: '에너지 방향',
            stpeType: 14,
            items: [
               { type: 0, questionIndex: "01", title: "다른 사람과 같이 있을 때 활력을 얻는다.", score: scoreType2 },
               { type: 0, questionIndex: "02", title: "혼자 조용히 있을 때 활력을 얻는다.", score: scoreType2 },
               { type: 0, questionIndex: "03", title: "관심이 집중되는 것을 추구한다.", score: scoreType2 },
               { type: 0, questionIndex: "04", title: "관심이 집중되는 것을 될 수 있으면 피한다.", score: scoreType2 },
               { type: 0, questionIndex: "05", title: "행동하고 나서 생각한다.", score: scoreType2 },
               { type: 0, questionIndex: "06", title: "먼저 생각해 보고 나서 행동한다.", score: scoreType2 },
               { type: 0, questionIndex: "07", title: "폭넓은 사람과 친교를 갖는 것을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "08", title: "마음이 맞는 몇몇과 지내는 것이 편하다.", score: scoreType2 },
               { type: 0, questionIndex: "09", title: "듣기보다는 말하는 편이다.", score: scoreType2 },
               { type: 0, questionIndex: "10", title: "말하기보다는 들어주는 편이다.", score: scoreType2 },
               { type: 0, questionIndex: "11", title: "즉시 빠르게 반응을 한다.", score: scoreType2 },
               { type: 0, questionIndex: "12", title: "신중하게 천천히 반응한다.", score: scoreType2 },
               { type: 0, questionIndex: "13", title: "다양한 것에 관심이 많다.", score: scoreType2 },
               { type: 0, questionIndex: "14", title: "관심이 있는 것은 깊이 파고든다.", score: scoreType2 },
               { type: 0, questionIndex: "15", title: "한 가지를 선택하고 집중하기가 어렵다.", score: scoreType2 },
               { type: 0, questionIndex: "16", title: "중요한 것 하나를 선택하고 집중한다.", score: scoreType2 },
            ]
         },
         {
            name: '에너지 방향',
            stpeType: 15,
            items: [
               { type: 0, questionIndex: "17", title: "구체적이고 감각적이고 확실한 사실만 믿는다.", score: scoreType2 },
               { type: 0, questionIndex: "18", title: "자신의 통찰, 직관, 영적 감수성을 믿는다.", score: scoreType2 },
               { type: 0, questionIndex: "19", title: "아이디어가 확실성이 있을 때 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "20", title: "아이디어가 실용적이고 효율적이어야 좋다.", score: scoreType2 },
               { type: 0, questionIndex: "21", title: "현실적이고 보편적인 것에 의미를 둔다.", score: scoreType2 },
               { type: 0, questionIndex: "22", title: "영감을 주고 혁신적인 것에 의미를 둔다.", score: scoreType2 },
               { type: 0, questionIndex: "23", title: "확인된 방법을 그대로 유지 사용한다.", score: scoreType2 },
               { type: 0, questionIndex: "24", title: "혁신적인 방법을 사용하고 변화를 추구한다.", score: scoreType2 },
               { type: 0, questionIndex: "25", title: "구체적으로 묘사하는 표현을 선호한다.", score: scoreType2 },
               { type: 0, questionIndex: "26", title: "상징적이고 은유적인 표현을 선호한다.", score: scoreType2 },
               { type: 0, questionIndex: "27", title: "직접적으로 설명하는 스타일이다.", score: scoreType2 },
               { type: 0, questionIndex: "28", title: "간접적으로 우회하며 설명하는 스타일이다.", score: scoreType2 },
               { type: 0, questionIndex: "29", title: "지금 여기, 현실지향성이 강하게 보여진다.", score: scoreType2 },
               { type: 0, questionIndex: "30", title: "다가오는 희망, 미래를 향해 있다.", score: scoreType2 },
               { type: 0, questionIndex: "31", title: "확실한 것을 추구한다.", score: scoreType2 },
               { type: 0, questionIndex: "32", title: "변화와 혁신을 추구한다.", score: scoreType2 },
            ]
         },
         {
            name: '에너지 방향',
            stpeType: 16,
            items: [
               { type: 0, questionIndex: "33", title: "물러서서 문제를 객관적으로 분석해 본다.", score: scoreType2 },
               { type: 0, questionIndex: "34", title: "앞서가며 문제가 가져올 결과를 예측한다.", score: scoreType2 },
               { type: 0, questionIndex: "35", title: "논리, 정의, 공정을 선호하고 예외는 없다.", score: scoreType2 },
               { type: 0, questionIndex: "36", title: "공감과 화합이 중요하고 예외도 허용한다.", score: scoreType2 },
               { type: 0, questionIndex: "37", title: "논리적일 때 느낌도 가치가 있을 뿐이다.", score: scoreType2 },
               { type: 0, questionIndex: "38", title: "모든 느낌은 논리를 뛰어 넘어 소중하다.", score: scoreType2 },
               { type: 0, questionIndex: "39", title: "타인에 대해 비판적이고 결점을 많이 본다.", score: scoreType2 },
               { type: 0, questionIndex: "40", title: "만족하고 감사하며 타인을 기쁘게 한다.", score: scoreType2 },
               { type: 0, questionIndex: "41", title: "냉정, 무감각, 배려심 없는 것으로 오해된다.", score: scoreType2 },
               { type: 0, questionIndex: "42", title: "감상적이고 나약하며 논리 없다고 오해된다.", score: scoreType2 },
               { type: 0, questionIndex: "43", title: "충실하고 무게 있게 움직인다.", score: scoreType2 },
               { type: 0, questionIndex: "44", title: "센스 있게 상황에 적응한다.", score: scoreType2 },
               { type: 0, questionIndex: "45", title: "성취동기와 목적의식이 분명하다.", score: scoreType2 },
               { type: 0, questionIndex: "46", title: "감사나 보상받고자 하는 욕구가 강하다.", score: scoreType2 },
               { type: 0, questionIndex: "47", title: "보편적인 원칙에 관심이 있다.", score: scoreType2 },
               { type: 0, questionIndex: "48", title: "개인적인 동기에 중점을 둔다.", score: scoreType2 },
            ]
         },
         {
            name: '에너지 방향',
            stpeType: 17,
            items: [
               { type: 0, questionIndex: "49", title: "무엇이든 빨리 결정해야 편해진다.", score: scoreType2 },
               { type: 0, questionIndex: "50", title: "상황을 보면서 천천히 결정하는 게 좋다.", score: scoreType2 },
               { type: 0, questionIndex: "51", title: "말부터 먼저 꺼내놓고 시작한다.", score: scoreType2 },
               { type: 0, questionIndex: "52", title: "먼저 놀고 나야 일할 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "53", title: "목표를 세워놓고 계획을 달성하려 노력한다.", score: scoreType2 },
               { type: 0, questionIndex: "54", title: "상황에 따라 목표는 변화될 수 있다.", score: scoreType2 },
               { type: 0, questionIndex: "55", title: "결과를 중시한다.", score: scoreType2 },
               { type: 0, questionIndex: "56", title: "과정이 보다 중요하다.", score: scoreType2 },
               { type: 0, questionIndex: "57", title: "일을 마무리 져야 한다.", score: scoreType2 },
               { type: 0, questionIndex: "58", title: "새로운 일을 벌이기를 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "59", title: "자기 통제력과 결단성이 있고 자신에게 엄격하다.", score: scoreType2 },
               { type: 0, questionIndex: "60", title: "참을성이 있고 적응력이 뛰어나다.", score: scoreType2 },
               { type: 0, questionIndex: "61", title: "모임에서 대화가 옆길로 가면 화가 난다.", score: scoreType2 },
               { type: 0, questionIndex: "62", title: "모임에서 대화가 옆길로 가도 문제없다.", score: scoreType2 },
               { type: 0, questionIndex: "63", title: "마감 날짜나 약속시간을 잘 지키는 편이다.", score: scoreType2 },
               { type: 0, questionIndex: "64", title: "마감 날짜와 약속시간을 종종 넘긴다.", score: scoreType2 },
            ]
         },
         {
            name: '힘의 균형',
            stpeType: 18,
            items: [
               { type: 0, questionIndex: "65", title: "나는 독립적인 편이고 자기주장을 잘하며, 목표를 설정하고 일을 추진한다.", score: scoreType2 },
               { type: 0, questionIndex: "66", title: "나는 상황에 정면으로 맞설 때 삶이 잘 풀린다고 느낀다.", score: scoreType2 },
               { type: 0, questionIndex: "67", title: "그리고 추진하는 일이 성취되기를 원한다.", score: scoreType2 },
               { type: 0, questionIndex: "68", title: "나는 가만히 앉아 있는 것을 좋아하지 않으며, 일도 노는 것도 열심히 한다.", score: scoreType2 },
               { type: 0, questionIndex: "69", title: "나는 큰 일을 성취하고 영향력을 행사하기를 원한다.", score: scoreType2 },
               { type: 0, questionIndex: "70", title: "나는 정면 대결을 원하지는 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "71", title: "사람들이 나를 통제하는 것을 좋아하지 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "72", title: "대개의 경우 나는 내가 원하는 것을 잘 알고 있다.", score: scoreType2 },
            ]
         },
         {
            name: '힘의 균형',
            stpeType: 19,
            items: [
               { type: 0, questionIndex: "73", title: "나는 조용하게 혼자 있는 것을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "74", title: "나는 사회적인 활동에 주의를 쏟지 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "75", title: "대체로 내 의견을 강하게 주장하지 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "76", title: "나는 앞에 나서는 것을 그리 좋아하진 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "77", title: "나는 다른 사람들과 경쟁하는 것을 그리 좋아하지 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "78", title: "사람들은 나를 이상주의자 몽상가라고 말한다.", score: scoreType2 },
               { type: 0, questionIndex: "79", title: "내 상상의 세계 안에서는 많은 흥미로운 일들이 벌어진다.", score: scoreType2 },
               { type: 0, questionIndex: "80", title: "나는 적극적이고 활동적이라기보다는 조용한 성격이다.", score: scoreType2 },
            ]
         },
         {
            name: '힘의 균형',
            stpeType: 20,
            items: [
               { type: 0, questionIndex: "81", title: "나는 아주 책임감이 강하고 헌신적이다.", score: scoreType2 },
               { type: 0, questionIndex: "82", title: "나는 내 의무를 다하지 못할 때 아주 기분이 나쁘다.", score: scoreType2 },
               { type: 0, questionIndex: "83", title: "나는 사람들이 필요할 때 내가 있다는 것을 알아주면 좋겠다.", score: scoreType2 },
               { type: 0, questionIndex: "84", title: "나는 그들을 위해 최선을 다할 것이다.", score: scoreType2 },
               { type: 0, questionIndex: "85", title: "가끔 나는 사람들이 알든 말든 그들을 위해 큰 희생을 한다.", score: scoreType2 },
               { type: 0, questionIndex: "86", title: "나는 내 자신을 제대로 돌보지 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "87", title: "나는 해야 할 일을 한 다음 휴식을 취하거나 원하는 일을 한다.", score: scoreType2 },
               { type: 0, questionIndex: "88", title: "나는 선과 악, 빛과 어둠, 호불호가 명확하다.", score: scoreType2 },
            ]
         },
         {
            name: '힘의 균형',
            stpeType: 21,
            items: [
               { type: 0, questionIndex: "89", title: "나는 대개 긍정적인 자세로 생활한다.", score: scoreType2 },
               { type: 0, questionIndex: "90", title: "모든 일이 나에게 유리한 쪽으로 풀린다.", score: scoreType2 },
               { type: 0, questionIndex: "91", title: "열정을 쓰는 여러 가지 방법들을 찾는다.", score: scoreType2 },
               { type: 0, questionIndex: "92", title: "사람들과 함께 행복해지는 것을 돕는다.", score: scoreType2 },
               { type: 0, questionIndex: "93", title: "다른 사람들도 잘 지내기를 바란다.", score: scoreType2 },
               { type: 0, questionIndex: "94", title: "타인에게 긍정적으로 보이기를 원한다.", score: scoreType2 },
               { type: 0, questionIndex: "95", title: "내 자신의 문제를 다루는 것을 미루기도 한다.", score: scoreType2 },
            ]
         },
         {
            name: '힘의 균형',
            stpeType: 22,
            items: [
               { type: 0, questionIndex: "96", title: "나는 어떤 것에 대해 강한 감정을 갖는다.", score: scoreType2 },
               { type: 0, questionIndex: "97", title: "많은 이들은 내가 불만이 많이 있다고 생각한다.", score: scoreType2 },
               { type: 0, questionIndex: "98", title: "나는 사람들 앞에서 내 감정을 억제한다.", score: scoreType2 },
               { type: 0, questionIndex: "99", title: "남들이 생각하는 것보다 더 민감하다.", score: scoreType2 },
               { type: 0, questionIndex: "100", title: "그들은 어떤 사람인가? 무엇을 원하는가? 궁금하다.", score: scoreType2 },
               { type: 0, questionIndex: "101", title: "어떤 일에 내가 화가 났을 때 사람들이 그것에 대해 반응하고 그 일을 해결하려고 노력해 주기를 바란다.", score: scoreType2 },
               { type: 0, questionIndex: "102", title: "나는 규칙을 알고 있다. 하지만 사람들이 내게 무엇을 하라고 지시하는 것을 좋아하지 않는다.", score: scoreType2 },
            ]
         },
         {
            name: '힘의 균형',
            stpeType: 23,
            items: [
               { type: 0, questionIndex: "103", title: "나는 스스로를 잘 통제하고 논리적이다.", score: scoreType2 },
               { type: 0, questionIndex: "104", title: "나는 느낌을 다루는 것을 편안해하지 않는다.", score: scoreType2 },
               { type: 0, questionIndex: "105", title: "나는 효율적이고, 완벽하게 일을 처리한다.", score: scoreType2 },
               { type: 0, questionIndex: "106", title: "혼자 일하는 것을 좋아한다.", score: scoreType2 },
               { type: 0, questionIndex: "107", title: "문제가 개인적인 갈등이 있을 때 나는 그 상황에 감정이 끼어들지 않도록 한다.", score: scoreType2 },
               { type: 0, questionIndex: "108", title: "어떤 사람들은 내가 너무 차갑고 초연하다고 말하지만 나는 감정 때문에 중요한 일을 그르치고 싶지 않다.", score: scoreType2 },
               { type: 0, questionIndex: "109", title: "나는 사람들이 나를 화나게 할 때 대부분의 경우 반응을 보이지 않는다.", score: scoreType2 },
            ]
         },
         {
            name: '관계와 소통',
            stpeType: 24,
            items: [
               { type: 3, questionIndex: "110", title: "상냥하고 부드러우며 애정이 깃들어 있는 대화나 태도를 취한다.", score: scoreType2 },
               { type: 2, questionIndex: "111", title: "사회의 윤리, 도덕, 규칙 규범 등을 중시하고 준수한다.", score: scoreType2 },
               { type: 6, questionIndex: "112", title: "부모나 상사 등 윗사람이 시키는 대로 한다.", score: scoreType2 },
               { type: 5, questionIndex: "113", title: "행동이나 말이 자연스럽고 자유롭다.", score: scoreType2 },
               { type: 4, questionIndex: "114", title: "말이나 행동이 냉정하고 침착하며 안정적인 분위기를 느끼게 한다.", score: scoreType2 },
               { type: 2, questionIndex: "115", title: "다른 사람들에게 ‘내가 말하는 대로 된다’라는 말을 자주 한다.", score: scoreType2 },
               { type: 3, questionIndex: "116", title: "다른 사람을 험담하고 뒷담화 하는 것보다 칭찬을 잘하는 편이다.", score: scoreType2 },
               { type: 5, questionIndex: "117", title: "자신을 ‘제멋대로, 자유롭다!’라고 생각한다.", score: scoreType2 },
               { type: 4, questionIndex: "118", title: "사람들은 나를 계산적이며 이해득실을 생각하고 행동한다고 한다.", score: scoreType2 },
               { type: 5, questionIndex: "119", title: "호기심이 강하고 기발하고 창의적인 생각을 잘한다.", score: scoreType2 },
               { type: 6, questionIndex: "120", title: "말을 하면서 상대방의 안색을 잘 살피면서 내용을 조절한다.", score: scoreType2 },
               { type: 3, questionIndex: "121", title: "사회봉사 활동에 참가하기를 좋아한다.", score: scoreType2 },
               { type: 2, questionIndex: "122", title: "대화에서 격언이나 속담을 잘 인용한다.", score: scoreType2 },
               { type: 3, questionIndex: "123", title: "다른 사람으로부터 부탁을 받으면 거절하지 못한다.", score: scoreType2 },
               { type: 4, questionIndex: "124", title: "6하원칙에 따라 사리를 따지거나 설명하는 편이다.", score: scoreType2 },
               { type: 5, questionIndex: "125", title: "TV, 영화 등을 보면서 마음이 약해 눈물을 잘 흘리는 편이다.", score: scoreType2 },
               { type: 6, questionIndex: "126", title: "다른 사람의 마음에 들고 싶다고 생각하며 좋은 평판을 유지한다.", score: scoreType2 },
               { type: 6, questionIndex: "127", title: "‘법 없이도 살 사람’이라는 소리를 잘 듣는다.", score: scoreType2 },
               { type: 4, questionIndex: "128", title: "일상에서 ‘자세가 바르며 여유가 있다’라는 말을 자주 듣는다.", score: scoreType2 },
               { type: 4, questionIndex: "129", title: "나에게 주어진 일을 효율적이고 능률적으로 처리한다.", score: scoreType2 },
               { type: 6, questionIndex: "130", title: "일터에서나 사람들과 매사에 조심스럽고 소극적인 편이다.", score: scoreType2 },
               { type: 4, questionIndex: "131", title: "대화에서 감정적으로 되지 않고 이성적으로 풀어가려 한다.", score: scoreType2 },
               { type: 3, questionIndex: "132", title: "후배나 아이들의 실패에 대해 관대하고 격려한다.", score: scoreType2 },
               { type: 2, questionIndex: "133", title: "사람들과의 관계에서 책임감이 강하고 약속시간을 잘 지킨다.", score: scoreType2 },
               { type: 3, questionIndex: "134", title: "나를 찾는 상대방의 이야기를 잘 경청하고 공감하는 편이다.", score: scoreType2 },
            ]
         },
         {
            name: '관계와 소통',
            stpeType: 24,
            items: [
               { type: 3, questionIndex: "135", title: "의리나 인정에 끌려 아이나 후배, 동료 등 누군가를 마음에 걸려 한다.", score: scoreType2 },
               { type: 5, questionIndex: "136", title: "친구나 동료, 후배나 약자들에게 신체적 접촉이나 스킨십이 많다.", score: scoreType2 },
               { type: 2, questionIndex: "137", title: "아이들이나 후배를 엄격하게 다루며 지배하고자 하는 생각이 있다.", score: scoreType2 },
               { type: 6, questionIndex: "138", title: "남과 비교하며 열등감이 강한 편이고 자신의 감정을 잘 억누르는 편이다.", score: scoreType2 },
               { type: 3, questionIndex: "139", title: "동정심이나 배려심이 강하고 어린이나 타인을 돌봐주기를 좋아한다.", score: scoreType2 },
               { type: 2, questionIndex: "140", title: "대화 시에 상대방의 말을 가로막고 자신의 생각을 말하려고 한다.", score: scoreType2 },
               { type: 5, questionIndex: "141", title: "일상에서 기쁨이나 슬픔, 분노나 사랑을 직접적으로 잘 표현한다.", score: scoreType2 },
               { type: 4, questionIndex: "142", title: "사람이나 상황을 판단할 때 어떤 일이나 사실에 근거해서 판단한다.", score: scoreType2 },
               { type: 2, questionIndex: "143", title: "시선이 밖으로 향하는 편이며 상대의 실수를 지적하고 정정하려고 한다.", score: scoreType2 },
               { type: 6, questionIndex: "144", title: "사람들 앞에서 생각하고 있는 바를 입 밖으로 내지 못하는 성질이다.", score: scoreType2 },
               { type: 5, questionIndex: "145", title: "여유가 없는데도 오락이나 술, 도박 등을 만족할 때까지 지속한다.", score: scoreType2 },
               { type: 4, questionIndex: "146", title: "미래의 일을 냉정하고 예리하게 예측하고 행동한다.", score: scoreType2 },
               { type: 5, questionIndex: "147", title: "가만히 생각해 보면 나는 욕심나는 것을 가지지 않고는 못 배긴다.", score: scoreType2 },
               { type: 6, questionIndex: "148", title: "자신의 생각을 관철하기 보다는 타협하는 경우가 많다.", score: scoreType2 },
               { type: 3, questionIndex: "149", title: "신이 나면 도가 지나쳐서 실수를 하게 되는 경우가 종종 있다.", score: scoreType2 },
               { type: 4, questionIndex: "150", title: "일어난 현상을 잘 관찰하고 분석하여 합리적으로 의사를 결정한다.", score: scoreType2 },
               { type: 6, questionIndex: "151", title: "중얼중얼 하는 목소리로 말하거나 우물쭈물하며 거절한다.", score: scoreType2 },
               { type: 2, questionIndex: "152", title: "때로는 상대를 바보 취급하거나 멸시한다.", score: scoreType2 },
               { type: 5, questionIndex: "153", title: "사람들과 함께 있을 때 밝고 유머가 있으며 장난을 잘 치는 편이다.", score: scoreType2 },
               { type: 3, questionIndex: "154", title: "곤경에 처해 있는 사람을 위로하거나 힘을 주기를 즐겨 한다.", score: scoreType2 },
               { type: 4, questionIndex: "155", title: "어떤 결정을 내릴 때 사실을 확인하거나 반대의견을 듣는다.", score: scoreType2 },
               { type: 6, questionIndex: "156", title: "‘~해도 괜찮을까요? ~할 생각입니다. 이젠 괜찮습니다.’라는 말을 쓴다.", score: scoreType2 },
               { type: 5, questionIndex: "157", title: "‘굉장하다. 와! 멋있다. 아하!’ 등의 감탄사를 많이 사용한다.", score: scoreType2 },
               { type: 2, questionIndex: "158", title: "권리를 주장하기 전에 의무를 다한다.", score: scoreType2 },
               { type: 2, questionIndex: "159", title: "‘당연히 ~해야 한다. ~하지 않으면 안 된다’는 말을 많이 쓴다.", score: scoreType2 }
            ]
         },
      ],
      step4: [
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: "01",
                  title: "당신의 어머니는 친절한 분이었나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "02",
                  title: "당신의 아버지는 친절한 분이었나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "03",
                  title: "형제, 자매들과의 기억은 긍정적인가요? (외동일 경우, 형제자매 없이 외동으로 혼자 자라는 것에 만족했나요?)",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: "04",
                  title: "당신을 괴롭혔던 친구들에 대한 기억이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "05",
                  title: "어린시절, 떠올리면 기분 좋은, 친구들에 대한 기억이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "06",
                  title: "10세 이전에 만났던 선생님들에 대한 기억은 긍정적인가요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: "07",
                  title: "또래 친구들과 어울리면서 왕따를 경험한 적이 있나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: "08",
                  title: "성장하면서 몸이 아프거나 크게 다친 경험이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "09",
                  title: "많은 사람들 앞에서 말하거나 노래하면서 기분좋았던 기억이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "10",
                  title: "나의 최초의 기억(가장 오래된 기억)은 긍정적인 장면인가요?",
                  score: scoreType3
               }
            ]
         },
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: "11",
                  title: "학교에서 성적은 만족할만한 수준이었나요? (학교에 다니지 않았다면, 이 시절 학업에 대한 기억은 긍정적인가요?)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "12",
                  title: "이 시절 나의 외모에 만족했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "13",
                  title: "청소년기 연애경험은 건전하고 긍정적이었나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "14",
                  title: "이 시기, 부모님과의 관계는 원만하고 만족스러웠나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "15",
                  title: "이 시기, 형제 자매는 나에게 힘이 되는 존재였나요? (외동이라면, 나를 형제 자매처럼 아껴주는 존재가 있었나요?)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "16",
                  title: "친구들과 야외를 뛰어 놀거나 활동적인 놀이를 했던 기억이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "17",
                  title: "내가 다니던 학교에 대해서는 만족했나요? (학교에 다니지 않았다면, 동네 생활에 대해서는 만족했나요?)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "18",
                  title: "이 시기에 나의 적성과 인생의 목표에 대해서 생각하고 고민했나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: "19",
                  title: "친구들과 다투었던 기억이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "20",
                  title: "비밀스러운 이야기를 나누던 또래 친구들이 있었나요?",
                  score: scoreType3
               }
            ]
         },
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: "21",
                  title: "마음에 맞는 연애상대를 만나 좋은 관계를 유지했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "22",
                  title: "고민이나 걱정을 깊이 있게 나눌 친구가 있(었)나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "23",
                  title: "적절한 직장을 찾아 일할 수 있게 되었나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "24",
                  title: "부모님(또는 지원자)으로부터 재정적 독립을 했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "25",
                  title: "내가 선택한 전공이나 직장에 대해 만족하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "26",
                  title: "해외를 여행하면서 다른 나라의 문화를 체험했나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: "27",
                  title: "술이나 담배, 과로 등으로 인해 건강을 해치지는 않(았)나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "28",
                  title: "건강 관리를 위해 적당한 운동이나 활동을 했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "29",
                  title: "결혼이나 독립을 위한 계획과 준비를 했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "30",
                  title: "학교나 직장 이외에 종교, 동아리, 취미모임 등에 규칙적으로 참여하나요?",
                  score: scoreType3
               }
            ]
         },
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: '31',
                  title: "결혼하여 이룬 가정에 대해 만족하나요? (미혼이라면, 현재의 가정 형태에 만족하나요?)",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: '32',
                  title: "금전적으로 어려움이나 갈등이 생긴 경험이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '33',
                  title: "직장이나 그 외 내가 속한 조직에서 나를 존중하고 이해해 주었나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: '34',
                  title: "심신의 건강상 어려움을 겪었던 경험이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '35',
                  title: "오래된 친구들이나 동료들을 만나거나 연락을 주고 받나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: '36',
                  title: "불안이나 우울, 분노나 화가 폭발했던 경험이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '37',
                  title: "심신의 안정을 위해 정기적으로 참여하는 활동이 있나요? (종교활동, 독서모임, 자조모임, 요가 등)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '38',
                  title: "정서적인 어려움이 생겼을 때, 믿고 의논할만한 상대가 있나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: '39',
                  title: "부모님이나 가족에게 사고, 질병 등의 어려움이 있었나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '40',
                  title: "내가 다니는 직장이나 역할, 하고있는 일에 자부심을 느끼나요?",
                  score: scoreType3
               }
            ]
         },
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: '41',
                  title: "자녀를 양육하면서 행복했나요? (자녀가 없다면, 아이를 낳지 않은 선택에 만족하나요?)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '42',
                  title: "부부관계(파트너와의 관계)는 만족할만 했나요? (파트너가 없는 상태라면, 그 상황에 만족했나요?)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '43',
                  title: "직장에서 나의 역할이나 위치에 만족했나요? (주부라면, 가정에서 나의 역할이나 위치에 만족했나요?)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '44',
                  title: "종교활동, 동아리, 취미모임 등에 정기적으로 참여하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '45',
                  title: "가족간에 갈등은 없었나요? (부모자녀, 형제자매 등)",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '46',
                  title: "가정생활을 유지하는데 적절한 유지비용을 가졌나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: '47',
                  title: "시력이나 치아, 머리카락 등 신체적으로 큰 변화가 있나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: '48',
                  title: "정서적으로 불안이나 걱정, 우울이 찾아오곤 했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '49',
                  title: "중년으로 접어드는 시기임을 느끼며 자연스럽게 대비했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: '50',
                  title: "변화되는 사회적 위치를 느끼며 알맞게 적응했나요?",
                  score: scoreType3
               }
            ]
         },
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: "51",
                  title: "주변 사람들과의 관계는 원만한가요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "52",
                  title: "경제적으로 어려움은 없었나요?",
                  score: scoreType3
               },
               {
                  type: 1,
                  questionIndex: "53",
                  title: "이직, 실직, 은퇴 등의 문제로 고민한 적이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "54",
                  title: "내 인생은 성공적이었고, 만족했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "55",
                  title: "호르몬의 영향으로 찾아오는 갱년기를 잘 극복했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "56",
                  title: "나의 삶이 사회적으로 의미 있는 영향력을 주었다고 생각하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "57",
                  title: "내 인생은 나름 의미있고 가치 있었다고 생각하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "58",
                  title: "해결할 수 없는 부조리와 불의에 대해서는 잘 해결했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "59",
                  title: "신의 믿고 의지했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "60",
                  title: "내 삶은 새롭게 2막을 시작할 수 있다고 생각하나요?",
                  score: scoreType3
               }
            ]
         },
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: "61",
                  title: "지난 시간, 내가 살아온 인생에 만족하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "62",
                  title: "그동안 내가 만난 사람들과 행복했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "63",
                  title: "내가 살아왔던 동네나 집, 주변 환경에는 만족했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "64",
                  title: "나의 가족들과 친지들에 대해 만족했나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "65",
                  title: "현재 나의 삶은, 이대로도 의미가 있다고 생각하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "66",
                  title: "인생을 상담하거나 조언을 구하는 후배들이 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "67",
                  title: "가깝게 연락하고 지내는 친구나 동료가 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "68",
                  title: "이전에 비해 경제적으로 어려움 없이 지내고 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "69",
                  title: "마음만 먹으면 지금도 새로운 일이나 관계를 해나갈 수 있다고 생각하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "70",
                  title: "건강관리와 유지는 잘 되고 있나요?",
                  score: scoreType3
               }
            ]
         },
         {
            name: '인생점수',
            stpeType: 25,
            items: [
               {
                  type: 0,
                  questionIndex: "71",
                  title: "현재 나의 건강상태에 만족하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "72",
                  title: "자산 유지와 관리, 일상을 위한 비용에는 문제가 없나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "73",
                  title: "함께 지내온 가족이나 친지, 동료들에게 감사한가요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "74",
                  title: "내 삶에 상처나 위기를 준 사람들을 이해하고 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "75",
                  title: "나에게 주어진 모든 것들에 만족하고 감사하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "76",
                  title: "노화와 죽음을 자연스럽게 받아들이고 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "77",
                  title: "규칙적인 신앙생활이나 마음돌봄으로 삶에 평안을 누리고 있나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "78",
                  title: "내 삶은 의미있고, 보람있는 삶이었다고 평가하나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "79",
                  title: "다시 태어난다해도, 지금의 ‘나’이기를 바라나요?",
                  score: scoreType3
               },
               {
                  type: 0,
                  questionIndex: "80",
                  title: "지금 죽는다 해도 큰 후회나 미련, 원망은 없나요?",
                  score: scoreType3
               }
            ]
         },
      ]
   }

   const currentProgress = Number(Cookies.get('currentProgress'));
   useEffect(() => {
      if (!currentProgress) return;
      const updatedStep = currentProgress === 25 ? 2
         : currentProgress === 50 ? 3
            : currentProgress === 75 || currentProgress === 80 ? 4
               : 1

      setCurrentStep(updatedStep)
   }, [currentProgress])

   // 최종 검사 데이터 
   useEffect(() => {
      if (!userData) return; // 유저 데이터를 쿠키에서 가져오기 전이면 종료
      setLoadingFinalData(true);

      const questions = stepQuestions[`step${currentStep}`]; // 현재 스텝에 맞는 검사 질문들
      const userAge = Number(userData.age);
      const isUnder40s = userAge < 40; // 나이가 40세 미만인지 확인
      const maxPagesByAge = userAge < 15 ? 1 : Math.min(8, Math.floor((userAge - 5) / 10) + 1);

      let filteredQuestions = questions; // 기본적으로 모든 질문 포함

      if (currentStep === 1) {
         // 나이에 따른 필터링 처리
         filteredQuestions = questions.filter((item) =>
            isUnder40s ? !item.over40s : !item.under40s
         );
      } else if (currentStep === 4) {
         // 최대 페이지 수에 따라 필터링
         filteredQuestions = questions.slice(0, maxPagesByAge);
      }

      setFinalQuestions({ currentPage: currentPage, data: filteredQuestions });

      setLoadingFinalData(false)
   }, [userData, currentStep, currentPage]);


   const handlePrevPage = () => {
      if (currentStep === 1 && currentPage <= 1) {
         alert('첫번째 페이지입니다.');
         return;
      }

      if (currentPage <= 1) { // 1페이지 에서 클릭했을 때
         if (currentStep === 4) {
            setCurrentPage(12); // 스텝 3 마지막 페이지
         } else if (currentStep === 3) {
            setCurrentPage(8); // 스텝 2 마지막 페이지
         } else if (currentStep === 2) {
            setCurrentPage(6); // 스텝 1 마지막 페이지
         }
         setCurrentStep(prev => prev - 1); // 이전 스텝으로 변경
      } else {
         setCurrentPage(prev => prev - 1) // 이전 페이지로 변경
      }
   };

   // 다음 버튼 클릭 했을 때
   const handleNextPage = async () => {
      if (currentStep === 4 && currentPage === finalQuestions.data.length) {
         alert('마지막 페이지 입니다.')
         return;
      }

      // ===== 질문에 모두 체크했는지 확인 =====
      const currentItem = finalQuestions.data[finalQuestions.currentPage - 1].items
      const isAllChecked = currentItem.every((item) => item.score.some((score) => score.checked))

      if (!isAllChecked) {
         alert('질문에 모두 체크해주세요');
         return;
      }

      // 데이터 저장부터 하고 아래 코드 실행 
      await sendData();

      // 마지막 페이지에서 다음 버튼을 클릭했을 때
      if (currentPage >= finalQuestions.data.length) {
         setCurrentPage(1); // 1페이지부터 다시 시작
         setCurrentStep(prev => prev + 1) // 다음 스텝으로 변경
         progressUpdate() // 진행률 업데이트 함수
      }
      // 마지막 페이지가 아니면 다음 페이지로 이동
      else {
         setCurrentPage(prev => prev + 1)
      }
   };

   // ===== 새로고침 시 경고 =====
   useEffect(() => {
      const preventClose = (e) => {
         e.preventDefault();
         e.returnValue = "";
      }

      window.addEventListener("beforeunload", preventClose);
      return () => window.removeEventListener("beforeunload", preventClose);
   }, [])

   // ===== 데이터 전송 =====
   const sendData = async (isIntermediate) => {

      if (!inspectId || !userData) {
         alert('잠시 후 다시 시도해 주세요.')
         return;
      }

      const currentData = finalQuestions.data[finalQuestions.currentPage - 1].items;
      const saveArr = currentData.reduce((acc, item) => {
         const checkedScore = item.score.find((score) => score.checked);
         if (checkedScore) {
            acc.push({
               order_number: parseInt(item.questionIndex, 10),
               value: checkedScore.number,
               type: item.type
            });
         }
         return acc;
      }, []);

      const stepType = finalQuestions.data[finalQuestions.currentPage - 1].stpeType;

      try {
         await axios.post(`${process.env.REACT_APP_API_URL}/inspect/insight/save`, {
            id: inspectId,
            name: userData.name,
            phone: userData.phone,
            step_type: stepType,
            saveArr: saveArr,
         })
         isIntermediate === 'IntermediateSave' && alert('중간 저장 되었습니다.')
      } catch (error) {
         console.error(error)
         alert(error.response?.data?.msg || '일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
      }
   }

   // ===== 저장된 데이터 불러오기 =====
   const [importCheckedData, setImportCheckedData] = useState();

   useEffect(() => {
      if (!userData || loadingFinalData) return;

      const fetchData = async () => {
         try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/inspect/insight/get/data`, {
               id: inspectId,
               name: userData.name,
               phone: userData.phone,
               step_type: finalQuestions.data[finalQuestions.currentPage - 1].stpeType,
            })
            setImportCheckedData(response.data.data)
         } catch (error) {
            console.error(error)
            if (error.response?.data?.msg === '일시적인 오류가 발생하였습니다.(데이터(id) => Not Exists)') {
               alert('잘못된 접근입니다.')
            } else {
               alert(error.response?.data?.msg || '일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
            }
            window.location.href = '/';
         }
      }
      fetchData();
   }, [userData, loadingFinalData, finalQuestions.currentPage])


   // 마지막 페이지 UI 조작
   const [lastPage, setLastPage] = useState(false);
   useEffect(() => {
      if (!finalQuestions.currentPage) return;

      const currentPage = finalQuestions.currentPage;
      const maxPage = finalQuestions.data.length;

      if (currentStep === 4 && currentPage >= maxPage) {
         setLastPage(true);
      } else {
         setLastPage(false);
      }
   }, [finalQuestions.currentPage])

   // 검사완료 버튼 클릭 함수
   const handleTestDone = async () => {
      await sendData();
      progressUpdate();
      // alert('검사가 완료 되었습니다.')
      // window.location.href = '/';
   }

   // 진행률 업데이트 함수
   const [resultPageData, setResultPageData] = useState([]);
   const progressUpdate = async () => {
      if (!inspectId || !userData) {
         alert('잠시 후 다시 시도 해주세요.')
         return;
      }
      try {
         const response = await axios.post(`${process.env.REACT_APP_API_URL}/inspect/insight/next`, {
            id: inspectId,
            name: userData.name,
            phone: userData.phone,
            step_number: currentStep
         })
         setResultPageData(response.data.data)
      } catch (error) {
         console.error(error);
         alert(error.response?.data?.msg || '일시적인 오류가 발생했습니다. 문제가 지속될 경우 관리자에게 문의해 주세요.')
      }
   }

   // (개발용) 1번으로 모두 체크
   function randomInt(min, max) {
      var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      return randomNum;
   }
   const handleAllCheckToOne = () => {
      setFinalQuestions((prev) => {
         const updateData = [...prev.data]

         updateData[prev.currentPage - 1].items.forEach((item) => {
            const randomNum = randomInt(0, item.score.length-1)
            item.score.forEach((scoreItem, index) => {
               if (index === randomNum) {
                  scoreItem.checked = true;
               } else {
                  scoreItem.checked = false;
               }
            });
         });

         return { currentPage: prev.currentPage, data: updateData }
      })
   }

   // =====================================================================
   if (!finalQuestions.data || !importCheckedData) return <Loading />;

   return (
      <section className="col-group section">
         <div className="side">
            <div className="side-step-list row-group">
               <div className={`${currentStep >= 1 ? 'active' : ''} side-step col-group`}>
                  <i className="icon"></i>
                  <p className="title">Step 01</p>
               </div>
               <div className={`${currentStep >= 2 ? 'active' : ''} side-step col-group`}>
                  <i className="icon"></i>
                  <p className="title">Step 02</p>
               </div>
               <div className={`${currentStep >= 3 ? 'active' : ''} side-step col-group`}>
                  <i className="icon"></i>
                  <p className="title">Step 03</p>
               </div>
               <div className={`${currentStep >= 4 ? 'active' : ''} side-step col-group`}>
                  <i className="icon"></i>
                  <p className="title">Step 04</p>
               </div>
               <div className='use-to-dev'>
                  <p className='title'>개발 완료 후 삭제</p>
                  <div className='btn-wrap'>
                     <button
                        className='btn'
                        onClick={handleAllCheckToOne}
                     >
                        랜덤으로 모두 체크
                     </button>
                     <button
                        className='btn btn-next'
                        onClick={handleNextPage}
                     >
                        다음
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <div className="content test-content insight-test">
            <div className="test-title-wrap col-group">
               <div className="test-title-group col-group">
                  <p className="txt bold">Step 0{currentStep}</p>
                  <p className="txt">
                     {currentPage > 0 && currentPage <= finalQuestions.data.length && finalQuestions.data[finalQuestions.currentPage - 1]?.name}
                  </p>

               </div>
               <div className="page col-group">
                  <p className="txt bold">{currentPage}</p>
                  <p className="txt">/</p>
                  <p className="txt">{finalQuestions.data.length}</p>
               </div>
               <div className="gauge">
                  <div className="gauge-bar" style={{ width: `calc( ( 100% / ${finalQuestions.data.length} ) * ${currentPage} )` }}></div>
               </div>
            </div>
            <div className="test-wrap">
               <TestList
                  key={currentPage}
                  currentStep={currentStep}
                  currentPage={currentPage}
                  finalQuestions={finalQuestions}
                  setFinalQuestions={setFinalQuestions}
                  importCheckedData={importCheckedData}
               />
               <div className="form-footer">
                  <button onClick={handlePrevPage} className="form-footer-btn">이전</button>
                  {currentStep !== 4 &&
                     <button
                        onClick={() => sendData('IntermediateSave')}
                        className="form-footer-btn white"
                     >
                        중간저장
                     </button>
                  }
                  {!lastPage ? (
                     <button onClick={handleNextPage} className="form-footer-btn">다음</button>
                  ) : (
                     <button onClick={handleTestDone} className="form-footer-btn white">완료</button>
                  )}
               </div>
            </div>
         </div>
         {!Array.isArray(resultPageData) &&
            <LongTimeLoading />
         }
         {!Array.isArray(resultPageData) &&
            <PageContainer
               inspectId={inspectId}
               name={userData.name}
               phone={userData.phone}
               resultPageData={resultPageData}
            />
         }
      </section>
   );
};

const EnterAnswer = () => {
   return (
      <CommonUi
         isAnswerPage={true}
         content={<Content />}
         mainStep={2}
      />
   );
};

export default EnterAnswer;
