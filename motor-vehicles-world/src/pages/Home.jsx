import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../firebase.config';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import SliderHomePage from '../components/SliderHomePage';
import ListingItem from '../components/ListingItem';

export default function Home() {
  // Discounted
  const [discountedListing, setDiscountedListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingRef = collection(db, 'listings');
        // create query
        const q = query(
          listingRef,
          where('discount', '==', true),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setDiscountedListing(listings);
      } catch (error) {
        console.log(error);
      }
    }

    fetchListings();
  }, []);

  ///////////////////////////////////////////////////////////////////////////////////////////////

  // Cars for Rent
  const [rentListing, setRentListing] = useState(null);
  useEffect(() => {
    async function fetchListings() {
      try {
        // get reference
        const listingRef = collection(db, 'listings');
        // create query
        const q = query(
          listingRef,
          where('type', '==', 'rent'),
          orderBy('timestamp', 'desc'),
          limit(4)
        );
        // execute the query
        const querySnap = await getDocs(q);
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setRentListing(listings);
      } catch (error) {
        console.log(error);
      }
    }
    
    fetchListings();
  }, []);

///////////////////////////////////////////////////////////////////////////////////////////////

    // Cars for Sell
    const [saleListing, setSaleListing] = useState(null);
    useEffect(() => {
      async function fetchListings() {
        try {
          // get reference
          const listingRef = collection(db, 'listings');
          // create query
          const q = query(
            listingRef,
            where('type', '==', 'sell'),
            orderBy('timestamp', 'desc'),
            limit(4)
          );
          // execute the query
          const querySnap = await getDocs(q);
          const listings = [];
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            });
          });
  
          setSaleListing(listings);
        } catch (error) {
          console.log(error);
        }
      }
      
      fetchListings();
    }, []);


  return (
    <div>
      <SliderHomePage />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {discountedListing && discountedListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent offers</h2>

            <Link to={'/offers'}>

              <p className="px-3 text-sm text-blue-600 hover:text-blue-800
              transition duration-150 ease-out"
              >Show more offers</p>

            </Link>
            <ul className="sm:grid sm:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-5">
              { discountedListing.map((listing) => (
                <ListingItem 
                key={listing.id} 
                listing={listing.data}
                id={listing.id}
                />
              )) }
            </ul>
          </div>
        )}

{rentListing && rentListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Cars for rent</h2>

            <Link to={'/category/rent'}>

              <p className="px-3 text-sm text-blue-600 hover:text-blue-800
              transition duration-150 ease-out"
              >Show more cars for rent</p>

            </Link>
            <ul className="sm:grid sm:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-5">
              { rentListing.map((listing) => (
                <ListingItem 
                key={listing.id} 
                listing={listing.data}
                id={listing.id}
                />
              )) }
            </ul>
          </div>
        )}

{saleListing && saleListing.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Cars for sale</h2>

            <Link to={'/category/sell'}>

              <p className="px-3 text-sm text-blue-600 hover:text-blue-800
              transition duration-150 ease-out"
              >Show more cars for sale</p>

            </Link>
            <ul className="sm:grid sm:grid-cols-2 
            lg:grid-cols-3 xl:grid-cols-5">
              { saleListing.map((listing) => (
                <ListingItem 
                key={listing.id} 
                listing={listing.data}
                id={listing.id}
                />
              )) }
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
