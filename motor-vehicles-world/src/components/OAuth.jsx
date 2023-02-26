import React from 'react';
import { FcGoogle } from 'react-icons/fc';

export default function OAuth() {
  return (
    <button className='flex item-center justify-center w-full bg-red-700 
    px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 transition duration-200
    rounded ease-in-out active:bg-red-900'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
    </button>
  );
}
