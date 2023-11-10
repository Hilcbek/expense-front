import React, { useEffect, useState } from 'react'
import { History } from './History'
import {BsCashCoin} from 'react-icons/bs'
import {BiSolidError} from 'react-icons/bi'
import ClipLoader from 'react-spinners/ClipLoader'
import { Axios } from '../utils/axios'
import { MdDelete, MdModeEditOutline } from 'react-icons/md'
import { Link } from 'react-router-dom'
export const Home = () => {
    let [expense,setExpense] = useState(0)
    let [text,setText] = useState('')
    let [error,setError] = useState('')
    let [AllInfo,setAllInfo] = useState([])
    let [loading,setLoading] = useState(false)
    let Fetch = async () => {
            try {
                setLoading(true)
                let res = await Axios.get('/expense');
                setAllInfo(res.data)
                setLoading(false)
            } catch (error) {
                setError(error.response.data)
                Resetter()
            }
        }
    useEffect(() => {
        Fetch()
    },[])
    let HandleSubmit = async () => {
        try {
            setLoading(true)
            let res = await Axios.post('/expense',{
                Expensetext : text,
                Amount : expense
            })
            setText('')
            setExpense(0)
            res.data && setLoading(false)
            Fetch()
        } catch (error) {
            setError(error.response.data);
            Resetter()
        }
    }
      let HandleDelete = async (id) => {
        try {
            setLoading(true)
            let res = await Axios.delete(`/expense/delete/${id}`);
            res.data && setLoading(false)
            Fetch()
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
        <div className='w-[350px] xs:shadow-2xl xs:shadow-zinc-700 xs:mb-20 md:my-0 md:shadow-xl md:shadow-zinc-400 400 p-2 rounded-sm xs:mt-0 md:mt-1'>
            {error && <h1 className='mb-2 text-red-800 ml-2 font-bold text-xs flex items-center justify-start'><BiSolidError className='mr-1' />{error}!</h1>}
            <h1 className='font-extrabold xs:text-xl md:text-2xl text-center mb-5 underline'>Expense Tracker</h1>
            <div className='flex items-start justify-start flex-col w-11/12 mx-auto rounded-sm shadow-lg shadow-zinc-300 font-bold p-2'>
                <h1 className='italic'>Your Balance</h1>
                <p className={`${(AllInfo?.TotalExpense) > 0 ? 'text-green-800' : 'text-red-800'} flex items-center justify-center italic font-bold text-3xl`}>$ {loading ? <ClipLoader color={'#000'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/> : (AllInfo?.TotalExpense ? AllInfo?.TotalExpense : 0)}</p>
            </div>
            <div className='flex rounded-3xl border-solid border-green-800 border-[1px] shadow-lg shadow-zinc-400 items-center justify-between my-3 p-2 w-11/12 mx-auto'>
                <div className='w-full flex items-center justify-center border-solid border-black/40 border-r-[2px] flex-col'>
                    <h1 className='font-bold xs:text-sm md:text-[16px] text-green-900'>Total Income</h1>
                    <p className='font-bold text-green-900 flex items-center justify-center'>$ {loading ? <ClipLoader color={'#000'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/> :  (AllInfo?.PositiveExpeneses ? AllInfo?.PositiveExpeneses : 0)}</p>
                </div>
                 <div className='w-full flex items-center justify-center flex-col'>
                    <h1 className='font-bold xs:text-sm md:text-[16px] text-red-900'>Total Expense</h1>
                    <p className='font-bold text-red-900 flex items-center justify-center'>$ {loading ? <ClipLoader color={'#000'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/> : (AllInfo.NegativeExpenses ? AllInfo.NegativeExpenses : 0)}</p>
                </div>
            </div>
            <h1 className='font-bold text-center xs:text-xl md:text-3xl my-3 underline'>History</h1>
            <div className='flex items-center shadow-xl shadow-zinc-700 max-h-[100px] bg-zinc-100 p-2 rounded-md overflow-x-hidden justify-start flex-col w-11/12 mx-auto'>
                {
                    AllInfo?.AllExpeneses?.length > 0 ? (
                        loading ? (<ClipLoader color={'#000'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/>) :  
                         (AllInfo?.AllExpeneses?.map((data) => (
                                <li className={`${data.Amount > 0 ? 'border-green-500' : 'border-red-500'} my-1 text-xs cursor-pointer font-bold w-full p-2 flex items-center group relative border-solid border-r-[5px] bg-white shadow-xl shadow-zinc-300 rounded-3xl justify-between`}>
                                    <div className='flex items-center justify-start list-none absolute -left-32 md:group-hover:left-44 xs:group-hover:left-36'>
                                    <Link to={`/edit/${data._id}/${data.Amount}/${data.Expensetext}`} className='p-1 text-md border-solid hover:border-green-800 border-[1px] mx-1 rounded-md'><MdModeEditOutline className='hover:text-green-700' /></Link>
                                    <li onClick={() => HandleDelete(data._id)} className='p-1 text-md border-solid hover:border-red-800 border-[1px] mx-1 rounded-md'><MdDelete className='hover:text-red-700' /></li>
                                    </div>
                                    <abbr title="More about transaction"><Link to={`/more/${data._id}`} className='xs:underline md:hover:underline md:hover:text-green-800 w-8/12 break-words'>{data.Expensetext}</Link></abbr>
                                    <p>${data.Amount}</p>
                            </li>)
                            ))
                    ) : <h1 className='font-bold text-center block'>No Cash flow!</h1>
                }
            </div>
            <div className='my-2 w-11/12 mx-auto'>
                <h1 className='xs:text-xl md:text-3xl font-bold text-center my-5 underline'>Add new transaction</h1>
                <div className='w-11/12 text-xs mx-auto bg-zinc-100 rounded-md shadow-lg shadow-zinc-200'>
                    <div className='flex items-start justify-start flex-col'>
                        <h1 className='font-bold ml-3'>Text</h1>
                        <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder='Enter text' className='font-bold p-2 bg-transparent border-solid outline-none text-sm focus:border-green-800 border-b-[1px] w-full' />
                    </div>
                    <div className='flex items-start justify-start flex-col'>
                        <h1 className='font-bold ml-3'>Amount</h1>
                        <p>(negative - expense, positive - income)</p>
                        <input type="number" value={expense} onChange={(e) =>setExpense(e.target.value)} placeholder='Your expense' className='font-bold p-2 bg-transparent border-solid outline-none text-sm focus:border-green-800 border-b-[1px] w-full' />
                    </div>
                </div>
            </div>
            <button disabled={loading} onClick={() => HandleSubmit()} className={`${loading ? 'bg-violet-300' : 'bg-violet-500'} hover:bg-violet-600 text-white p-2 rounded-md cursor-pointer hover:tracking-wider my-5 w-8/12 mx-auto font-bold flex items-center justify-center`}>{loading ? <ClipLoader color={'#fff'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/> : 'Add transaction'}<BsCashCoin className={'ml-2 mt-1'} /></button>
        </div>
    </div>
  )
}
