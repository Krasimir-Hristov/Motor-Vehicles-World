import { useState } from "react"

export default function CreateListing() {

    const [formData, setFormData] = useState({
        type: 'rent',
        model: '',
        fuel: '',
        doors: 2,
        engine: 50,
        hp: 1,
        airCondition: false,
        navigation: false,
        parktronic: false,
        immobilizer: false,
        location: '',
        description: '',
        available: false,
        regularPrice: 0,
        discountedPrice: 0,
        
    });

    const { 
        type, 
        model, 
        fuel, 
        doors, 
        engine, 
        hp, 
        airCondition, 
        navigation, 
        parktronic, 
        immobilizer, 
        location,
        description,
        available,
        regularPrice,
        discountedPrice,

    } = formData;

    function onChange() {};

  return (
    <main className="max-w-md px-2 mx-auto">
        <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
        <form>
            <p className="text-lg mt-6 font-semibold">Sell / Rent</p>
            <div className="flex">
                <button type="button" id='type' value='sale' onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    type === 'rent' ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    Sell
                </button>
                <button type="button" id='type' value='sale' onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    type === 'sell' ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    rent
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Model</p>
            <input 
            type="text" 
            id='model' 
            value={model} 
            onChange={onChange} 
            placeholder='Model' 
            maxLength='32'
            minLength='10'
            required 
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-600 rounded 
            transition duration-150 ease-in-out  focus:bg-slate-300  mb-6" 
            />
             <p className="text-lg mt-6 font-semibold">Fuel Type</p>
            <input 
            type="text" 
            id='fuel' 
            value={fuel} 
            onChange={onChange} 
            placeholder='Fuel' 
            maxLength={'10'} 
            minLength={'3'} 
            required 
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-600 rounded 
            transition duration-150 ease-in-out  focus:bg-slate-300  mb-6" 
            />
            <div className="flex space-x-6 justify-start mb-6">
                <div>
                    <p className="text-lg font-semibold">Doors</p>
                    <input 
                    className="w-full text-black px-4 py-2 text-xl bg-white border border-gray-600 rounded 
                    transition duration-150 ease-in-out  focus:bg-slate-300 
                     text-center"
                    type="number" 
                    id="doors" 
                    value={doors} 
                    onChange={onChange} 
                    min='2' 
                    max='10'
                    required/>
                </div>
                <div>
                    <p className="text-lg font-semibold">Engine</p>
                    <input 
                    className="w-full text-black px-4 py-2 text-xl bg-white border border-gray-600 rounded 
                    transition duration-150 ease-in-out  focus:bg-slate-300 
                     text-center"
                    type="number" 
                    id="doors" 
                    value={engine} 
                    onChange={onChange} 
                    min='50' 
                    max='20000'
                    required/>
                </div>
                <div>
                    <p className="text-lg font-semibold">HP</p>
                    <input 
                    className="w-full text-black px-4 py-2 text-xl bg-white border border-gray-600 rounded 
                    transition duration-150 ease-in-out  focus:bg-slate-300
                    text-center"
                    type="number" 
                    id="hp" 
                    value={hp} 
                    onChange={onChange} 
                    min='20'
                    max='10000' 
                    required/>
                </div>
            </div>
            <p className="text-lg mt-6 font-semibold">Air Condition</p>
            <div className="flex">
                <button 
                type="button" 
                id='airCondition' 
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    !airCondition  ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    yes
                </button>
                <button 
                type="button" 
                id='airCondition' 
                value={false} 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    airCondition  ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    no
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Navigation</p>
            <div className="flex">
                <button 
                type="button" 
                id='navigation' 
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    !navigation ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    yes
                </button>
                <button 
                type="button" 
                id='navigation' 
                value={false} 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    navigation ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    no
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Parktronic</p>
            <div className="flex">
                <button 
                type="button" 
                id='parktronic' 
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    !parktronic ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    yes
                </button>
                <button 
                type="button" 
                id='parktronic' 
                value={false} 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    parktronic ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    no
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Immobilizer</p>
            <div className="flex">
                <button 
                type="button" 
                id='immobilizer' 
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    !immobilizer ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    yes
                </button>
                <button 
                type="button" 
                id='immobilizer' 
                value={false} 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    immobilizer ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    no
                </button>
            </div>
            <p className="text-lg mt-6 font-semibold">Location</p>
            <textarea 
            type="text" 
            id='location' 
            value={location} 
            onChange={onChange} 
            placeholder='Location' 
            minLength='10' 
            required 
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-600 rounded 
            transition duration-150 ease-in-out focus:text-gray-700 focus:bg-slate-300  mb-6" 
            />
            <p className="text-lg font-semibold">Description</p>
            <textarea 
            type="text" 
            id='description' 
            value={description} 
            onChange={onChange} 
            placeholder='Description' 
            minLength='10' 
            required 
            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-600 rounded 
            transition duration-150 ease-in-out focus:text-gray-700 focus:bg-slate-300  mb-6" 
            />
             <p className="text-lg  font-semibold">Available</p>
            <div className="flex mb-6">
                <button 
                type="button" 
                id='available' 
                value={true} 
                onClick={onChange} 
                className={`mr-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    !available ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    yes
                </button>
                <button 
                type="button" 
                id='available' 
                value={false} 
                onClick={onChange} 
                className={`ml-3 px-7 py-3 font-medium text-sm uppercase rounded w-full ${
                    available ? 'bg-red-600 text-black line-through' : 'bg-green-600 text-white '
                }`}>
                    no
                </button>
            </div>
            <div className="flex items-center mb-7">
                <div className="div">
                    <p className="text-lg font-semibold">Regular price</p>
                    <div className="flex w-full justify-center items-center space-x-6">
                        <input 
                        className="text-black  w-full px-4 py-2 text-lg rounded focus:bg-slate-300 text-center"
                        type="number"  
                        id="regularPrice" 
                        value={regularPrice}
                        onChange={onChange}
                        min='1'
                        required
                        />
                         {type === 'rent' && (
                        <div className="text-white">
                            <p className="text-md w-full text-white whitespace-nowrap text-xl 
                            font-bold">$ / Day</p>
                        </div>
                    )}
                    </div>
                </div>
            </div>
            {available && (
                     <div className="flex items-center mb-7">
                     <div className="div">
                         <p className="text-lg font-semibold">Discounted price</p>
                         <div className="flex w-full justify-center items-center space-x-6">
                             <input 
                             className="text-black  w-full px-4 py-2 text-lg rounded focus:bg-slate-300 text-center"
                             type="number"  
                             id="discountedPrice" 
                             value={discountedPrice}
                             onChange={onChange}
                             min='1'
                             required={available}
                             />
                              {type === 'rent' && (
                             <div className="text-white">
                                 <p className="text-md w-full text-white whitespace-nowrap text-xl 
                                 font-bold">$ / Day</p>
                             </div>
                         )}
                         </div>
                     </div>
                 </div>
            )}
            <div className="mb-7">
                <p className="text-lg font-bold">Images</p>
                 <p className="text-lg font-semibold">The first image will be the cover (max 6)</p>
                 <input 
                 type="file"  
                 id="images" 
                 onChange={onChange} 
                 accept='.jpg,.png,.jpeg'
                 multiple
                 required
                 className="w-full px-3 py-1.5 text-lg font-bold text-white border 
                 border-gray-300 rounded bg-gray-700 focus:bg-red-800" 
                 />               
            </div>
            <button type="submit" className="mb-7 w-full px-7 py-3 
            bg-blue-600 text-white text-lg font-bold 
            uppercase rounded hover:bg-blue-800 
            active:bg-green-800 transition duration-150 ease-in-out">Create Listing</button>
        </form>
    </main>
  )
}
