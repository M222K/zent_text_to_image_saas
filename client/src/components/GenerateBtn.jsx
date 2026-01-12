import React from 'react'
import { assets } from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'


const GenerateBtn = () => {

    const { user, setshowLogin } = useContext(AppContext)
    const navigate = useNavigate();

    const onclickHandler = () => {
        if (user) {
            //if user present navigate to genrate page else login
            navigate('/result')
        } else {
            setshowLogin(true);
        }
    }

    return (
        <motion.div
            initial={{ opactiy: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='pb-6 text-center'>
            <h1 className='text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16'>See the magic. Try now</h1>

            <button 
            onClick={onclickHandler}
            className='inline-flex items-center gap-2 px-12 py-3 rounded-full bg-black text-white m-auto hoverLscale-105 transition-all duration-500'>Generate Images
                <img src={assets.star_group} alt=""
                    className='h-6' />
            </button>
        </motion.div>
    )
}

export default GenerateBtn
