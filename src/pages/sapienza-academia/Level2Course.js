import React from 'react'

// Components
import SapienzaCommon from '../../components/sub-page/sapienza/SapienzaCommon'
import IndexHeader from '../../components/IndexHeader';

// Images
import { images } from '../../assets/images'

const Level2Course = () => {
  IndexHeader();

  const info = {
    subTopText: '융합심리분석상담 전문가 2급 과정',
    title: '융합심리분석상담 전문가 <br />2급 과정',
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
          '<strong>학력 :</strong> 제한 없음',
          '학회의 2급 교육과정을 이수한 자로 실습 500시간 이상, 감독 30시간 이상을 이수한 자',
          '3급 교육과정을 이수하고 2년 이상 활동한 자',
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
          '융합심리분석상담에 대한 이해도와 상담능력을 보유한 자로 <br/>이를 활용하여 개인 및 단체의 융합심리분석과 상담이 가능한 기본 수준',
        ]
      },
      {
        img: images.sub04_sapienza_02_03,
        title: {
          text: '검정과목',
          color: 'green'
        },
        items: [
          '융합심리학(2)',
          '인문융합이론(2)',
          '융합심리분석상담(1)',
          '융합심리학 기본 지도법',
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
          '<strong>합격기준 :</strong> 평균 70점 이상, 각 과목별 60점 이상',
        ]
      },
    ]
  }

  return (
    <SapienzaCommon info={info} />
  )
}

export default Level2Course