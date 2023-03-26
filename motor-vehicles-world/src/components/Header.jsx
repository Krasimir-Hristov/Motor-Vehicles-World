import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


export default function Header() {

  const [pageState, setPageState] = useState('Sign in');
  const [registerState, setRegisterState] = useState('Register');
  const [loggedIn, setLoggedIn] = useState(true);

    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect( () => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setPageState(auth.currentUser.displayName);
        } else {
          setPageState('Sign in');
        }
      });
    }, [auth]);

    useEffect( () => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setRegisterState('Logout');
        } else {
          setRegisterState('Register');
        }
      });
    }, [auth]);

    useEffect( () => {
      onAuthStateChanged(auth, (user) => {
        if(user) {
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      });
    }, [auth]);

    function onLogout() {

      auth.signOut();
      navigate('/sign-in');
  
    }

    function pathMatchRoute(route) {
      if(route === location.pathname) {
          return true;
      }
    }


  return (
    <div
      className="text-white bg-black  border-b-2 border-red-700 shadow-sm sticky top-0 
    z-40"
    >
      <header
        className="flex justify-between items-center 
        px-3 max-w-6xl mx-auto"
      >
        <div>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSh16AWmcjrXvgfGm_jcyEsuXEZ-YuNO9aDXQ&usqp=CAU"
            alt="logo"
            className="h-20 cursor-pointer"
            onClick={()=> navigate('/')}
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li className={`cursor-pointer py-3 text-lg font-bold text-white
           ${pathMatchRoute('/') && 'text-sm text-teal-500 border-b-4 border-b-red-600'}`}
           onClick={()=> navigate('/')} >Home</li>

            <li className={`cursor-pointer py-3 text-lg font-bold text-white
           ${pathMatchRoute('/offers') && 'text-sm text-teal-500 border-b-4 border-b-red-600'}`}
           onClick={()=> navigate('/offers')} >Offers</li>

            <li className={`cursor-pointer py-3 text-lg font-bold text-white
           ${(pathMatchRoute('/sign-in') || pathMatchRoute('/profile')) 
           && 'text-sm text-white-500 border-b-red-600 border-b-4'}`}
           onClick={()=> navigate('/profile')} >{ pageState }</li>

           <li className={`cursor-pointer py-3 text-lg font-bold text-white
           ${pathMatchRoute('/sign-up') && 'text-sm text-teal-500 border-b-4 border-b-red-600'}`}
           onClick={loggedIn ? () => {onLogout();} : ()=> navigate('/sign-up')} >{ registerState }</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
