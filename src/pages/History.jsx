import React, { useEffect, useState } from 'react'
import {MdDelete, MdModeEditOutline} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { Axios } from '../utils/axios'
import ClipLoader from 'react-spinners/ClipLoader'
export const History = ({data}) => {
  let [loading,setLoading] = useState(false)
  let navigate = useNavigate()
  let HandleDelete = async () => {
      setLoading(true)
      let res = await Axios.delete(`/expense/delete/${data._id}`);
      res.data && setLoading(false)
      navigate('/')
      
  }
  return (
      <>
        
      </>
  )
}
/***/