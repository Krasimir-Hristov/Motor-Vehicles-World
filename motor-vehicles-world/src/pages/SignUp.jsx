import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../firebase.config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

   async function onSubmit(e) {
    e.preventDefault();


    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(auth.currentUser, {
        displayName: name
      });
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();

      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      toast.success(`Welcome ${formDataCopy.name} !`);
      navigate('/');
    } catch (error) {
      toast.error('Something went wrong with your registration');
    }
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign Up</h1>
      <div
        className="flex justify-center lg:gap-12 flex-wrap items-center
      px-5 py-12 max-w-6xl mx-auto"
      >
        <div className="md:w-[67%] lg:w-[55%] mb-12 md:mb-6 ">
          <img
            src="https://images.unsplash.com/photo-1517817748493-49ec54a32465?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmVnaXN0ZXJ8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] ">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              placeholder="Full Name"
              className="w-full text-black px-4 py-2 text-lx font-bold bg-slate-400
            border-red-600 rounded transition ease-in-out mb-6"
            />

            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              placeholder="Email Address"
              className="w-full text-black px-4 py-2 text-lx font-bold bg-slate-400
            border-red-600 rounded transition ease-in-out mb-6"
            />

            <div className="relative mb-6">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                className="w-full text-black px-4 py-2 text-lx font-bold bg-slate-400
            border-red-600 rounded transition ease-in-out"
              />

              {showPassword ? (
                <AiFillEyeInvisible
                  className="absolute right-3 top-3 
              text-black text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              ) : (
                <AiFillEye
                  className="absolute right-3 top-3 
              text-black text-xl cursor-pointer"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              )}
            </div>
            <div
              className="flex justify-between whitespace-nowrap
            text-sm sm:text-lg"
            >
              <p className="mb-6">
                Have a account?
                <Link
                  to="/sign-in"
                  className="text-green-500 hover:text-green-700
                transition duration-200 ease-in-out ml-1"
                >
                  Sign in
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-red-500 hover:text-red-700 transition
                 duration-200 ease-in-out"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 px-7 py-3 text-sm font-medium uppercase
          rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out 
          active:bg-blue-900"
              type="submit"
            >
              Sign up
            </button>
            <div
              className="flex item-center my-4 
           before:border-t 
           before:flex-1
           before:border-white-300
           after:border-t 
           after:flex-1
           after:border-white-300"
            >
              <p className="text-center font-semibold mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}
