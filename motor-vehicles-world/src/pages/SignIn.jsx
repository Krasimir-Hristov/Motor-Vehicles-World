import { useState } from "react";

export default function SignIn() {
  const [ formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  function onChange(e) {
      setFormData((prevState)=> ({
        ...prevState,
        [e.target.id]: e.target.value,
         
      }))
  }

  return (
    <section>
      <h1 className="text-3xl text-center mt-6 font-bold">Sign In</h1>
      <div className="flex justify-center lg:gap-8 flex-wrap items-center
      px-5 py-12 max-w-6xl mx-auto">
        <div className="md:w-[67%] lg:w-[30%] mb-12 md:mb-6 ">
          <img
            src="https://images.unsplash.com/photo-1576411666423-53e284986604?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8Y2FyJTIwa2V5c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
            alt="key"
            className="w-full rounded-2xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w[40%] ">
          <form>
            <input type="email" id="email" 
            value={ email } onChange={ onChange }
            placeholder= "Email Address"
            className="w-full text-black px-4 py-2 text-lx font-bold bg-slate-400
            border-red-600 rounded transition ease-in-out"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
