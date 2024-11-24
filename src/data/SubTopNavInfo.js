const Sapienza = () => {
   const data = [
      {
         mainCategory: "사피엔자 아카데미아",
         subCategory: [
            {
               name: '3급 과정',
               path: '/sapienza-academia/level-3-course',
            },
            {
               name: '2급 과정',
               path: '/sapienza-academia/level-2-course',
            },
            {
               name: '1급 과정',
               path: '/sapienza-academia/level-1-course',
            },
            {
               name: '수퍼바이저',
               path: '/sapienza-academia/supervisor',
            },
         ]
      },
      {
         mainCategory: "상담사 · 센터소개",
         subCategory: [
            {
               name: '상담사',
               path: '/counselor-center/counselor',
            },
            {
               name: '상담·코칭센터',
               path: '/counselor-center/center',
            },
         ]
      },
   ]
   return data;
}

export { Sapienza }