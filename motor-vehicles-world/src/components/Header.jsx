import { useLocation, useNavigate } from 'react-router';

export default function Header() {

    const location = useLocation();
    const navigate = useNavigate();

    function pathMatchRoute(route) {
      if(route === location.pathname) {
          return true;
      }
    }


  return (
    <div
      className="text-white bg-black  border-b-2 border-red-700 shadow-sm sticky top-0 
    z-50"
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
           ${pathMatchRoute('/') && 'text-lg text-gray-500 border-b-4 border-b-red-600'}`}
           onClick={()=> navigate('/')} >Home</li>
            <li className={`cursor-pointer py-3 text-lg font-bold text-white
           ${pathMatchRoute('/offers') && 'text-sm text-gray-500 border-b-4 border-b-red-600'}`}
           onClick={()=> navigate('/offers')} >Offers</li>
            <li className={`cursor-pointer py-3 text-lg font-bold text-white
           ${pathMatchRoute('/sing-in') && 'text-sm text-gray-500 border-b-4 border-b-red-600'}`}
           onClick={()=> navigate('/sing-in')} >Sing In</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
