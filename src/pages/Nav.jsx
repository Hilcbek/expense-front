import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, Navigate, useNavigate} from 'react-router-dom'
import { LOGOUT } from '../utils/UserSlice';
export const Nav = () => {
  let [bool,setBool] = useState(false);
  let {username,photo} = useSelector((state) => state.user);
  console.log(username,photo)
  let dispatcher = useDispatch()
  let Logout = () => {
    dispatcher(LOGOUT({}))
    window.location.reload()
  }
  return (
    <nav className='bg-white  flex items-center justify-between w-full xs:px-2 lg:px-10'>
        <Link to={username && '/'}>
            <li className='w-16 h-16 object-cover list-none'>
                <img src="https://1000logos.net/wp-content/uploads/2020/12/Seattle_Kraken_logo.png" className='w-full h-full object-contain' alt="" />
            </li>
        </Link>
        {username ? <ul className='list-none flex items-center justify-center'>
            <div className='xs:w-10 xs:h-10 lg:w-12 cursor-pointer hover:scale-[1.3] lg:h-12 rounded-full border-solid border-green-800 border-[2px] mr-2'>
              <img src={photo} alt="" className='w-full h-full rounded-full object-cover' />
            </div>
            <button className='rounded-[5px] list-none hover:bg-white xs:text-sm lg:text-xl p-1 xs:px-1 lg:px-5 cursor-pointer hover:text-black hover:border-black border-[1px] border-solid transition-all ease-linear duration-500 tracking-wide bg-black text-white font-semibold mx-[1px]'>{username}</button>
             <button onClick={() => Logout()} className='rounded-[5px] list-none hover:bg-white xs:text-sm lg:text-xl p-1 xs:px-1 lg:px-5 cursor-pointer hover:text-black hover:border-black border-[1px] border-solid transition-all ease-linear duration-500 tracking-wide bg-black text-white font-semibold mx-[1px]'>Logout</button>
        </ul> : <ul className='flex items-center justify-center'>
            <Link className='p-2 rounded-[5px] hover:bg-white hover:text-black hover:border-black border-[1px] border-solid transition-all ease-linear duration-500 text-sm tracking-wide bg-black text-white font-semibold mx-[1px]' to={'/register'}>Register</Link>
            <Link className='p-2 rounded-[5px] hover:bg-white hover:text-black hover:border-black border-[1px] border-solid transition-all ease-linear duration-500 text-sm tracking-wide bg-black text-white font-semibold mx-[1px]' to={'/login'}>Login</Link>
        </ul>}
    </nav>
  )
}
