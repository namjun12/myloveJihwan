import React from 'react'

// Components
import IndexHeader from '../../components/IndexHeader'
import SapienzaCommon from '../../components/sub-page/sapienza/SapienzaCommon'

// Images
import { images } from '../../assets/images'

const Level3Course = () => {
  IndexHeader();

  const info = {
    subTopText: '융합심리분석상담 전문가 3급 과정',
    title: '융합심리분석상담 전문가 <br />3급 과정',
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
          '학회의 3급 교육과정을 이수한 자로 실습 180시간 이상, 감독 20시간 이상을 이수한 자',
        ]
      },
      {
        img: images.sub04_sapienza_02_02,
        title: {
          text: '검정기준',
          color: 'black'
        },
        items: [
          '융합심리학, 교육심리학, 상담학 등 다양한 이론에 대하여 전반적인 이해도를 보유한 자로 기초적인 융합심리분석상담능력을 활용하여 개인 상담이 가능한 초급 수준',
        ]
      },
      {
        img: images.sub04_sapienza_02_03,
        title: {
          text: '검정과목',
          color: 'green'
        },
        items: [
          '융합심리학(1), 상담학개론, 교류분석 (Transaction Analysis)이론',
          '인문융합이론(1)개론(공통)',
          'Enneagram 분석심리',
          '융의 분석심리학과 MBTI',
          '융합심리학 초급 지도법',
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
          '<strong>합격기준 :</strong> 평균 60점 이상, 각 과목별 60점 이상',
        ]
      },
    ]
  }
  return (
    <SapienzaCommon info={info} />
  )
}

export default Level3Course