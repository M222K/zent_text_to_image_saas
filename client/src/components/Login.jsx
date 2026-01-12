import React, { useEffect, useState, useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { motion } from "motion/react"


const Login = () => {

    const [state, setstate] = useState("Login");
    const { setshowLogin } = useContext(AppContext);

    //to disable the scrolling when you are on login 
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        }

    }, [])

    return (
        <div className='fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <motion.form action=""
                className='relative bg-white p-10 rounded-xl text-slate-500'
                initial={{ opactiy: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>
                <p className='text-sm text-center'>{`Welcome back! Please ${state} to continue`}</p>

                {state !== "Login" && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                    <img src={assets.profile_icon} alt="" width={20} />
                    <input type="text"
                        className="outline-none text-sm"
                        placeholder='Full Name'
                        required />
                </div>
                }

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.email_icon} alt="" width={30} />
                    <input type="email"
                        className="outline-none text-sm"
                        placeholder='Email'
                        required />
                </div>

                <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                    <img src={assets.lock_icon} alt="" width={10} />
                    <input type="password"
                        className="outline-none text-sm"
                        placeholder='Password'
                        required />
                </div>

                <p className='text-sm text-blue-600 my-4 cursor-pointer text-center'>Forgot Password?</p>

                <button className='bg-blue-600 w-full text-white py-2 rounded-full'>
                    {state === 'Login' ? 'Login' : 'Create Account'}
                </button>


                {state === 'Login' ? (<p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer'
                    onClick={() => {
                        setstate("Sign Up")
                    }}>Sign up</span></p>) :
                    (<p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer'
                        onClick={() => {
                            setstate("Login")
                        }}>Login</span></p>
                    )
                }

                <img
                    onClick={() => {
                        setshowLogin(false)
                    }}
                    src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />

            </motion.form>

        </div>
    )
}

export default Login
