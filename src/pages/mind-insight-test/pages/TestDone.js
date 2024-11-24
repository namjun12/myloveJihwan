import React from 'react'

// Images
import { images } from '../../../assets/images'
import { Link } from 'react-router-dom'

const TestDone = () => {
   return (
      <main>
         <div className="test-container">
            <div className="container row-group w860">

               <div className="intro-top">
                  <img src={images.intro_top} alt="" />
               </div>
               <div className="intro-content done-content">
                  <div className="title-group row-group">
                     <p className="title">
                        검사완료
                     </p>
                     <p className="txt">
                        답안입력이 모두 완료되었습니다. <br />
                        수고하셨습니다.
                     </p>
                  </div>
                  <div className="form-footer">
                     <Link to='/' className="form-footer-btn">완료</Link>
                  </div>
               </div>
            </div>
         </div>
      </main>
   )
}

export default TestDone