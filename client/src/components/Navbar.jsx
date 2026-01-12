import React, { useContext } from 'react'
import { assets } from "../assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

const Navbar = () => {

    const {user,setshowLogin}=useContext(AppContext);

    const navigate = useNavigate();
    //to navigate to any page in the app here in navbar we are using it to navigate to the pricing page

    return (
        <div className='flex items-center justify-between'>
            <Link to="/">
                <img src={assets.zent} alt="logo"
                    className='w-28 sm:w-32 lg:w-40' />
            </Link>


            {/* //div for the user who is logged out  */}

            {
                user ? (
                    <div
                        className='flex text-center gap-2 sm:gap-3'>
                        <button
                        onClick={()=>{
                            navigate("/buy")
                        }}
                            className='flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 hover:scale-105 transition-all duration-700 rounded-full'>
                            <img src={assets.credit_star} alt="credit-star" className='w-5' />
                            <p
                                className='text-xs sm:text-sm font-medium text-gray-600'>Credit left: 50</p>
                        </button>

                        <p
                            className='text-gray-600 max-sm:hidden pl-4 py-3'>Hi,User</p>

                        <div
                            className='relative group'>
                            <img src={assets.profile_icon}
                                className='w-10 drop-shadow'
                                alt="user-profile" />
                        <div
                            className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                            <ul 
                            className='list-none m-0 p-2 bg-white rounded-md border'>
                                <li
                                className='py-1 px-2 cursor-pointer pr-10'>Logout</li>
                            </ul>
                        </div>
                        </div>

                    </div>
                ) : (
                    <div className='flex items-center gap-2 sm:gap-5'>
                        <p
                            onClick={() => {
                                navigate('/buy');
                            }}
                            className='cursor-pointer'>Pricing</p>
                        <button
                        onClick={()=>{
                            setshowLogin(true);
                        }}
                            className='bg-zinc-800 text-white px-7 py-2 sm:px-10 text-sm rounded-full '>Login</button>
                    </div>
                )
            }

        </div>
    )
}

export default Navbar