import { ChevronLeftIcon } from '@heroicons/react/outline'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Error from '../../../Components/Alerts/Error'
import { useAuth } from '../../../GlobalContexts/AuthProvider'

const Signup = () => {

    const auth = useAuth()

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')


    const signup = (e) => {
        e.preventDefault()

        if (email === '' || name === '' || password === 'null') {
            console.log(email, name, password)
            return
        }

        const firstname = name.split(" ")[0]
        let lastname = name.split(" ")[name.split(" ").length - 1]
        if (lastname?.length === firstname) {
            lastname = null
        }

        setLoading(true)
        setTimeout(() => {
            auth.signup({ email, firstname, lastname, password, address: null, phone: null })
            setLoading(false)
        }, 2000)
    }

    return (
        <div className="body-bg bg-purple-600 max-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0 relative"  >
            <Link to="/home" className='position absolute top-10 left-10'>
                    <ChevronLeftIcon className='w-10 h-10 text-white stroke-white' />
                </Link>
            {auth.error && <Error title="Sign-Up Error" body={auth.error} />}
            {/* <header className="max-w-lg mx-auto">
                <a href="#">
                    <h1 className="text-4xl font-bold text-white text-center">Startup</h1>
                </a>
            </header> */}

            <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl relative">
                
                <section>
                    <h3 className="font-bold text-2xl">Welcome to T-Shop</h3>
                    <p className="text-gray-600 pt-2">Create an account.</p>
                </section>

                <section className="mt-10">
                    <form className="flex flex-col" method="POST" action="#">
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" >Full Name</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" id="name" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div className="mb-6 pt-3 rounded bg-gray-200">
                            <label className="block text-gray-700 text-sm font-bold mb-2 ml-3" >Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3" />
                        </div>
                        <div className="flex justify-end">
                            {/* <a href="#" className="text-sm text-purple-600 hover:text-purple-700 hover:underline mb-6">Forgot your password?</a> */}
                        </div>
                        <button onClick={signup} className={` text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 ${loading ? 'bg-purple-400 cursor-wait' : 'bg-purple-600 hover:bg-purple-700'}`} type="submit">{loading ? "loading..." : "Sign Up"}</button>
                    </form>
                </section>
            </main>

            <div className="max-w-lg mx-auto text-center mt-12 mb-6">
                <Link to="/signin" className="text-white">Already have an account? <p href="#" className="font-bold hover:underline">Sign In</p>.</Link>
            </div>

            <footer className="max-w-lg mx-auto flex justify-center text-white">
                <a href="#" className="hover:underline">Contact</a>
                <span className="mx-3">•</span>
                <a href="#" className="hover:underline">Privacy</a>
            </footer>
        </div>
    )
}

export default Signup