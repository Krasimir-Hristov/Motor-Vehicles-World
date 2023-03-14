import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import Spinner from './Spinner';

export default function PrivetRoute() {

    const { loggedIn, checkingStatus } = useAuthStatus();

    if(checkingStatus) {
        return <Spinner />;
    }

  return  loggedIn ? <Outlet/> : <Navigate to="/sign-in"/>;
}
