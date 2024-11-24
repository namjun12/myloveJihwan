import { useEffect } from 'react'

const IndexHeader = () => {
   useEffect(() => {
      const header = document.getElementById("header")
      header.classList.add("index-header")

      // 헤더 스크롤 이벤트
      const handleScroll = () => {
         if (window.scrollY > 0) {
            header.classList.remove("index-header");
         } else {
            header.classList.add("index-header");
         }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
         window.removeEventListener("scroll", handleScroll)
         header.classList.remove("index-header")
      }
   }, [])
}

export default IndexHeader