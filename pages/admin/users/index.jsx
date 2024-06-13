import AdminSidebar from "@/pages/Components/Admin/AdminSidebar";
import { isAuthenticated, getAllUsers, changerole } from "@/pages/api/userAPI";
import Link from "next/link";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const user = () => {
    let [users, setusers] = useState([])
    let [token, setToken] = useState('')
    let [success, setSuccess] = useState(false)

    let [length, setLength] = useState(0)

    useEffect(() => {
        isAuthenticated()
            .then(data => {
                if (data.token) {
                    setToken(data.token)
                }
            })

        getAllUsers()
            .then(data => {
                if (data.error) {
                    console.log(data.error)
                }
                else {
                    setusers(data)
                    setLength(data.length)
                    setSuccess(false)
                }
            })
    }, [success])

    const changeRole = (user) => e => {
        e.preventDefault()
        let new_role
        if (user.role == 0) {
            new_role = 1
        }
        else {
            new_role = 0
        }


        Swal.fire({
            title: 'Confirm?',
            text: "Are you sure you want to change role? ",
            icon: "question",
            showCancelButton: true,
        })
            .then(result => {
                if (result.isConfirmed) {
                    changerole(user._id, {role: new_role}, token)
                        .then(data => {
                            if (data.error) {
                                Swal.fire("Error", data.error)
                            }
                            else {
                                Swal.fire("Success", "Role changed")
                                setSuccess(true)
                            }
                        })
                }
            })
    }

    return (<>
        <div className="flex">
            <div className="w-1/4">
                <AdminSidebar user={length} />
            </div>
            <div className="w-3/4">

                <h1 className="text-2xl underline font-bold">Users</h1>

                <Link href={'/admin/user/register'} className="inline-block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 mt-2">Add user</Link>


                <div className="relative overflow-x-auto shadow-md rounded-lg py-4">
                    <table className="w-1/2 text-sm rtl:text-right text-gray-500 dark:text-gray-400 text-center rounded-lg overflow-hidden">
                        <thead className="text-xs text-white uppercase bg-gray-700">
                            <tr>
                                <td scope="col" className="px-6 py-3">
                                    S.No.
                                </td>
                                <th scope="col" className="px-6 py-3">
                                    Username
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Role
                                </th>


                                <th scope="col" className="px-6 py-3">
                                    <span className="">Action</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length > 0 &&
                                users.map((user, i) => {
                                    return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th className="text-center">{i + 1}</th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.username}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.email}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.role == 0 ? "Client" : "Admin"}
                                        </th>

                                        <td className="px-6 py-4 text-right">
                                            {/* <Link href={`/admin/user/${user._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link> */}
                                            <button className="font-medium text-red-600 dark:text-red-500 hover:underline px-4" onClick={changeRole(user)}>
                                                {user.role == 0 ? "Make Admin" : "Remove Admin"}
                                            </button>
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

export default user;