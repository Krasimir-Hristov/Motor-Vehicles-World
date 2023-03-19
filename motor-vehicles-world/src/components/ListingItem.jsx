import { Link } from 'react-router-dom';
import  Moment  from 'react-moment';
import { MdLocationOn } from 'react-icons/md';

export default function ListingItem({ listing, id }) {
  return (
  <li className=' relative bg-white flex flex-col justify-between items-center
  shadow-md hover:shadow-xl rounded-md overflow-hidden transition-shadow duration-150 m-[10px]'>

    <Link className='contents' to={`/category/${listing.type}/${id}`}>
        <img className='h-[180px] w-full object-cover
        hover:scale-105 transition-scale duration-200 ease-in'
        loading='lazy' alt=''
        src={listing.imgUrls[0]} 
        />

        <Moment className='absolute top-2 left-2  bg-[#3377cc] text-white uppercase
        text-xs font-semibold rounded-md px-2 py-1 shadow-lg' fromNow>
       {listing.timestamp?.toDate()}
       </Moment>
       <div className="w-full p-[10px]">
        <div className="flex items-center space-x-1 text-black">
            <MdLocationOn className='h-4 w-4 text-green-600' />
            <p className='font-semibold mb-[2px] text-gray-600 truncate'>{listing.location}</p>
        </div>
        <p className='text-black font-semibold m-0 text-xl truncate'> {listing.model} </p>
        <p className='text-[#457b9d] mt-2 font-semibold'>${listing.discount ? listing.discountedPrice
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 
        listing.regularPrice 
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}

        {listing.type === 'rent' && ' / Day'}
        </p>

        <div className="flex items-center mt-[10px] space-x-3">
            <div className="flex items-center space-x-1">
                <p className='text-black font-bold text-xs'>{`Engine Power: ${listing.engine}`}</p>
            </div>

            <div className="flex items-center space-x-1">
                <p className='text-black font-bold text-xs'>{`Horse Power: ${listing.hp}`}</p>
            </div>
        </div>
       </div>

    </Link>
  </li>);
}
