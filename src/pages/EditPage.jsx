import React, { useEffect, useState } from 'react'
import { History } from './History'
import {BsArrowLeft, BsCashCoin} from 'react-icons/bs'
import {BiSolidError} from 'react-icons/bi'
import ClipLoader from 'react-spinners/ClipLoader'
import { Axios } from '../utils/axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
export const EditPage = () => {
     let location = useLocation().pathname.split('/')[2]
     let textIncome = useLocation().pathname.split('/')[4].split('%20').join(' ')
     let Amount = useLocation().pathname.split('/')[3]
    let [error,setError] = useState('')
    let [AllInfo,setAllInfo] = useState([])
    let [loading,setLoading] = useState(false)
    let [expense,setExpense] = useState(Amount)
    let [text,setText] = useState(textIncome)
    let Fetch = async () => {
            try {
                setLoading(true)
                let res = await Axios.get(`/expense/${location}`);
                setAllInfo(res.data)
                res.data && setLoading(false)
            } catch (error) {
                setError(error.response.data);
                Resetter()
            }
        }
    useEffect(() => {
        Fetch()
    },[])
    let navigate = useNavigate()
    let Edit = async () => {
        try {
            setLoading(true)
            let res = await Axios.put(`/expense/edit/${location}`,{
                Expensetext : text,
                Amount : expense
            })
            setText('')
            setExpense(0)
            res.data && setLoading(false)
            navigate('/')
        } catch (error) {
            setError(error.response.data);
            Resetter()
        }
    }
      let Resetter = () => {
            setTimeout(() => {
                setError('')
                setLoading(false)
            },3000)
        }
  return (
    <div className='relative bg-white font-Quicksand xs:w-11/12 mx-auto sm:w-full flex items-start justify-center h-screen'>
        <div className='w-[350px] xs:shadow-2xl xs:shadow-zinc-700 xs:mb-20 md:my-0 md:shadow-xl md:shadow-zinc-400 400 p-2 rounded-sm xs:mt-0 md:mt-32'>
            <div className='flex items-start justify-start'><Link to={'/'} className='p-2 border-solid border-black border-[1px] rounded-full cursor-pointer hover:bg-black hover:text-white'><BsArrowLeft /></Link></div>
            {error && <h1 className='mb-2 text-red-800 ml-2 font-bold text-xs flex items-center justify-start'><BiSolidError className='mr-1' />{error}!</h1>}
            <h1 className='font-extrabold xs:text-xl md:text-2xl text-center mb-5 underline'>Edit - Expense Tracker</h1>
                <div className='my-2 w-11/12 mx-auto'>
                    <h1 className='xs:text-xl md:text-3xl font-bold text-center my-5 underline'>Edit Transaction</h1>
                    <div className='w-11/12 text-xs mx-auto bg-zinc-100 rounded-md shadow-lg shadow-zinc-200'>
                        <div className='flex items-start justify-start flex-col'>
                            <h1 className='font-bold'>Edit - Text</h1>
                            <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='Enter Edit Text' className={`font-bold p-2 bg-transparent border-solid outline-none text-sm focus:border-green-800 border-b-[1px] w-full`} />
                        </div>
                        <div className='flex items-start justify-start flex-col mt-5'>
                            <h1 className='font-bold'>Edit - Amount</h1>
                            <p>(negative - expense, positive - income)</p>
                            <input type="number" value={expense} onChange={(e) =>setExpense(e.target.value)} placeholder='Your New Expense' className={`font-bold p-2 bg-transparent border-solid outline-none text-sm focus:border-green-800 border-b-[1px] w-full`} />
                        </div>
                    </div>
                </div>
            <button disabled={loading} onClick={() => Edit()} className={`${loading ? 'bg-violet-300' : 'bg-violet-500'} hover:bg-violet-600 text-white p-2 rounded-md cursor-pointer hover:tracking-wider my-5 w-8/12 mx-auto font-bold flex items-center justify-center`}>{loading ? <ClipLoader color={'#000'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/> : 'Edit Tranasction'}<BsCashCoin className={'ml-2 mt-1'} /></button>
        </div>
    </div>
  )
}
