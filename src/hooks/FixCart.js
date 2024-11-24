import { useEffect, useState } from "react";

const useFixedItemOn = () => {
   const [fixedItemisOn, setFixedItemIsOn] = useState(false);

   const handleScroll = () => {
      const courseContentWrap = document.querySelector('.course-content-wrap');
      const courseContentWrapTop = courseContentWrap?.getBoundingClientRect().top + window.scrollY;

      // 스크롤 위치가 요소의 높이 이상일 경우 fixedItemisOn을 true로 설정
      if (window.scrollY >= courseContentWrapTop) {
         setFixedItemIsOn(true);
      } else {
         setFixedItemIsOn(false);
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);

   return fixedItemisOn;
};

export default useFixedItemOn;
