import AdminSidebar from '@/pages/Components/Admin/AdminSidebar'
import { editCategory, getCategory } from '@/pages/api/categoryApi'
import { isAuthenticated } from '@/pages/api/userAPI'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'

const category_update = () => {
    let [category_name, setCategory] = useState('')
    let [token, setToken] = useState('')

    let id = useParams()?.id

    const router = useRouter()

    useEffect(() => {
        isAuthenticated()
            .then(data => {
                if (data) {
                    setToken(data.token)
                }
            })

        if (id) {
            getCategory(id)
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                    }
                    else {
                        setCategory(data.category_name)
                    }
                })
        }
    }, [id])


    const handleSubmit = (e) => {
        e.preventDefault()
        editCategory(id, { category_name }, token)
            .then(data => {
                if (data.error) {
                    Swal.fire('Error', data.error, 'error')
                }
                else {
                    Swal.fire('Congrats!', "Category Updated Successfully", 'success')
                    setCategory('')
                }
            })
    }


    return (
        <>
            <div className="flex">
                <div className="w-1/4">
                    <AdminSidebar />
                </div>
                <div className="w-3/4 h-screen">
                    <h1 className='text-2xl font-bold underline'>Update Category</h1>

                    <form className='my-3 rounded-lg shadow-lg p-5 w-1/2'>
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category name</label>
                            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Category" required
                                onChange={e => setCategory(e.target.value)} value={category_name}
                            />
                        </div>
                        <div className="flex">
                            <button type="button" class="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-1/2" onClick={handleSubmit}>Update Category</button>

                            <button type="button" class="mt-2 text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800 w-1/2"
                                onClick={() => router.back()}
                            >Back</button>

                        </div>

                    </form>

                </div>
            </div>
        </>
    )
}

export default category_update