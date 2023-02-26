import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div
        className="flex justify-center lg:gap-12 flex-wrap items-center
      px-5 py-12 max-w-6xl mx-auto"
      >
        <div className="md:w-[67%] lg:w-[55%] mb-12 md:mb-6 ">
          <img
            src="https://plus.unsplash.com/premium_photo-1664301939396-90cfdcfee181?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Y2FyJTIwa2V5c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] ">
          <form>
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
                Don't have a account?
                <Link
                  to="/sign-up"
                  className="text-green-500 hover:text-green-700
                transition duration-200 ease-in-out ml-1"
                >
                  Register
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
              Sign in
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
