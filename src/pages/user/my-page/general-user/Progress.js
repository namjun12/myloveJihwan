import React from 'react'

// Images, Videos
import { images } from '../../../../assets/images'

const TestProgress = () => {
  return (

    <div className="myPageContent">
      <div className="mp-main-title-wrap border">
        <h2 className="mp-main-title">
          <span className="mb">My 정보 <i></i></span>
          심리검사 진행/결과
        </h2>
      </div>
      <div className="mp-section-wrap row-group">
        <div className="mp-section">
          <div className="test-result-item col-group">
            <div className="img">
              <img src={images.academia_item_04} alt="" />
            </div>
            <div className="txt-wrap row-group">
              <div className="title-group row-group">
                <p className="eng-title">
                  Mind Insight
                </p>
                <p className="title">
                  마인드 인사이트
                </p>
                <p className="txt">
                  <strong>옵션명 : </strong>
                  마인드 인사이트 + 마인드 리포트 + 해석상담
                </p>
              </div>
              <div className="test-result-step">
                <div className="test-title-group col-group">
                  <p className="test-title">검사 진행률</p>
                  <p className="test-title green">50%</p>
                </div>
                <div className="test-step-group col-group">
                  <div className="test-step-item row-group active"> {/* 진행 완료 시 active 클래스 추가 */}
                    <div className="item-user"></div>
                    <p className="item-default">STEP 01</p>
                  </div>
                  <div className="test-step-item row-group active"> {/* 진행 완료 시 active 클래스 추가 */}
                    <div className="item-user"></div>
                    <p className="item-default">STEP 02</p>
                  </div>
                  <div className="test-step-item row-group">
                    <div className="item-user"></div>
                    <p className="item-default">STEP 03</p>
                  </div>
                  <div className="test-step-item row-group">
                    <div className="item-user"></div>
                    <p className="item-default">STEP 04</p>
                  </div>
                </div>
              </div>
            </div>
            <a href="" className="btn active"> {/* 검사진행 시 active 클래스 추가 */}
              검사진행
            </a>
          </div>
        </div>
        <div className="mp-section">
          <h3 className="mp-section-title">
            심리검사 진행방법
          </h3>

          <div className="test-guide-step-wrap col-group">
            <div className="test-guide-step row-group">
              <img src={images.test_guide_step_01} alt="" className="img" />
              <p className="sub-title">
                STEP 01
              </p>
              <p className="title">
                구매 및 결제
              </p>
            </div>
            <i className="icon"></i>
            <div className="test-guide-step row-group">
              <img src={images.test_guide_step_02} alt="" className="img" />
              <p className="sub-title">
                STEP 02
              </p>
              <p className="title">
                검사 링크 접속
              </p>
            </div>
            <i className="icon"></i>
            <div className="test-guide-step row-group">
              <img src={images.test_guide_step_03} alt="" className="img" />
              <p className="sub-title">
                STEP 03
              </p>
              <p className="title">
                정보입력
              </p>
            </div>
            <i className="icon"></i>
            <div className="test-guide-step row-group">
              <img src={images.test_guide_step_04} alt="" className="img" />
              <p className="sub-title">
                STEP 04
              </p>
              <p className="title">
                심리검사 진행
              </p>
            </div>
            <i className="icon"></i>
            <div className="test-guide-step row-group">
              <img src={images.test_guide_step_05} alt="" className="img" />
              <p className="sub-title">
                STEP 05
              </p>
              <p className="title">
                결과확인
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="test-guide-txt-wrap">
        <p className="title">
          심리검사 진행 방법
        </p>
        <div className="test-guide-txt-group row-group">
          <div className="test-guide-txt col-group">
            <p className="default">
              STEP 01.
            </p>
            <p className="user">
              <strong>구매 및 결제 :</strong>
              마인드 인사이트를 구매 및 결제합니다.
            </p>
          </div>
          <div className="test-guide-txt col-group">
            <p className="default">
              STEP 02.
            </p>
            <p className="user">
              <strong>검사 링크 접속 :</strong>
              전송 받은 카카오톡/문자메시지를 통해 심리검사 실시 페이지에 접속합니다.
            </p>
          </div>
          <div className="test-guide-txt col-group">
            <p className="default">
              STEP 03.
            </p>
            <p className="user">
              <strong>정보입력 :</strong>
              검사자의 정보를 입력합니다.
            </p>
          </div>
          <div className="test-guide-txt col-group">
            <p className="default">
              STEP 04.
            </p>
            <p className="user">
              <strong>심리검사 진행 :</strong>
              심리검사 실시 안내에 따라 심리검사를 진행합니다.
            </p>
          </div>
          <div className="test-guide-txt col-group">
            <p className="default">
              STEP 05.
            </p>
            <p className="user">
              <strong>결과확인 :</strong>
              심리검사 완료! 결과지를 확인합니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestProgress