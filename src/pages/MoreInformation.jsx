import React, { useEffect, useState } from 'react'
import { Axios } from '../utils/axios'
import { Link, useLocation } from 'react-router-dom'
import {BsArrowLeft} from 'react-icons/bs'
import ClipLoader from 'react-spinners/ClipLoader'
import { useSelector } from 'react-redux'
export const MoreInformation = () => {
    let selector = useSelector((state) => state.user)
    let location = useLocation().pathname.split('/')[2]
    let [Single,setSingle] = useState([])
    let [loading,setLoading] = useState(false)
    useEffect(() => {
        let Fetch = async () => {
            setLoading(true)
            let res = await Axios.get(`/expense/${location}`);
            setSingle(res.data)
            res.data && setLoading(false)
        }
        Fetch()
    },[])
  return (
    <div className='w-full h-full flex items-center justify-center'>
            <div className='font-Quicksand rounded-md shadow-xl xs:w-11/12 mx-auto md:w-4/12 xs:mt-[20%] md:mt-[0] shadow-zinc-400 p-2'>
                {
                    loading ? (<ClipLoader color={'#000'} loading={loading} size={80} aria-label="Loading Spinner" data-testid="loader"/>) :  (
                        <>
                            <div className='flex items-start justify-start'><Link to={'/'} className='p-2 border-solid border-black border-[1px] rounded-full cursor-pointer hover:bg-black hover:text-white'><BsArrowLeft /></Link></div>
                            <h1 className='text-center my-5 font-bold underline'>TRANSACTION INFORMATION</h1>
                            <div className='w-14 h-14 rounded-full block mx-auto my-9'>
                                <img className='w-full h-full object-cover rounded-full' src={selector.photo} alt="" />
                            </div>
                            <h1 className='my-3 font-bold text-center block'>CREATER: <span>{selector.username}</span></h1>
                            <p className='flex items-start xs:justify-between font-bold my-5'><h1 className='xs:text-xs md:text-[16px]'>ID:</h1><span className='xs:text-xs md:text-[16px] ml-4 text-green-900'>{Single._id}</span></p>
                            <h1 className='flex items-start xs:justify-between font-bold my-5'><h1 className='xs:text-xs md:text-[16px]'>TRANSACTION NAME:</h1><span className='xs:text-xs md:text-[16px] ml-4 text-green-900'>{Single.Expensetext}</span></h1>
                            <p className='flex items-start xs:justify-between font-bold my-5'><h1 className='xs:text-xs md:text-[16px]'>CASH AMOUNT:</h1><span className='xs:text-xs md:text-[16px] ml-4 text-green-900'>${Single.Amount}</span></p>
                            <p className='flex items-start xs:justify-between font-bold my-5'><h1 className='xs:text-xs md:text-[16px]'>CREATED AT:</h1><span className='xs:text-xs md:text-[16px] ml-4 text-green-900'>{Single.createdAt}</span></p>
                            <p className='flex items-start xs:justify-between font-bold my-5'><h1 className='xs:text-xs md:text-[16px]'>LAST UPDATE:</h1><span className='xs:text-xs md:text-[16px] ml-4 text-green-900'>{Single.updatedAt}</span></p>
                        </>
                    )
                }
        </div>
    </div>
  )
}
/** */