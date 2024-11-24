import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';

// Recoil
import { authState } from '../../recoil/LoginInfoAtom';

// Components
import Loading from '../../components/common/Loading';

const PrivateRoute = () => {
   const [isAuthenticated, setIsAuthenticated] = useRecoilState(authState);
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated !== null && isAuthenticated === false) {
         alert("로그인이 필요한 페이지입니다.");
         navigate("/login/select", { replace: true });
      }
   }, [isAuthenticated, navigate]);

   return isAuthenticated ? <Outlet /> : <Loading />;
};

export default PrivateRoute;
