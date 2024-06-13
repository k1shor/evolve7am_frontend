import AdminSidebar from "@/pages/Components/Admin/AdminSidebar";
import { getAllCategories } from "@/pages/api/categoryApi";
import { addProduct, getproduct, updateProduct } from "@/pages/api/productApi";
import { isAuthenticated } from "@/pages/api/userAPI";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";

const updateproduct = () => {
    let [categories, setCategories] = useState([])
    let [token, setToken] = useState('')
    let [product, setProduct] = useState({
        title: '',
        price: '',
        count_in_stock: '',
        description: '',
        category: '',
        image:'',
        formdata: new FormData
    })

    let API = "http://localhost:5000/api"

    let file_ref = useRef()
    let sel_ref = useRef()

    let id = useParams()?.id


    let { title, price, count_in_stock, description, category, formdata, image } = product
    const handleChange = e => {
        console.log(e.target.name, e.target.value)
        if (e.target.name === "image") {
            formdata.set("image", e.target.files[0])
            formdata.set("imageUrl",image)
        }
        else {
            setProduct({ ...product, [e.target.name]: e.target.value })
            formdata.set(e.target.name, e.target.value)
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        updateProduct(id,formdata, token)
            .then(data => {
                if (data.error) {
                    Swal.fire('error', data.error, 'error')
                }
                else {
                    Swal.fire("Congrats!", "Product updated successfully", 'success')
                }
            })
    }

    useEffect(() => {
        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    console.log(data)
                    setCategories(data)
                }
            })
            .catch(error => console.log(error))

        if (id) {
            getproduct(id)
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        setProduct({ ...product, ...data })
                        sel_ref.current.value = data.category._id
                    }
                })
        }

        isAuthenticated()
            .then(data => {
                setToken(data.token)
            })


    }, [id])

    return (<>
        <div className="flex">
            <div className="w-1/4">
                <AdminSidebar products />
            </div>
            <div className="w-3/4 flex">

                {/* <div class="flex justify-center m-5">
                    <button id="defaultModalButton" data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                        Create product
                    </button>
                </div> */}

                {/* <div id="defaultModal" tabindex="-1" aria-hidden="true" class=" overflow-y-auto overflow-x-hidden z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full"> */}
                <div class="relative p-4 w-3/4 max-w-2xl h-full md:h-auto">
                    <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
                        <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Update Product
                            </h3>
                        </div>
                        <form>
                            <div class="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" name="title" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type product name" required=""
                                        value={title} onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label for="brand" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                                    <input type="number" name="count_in_stock" id="brand" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Product brand" required=""
                                        value={count_in_stock} onChange={handleChange}

                                    />
                                </div>
                                <div>
                                    <label for="price" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                    <input type="number" name="price" id="price" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="$2999" required=""
                                        value={price} onChange={handleChange}
                                    />
                                </div>

                                <div>
                                    <label for="category" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                    <select id="category" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" name="category" onChange={handleChange} ref={sel_ref}>
                                        <option selected="">Select category</option>
                                        {
                                            categories.map(category => {
                                                return <option value={category._id}>{category.category_name}</option>
                                            })}
                                    </select>
                                </div>
                                <div class="sm:col-span-2">

                                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" name="image" onChange={handleChange} ref={file_ref} />

                                </div>
                                <div class="sm:col-span-2">
                                    <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write product description here" name="description" onChange={handleChange} value={description}></textarea>
                                </div>
                            </div>
                            <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>
                                <svg class="mr-1 -ml-1 w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                                Update product
                            </button>
                        </form>
                    </div>
                </div>
                {/* </div> */}
                <div className="w-1/4 pt-5">
                    <label>Image</label>
                    <img src={`${API}/${product.image}`} alt="" className="w-full" />
                </div>
            </div>
        </div>
    </>);
}

export default updateproduct;