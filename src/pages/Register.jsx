import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UploadToCloudinary } from '../utils/Cloudinary'
import { Axios } from '../utils/axios'
import ClipLoader from 'react-spinners/ClipLoader'
import {BiSolidError} from 'react-icons/bi'
export const Register = () => {
  let [loading,setLoading] = useState(false)
  let [username,setUsername] = useState('')
  let [password,setPassword] = useState('')
  let [email,setEmail] = useState('')
  let [image,setImage] = useState(null)
  let [hint,setHint] = useState('')
  let [error,setError] = useState('')
  let navigate = useNavigate()
  let handleRegister = async (e) => {
    e.preventDefault();
    try {
        setLoading(true)
        let uploadImage = await UploadToCloudinary(image);
        if(image){
            if(uploadImage.secure_url){
            let res = await Axios.post('/auth/register',{
              username : username,
              password : password,
              email : email,
              profile : uploadImage.secure_url,
              hint : hint
            })
            res.data && setLoading(false)
            res.data && navigate('/login')
          }else{
            setError('Error while Upload your image!')
            setLoading(false)
          }
        }else{
          setError('Please choose your profile!')
          Resetter()
        }
    } catch (error) {
      console.log(error.response.data)
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
    <div className='h-screen w-full flex items-start justify-center font-Quicksand'>
        <div className='shadow-xl border-solid border-[1px] mt-[9%] border-indigo-500 rounded-sm shadow-zinc-700 p-2 md:w-3/12 mx-auto xs:w-11/12'>
          {error && <h1 className='text-red-800 ml-2 font-bold text-xs flex items-center justify-start'><BiSolidError className='mr-1' />{error}!</h1>}
          <div className='flex items-center justify-between px-10'>
            <h1 className='underline text-center mb-5 text-indigo-500 text-3xl font-bold mt-5'>Register</h1>
            <label htmlFor='image' className='cursor-pointer w-12 h-12 rounded-full'>
              <input onChange={(e) => setImage(e.target.files[0])} type="file" name="" id="image" hidden />
              <img className='w-full h-full rounded-full object-cover' src={image ? URL.createObjectURL(image) : 'https://imgv3.fotor.com/images/blog-cover-image/10-profile-picture-ideas-to-make-you-stand-out.jpg'} alt="" />
            </label>
          </div>
          <form action="" className='flex items-start justify-start flex-col' onSubmit={handleRegister}>
            <div className='flex items-start justify-start w-full flex-col my-1'>
              <label htmlFor="username" className='text-indigo-500 ml-2'>Username</label>
              <input value={username} onChange={(e) => setUsername(e.target.value)} className='p-2 w-11/12 border-solid outline-none mt-2 border-green-800 border-b-[1px] mx-auto' type="text" name="username" id="username" placeholder='John' />
            </div>
            <div className='flex items-start justify-start w-full flex-col my-1'>
              <label htmlFor="email" className='text-indigo-500 ml-2'>Email Address</label>
              <input value={email}onChange={(e) => setEmail(e.target.value) } className='p-2 w-11/12 border-solid outline-none mt-2 border-green-800 border-b-[1px] mx-auto' type="email" id='email' placeholder='example@gmail.com' />
            </div>
            <div className='flex items-start justify-start w-full flex-col my-1'>
              <label htmlFor="password" className='text-indigo-500 ml-2'>Password</label>
              <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 w-11/12 border-solid outline-none mt-2 border-green-800 border-b-[1px] mx-auto' type="password" name="password" id="password" placeholder='asd)"/;!2AS' />
            </div>
            <div className='flex items-start justify-start w-full flex-col my-1'>
              <label htmlFor="Hint" className='text-indigo-500 ml-2'>Hint : </label>
              <input value={hint} onChange={(e) => setHint(e.target.value)} id='Hint' type="text" className='p-2 w-11/12 border-solid outline-none mt-2 border-green-800 border-b-[1px] mx-auto' placeholder='pet name, grandmom name' />
            </div>
            <button className='hover:bg-violet-600 bg-violet-500 text-white p-2 rounded-md cursor-pointer hover:tracking-wider my-5 w-8/12 mx-auto font-bold flex items-center justify-center'>{loading ? <ClipLoader color={'#fff'} loading={loading} size={20} aria-label="Loading Spinner" data-testid="loader"/> : 'Register'}</button>
          </form>
          <h1 className='text-xs  text-center'>Already have an account ? <Link className='hover:text-indigo-500' to={'/login'}>Login</Link></h1>
        </div>
    </div>
  )
}
