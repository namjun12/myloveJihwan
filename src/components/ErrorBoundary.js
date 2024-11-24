import { useRouteError } from 'react-router-dom';

const ErrorBoundary = () => {
   const error = useRouteError();

   alert(error.message);
   // window.location.href = '/';
}

export default ErrorBoundary