import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Root from './Root'

// ----- Pages -----
// ===== Not found =====
import NotFound from './components/NotFound'

// ===== 로그인 필요 페이지 =====
import PrivateRoute from './hooks/token/PrivateRoute'

// ===== Main =====
import MainPage from './pages/MainPage'

// ===== Company =====
import About from './pages/company/About'

// ===== Mind Insight =====
import Introduction from './pages/mind-insight/Introduction'
import MindInsight from './pages/mind-insight/MindInsight'
import Consultation from './pages/mind-insight/Consultation'
import MindReport from './pages/mind-insight/MindReport'

// ===== Mind Therapy =====
import MeditationReflection from './pages/mind-therapy/MeditationReflection'
import DailyLove from './pages/mind-therapy/DailyLove'
import Confession from './pages/mind-therapy/Confession'
import Eap from './pages/mind-therapy/Eap'
import WalkingMeditation from './pages/mind-therapy/WalkingMeditation'

// ===== Sapienza Academia =====
import ProgramOverview from './pages/sapienza-academia/ProgramOverview'
import Level1Course from './pages/sapienza-academia/Level1Course'
import Level2Course from './pages/sapienza-academia/Level2Course'
import Level3Course from './pages/sapienza-academia/Level3Course'
import Supervisor from './pages/sapienza-academia/Supervisor'

// ===== Counseloer Center =====
import Counselor from './pages/counselor-center/Counselor'
import Center from './pages/counselor-center/Center'

// ===== User =====
import LoginSelect from './pages/user/login/LoginSelect'
import LoginGeneralUser from './pages/user/login/LoginGeneralUser'
import LoginCounselor from './pages/user/login/LoginCounselor'
import JoinSelect from './pages/user/join/JoinSelect'
import JoinGeneralUser from './pages/user/join/general-user/JoinGeneralUser'
import JoinCounselor from './pages/user/join/counselor/JoinCounselor'
import GeneralUserEmail from './pages/user/join/general-user/GeneralUserEmail'
import CounselorEmail from './pages/user/join/counselor/CounselorEmail'
import Done from './pages/user/join/Done'
import TestCodeUseOrGift from './pages/user/my-page/general-user/TestCodeUseOrGift'
import TestResult from './pages/user/my-page/counselor/Result'
import TestProgress from './pages/user/my-page/general-user/Progress'
import TestCodeSend from './pages/user/my-page/counselor/TestCodeSend'
import SendHistory from './pages/user/my-page/counselor/SendHistory'
import PurchaseHistory from './pages/user/my-page/purchase/PurchaseHistory'
import RefundHistory from './pages/user/my-page/purchase/RefundHistory'
import Inquiry from './pages/user/my-page/inquiry/Inquiry'
import UseOrGiftHistory from './pages/user/my-page/general-user/UseOrGiftHistory'
import AccountManagement from './pages/user/my-page/AccountManagement'
import MyPagelayout from './pages/user/my-page/Layout'
import InquiryDetail from './pages/user/my-page/inquiry/Detail'
import InquiryCreate from './pages/user/my-page/inquiry/Create'
import CounselorDone from './pages/user/join/counselor/Done'
import PurchaseDetailPage from './pages/user/my-page/purchase/DetailPage'
import Order from './pages/user/order/Order'
import OrderDone from './pages/user/order/Done'
import FindId from './pages/user/find-account/id/FindId'
import FindIdCounselor from './pages/user/find-account/id/FindIdCounselor'
import FindPw from './pages/user/find-account/pw/FindPw'
import GeneralUserSocial from './pages/user/join/general-user/Social'
import FindIdDone from './pages/user/find-account/id/FindIdDone'
import ChangePw from './pages/user/find-account/pw/ChangePw'
import CounselorSocial from './pages/user/join/counselor/Social'
import FindPwCounselor from './pages/user/find-account/pw/FindPwCounselor'
import ChangePwDone from './pages/user/find-account/pw/ChangePwDone'

// ===== policy =====
import Marketing from './pages/policy/Marketing'
import Privacy from './pages/policy/Privacy'
import Service from './pages/policy/Service'

// ===== Mind Insight Test =====
import MindInsightTestRoot from './pages/mind-insight-test/Root'
import MindInsightTestIndex from './pages/mind-insight-test/MainPage'
import UserInfoInput from './pages/mind-insight-test/pages/UserInfoInput'
import Guide from './pages/mind-insight-test/pages/Guide'
import EnterAnswer from './pages/mind-insight-test/pages/EnterAnswer'
import CheckResults from './pages/mind-insight-test/pages/CheckResults'
import TestDone from './pages/mind-insight-test/pages/TestDone'
import PageContainer from './pages/mind-insight-test/result-pages/PageContainer'

const Router = createBrowserRouter([
   {
      path: '/',
      element: <Root />,
      children: [
         {
            path: '',
            element: <MainPage />
         },
         {
            path: 'company',
            children: [
               {
                  path: '',
                  element: <Navigate to="about" />
               },
               {
                  path: 'about',
                  element: <About />
               }
            ]
         },
         {
            path: 'mind-insight',
            children: [
               {
                  path: '',
                  element: <Navigate to="introduction" />
               },
               {
                  path: 'introduction',
                  element: <Introduction />
               },
               {
                  path: 'mind-insight',
                  element: <MindInsight />
               },
               {
                  path: 'mind-report',
                  element: <MindReport />
               },
               {
                  path: 'consultation',
                  element: <Consultation />
               }
            ]
         },
         {
            path: 'mind-therapy',
            children: [
               {
                  path: '',
                  element: <Navigate to="walking-meditation" />
               },
               {
                  path: 'walking-meditation',
                  element: <WalkingMeditation />,
               },
               {
                  path: 'meditation-reflection',
                  element: <MeditationReflection />,
               },
               {
                  path: 'daily-love',
                  element: <DailyLove />,
               },
               {
                  path: 'confession',
                  element: <Confession />,
               },
               {
                  path: 'eap',
                  element: <Eap />,
               },
            ]
         },
         {
            path: 'sapienza-academia',
            children: [
               {
                  path: '',
                  element: <Navigate to="program-overview" />
               },
               {
                  path: 'program-overview',
                  element: <ProgramOverview />
               },
               {
                  path: 'level-1-course',
                  element: <Level1Course />
               },
               {
                  path: 'level-2-course',
                  element: <Level2Course />
               },
               {
                  path: 'level-3-course',
                  element: <Level3Course />
               },
               {
                  path: 'supervisor',
                  element: <Supervisor />
               },
            ]
         },
         {
            path: 'counselor-center',
            children: [
               {
                  path: '',
                  element: <Navigate to="counselor" />
               },
               {
                  path: 'counselor',
                  element: <Counselor />
               },
               {
                  path: 'center',
                  element: <Center />
               }
            ]
         },
         {
            path: 'login',
            children: [
               {
                  path: 'select',
                  element: <LoginSelect />
               },
               {
                  path: '',
                  element: <LoginGeneralUser />
               },
               {
                  path: 'counselor',
                  element: <LoginCounselor />
               },
            ]
         },
         {
            path: 'join',
            children: [
               {
                  path: 'select',
                  element: <JoinSelect /> // 일반, 상담사 선택(공통 사용)
               },
               {
                  path: '',
                  element: <JoinGeneralUser /> // 이메일, 소셜 선택
               },
               {
                  path: 'email',
                  element: <GeneralUserEmail />
               },
               {
                  path: 'social',
                  element: <GeneralUserSocial />
               },
               {
                  path: 'done',
                  element: <Done />
               },
               {
                  path: 'counselor',
                  children: [
                     // 이메일, 소셜 선택
                     {
                        path: '',
                        element: <JoinCounselor />
                     },
                     {
                        path: 'email',
                        element: <CounselorEmail />
                     },
                     {
                        path: 'social',
                        element: <CounselorSocial />,
                     },
                     {
                        path: 'complete',
                        element: <CounselorDone />
                     }
                  ]
               },
            ]
         },
         {
            path: 'my-page',
            element: <PrivateRoute />,
            children: [
               {
                  path: '',
                  element: <MyPagelayout />,
                  children: [
                     {
                        path: 'counselor',
                        children: [
                           { path: 'code-send', element: <TestCodeSend /> },
                           { path: 'send-history', element: <SendHistory /> },
                           { path: 'test-result', element: <TestResult /> },
                        ]
                     },
                     {
                        path: 'general-user',
                        children: [
                           { path: 'code-use-gift', element: <TestCodeUseOrGift /> },
                           { path: 'use-gift-history', element: <UseOrGiftHistory /> },
                           { path: 'progress', element: <TestProgress /> },
                        ]
                     },
                     {
                        path: 'purchase',
                        children: [
                           { path: '', element: <Navigate to="history" /> },
                           { path: 'history', element: <PurchaseHistory /> },
                           { path: 'detail', element: <PurchaseDetailPage /> },
                        ]
                     },
                     {
                        path: 'refund',
                        children: [
                           { path: '', element: <Navigate to='history' /> },
                           { path: 'history', element: <RefundHistory /> },
                           { path: 'detail', element: <PurchaseDetailPage /> }
                        ]
                     },
                     {
                        path: 'inquiry',
                        children: [
                           { path: '', element: <Inquiry /> },
                           { path: ':id', element: <InquiryDetail /> },
                           { path: 'create', element: <InquiryCreate /> }
                        ]
                     },
                     {
                        path: 'account-management',
                        element: <AccountManagement />
                     },
                  ]
               }
            ]
         },
         {
            path: 'find-account',
            children: [
               {
                  path: '',
                  element: <Navigate to='id' />
               },
               {
                  path: 'id',
                  children: [
                     {
                        path: '',
                        element: <FindId />
                     },
                     {
                        path: 'counselor',
                        element: <FindIdCounselor />
                     }
                  ]
               },
               {
                  path: 'id-done',
                  element: <FindIdDone />
               },
               {
                  path: 'pw',
                  children: [
                     {
                        path: '',
                        element: <FindPw />
                     },
                     {
                        path: 'counselor',
                        element: <FindPwCounselor />
                     }
                  ]
               },
               {
                  path: 'change-pw',
                  element: <ChangePw />
               },
               {
                  path: 'change-pw-done',
                  element: <ChangePwDone />
               }
            ]
         },
         {
            path: 'order',
            element: <PrivateRoute />,
            children: [
               {
                  path: '',
                  element: <Order />
               },
               {
                  path: 'done',
                  element: <OrderDone />
               }
            ]
         },
         {
            path: 'policy',
            children: [
               {
                  path: '',
                  element: <Navigate to='marketing' />,
               },
               {
                  path: 'marketing',
                  element: <Marketing />,
               },
               {
                  path: 'privacy',
                  element: <Privacy />,
               },
               {
                  path: 'service',
                  element: <Service />,
               },
            ]
         }
      ],
      errorElement: <NotFound />
   },
   {
      path: '/mind-insight-test',
      element: <MindInsightTestRoot />,
      children: [
         {
            path: '',
            element: <Navigate to="index" />
         },
         {
            path: 'index',
            element: <MindInsightTestIndex />
         },
         {
            path: 'info-input',
            element: <UserInfoInput />
         },
         {
            path: 'guide',
            element: <Guide />
         },
         {
            path: 'enter-answer',
            element: <EnterAnswer />
         },
         {
            path: 'check-results',
            element: <CheckResults />,
         },
         {
            path: 'done',
            element: <TestDone />
         },
         {
            path: 'direct-check',
            element: <PageContainer />
         }
      ]
   }
])

export default Router