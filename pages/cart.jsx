import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { add_to_cart, remove_from_cart, update_cart } from './middleware/cartActions'
import { REMOVEFROMCART } from './cartSlice'
import { useRouter } from 'next/navigation'

const cart = () => {
    let cart_items = useSelector(store => store.cart.cart_items)

    let router = useRouter()
    let API = `http://localhost:5000/api`
    const dispatch = useDispatch()

    const increase = (item) => e => {
        e.preventDefault()
        let newQuantity = item.quantity + 1
        if (newQuantity > item.stock) {
            Swal.fire('Alert', "Maximum Quantity Reached", 'warning')
        }
        else {
            dispatch(update_cart(item.product, newQuantity))
        }
    }
    const decrease = (item) => e => {
        e.preventDefault()
        let newQuantity = item.quantity - 1
        if (newQuantity <= 0) {
            Swal.fire('Alert', "Quantity cannot be decreased", 'warning')
        }
        else {
            dispatch(update_cart(item.product, newQuantity))
        }
    }

    let [cartitems, setCartItems] = useState(0)
    let [cartTotal, setCartTotal] = useState(0)

    const calculateTotal = () => {
        let no_of_items = cart_items.map(item => item.quantity)
        let totalitems = no_of_items.reduce((a, c) => a + c)
        setCartItems(totalitems)

        let individual_totals = cart_items.map(item => item.quantity * item.price)
        setCartTotal(individual_totals.reduce((a, b) => a + b))
    }

    useEffect(() => {
        if (cart_items.length > 0) {
            calculateTotal()
        }
    }, [cart_items])

    const checkout = () => {
        sessionStorage.setItem("total", JSON.stringify({total:cartTotal}))
        router.push('/checkout')
    }




    return (
        <>
            {
                cart_items.length > 0 ?
                    <div className="grid grid-cols-5">
                        <div className="col-span-4 p-3">
                            <table className="w-3/4 text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center rounded-lg overflow-hidden">
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

                                        <th scope="col" className="px-6 py-3">
                                            <span className="">Action</span>
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
                                                    <button className='px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700'
                                                        onClick={decrease(cart_item)}>-</button>
                                                    <span className='px-4 py-2'>{cart_item.quantity}</span>
                                                    <button className='px-4 py-2 bg-green-500 hover:bg-green-600 active:bg-green-700' onClick={increase(cart_item)}>+</button>


                                                </th>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {cart_item.quantity * cart_item.price}
                                                </th>

                                                <td className="px-6 py-4 text-right">

                                                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline px-4" onClick={() => {
                                                        dispatch(remove_from_cart(cart_item.product))
                                                    }}>Remove</button>
                                                </td>
                                            </tr>

                                        })
                                    }

                                </tbody>
                            </table>

                        </div>
                        <div className="col-span-1 p-3 border-gray-600 border-solid rounded-lg">
                            <h1 className='text-2xl underline font-bold text-center'>Cart Summary</h1>
                            <h1 className='text-2xl font-bold'>Items in Cart: {cartitems}</h1>
                            <h1 className='text-2xl font-bold'>Cart Total: {cartTotal}</h1>

                            <button className='px-4 py-2 rounded-lg bg-yellow-400 hover:bg-orange-300 active:bg-orange-400' onClick={checkout}>Proceed to Checkout</button>
                        </div>
                    </div>
                    :
                    <div className='text-center py-5 text-3xl'>No items in Cart</div>
            }
        </>
    )
}

export default cart