
import { useEffect, useRef, useState } from 'react'
import { AllCurrencies, conversionApi } from './utils/constants';
import CurrencyDropdown from './Dropdown';
import { IoSwapHorizontalOutline } from "react-icons/io5";


const CurrencyConverter = () => {
    const [currencies, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('INR');
    const [converting, setConverting] = useState(false);
    const [convertedAmount, setConvertedAmount] = useState('');
    const [favourites, setFavourites] = useState(JSON.parse(localStorage.getItem('favourites')) || ['INR', 'SGD']);
    const convertedAmtRef = useRef(null);





    const getCurrencies = async () => {
        try {
            const resp = await fetch(AllCurrencies);
            const data = await resp.json();
            setCurrencies(Object.keys(data));
        } catch (error) {
            console.log(error)

        }

    }


    useEffect(() => {
        getCurrencies();


    }, []);


    const convertCurrency = async () => {
        if (!amount) return;
        setConverting(true);

        try {
            const resp = await fetch(conversionApi + `amount=${amount}&from=${fromCurrency}&to=${toCurrency}`);
            const data = await resp.json();
            setConvertedAmount(data.rates[toCurrency] + '  ' + toCurrency);

        } catch (error) {
            console.log("Error :", error);

        } finally {
            setConverting(false);
        }

    }

    const handleFavourites = (currency) => {
        let updatedFavourites = [...favourites];
        if (favourites.includes(currency)) {
            updatedFavourites = updatedFavourites.filter((fav) => fav !== currency);
        } else {
            updatedFavourites.push(currency);

        }
        setFavourites(updatedFavourites);
        localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
    }




    const swapFunction = () => {
        // let tempCurr = toCurrency;
        setToCurrency(fromCurrency);
        setFromCurrency(toCurrency);



    }


    return (
        <div className="max-w-xl mx-auto my-10 p-5 bg-white rounded-xl shadow-lg outline outline-4 outline-offset-8 outline-blue-600">
            <h2 className='mb-5 text-2xl font-semibold text-gray-700 text-center'>Currency Converter</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
                <CurrencyDropdown
                    title={'From Currency'}
                    favourites={favourites}
                    handleFavourites={handleFavourites}
                    currencies={currencies}
                    setCurrency={setFromCurrency}
                    currency={fromCurrency}

                />
                <div className="flex justify-center -mb-5 sm:mb-0">
                    <button
                        className='h-12 w-12  rounded-full shadow-lg 
                               bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 '
                        title='Swap'>
                        <IoSwapHorizontalOutline size={25} className='flex mx-auto' onClick={swapFunction} />
                    </button>
                </div>


                <CurrencyDropdown
                    title={'To Currency'}
                    currencies={currencies}
                    setCurrency={setToCurrency}
                    currency={toCurrency}
                    favourites={favourites}
                    handleFavourites={handleFavourites}
                />

            </div>
            <div className='mt-4'>
                <label htmlFor="amount" className='block text-md  font-medium text-gray-700 font-mono font-bold'>Amount</label>
                <input type="number" id='amount' value={amount} onChange={(e) => setAmount(e.target.value)}
                    className='p-3 w-full border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
                />
            </div>
            {convertedAmount &&
                <div className='mt-4'>
                    <label htmlFor="amount" className='block text-md  font-medium text-gray-700 font-mono font-bold'>Converted Amount</label>
                    <input type="text" id='convertedAmount' ref={convertedAmtRef} value={convertedAmount}
                        className='p-3 w-full font-bold border-gray-300  text-green-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mt-1'
                    />
                </div>
            }


            <div className='flex justify-end mt-6'>
                <button onClick={convertCurrency}
                    className={`px-5 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700
                               focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                               ${converting ? "animate-pulse" : ''}`}
                >Convert</button>
            </div>

        </div>

    )
}

export default CurrencyConverter