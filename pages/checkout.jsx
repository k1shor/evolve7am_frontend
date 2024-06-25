import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { saveShippingInfo } from './middleware/cartActions'

const checkout = () => {
    let cart_items = useSelector(store => store.cart.cart_items)
    let API = `http://localhost:5000/api`

    let [shipping_info, setShippingInfo] = useState({})

    const handleChange = e => {
        setShippingInfo({ ...shipping_info, [e.target.name]: e.target.value })
        console.log(shipping_info)
    }

    let router = useRouter()
    const dispatch = useDispatch()



    let [cartTotal, setCartTotal] = useState(0)

    let {username, street, city, state, zipcode, country, phone} = shipping_info


    useEffect(() => {
        getTotal()
            .then(data => setCartTotal(data.total))

        loadShippingInfo()
            .then(data => {
                if (!data) {
                    setShippingInfo({ username:"", street:"", city:"", state:"", zipcode:"", country:"", phone:"" })
                }
                else {
                    setShippingInfo(data)
                }

            }
            )

        async function getTotal() {
            return sessionStorage.getItem('total') ? await JSON.parse(sessionStorage.getItem('total')): 0
        }

        async function loadShippingInfo() {
            return await JSON.parse(localStorage.getItem('shipping_info'))
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(saveShippingInfo(shipping_info))
        router.push('/PaymentPage')
    }




    return (
        <>
            {
                cart_items.length > 0 ?
                    <div className="md:grid md:grid-cols-5">
                        <div className="col-span-3 p-3">
                            <h1 className='text-2xl underline font-bold text-center'>Cart Summary</h1>

                            <table className="w-3/4 md:w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center rounded-lg overflow-hidden">
                                <thead className="text-xs text-white uppercase bg-gray-700">
                                    <tr>
                                        <td scope="col" className="px-6 py-3">
                                            S.No.
                                        </td>
                                        <th scope="col" className="px-6 py-3">
                                            Product Image
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Product Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Unit Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Quantity
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Total Price
                                        </th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart_items.length > 0 &&
                                        cart_items.map((cart_item, i) => {
                                            return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th className="text-center">{i + 1}</th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <img src={`${API}/${cart_item.image}`} alt={cart_item.title} className='h-40' />
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {cart_item.title}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {cart_item.price}
                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    <span className='px-4 py-2'>{cart_item.quantity}</span>


                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {cart_item.quantity * cart_item.price}
                                                </th>


                                            </tr>

                                        })
                                    }
                                    <tr>
                                        <td colSpan={4} className='text-right text-2xl font-bold pe-5'>Total:</td>
                                        <td colSpan={2} className='text-2xl font-bold'>Rs.{cartTotal}</td>
                                    </tr>

                                </tbody>
                            </table>

                        </div>
                        <div className="md:col-span-2 p-3 border-gray-600 border-solid rounded-lg">
                            <h1 className='text-2xl underline font-bold text-center'>Shipping Information</h1>




                            <form class="w-3/4 mx-auto p-5 md:w-full">
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="username" name="username" id="username" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={username}/>
                                    <label for="username" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" name="street" id="street" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={street}/>
                                    <label htmlFor="street" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Street</label>
                                </div>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" name="city" id="city" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={city}/>
                                    <label for="city" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">City</label>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="text" name="zipcode" id="zipcode" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={zipcode}/>
                                        <label for="zipcode" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">zipcode</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="text" name="state" id="state" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={state} />
                                        <label for="state" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">State</label>
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="tel" name="phone" id="phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={phone}/>
                                        <label for="phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="text" name="country" id="country" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required onChange={handleChange} value={country}/>
                                        <label for="country" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Country</label>
                                    </div>
                                </div>
                                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Proceed to Payment</button>
                            </form>




                            {/* <button className='px-4 py-2 rounded-lg bg-yellow-400 hover:bg-orange-300 active:bg-orange-400' onClick={checkout}>Proceed to Payment</button> */}
                        </div>
                    </div>
                    :
                    <div className='text-center py-5 text-3xl'>No items in Cart</div>
            }
        </>
    )
}

export default checkout