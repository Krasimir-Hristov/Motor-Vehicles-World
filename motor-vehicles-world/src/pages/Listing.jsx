import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { getAuth } from 'firebase/auth';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from 'swiper';
import 'swiper/css/bundle';
import { FaShare } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { TbEngine } from 'react-icons/tb';
import { GiHorseHead } from 'react-icons/gi';
import { IoSnowSharp } from 'react-icons/io5';
import { FaMapMarked } from 'react-icons/fa';
import { TbParking } from 'react-icons/tb';
import { BsFillShieldLockFill } from 'react-icons/bs';

import Spinner from '../components/Spinner';
import ContactOwner from '../components/ContactOwner';

export default function Listing() {
  const auth = getAuth();

  const params = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [shareLinkCopied, setShareLinkCopied] = useState(false);
  const [contactOwner, setContactOwner] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    async function fetchListing() {
      const docRef = doc(db, 'listings', params.listingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }

    fetchListing();
  }, [params.listingId]);

  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white 
        cursor-pointer text-black border-2 border-gray-400 rounded-full w-12 h-12 flex 
        justify-center items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopied(true);
          setTimeout(() => {
            setShareLinkCopied(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-700" />
      </div>
      {shareLinkCopied && (
        <p
          className="fixed top-[23%] right-[5%] font-semibold border-spacing-2 border-gray-400 
            rounded-md bg-white z-10 text-black p-2"
        >
          Link Copied
        </p>
      )}

      <div
        className="flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 rounded-lg bg-white 
      lg:space-x-5 mt-20"
      >
        <div className="w-full">
          <p
            className="text-black text-2xl 
                    font-bold mb-3 text-blue-900"
          >
            {listing.model} - ${' '}
            {listing.discount
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            {listing.type === 'rent' ? ' / Day' : ''}
          </p>

          <p className="text-black flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>

          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p
              className="bg-red-800 w-full max-w-[200px] 
            rounded-md p-1 text-center font-semibold shadow-md"
            >
              {listing.type === 'rent' ? 'Rent' : 'Sale'}
            </p>

            {listing.discount && (
              <p
                className="text-white  w-full max-w-[200px] bg-green-800 p-1 
                rounded-md text-center font-semibold shadow-md"
              >
                ${' '}
                {Number(listing.regularPrice) - Number(listing.discountedPrice)}{' '}
                Discount{' '}
              </p>
            )}
          </div>
          <p className="text-black mt-3 mb-3">
            <span className="font-bold">Description: </span>
            {listing.description}
          </p>
          <ul className="flex justify-between mb-6">
            <li className="text-black flex text-center items-center">
              <TbEngine className="font-bold mr-1 text-xl" />
              {listing.engine}
            </li>

            <li className="text-black flex text-center items-center">
              <GiHorseHead className="font-bold mr-1 text-xl" />
              {listing.hp}
            </li>

            <li className="text-black flex text-center items-center">
              <IoSnowSharp className="font-bold mr-1 text-xl" />
              {listing.airCondition ? 'Yes' : 'No'}
            </li>

            <li className="text-black flex text-center items-center">
              <FaMapMarked className="font-bold mr-1 text-xl" />
              {listing.navigation ? 'Yes' : 'No'}
            </li>

            <li className="text-black flex text-center items-center">
              <TbParking className="font-bold mr-1 text-xl" />
              {listing.parktronic ? 'Yes' : 'No'}
            </li>

            <li className="text-black flex text-center items-center">
              <BsFillShieldLockFill className="font-bold mr-1 text-xl" />
              {listing.immobilizer ? 'Yes' : 'No'}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactOwner && (
            <div className="mt-6">
              <button
                onClick={() => setContactOwner(true)}
                className="px-7 py-3 bg-blue-600 tex-white 
          font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
          focus:bg-red-600 focus:shadow-lg w-full text-center transition duration-150 ease-out"
              >
                Contact Owner
              </button>
            </div>
          )}
          {contactOwner && (
            <ContactOwner
              userRef={listing.userRef}
              listing={listing}
              className="text-black z-20"
            />
          )}
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg-h-[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}
