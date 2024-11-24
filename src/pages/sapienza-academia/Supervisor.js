import React from 'react'

// Components
import IndexHeader from '../../components/IndexHeader'
import SapienzaCommon from '../../components/sub-page/sapienza/SapienzaCommon'

// Images
import { images } from '../../assets/images'

const Supervisor = () => {
   IndexHeader();

   const info = {
      subTopText: '융합심리분석상담 전문가 슈퍼바이저 과정',
      title: '융합심리분석상담 전문가 <br />슈퍼바이저 과정',
      path: '/',
      contents: [
         {
            img: images.sub04_sapienza_02_01,
            title: {
               text: '검정시험 응시자격',
               color: 'green'
            },
            items: [
               '<strong>나이 :</strong> 제한 없음',
               '<strong>학력 :</strong> 석사학위 이상',
               '융합심리분석상담 검정 연구자료 제출, 학술활동 300시간 이상, 실습 1500시간 이상을 이수한 자로 본 회의 해당 종목 1급 취득 후 슈퍼바이저 교육과정을 이수하고 5년 이상 활동한 자',
               '위 각 호의 하나에 해당하는 자',
            ]
         },
         {
            img: images.sub04_sapienza_02_02,
            title: {
               text: '검정기준',
               color: 'black'
            },
            items: [
               '상담심리이론 등 다양한 심리 이론에 대한 전문적인 이해도를 바탕으로 상담 프로그램을 구축하고 이를 활용하여 실제적인 심리상담을 원활하게 진행 가능한 고급 수준',
            ]
         },
         {
            img: images.sub04_sapienza_02_03,
            title: {
               text: '검정과목',
               color: 'green'
            },
            items: [
               '융합심리학(4)',
               '인문융합이론(4)',
               '융합심리학 고급 지도법',
               '상담심리이론 실제적용 심리상담 시연',
            ]
         },
         {
            img: images.sub04_sapienza_02_04,
            title: {
               text: '방법 및 시험시간',
               color: 'black'
            },
            items: [
               '<strong>필기 (60분) :</strong> 객관식 / 단답식',
               '<strong>실기(6시간) :</strong> 100점 만점 중 80점 이상',
               '<strong>합격기준 :</strong> 평균 70점 이상, 각 과목별 60점 이상',
            ]
         },
      ]
   }

   return (
      <SapienzaCommon info={info} />
   )
}

export default Supervisor