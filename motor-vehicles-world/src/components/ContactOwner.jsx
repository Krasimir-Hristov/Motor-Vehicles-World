import { useEffect, useState } from 'react';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';

import { toast } from 'react-toastify';

export default function ContactOwner({ userRef, listing }) {
  const [ owner, setOwner ] = useState(null);
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    async function getOwner() {
      const docRef = doc(db, 'users', userRef);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setOwner(docSnap.data());
      } else {
        toast.error('Could not get owner data');
      }
    }
    getOwner();
  }, [userRef]);

  function onChange(e) {
    setMessage(e.target.value);
  }

  return (
    <>
      {owner !== null && (
        <div className="flex flex-col w-full">
          <p className="text-black ">
            Contact {owner.name} for the {listing.model.toLowerCase()}
          </p>

          <div className="mt-3 mb-6">
            <textarea
            className="text-gray-700 w-full px-4 py-2 text-xl bg-white 
            border border-gray-300 rounded transition duration-150 ease-in-out
            focus:text-gray-700 focus:bg-white focus:border-slate-600"
             name="message" 
             id="message" 
             rows="2" 
             value={message}
            onChange={onChange}>
            </textarea>
          </div>
          <a href={`mailto:${owner.email}?Subject=${listing.model}&body${message}`}>
            <button className="text-black px-7 py-3 bg-blue-600 text-white
            rounded text-sm uppercase shadow-md hover:bg-blue-700
            hover:shadow-lg focus:bg-blue-700
            focus:shadow-lg active:bg-blue-800
            active:shadow-lg transition duration-150 ease-out w-full text-center mb-6" 
            type="button">
                Send Message
                </button>
          </a>
        </div>
      )}
    </>
  );
}
