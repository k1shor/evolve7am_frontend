import AdminSidebar from "@/pages/Components/Admin/AdminSidebar";
import { deleteProduct, getAllProducts } from "@/pages/api/productApi";
import { isAuthenticated } from "@/pages/api/userAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const products = () => {
    let API = `http://localhost:5000/api`
    let [product, setProducts] = useState([])
    
    let [token, setToken] = useState('')
    let [success, setSuccess] = useState(false)

    let [length, setLength] = useState(0)
    useEffect(()=>{
        isAuthenticated()
        .then(data => {
            if (data.token) {
                setToken(data.token)
            }
        })

    getAllProducts()
        .then(data => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                setProducts(data)
                setLength(data.length)
                setSuccess(false)
            }
        })
    },[success])

    const handleDelete = (id) => e => {
        e.preventDefault()
        Swal.fire({
            title: 'Confirm?',
            text: "Are you sure you want to delete this product? ",
            icon: "question",
            showCancelButton: true,
        })
            .then(result => {
                if (result.isConfirmed) {
                    deleteProduct(id, token)
                        .then(data => {
                            if (data.error) {
                                Swal.fire("Error", data.error)
                            }
                            else {
                                Swal.fire("Success", data.message)
                                setSuccess(true)
                            }
                        })
                }
            })
    }

    return (<>
        <div className="flex">
            <div className="w-1/4">
                <AdminSidebar products />
            </div>
            <div className="w-3/4">

                <h1 className="text-2xl underline font-bold">Products</h1>

                <Link href={'/admin/products/new'} className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Add New Product</Link>


                <div className="relative overflow-x-auto shadow-md rounded-lg py-4 pe-4">
                    <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center rounded-lg overflow-hidden">
                        <thead className="text-xs text-white uppercase bg-gray-700">
                            <tr>
                                <td scope="col" className="px-6 py-3">
                                    S.No.
                                </td>
                                <th scope="col" className="px-6 py-3">
                                    Product 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title 
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Unit Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Count in Stock
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Rating
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    <span className="">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                product.length > 0 &&
                                product.map((prod, i) => {
                                    return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th className="text-center">{i + 1}</th>
                                        <th scope="row">
                                            <img src={`${API}/${prod.image}`} alt={prod.title} 
                                            className="h-24"/>
                                            
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {prod.title}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {prod.price}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {prod.count_in_stock}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {prod.rating}
                                        </th>

                                        <td className="px-6 py-4 text-right">
                                            <Link href={`/admin/products/${prod._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline px-4" onClick={handleDelete(prod._id)}>Delete</button>
                                        </td>
                                    </tr>

                                })
                            }

                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    </>);
}

export default products;