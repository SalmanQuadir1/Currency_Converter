/* eslint-disable react/prop-types */
import { HiOutlineStar } from "react-icons/hi";
import { HiStar } from "react-icons/hi2";



const CurrencyDropdown = ({ title, currencies, setCurrency, currency, favourites, handleFavourites }) => {


    const isFavourite = curr => favourites.includes(curr);




    return (
        <div className="relative ">
            <label htmlFor="currency">{title}</label><br />
            <select name="" id="" value={currency} onChange={e => setCurrency(e.target.value)}
                className="w-full p-3  border-gray-300 bg-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1">
                {favourites && favourites.map((currency, index) =>
                    <option className='bg-gray-100 divide-y-2' key={index} value={currency} >{currency}</option>
                )}

                {currencies && currencies.filter((cur) => !favourites.includes(cur)).map((currency, index) =>
                    <option key={index} value={currency} >{currency}</option>
                )}
            </select>
            <button className="absolute inset-y-0 right-0 pr-5 flex items-center text-sm leading-5" onClick={() => handleFavourites(currency)}>
                {!isFavourite(currency) ?

                    <HiStar size={20} className="mt-6" />
                    :
                    <HiOutlineStar size={20} className="mt-6" />
                }
            </button>


        </div>

    )
}

export default CurrencyDropdown