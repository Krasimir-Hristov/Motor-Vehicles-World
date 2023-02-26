import { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  function onChange(e) {
    setEmail( e.target.value );
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Forgot Password</h1>
      <div
        className="flex justify-center lg:gap-12 flex-wrap items-center
      px-5 py-12 max-w-6xl mx-auto"
      >
        <div className="md:w-[67%] lg:w-[55%] mb-12 md:mb-6 ">
          <img
            src="https://images.unsplash.com/photo-1633265486064-086b219458ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGZvcmdvdCUyMHBhc3N3b3JkfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
                  to="/sign-in"
                  className="text-red-500 hover:text-red-700 transition
                 duration-200 ease-in-out"
                >
                  Sign in instead
                </Link>
              </p>
            </div>
            <button
              className="w-full bg-blue-600 px-7 py-3 text-sm font-medium uppercase
          rounded shadow-md hover:bg-blue-700 transition duration-200 ease-in-out 
          active:bg-blue-900"
              type="submit"
            >
              Send reset password
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

