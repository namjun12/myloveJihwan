import React from 'react'

// Components
import IndexHeader from '../../components/IndexHeader'
import SapienzaCommon from '../../components/sub-page/sapienza/SapienzaCommon'

// Images
import { images } from '../../assets/images'

const Level1Course = () => {
  IndexHeader();

  const info = {
    subTopText: '융합심리분석상담 전문가 1급 과정',
    title: '융합심리분석상담 전문가 <br />1급 과정',
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
          '학회의 1급 교육과정을 이수하고 실습 1000시간 이상, 감독 20시간 이상을 이수한 자로 사례발표 제출을 마친 자',
          '1급 교육과정을 이수하고 3년 이상 활동한 자',
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
          '발달심리학에 대한 전문적인 이해도를 바탕으로 전 나이대에 대한 융합심리분석상담이 가능한 자로 <br/>전문적인 융합심리분석상담 및 3급에 대한 슈퍼비전을 할 수 있는 중급 수준',
        ]
      },
      {
        img: images.sub04_sapienza_02_03,
        title: {
          text: '검정과목',
          color: 'green'
        },
        items: [
          '융합심리학(3)',
          '인문융합이론(3)',
          '융합심리분석상담(2)',
          '발달심리학',
          '융합심리학 중급 지도법',
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

export default Level1Course