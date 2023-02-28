import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { db } from '../firebase.config';

export default function OAuth() {

  const navigate = useNavigate();

  async function onGoogleClick() {

    try {

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters( {
        prompt : 'select_account',
      });
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      //check user if existed 

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      if(!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        
      }
      toast.success(`Welcome ${user.displayName} !`);

      navigate('/');

    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  }

  return (
    <button type='button' onClick={onGoogleClick} className='flex item-center justify-center w-full bg-red-700 
    px-7 py-3 uppercase text-sm font-medium hover:bg-red-800 transition duration-200
    rounded ease-in-out active:bg-red-900'>
        <FcGoogle className='text-2xl bg-white rounded-full mr-2'/>
        Continue with Google
    </button>
  );
}
