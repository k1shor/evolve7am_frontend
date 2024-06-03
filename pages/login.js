import Link from "next/link";
import { useState } from "react";
import { authenticate, login } from "./api/userAPI";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const Login = () => {
    let [user, setUser] = useState({
        email: '',
        password: '',
    })
    const handleChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    let { email, password } = user

    let router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        // register(user)
        login(user)
            .then(data => {
                if (data.error) {
                    Swal.fire({
                        title:'Error',
                        text: data.error,
                        icon:'error',
                        position: 'top-right',
                        // timer:3000,
                        showConfirmButton: false,
                        timerProgressBar:true
                    })
                }
                else {
                    authenticate(data)
                    // alert("User registered Successfully")
                    router.push('/')
                }
            })
    }

    return (<>
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create an account
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">

                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" onChange={handleChange} />
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" onChange={handleChange} />
                            </div>

                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label for="terms" className="font-light text-gray-500 dark:text-gray-300"> Remember me</label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Login</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Do not have an account? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up now</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>);
}


export default Login;