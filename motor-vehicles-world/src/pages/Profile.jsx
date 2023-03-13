import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';

export default function Profile() {

    const auth = getAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: auth.currentUser.displayName,
      email: auth.currentUser.email,
    });

    const {name, email} = formData;

    function onLogout() {
      auth.signOut();
      navigate('/');
    }
  
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            { /* Name Input */}

            <input type="text" id="name" value={name} disabled 
            className="text-black text-xl mb-6 w-full px-4 border-gray-300 rounded transition ease-in-out" />
           
            { /* Email Input */}

            <input type="email" id="email" value={email} disabled 
            className="text-black text-xl mb-6 w-full px-4 border-gray-300 rounded transition ease-in-out" />
         

          <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
            <p className="flex items-center">Do you want to change your name?
              <span className="text-red-600 hover:text-red-800 transition ease-in-out
              duration-200 ml-2 cursor-pointer">Edit</span>
            </p>

            <p onClick={onLogout} className="text-green-600 hover:text-green-800 transition duration-200 ease-in-out
            cursor-pointer">Sign out</p>
          </div>

         </form>
        </div>
      </section>
    </>
  );
}
