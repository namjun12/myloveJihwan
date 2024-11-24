import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// Components
import Footer from '../../components/Footer';

// Images
import { images } from '../../assets/testPageImages';

const Container = styled.div`
.use-to-dev{
  display: none;
  border-top: 1px solid #e1e1e3;
  padding-top: 40px;
  .title{
    font-size: 20px;
    font-weight: 600;
  }
  .btn-wrap{
    display: flex;
    gap: 12px;
    margin-top: 18px;
    .btn{
      width: 50%;
      height: 40px;
      border: 1px solid #0071e3;
      border-radius: 999px;
      padding: 7px 15px;
      color: #0071e3;
    }
    .btn-next{
      color: #fff;;
      background-color: #0071e3;
    }
  }
}
@media screen and (max-width: 767px){
  .use-to-dev{
    position: fixed;
    top: 24px;
    left: 50%;
    transform: translateX(-50%);
    padding: 16px 32px;
    width: calc(100% - 32px);
    border: 1px solid #e1e1e3;
    border-radius: 24px;
    background-color: #fff;
    z-index: 9;
    .title{
      font-size: 17px;
    }
    .btn-wrap{
      gap: 8px;
      margin-top: 14px;
      .btn{
        height: auto;
        font-size: 12px;
      }
    }
  }
}
.footer-wrap .container{
  justify-content: center;
}
.footer-wrap .left {
    align-items: center;
}
overflow: hidden;
/* 컨텐츠 공통 */
.col-group {display:flex;}
.row-group {display:flex; flex-flow: column;}
.container { margin: 0 auto; width: 100%; max-width: 1440px; }
.container.w860 { max-width: 860px; }
.container.w1280 { max-width: 1280px; }
.yellow { color: #fee500; }
.red { color: #df1818; }
.green { color: #00754a; }
.blue { color: #0088ff; }
.img-container { width: 100%; position: relative; }
.img-container img { width: 100%; height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; object-fit: cover; object-position: center; }
.video-container { width: 100%; padding-top: 56.25%; position: relative; }
.video-container iframe { width: 100%; height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #e4e4e4; }
::-webkit-scrollbar-thumb { background: #484848; border-radius: 4px;}
.null-txt { font-size: 16px; font-weight: 300; text-align: center; color: #202020; padding: 120px 0; align-items: center; gap: 16px; }
.null-txt .icon { font-size: 32px; }

@media screen and (max-width: 1440px) {
    .container { padding: 0 16px; }
}
@media screen and (max-width: 1280px) {
    .null-txt { font-size: 14px; padding: 64px; }
}
@media screen and (max-width: 1024px) {
    .container.w860 { max-width: unset; }
}

/* form - 체크박스 */
.form-label-wrap { flex-flow: wrap; gap: 16px 32px; }
.form-label-wrap .checked-item .txt { width: auto; }
.checked-item { align-items: flex-start; gap: 8px; }
.checked-item .icon { width: 24px; height: 24px; border: 1px solid #9999a6; border-radius: 2px; display: flex; align-items: center; justify-content: center; background: #fff; }
.checked-item .icon i { color: #aeaeae; font-weight: bold; font-size: 16px; line-height: 22px; }
.checked-item .txt { width: calc( 100% - 24px - 8px ); font-size: 16px; font-weight:500; color: #949599; line-height: 1.5; }
.form-checkbox:checked + .checked-item .txt { color: #202020; }
.form-checkbox:checked + .checked-item .icon { border: 1px solid #10644c; background: #10644c; }
.form-checkbox:checked + .checked-item .icon i { color: #fff; }

@media screen and (max-width: 1024px) {
  .form-label-wrap { gap: 8px 16px; }
  .checked-item { gap: 5px; }
  .checked-item .icon { width: 16px; height: 16px; }
  .checked-item .icon i { font-size: 12px; line-height: 14px; }
  .checked-item .txt { width: calc( 100% - 16px - 5px ); font-size: 14px; }
}

/* form - 라디오 */
.form-radio + .checked-item .icon { width: 20px; height: 20px; border: 2px solid #bfbfbf; background: #fff; border-radius: 50%; display: block; position: relative; transform: translateY(2px); }
.form-radio + .checked-item .icon i { display: none; }
.form-radio + .checked-item .icon::after { content: ''; position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #10644c; left: 50%; top: 50%; transform: translate(-50%, -50%); display: none; }
.form-radio + .checked-item .txt { width: calc( 100% - 20px - 8px ); }
.form-radio:checked + .checked-item .txt { color: #10644c; }
.form-radio:checked + .checked-item .icon { border: 2px solid #10644c; background: #fff; }
.form-radio:checked + .checked-item .icon::after { display: block; }

@media screen and (max-width: 1024px) {
  .form-radio + .checked-item .icon { width: 16px; height: 16px; border: 1px solid #bfbfbf; }
  .form-radio + .checked-item .icon::after { width: 8px; height: 8px; }
  .form-radio:checked + .checked-item .icon { border: 1px solid #10644c; }
}

/* form - 스위치 */
.form-switch + .checked-item .icon { width: 64px; height: 32px; border: 0; background: #e4e4e4; border-radius: 16px; display: block; position: relative; }
.form-switch + .checked-item .icon i { display: none; }
.form-switch + .checked-item .icon::after { content: ''; position: absolute; width: 24px; height: 24px; border-radius: 50%; background: #fff; left: 4px; top: 4px; transition: .2s; }
.form-switch + .checked-item .txt { width: calc( 100% - 64px - 8px ); }
.form-switch:checked + .checked-item .txt { color: #10644c; }
.form-switch:checked + .checked-item .icon { background: #10644c; }
.form-switch:checked + .checked-item .icon::after { transform: translateX(32px); }

@media screen and (max-width: 1024px) {
  .form-switch + .checked-item .icon { width: 48px; height: 24px; border-radius: 12px; }
  .form-switch + .checked-item .icon::after { width: 16px; height: 16px;}
  .form-switch + .checked-item .txt { width: calc( 100% - 48px - 8px ); }
  .form-switch:checked + .checked-item .icon::after { transform: translateX(24px); }
}

/* form */
.form-wrap { gap: 32px; }
.form-list.border { padding-bottom: 32px; border-bottom: 1px solid #e4e4e4; margin-bottom: 32px; }
.form-item { gap: 8px; }
.form-item .item-default { font-size: 16px; font-weight: bold; }
.form-input-wrap { gap: 8px; align-items: center; }
.form-input { width: 100%; height: 52px; border: 1px solid #e4e4e4; background: #fff; border-radius: 4px; padding: 0 16px; font-size: 16px; }
.form-input::placeholder { color: #aeaeae; }
.form-input.address-detail{
   margin-top: 8px;
}
.form-date { width: 240px; }

.form-btn-wrap { gap: 8px; }
.form-btn-wrap .form-input { width: calc( 100% - 154px - 8px ); }
.form-btn { width: 154px; height: 52px; border-radius: 4px; background: #10644c; text-align: center; line-height: 52px; font-size: 16px; font-weight: 500; color: #fff; }
.form-btn.disable { background: #e4e4e4; }
.form-btn.black { background: #484848; }
.form-btn.gray { background: #707070; }

.form-footer { margin-top: 40px; display: flex; gap: 16px; }
.form-footer-btn { width: 100%; height: 64px; border-radius: 8px; border: 2px solid #10644c; background: #10644c; text-align: center; line-height: 60px; font-size: 20px; font-weight: bold; color: #fff; }
.form-footer-btn.disable { background: #e4e4e4; border: 2px solid #e4e4e4; }
.form-footer-btn.white { background: #fff; color: #10644c; }

@media screen and (max-width:1024px) {
  .form-wrap { gap: 24px; }
  .form-list.border { padding-bottom: 16px; margin-bottom: 16px; }
  .form-item .item-default { font-size: 14px; }
  .form-input { height: 48px; font-size: 14px; }
  .form-date { width: 168px; }

  .form-btn-wrap .form-input { width: calc( 100% - 88px - 8px ); }
  .form-btn { width: 88px; height: 48px; line-height: 48px; font-size: 14px; }

  .form-footer { gap: 8px; }
  .form-footer-btn { height: 48px; border-radius: 4px; border:1px solid #10644c; line-height: 46px; font-size: 16px; }
  .form-footer-btn.disable { border: 1px solid #e4e4e4; }
}

/* modal */
.modal-container { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.5); z-index: 99999999; }
.modal-wrap { width: calc( 100% - 32px ); max-width: 600px; padding: 40px; border-radius: 16px; border-radius: 16px; position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); background: #fff; }
.modal-wrap .close-btn { cursor: pointer; font-size: 32px; color: #707070; position: absolute; top: 24px; right: 24px; }
.modal-scroll-wrap { max-height: 50vh; overflow: auto; }
.modal-scroll-wrap::-webkit-scrollbar { display: none; }
.modal-title-wrap { margin-bottom: 24px; display: flex; flex-flow: column; gap: 16px; }
.modal-title-wrap.center { text-align: center; }
.modal-title-wrap.border { padding-bottom: 24px; border-bottom: 2px solid #202020; }
.modal-title { font-size: 20px; font-weight: 600; }
.modal-title-txt { font-size: 16px; line-height: 1.5; }
.modal-footer { justify-content: center; margin-top: 32px; gap: 8px; }
.modal-footer-btn { width: 200px; height: 52px; border-radius: 4px; text-align: center; line-height: 52px; font-size: 16px; font-weight: bold; }
.modal-footer-btn.wide { width: 100%; }
.modal-footer-btn.green { background: #10644c; color: #fff; }
.modal-footer-btn.gray { background: #707070; color: #fff; }

.modal-alert-wrap { width: 100%; max-width: 320px; padding-top: 48px; text-align: center; }
.modal-alert-wrap .modal-title-wrap { margin-bottom: 24px; gap: 8px; }
.modal-alert-wrap .modal-title-wrap .title { font-size: 24px; font-weight: bold; }
.modal-alert-wrap .modal-title-wrap .icon { font-size: 24px; display: inline-block; margin-bottom: 8px; }
.modal-alert-txt { font-size: 16px; line-height: 1.5 }
.modal-alert-wrap .modal-footer-btn  { width: 320px; }

@media screen and (max-width:1024px) {
  .modal-container { background: none; }
  .modal-wrap { width: 100%; height: 100vh; max-width: unset; padding: 72px 16px 40px; border-radius: 0; position: absolute; left:0; top: 0; transform: none; }
  .modal-wrap .close-btn { font-size: 24px; top: 12px; right: unset; left: 16px; }
  .modal-wrap .close-btn.pc { display: none; }
  .modal-wrap .close-btn.mb { display: block; }
  .modal-scroll-wrap { max-height: calc( 100vh - 184px ); overflow: auto; }
  .modal-title-wrap { margin-bottom: 16px; gap: 8px; position: absolute; width: 100vw; top: 0; left: 0; right: 0; margin-bottom: 0; height: 48px; border-bottom: 1px solid #e4e4e4; text-align: center; }
  .modal-title-wrap.border { padding-bottom: 0; border-bottom: 0; }
  .modal-title { font-size: 16px; line-height: 48px; }
  .modal-title-txt { font-size: 13px; display: none; }
  .modal-footer { margin-top: 24px; }
  .modal-footer-btn { width: 100%; height: 48px; line-height: 48px; font-size: 14px; }

  .modal-alert-wrap { max-width: unset; padding-top: 0; display: flex; flex-flow: column; justify-content: center; }
  .modal-alert-wrap .modal-title-wrap { margin-bottom: 16px; position: static; height: auto; border: 0; width: auto; gap: 0; }
  .modal-alert-wrap .modal-title { line-height: 1.25; font-size: 24px; }
  .modal-alert-txt { font-size: 14px; }
  .modal-alert-wrap .modal-footer { margin-top: auto; position: absolute; bottom: 40px; width: calc( 100% - 32px ); left: 16px; }
  .modal-alert-wrap .modal-footer-btn  { width: 100%; }
}

/* intro */
.test-container {background: #f5f5f5; padding: 40px 0 80px; min-height: calc( 100vh - 358px ); }
.test-container .container { gap: 24px; height: 100%; }
.intro-top { width: 100%; height: 360px; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.16); }
.intro-top img { height: 100%; object-fit: cover; object-position: center; }
.intro-content { padding: 40px; border-radius: 24px; box-shadow: 0 4px 24px 0 rgba(0, 0, 0, 0.16); background: #fff; }
.intro-content .title-group { padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid #e4e4e4; gap: 24px; }
.intro-content .title { font-size: 20px; font-weight: bold; }
.intro-content .txt-group { gap: 24px; }
.intro-content .txt-item { gap: 12px; align-items: center; }
.intro-content .txt-item .item-default { gap: 8px; align-items: center; font-size: 16px; font-weight: bold; color: #707070; }
.intro-content .txt-item .item-default .icon { font-size: 16px; color: #707070; }
.intro-content .txt-item .item-user { font-size: 16px; }
.intro-content .sub-txt-group { gap: 8px; }
.intro-content .sub-txt { padding-left: 16px; position: relative; font-size: 16px; line-height: 1.5; }
.intro-content .sub-txt::after { content: ''; display: block; position: absolute; width: 2px; height: 2px; background: #202020; border-radius: 50%; left: 0; top: 11px; }

@media screen and (max-width:1024px) {
  .test-container { background: none; padding: 0; min-height: calc( 100vh - 260px ); }
  .test-container .container { gap: 0; padding: 0; }
  .intro-top { height: auto; border-radius: 0; box-shadow: none; }
  .intro-content { padding: 24px 16px 40px; border-radius: 0; box-shadow: none; }
  .intro-content .title-group { padding-bottom: 16px; margin-bottom: 16px; gap: 16px; }
  .intro-content .title { font-size: 16px; }
  .intro-content .txt-group { gap: 16px; }
  .intro-content .txt-item { gap: 8px; align-items: flex-start; flex-flow: column; }
  .intro-content .txt-item .item-default { font-size: 14px; }
  .intro-content .txt-item .item-default .icon { font-size: 14px; }
  .intro-content .txt-item .item-user { font-size: 14px; }
  .intro-content .sub-txt { padding-left: 8px; font-size: 14px; }
  .intro-content .sub-txt::after { top: 9px; }
}

/* 마인드 인사이트 검사 */
.nav { background: #fff; border-radius: 16px; height: 72px; padding-right: 24px; padding-left: 32px; align-items: center; justify-content: space-between; position: relative; } 
.nav::after { content: ''; display: block; position: absolute; width: 8px; height: 40px; background: #10644c; border-top-right-radius: 8px; border-bottom-right-radius: 8px; left: 0; top: 50%; transform: translateY(-50%); }
.nav-title { font-size: 20px; font-weight: bold; }
.nav-step-list { align-items: center; gap: 8px; }
.nav-step { align-items: center; gap: 8px; }
.nav-step .icon { display: block; width: 32px; height: 32px; border-radius: 50%; background: #aeaeae; text-align: center; line-height: 32px; font-size: 18px; color: #fff; }
.nav-step.active .icon { background: #10644c; }
.nav-step .txt { font-size: 16px; font-weight: 500; color: #aeaeae; }
.nav-step.active .txt { color: #202020; }

.section { gap: 24px; align-items: flex-start; }
.side { width: 400px; box-shadow: 0 3px 24px 0 rgba(0, 0, 0, 0.08); border-radius: 24px; overflow: hidden; background: #fff; padding: 40px; }
.side-img { padding: 0; }
.content { width: calc( 100% - 424px ); padding: 40px; border-radius: 24px; background-color: #fff; box-shadow: 0 3px 24px 0 rgba(0, 0, 0, 0.08); }
.content-title-wrap { margin-bottom: 24px; gap: 16px; }
.content-title { font-size: 24px; font-weight: bold; position: relative; padding-left: 12px; }
.content-title::after { content: ''; display: block; position: absolute; width: 4px; height: 28px; background: #00754a; left: 0; top: -2px; }
.content-title-txt { font-size: 16px; line-height: 1.5; }
.content-title-wrap .sub-txt-group { gap: 8px; }
.content-title-wrap .sub-txt { padding-left: 12px; position: relative; font-size: 14px; line-height: 1.5; color: #707070; }
.content-title-wrap .sub-txt::after { content: ''; display: block; position: absolute; width: 2px; height: 2px; background: #707070; border-radius: 50%; left: 0; top: 9.5px; }

@media screen and (max-width:1024px) {
  .nav { border-radius: 0; height: auto; padding-right: 0; padding-left: 0; flex-flow: column; } 
  .nav::after { display: none; }
  .nav-title { width: 100%; text-align: center; height: 60px; line-height: 60px; font-size: 16px; }
  .nav-step-list { width: 100%; justify-content: center; gap: 4px; height: 54px; background: #f5f5f5; }
  .nav-step { gap: 4px; }
  .nav-step .icon {width: 20px; height: 20px; line-height: 20px; font-size: 12px; }
  .nav-step .txt { font-size: 12px;  }
  
  .section { flex-flow: column; gap: 16px; background: #f5f5f5; }
  .side { width: 100%; box-shadow: none; border-radius: 0; padding: 0; }
  .side-img { display: none; }
  .content { width: 100%; padding: 24px 16px 40px; border-radius: 0; background-color: #fff; box-shadow: none; }
  .content-title { font-size: 16px; }
  .content-title::after { height: 20px; }
  .content-title-txt { font-size: 12px; }
  .content-title-wrap .sub-txt-group { gap: 4px; }
  .content-title-wrap .sub-txt { font-size: 12px; padding-left: 8px; }
  .content-title-wrap .sub-txt::after { top: 8px; }
}

/* 마인드 인사이트 검사 - 정보 입력 */
.join-agree-item { justify-content: space-between; align-items: center; padding: 12px 16px; }
.join-agree-item label { width: calc( 100% - 56px - 8px ); }
.join-agree-item .more-btn { font-size: 14px; font-weight: 500; color: #373948; text-decoration: underline; width: 56px; text-align: right; }
.join-agree-item-all { background: #f5f5f5; }

@media screen and (max-width:1024px) {
  .join-agree-item { justify-content: space-between; align-items: center; padding: 8px; }
  .join-agree-item label { width: calc( 100% - 48px - 8px ); }
  .join-agree-item .checked-item { align-items: center; }
  .join-agree-item .more-btn { font-size: 12px; width: 48px; }
}

/* 마인드 인사이트 검사 - 개인정보수집 더보기 */
.modal-table-wrap { margin-bottom: 24px; }
.modal-table-wrap table { table-layout: fixed; width: 100%; border-collapse: collapse; }
.modal-table-wrap table th { height: 36px; background: #f5f5f5; font-size: 16px; font-weight: 600; border: 1px solid #e4e4e4; }
.modal-table-wrap table td { height: 36px; background: #fff; font-size: 16px; border: 1px solid #e4e4e4; text-align: center; }

@media screen and (max-width:1024px) {
  .modal-table-wrap { margin-bottom: 16px; }
  .modal-table-wrap table th { font-size: 14px; }
  .modal-table-wrap table td { font-size: 14px; padding: 0 8px; }
}

/* 마인드 인사이트 검사 - 작성방법 */
.content-section.border { padding-bottom: 24px; margin-bottom: 24px; border-bottom: 1px solid #e4e4e4; }
.example-label { width: 80px; height: 34px; border-radius: 17px; background: #707070; text-align: center; line-height: 34px; font-size: 16px; font-weight: 600; color: #fff; }
.guide-txt-list { gap: 8px; }
.guide-txt { padding: 12px; align-items: center; gap: 16px; background: #f5f5f5; border-radius: 8px; }
.guide-txt .num { width: 32px; height: 32px; border-radius: 4px; text-align: center; line-height: 32px; background: #484848; color: #fff; font-size: 16px; font-weight: 500; }
.guide-txt .txt { width: calc( 100% - 48px ); font-size: 16px; line-height: 1.5; }

@media screen and (max-width:1024px) {
  .content-section.border { padding-bottom: 16px; margin-bottom: 16px; }
  .example-label { width: 56px; height: 24px; border-radius: 12px; line-height: 24px; font-size: 12px; }
  .guide-txt { gap: 8px; border-radius: 4px; }
  .guide-txt .num { width: 24px; height: 24px; line-height: 24px; font-size: 12px; }
  .guide-txt .txt { font-size: 12px; }
}

/* 마인드 인사이트 검사 - 답안 */
.question { display: flex; flex-flow: column; gap: 24px; }
.q_title { display: flex; align-items: baseline; padding: 18px 24px; min-height: 60px; border-radius: 8px; background: #f5f5f5; position: relative; }
.q_title::after { content: ''; display: block; position: absolute; width: 8px; height: calc( 100% - 28px ); background: #aeaeae; border-top-right-radius: 8px; border-bottom-right-radius: 8px; left: 0; top: 50%; transform: translateY(-50%); }
.q_title .num { width: 40px; font-size: 17px; line-height: 24px; font-weight: bold; color: #aeaeae; }
.q_title .title { width: calc( 100% - 40px ); font-size: 17px; font-weight: 500; line-height: 24px; }
.q_item { display: flex; justify-content: space-evenly; align-items: center; }
.score .check { display: flex; flex-flow: column; align-items: center; gap: 8px; }
.score .num { width: 64px; height: 64px; text-align: center; line-height: 64px; border-radius: 50%; background: #f5f5f5; font-size: 20px; font-weight: 600; color: #aeaeae; }
.score input:checked + .check .num { background: #00754a; color: #fff; }
.score .txt { font-size: 14px; }

.question.active .q_title { background: #eaf8f3; }
.question.active .q_title::after, .question.prev .q_title::after { background: #10644c; }
.question.active .q_title .num, .question.prev .q_title .num { color: #10644c; }

@media screen and (max-width:1024px) {
  .question { gap: 16px; }
  .q_title { padding: 12px; min-height: 40px; border-radius: 4px; }
  .q_title::after { width: 4px; height: calc( 100% - 20px ); border-top-right-radius: 4px; border-bottom-right-radius: 4px; }
  .q_title .num { width: 32px; font-size: 12px; line-height: 16px; }
  .q_title .title { width: calc( 100% - 32px ); font-size: 12px; line-height: 16px; }
  .score .num { width: 40px; height: 40px; line-height: 40px; font-size: 14px; }
  .score .txt { font-size: 10px; }
}

/* 마인드 인사이트 검사 - 답안입력 */
.side-step-list { gap: 72px; }
.side-step { gap: 16px; align-items: center; position: relative; }
.side-step:not(:first-child)::after { content: ''; display: block; position: absolute; width: 2px; height: 56px; background: #e4e4e4; left: 19px; top: -64px; }
.side-step.active::after { background: #00754a; }
.side-step .icon { display: block; width: 40px; height: 40px; border-radius: 50%; background: #e4e4e4; text-align: center; line-height: 40px; font-size: 18px; color: #fff; }
.side-step.active .icon { background: #00754a; }
.side-step .title { font-size: 20px; font-weight: bold; color: #aeaeae; }
.side-step.active .title { color: #00754a; }

.test-content { max-height: calc( 100vh - 216px ); overflow: auto; padding: 0; }
.test-content::-webkit-scrollbar { display: none; }
.test-title-wrap { position: relative; height: 80px; padding: 0 40px; align-items: center; justify-content: space-between; position: sticky; top: 0; background: #fff; z-index: 1; }
.test-title-group { gap: 32px; }
.test-title-group .txt { position: relative; }
.test-title-group .txt:not(:last-child)::after { content: ''; display: block; position: absolute; width: 1px; height: 20px; background: #e4e4e4; right: -16px; top: 50%; transform: translate(-50%, -50%); }
.test-title-wrap .page { gap: 6px; }
.test-title-wrap .txt { font-size: 18px; }
.test-title-wrap .txt.bold { font-weight: bold; }
.test-title-wrap .gauge { position: absolute; bottom: 0; left: 0; right: 0; }
.gauge { width: 100%; height: 4px; background: #e4e4e4; }
.gauge-bar { position: absolute; height: 100%; left: 0;  background: #10644c; }

.test-wrap { padding: 40px; }
.test-list { display: flex; flex-flow: column; gap: 32px; }

@media screen and (max-width:1024px) {
  .side-step-list { flex-flow: row; gap: 48px; align-items: center; height: 96px; justify-content: center; }
  .side-step { flex-flow: column; text-align: center; }
  .side-step:not(:first-child)::after { width: 32px; height: 2px; left: -8px; top: 11px; transform: translateX(-100%); }
  .side-step .icon { width: 24px; height: 24px; line-height: 24px; font-size: 12px; }
  .side-step .title { font-size: 12px; }
  
  .test-content { max-height: unset; overflow: unset; padding: 0; }
  .test-title-wrap { height: 56px; padding: 0 16px; }
  .test-title-group { gap: 24px; }
  .test-title-group .txt:not(:last-child)::after { height: 16px; right: -12px; }
  .test-title-wrap .page { gap: 4px; }
  .test-title-wrap .page .txt { font-size: 14px; }
  .test-title-wrap .txt { font-size: 16px; }
  .gauge { height: 2px; }
  
  .test-wrap { padding: 24px 16px; }
  .test-list { gap: 24px; }
}

/* 마인드 인사이트 검사 - 인생점수 */
.test-wrap .guide-txt { background: none; text-align: center; margin-bottom: 32px; font-size: 14px; font-weight: 500; line-height: 1.5; padding: 0; }
.test-wrap .guide-txt .green { position: relative; }
.test-wrap .guide-txt .green::after, .test-wrap .guide-txt .green::before { content: ''; display: block; position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #00754a; top: 50%; transform: translateY(-50%); }
.test-wrap .guide-txt .green::after { left: -8px; }
.test-wrap .guide-txt .green::before { right: -8px; }

.q_item.life { flex-flow: row-reverse; justify-content: space-between; }
.q_item.life .score { width: 16px; }
.q_item.life .score .check { gap: 16px; position: relative; padding-top: 20px; }
.q_item.life .score .bar { width: calc( (776px / 9 ) + 16px ); height: 5px; background: #CCE3DB; position: absolute; right: 0; top: 0; }
.q_item.life .score:first-child .bar { border-top-right-radius: 5px; border-bottom-right-radius: 5px; }
.q_item.life .score:nth-last-child(2) .bar { border-top-left-radius: 5px; border-bottom-left-radius: 5px; }
.q_item.life .score:last-child .bar { display: none; }
.q_item.life .score .bar-core { position: absolute; width: 24px; height: 24px; border-radius: 50%; background: #fff; border: 1px solid #e7e7e7; top: -10px; right: -4px; display: none; }
.q_item.life .score .bar-core::after { content: ''; display: block; position: absolute; width: 12px; height: 12px; background: #00754a; border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%, -50%); }
.q_item.life .score .num { width: auto; height: auto; background: none; font-size: 14px; color: #CCE3DB; line-height: 1; }

.q_item.life .score input:checked + .check .num { background: none; color: #00754a; }
.q_item.life .score input:checked + .check .bar-core { display: block; }
.q_item.life .score.active .num, .q_item.life .score.active ~ .score .num { background: none; color: #00754a; }
.q_item.life .score.active .bar, .q_item.life .score.active ~ .score .bar { background: #00754a; }

/* H */
#daum-post-modal-wrap{
   z-index: 999;
   position: fixed;
   top: 0px;
   left: 0px;
   width: 100%;
   height: 100%;
   background-color: rgba(0, 0, 0, 0.6);
}
#daum-post-modal-wrap>.daum-post-wrap{
   overflow: hidden;
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -50%);
   width: 90%;
   max-width: 500px;
   height: 700px;
   max-height: 90vh;
   border-radius: 24px;
   background-color: #fff;
}
#daum-post-modal-wrap>.daum-post-wrap>.daum-post{
   height: 100% !important;
}
#daum-post-modal-wrap>.daum-post-wrap>.btn-close-modal{
   display: block;
   width: 36px;
   height: 36px;
   transition: 0.2s;
   border-radius: 50%;
   margin: 12px 12px 40px auto;
   background-color: #e8e8ed;
}
#daum-post-modal-wrap>.daum-post-wrap>.btn-close-modal:hover{
   opacity: 0.8;
}
#daum-post-modal-wrap>.daum-post-wrap>.btn-close-modal>.icon{
   font-size: 16px;
   font-weight: 700;
   color: rgba(0, 0, 0, 0.56);
}

@media screen and (max-width:1024px) {
  .q_item.life .score .bar { width: calc( (( 100vw - 32px ) / 9 ) + 16px ); }
  .q_item.life .score .bar-core { width: 20px; height: 20px; top: -8px; right: -2px; }
  .q_item.life .score .bar-core::after { width: 10px; height: 10px;}
}

/* 마인드 인사이트 검사 완료 */
.done-content { padding-top: 80px; padding-bottom: 56px; }
.done-content .title-group { text-align: center; border-bottom: 0; padding-bottom: 0; margin-bottom: 56px; }
.done-content .title { font-size: 32px; }
.done-content .txt { font-size: 20px; line-height: 1.5; }
.done-content .form-footer-btn { max-width: 260px; margin: 0 auto; }

@media screen and (max-width:1024px) {
  .done-content { padding-top: 104px; padding-bottom: 104px; }
  .done-content .title-group { margin-bottom: 32px; }
  .done-content .title { font-size: 24px; }
  .done-content .txt { font-size: 14px; }
  .done-content .form-footer-btn { max-width: 240px; }
}
`

const MindInsightTestRoot = () => {

  const pathname = useLocation().pathname;

  // 페이지 이동 시 스크롤 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pathname]);

  return (
    <>
      <div>
        <Outlet />
        {/* <Footer /> */}
        <footer>
          <div className="footer-wrap">
            <div className="container col-group">
              <div className="left row-group">
                <Link to="index.html" className="footer-logo">
                  <img src={images.footer_logo} alt="" />
                </Link>
                <div className="footer-link-wrap col-group">
                  <Link to="" className="footer-link">
                    개인정보처리방침
                  </Link>
                  <Link to="" className="footer-link">
                    이용약관
                  </Link>
                </div>
                <div className="footer-txt-wrap row-group">
                  <div className="footer-txt-group col-group">
                    <p className="footer-txt">(주)마인드아이티</p>
                    <p className="footer-txt">대표이사 : 홍길동</p>
                    <p className="footer-txt">주소 : 경기도 고양시 덕양구 삼송로 240, 힐스테이트삼송역스칸센 202동 248호</p>
                  </div>
                  <div className="footer-txt-group col-group">
                    <p className="footer-txt">사업자등록번호 : 117-86-02993</p>
                    <p className="footer-txt">대표번호 : 02-381-2024</p>
                    <p className="footer-txt">이메일 : email@email.com</p>
                  </div>
                </div>
                <p className="footer-copy-txt">
                  Copyright 2024 (주)마인드아이티 All rights reserved.
                </p>
                <div className="sns-btn-wrap col-group">
                  <Link to="" className="sns-btn">
                    <img src={images.sns_btn_kc} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                    <img src={images.sns_btn_insta} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                    <img src={images.sns_btn_blog} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                    <img src={images.sns_btn_ytb} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                    <img src={images.sns_btn_ks} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                    <img src={images.sns_btn_band} alt="" />
                  </Link>
                  <Link to="" className="sns-btn">
                    <img src={images.sns_btn_fb} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default MindInsightTestRoot;