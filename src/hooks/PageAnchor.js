import { useEffect, useState } from 'react'

const PageAnchor = () => {
   const [scrollY, setScrollY] = useState(0);
   const anchorItems = document.querySelectorAll(".page-anchor-item");
   const tabItems = document.querySelectorAll(".tab-link");
   const anchorItemTop = [];

   useEffect(() => {
      // 탭을 클릭하면 클릭한 요소에 class active 추가
      tabItems.forEach((tabItem) => {
         tabItem.addEventListener("click", () => {
            tabItems.forEach((notClicked) => notClicked.classList.remove("active"))
            tabItem.classList.add("active")
         })
      })
   }, [tabItems])
   useEffect(() => {
      // 고정 될 아이템들 top값 구하기
      for (let i = 0;i < anchorItems.length;i++) {
         anchorItemTop[i] = anchorItems[i].getBoundingClientRect().top + window.scrollY;
         if (scrollY >= anchorItemTop[i]) {
            tabItems.forEach((notClicked) => notClicked.classList.remove("active"))
            tabItems[i].classList.add("active")
         }
      }

      const tabActiveByScroll = () => {
         setScrollY(window.scrollY)
      }

      window.addEventListener("scroll", tabActiveByScroll)
      return () => {
         window.removeEventListener("scroll", tabActiveByScroll)
      }
   }, [scrollY, anchorItems, tabItems])
}

export default PageAnchor;