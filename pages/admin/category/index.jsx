import AdminSidebar from "@/pages/Components/Admin/AdminSidebar";
import { deleteCategory, getAllCategories } from "@/pages/api/categoryApi";
import { isAuthenticated } from "@/pages/api/userAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const category = () => {
    let [categories, setCategories] = useState([])
    let [token, setToken] = useState('')
    let [success,setSuccess] = useState(false)

    useEffect(() => {
        isAuthenticated()
        .then(data=>{
            if(data.token){
                setToken(data.token)
            }
        })

        getAllCategories()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setCategories(data)
                    setSuccess(false)
                }
            })
    }, [success])

    const handleDelete = (id) => e => {
        e.preventDefault()
        Swal.fire({
            title: 'Confirm?',
            text: "Are you sure you want to delete this category? ",
            icon: "question",
            showCancelButton: true,
        })
            .then(result => {
                if (result.isConfirmed) {
                    deleteCategory(id, token)
                    .then(data=>{
                        if(data.error){
                            Swal.fire("Error",data.error)
                        }
                        else{
                            Swal.fire("Success",data.message) 
                            setSuccess(true)
                        }
                    })
                }
            })
    }

    return (<>
        <div className="flex">
            <div className="w-1/4">
                <AdminSidebar />
            </div>
            <div className="w-3/4">

                <h1 className="text-2xl underline font-bold">Categories</h1>

<form>
<input type="time" min={"08:00:00"} max={"20:00:00"} step={"1800"} />
<button>submit</button>
</form>


                <div className="relative overflow-x-auto shadow-md rounded-lg py-4">
                    <table className="w-1/2 text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center rounded-lg overflow-hidden">
                        <thead className="text-xs text-white uppercase bg-gray-700">
                            <tr>
                                <td scope="col" className="px-6 py-3">
                                    S.No.
                                </td>
                                <th scope="col" className="px-6 py-3">
                                    Category name
                                </th>

                                <th scope="col" className="px-6 py-3">
                                    <span className="">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                categories.length > 0 &&
                                categories.map((category, i) => {
                                    return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th className="text-center">{i + 1}</th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {category.category_name}
                                        </th>

                                        <td className="px-6 py-4 text-right">
                                            <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline px-4" onClick={handleDelete(category._id)}>Delete</button>
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

export default category;