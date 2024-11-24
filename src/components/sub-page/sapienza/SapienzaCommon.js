import React from 'react'

// Data
import { Sapienza } from '../../../data/SubTopNavInfo'

// Components
import SubTopNav from '../../../components/sub-page/SubTopNav'

// Images, Video
import { images } from '../../../assets/images'
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom'

const SapienzaCommon = ({ info }) => {
   return (
      <main className="subpage sapienza">
         <div className="sub-top">
            <img src={images.sub04_sapienza_sub_top} alt="" className="bg-img" />
            <div className="sub-top-title-wrap row-group">
               <h2 className="sub-top-title">
                  사피엔자 아카데미아
               </h2>
               <p className="sub-top-txt">{info.subTopText}</p>
            </div>
         </div>

         <SubTopNav SubTopNavInfo={Sapienza()} />

         <div className="section">
            <div className="container col-group">
               <div className="section-title-wrap row-group">
                  <p className="sub-title green">
                     Sapienza Academia
                  </p>
                  <h3
                     dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(info.title) }}
                     className="title"
                  />
                  <p className="txt">
                     과거를 새롭게 해석하는 내적인 힘과 능력을 수련하고 연구하는 <br />
                     실천적 학문의 영역이 바로 ‘융합심리분석상담치료’입니다.
                  </p>
                  <Link to={info.path} className="btn">과정 등록 신청</Link>
               </div>
               <div className="sap-course-list row-group">
                  {info.contents.map((content, index) => (
                     <div className="sap-course-item col-group" key={index}>
                        <div className="img">
                           <img src={content.img} alt="" />
                        </div>
                        <div className="txt-wrap row-group">
                           <p className={`${content.title.color === 'green' ? 'green' : ''} title`}>{content.title.text}</p>
                           {content.items.length > 1 ? (
                              <div className="txt-group row-group">
                                 {content.items.map((item, index) => (
                                    <p
                                       dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item) }}
                                       className="txt dot"
                                       key={index}
                                    />
                                 ))}
                              </div>
                           ) : (
                              <p
                                 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.items) }}
                                 className="txt"
                                 key={index}
                              />
                           )}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </main>
   )
}

export default SapienzaCommon