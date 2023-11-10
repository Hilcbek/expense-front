import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import ClipLoader from 'react-spinners/ClipLoader'
import { BiSolidError } from 'react-icons/bi'
import { Axios } from '../utils/axios'
import { LOGIN } from '../utils/UserSlice'
export const Login = () => {
  let [username,setUsername] = useState('')
  let [loading,setLoading] = useState(false)
  let [password,setPassword] = useState('')
  let [error,setError] = useState('')
  let dispatcher = useDispatch()
  let navigate = useNavigate()
  let handleLogin = async (e) => {
      e.preventDefault();
      setLoading(true)
      try {
        let res = await Axios.post('/auth/login',{
              username : username,
              password : password
            })
            dispatcher(LOGIN({username : res.data.username, photo : res.data.profile}))
            res.data && navigate('/')
      } catch (error) {
        setError(error.response.data)
        Resetter()
      }
  }
    let Resetter = () => {
      setTimeout(() => {
        setLoading(false)
        setError('')
      },3000)
  }
  return (
    <div className='h-screen w-full flex items-start justify-center font-Quicksand'>
        <div className='shadow-xl border-solid mt-[9%] border-[1px] border-indigo-500 rounded-sm shadow-zinc-700 p-2 md:w-3/12 mx-auto xs:w-11/12'>
          {error && <h1 className='text-red-800 ml-2 font-bold text-xs flex items-center justify-start'><BiSolidError className='mr-1' />{error}!</h1>}
          <h1 className='underline text-center mb-5 text-indigo-500 text-3xl font-bold'>Login</h1>
          <form action="" className='flex items-start justify-start flex-col' onSubmit={handleLogin}>
            <div className='flex items-start justify-start w-full flex-col my-1'>
              <label htmlFor="username" className='text-indigo-500 ml-2'>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className='p-2 w-11/12 border-solid outline-none mt-2 border-green-800 border-b-[1px] mx-auto' type="text" name="username" id="username" placeholder='John' />
            </div>
            <div className='flex items-start justify-start w-full flex-col my-1'>
              <label htmlFor="password" className='text-indigo-500 ml-2'>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 w-11/12 border-solid outline-none mt-2 border-green-800 border-b-[1px] mx-auto' type="password" name="password" id="password" placeholder='asd)"/;!2AS' />
            </div>
            <button className='hover:bg-violet-600 bg-violet-500 text-white p-2 rounded-md cursor-pointer hover:tracking-wider my-5 w-8/12 mx-auto font-bold flex items-center justify-center'>{loading  ? <ClipLoader color={'#fff'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/> : 'Login'}</button>
          </form>
          <h1 className='text-xs  text-center'>Don't have an account ? <Link className='hover:text-indigo-500' to={'/register'}>Register</Link></h1>
        </div>
    </div>
  )
}
