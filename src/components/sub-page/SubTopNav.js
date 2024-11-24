import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const SubTopNav = ({ SubTopNavInfo }) => {

   const pathname = useLocation().pathname;
   const isSapienzaAcademia = pathname.startsWith('/sapienza-academia');
   const isCounselorCenter = pathname.startsWith('/counselor-center');

   const [mainCategoryIndex, setMainCategoryIndex] = useState(false);
   const [subCategoryIndex, setSubCategoryIndex] = useState(false);
   const [clickedMCIndex, setClickedMCIndex] = useState(0);
   const [currentMC, setCurrentMC] = useState('');
   const [currentSC, setCurrentSC] = useState('');

   useEffect(() => {
      // main category
      if(isSapienzaAcademia){
         setCurrentMC(SubTopNavInfo[0].mainCategory)
         setClickedMCIndex(0)
      } else if(isCounselorCenter){
         setCurrentMC(SubTopNavInfo[1].mainCategory)
         setClickedMCIndex(1)
      }

      // sub category
      if (pathname === '/sapienza-academia/level-3-course') {
         setCurrentSC('3급 과정')
      } else if (pathname === '/sapienza-academia/level-2-course') {
         setCurrentSC('2급 과정')
      } else if (pathname === '/sapienza-academia/level-1-course') {
         setCurrentSC('1급 과정')
      } else if (pathname === '/sapienza-academia/supervisor') {
         setCurrentSC('슈퍼바이저')
      } else if (pathname === '/counselor-center/counselor') {
         setCurrentSC('상담사')
      } else if (pathname === '/counselor-center/center') {
         setCurrentSC('상담·코칭센터')
      }
   }, [])

   const handleMainCategory = () => {
      setMainCategoryIndex((prev) => !prev)
   }
   const handleSubCategory = () => {
      setSubCategoryIndex((prev) => !prev)
   }
   const selectMainCategory = (currentMC, index) => {
      setClickedMCIndex(index)
      setCurrentMC(currentMC)
   }
   const selectSubCategory = (currentSC) => {
      setMainCategoryIndex(false)
      setSubCategoryIndex(false)
   }

   return (
      <div className="sub-top-nav">
         <div className="container w1200 col-group">
            <a href="/index.html" className="home-btn">
               <i className="xi-home"></i>
            </a>
            <div className={`${mainCategoryIndex ? "active" : ""} sub-top-gnb-wrap default row-group`}>
               <div onClick={() => handleMainCategory()} className="sub-top-gnb-default col-group">
                  <p className="txt">{currentMC}</p>
                  <i className="xi-angle-down"></i>
               </div>
               <div className="sub-top-gnb">
                  <div className={`${mainCategoryIndex ? "active" : ""} sub-top-gnb-list`}>
                     {SubTopNavInfo.map((categoryItem, index) => (
                        <div onClick={() => selectMainCategory(categoryItem.mainCategory, index)} className="sub-top-gnb-item" data-tab="sub_top_gnb_1" key={index}>
                           {categoryItem.mainCategory}
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className={`${subCategoryIndex ? "active" : ""} sub-top-gnb-wrap row-group`}>
               <div onClick={() => handleSubCategory()} className="sub-top-gnb-default col-group">
                  <p className="txt">{currentSC}</p>
                  <i className="xi-angle-down"></i>
               </div>
               <div className="sub-top-gnb">
                  <div className={`${subCategoryIndex ? "active" : ""} sub-top-gnb-list`} id="sub_top_gnb_1">
                     {SubTopNavInfo[clickedMCIndex].subCategory.map((subCategory, index) => (
                        <Link
                           onClick={() => selectSubCategory(subCategory.name)}
                           to={subCategory.path}
                           className="sub-top-gnb-item"
                           key={index}
                        >
                           {subCategory.name}
                        </Link>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default SubTopNav