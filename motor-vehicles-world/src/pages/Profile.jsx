import { useEffect, useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { collection, doc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Link } from 'react-router-dom';
import { AiFillCar } from 'react-icons/ai';
import ListingItem from '../components/ListingItem';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });

  const { name, email } = formData;
   function onLogout() {

    auth.signOut();
    navigate('/sign-in');

  }

  function onChange(e) {

    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    
  }

  async function onSubmit() {

    try {

      if( (name.length > 0) && (email.length > 0)) {
        // update display name in firebase auth;
        await updateProfile(auth.currentUser, {
          displayName: name,
          email: email

        });
          
        //update name in the firestore;
        const docRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(docRef, {
          name,
          email,
        });
        toast.success('Your profile has been successfully updated!');

      } else {
       return toast.error('Sorry, could not update your profile! Please try again later!');
      }

      
    } catch (error) {

      toast.error('Sorry, could not update your profile! Please try again later!');

    }

  }

  useEffect( () => {
    async function fetchUserListings() {
      const listingRef = collection(db, 'listings');
      const querry = query(listingRef, 
       where('userRef', '==', auth.currentUser.uid),
       orderBy('timestamp', 'desc')
      );
      const querySnap = await getDocs(querry);
      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListings(listings);
      setLoading(false);

    }

    fetchUserListings();
  }, [auth.currentUser.uid]);
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center mt-6 font-bold">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* Name Input */}

            <input
              type="text"
              id="name"
              value={name}
              disabled={!changeDetail}
              onChange={onChange}
              className={`text-black text-xl mb-6 w-full px-4 border-gray-300 rounded transition ease-in-out 
              ${changeDetail && 'bg-red-200 focus:bg-red-200'}`}
            />

            {/* Email Input */}

            <input
              type="email"
              id="email"
              value={email}
              disabled={!changeDetail}
              onChange={onChange}
              className={`text-black text-xl mb-6 w-full px-4 border-gray-300 rounded transition ease-in-out 
              ${changeDetail && 'bg-red-200 focus:bg-red-200'}`}
            />

            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                Want to set up your profile ?
                <span
                  onClick={() => {

                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState);
                  }}
                  className="text-red-600 hover:text-red-800 transition ease-in-out
              duration-200 ml-2 cursor-pointer"
                >
                  {changeDetail ? 'Apply change' : 'Click here'}
                </span>
              </p>

              <p
                onClick={onLogout}
                className="text-green-600 hover:text-green-800 transition duration-200 ease-in-out
            cursor-pointer"
              >
                Sign out
              </p>
            </div>
          </form>
          <button type="submit" className='w-full bg-blue-600 uppercase px-7 py-3 text-sm font-medium
          rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out 
          hover:shadow-lg active:bg-blue-800'>
            <Link to={'/create-listing'} className='flex justify-center items-center'>
            <AiFillCar className='mr-2 text-3xl bg-black rounded-full p-1 border-2'/>
            Sell or rent your car
            </Link>
          </button>
        </div>
      </section>
      
      <div className='max-w-6xl px-3 mt-6 mx-auto'>
        {!loading && listings.length > 0 && (
          <>
            <h2 className='text-2xl text-center font-semibold'>My Listings</h2>
            <ul>
              {listings.map((listing) => {
                <ListingItem
                key={listing.id} 
                id={listing.id} 
                listing={listing.data}/>;
              })}
            </ul>
          </>
        )}
      </div>
    </>
  );
}
