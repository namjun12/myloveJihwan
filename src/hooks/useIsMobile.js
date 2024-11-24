import { useEffect, useState } from 'react';

const useIsMobile = () => {
   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

   useEffect(() => {
      const mediaQuery = window.matchMedia('(max-width: 768px)');

      const handleChange = (event) => {
         setIsMobile(event.matches);
      };

      mediaQuery.addEventListener('change', handleChange);

      return () => mediaQuery.removeEventListener('change', handleChange);
   }, []);

   return isMobile;
};

export default useIsMobile;
