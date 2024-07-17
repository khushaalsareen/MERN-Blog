import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react'
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
} from 'react-icons/hi';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSuccess } from '../redux/user/userSlice';
import { useSelector } from 'react-redux';
const DashSidebar = () => {
  const location = useLocation();
  const [tab,setTab] = useState('');
  const dispatch = useDispatch();
  const {currentUser} = useSelector(store=>store.user)
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    console.log(location.search)
    console.log(urlParams)
    const tabFromUrl = urlParams.get('tab');
    console.log(tabFromUrl)
    if(tabFromUrl)
      setTab(tabFromUrl)
  },[location.search])

  const handleSignOut = async()=>{
    try{
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      })
      const data = await res.json();
      if(!res.ok)
        console.log(data.message)
      else{
        dispatch(signoutSuccess())
      }
    } catch(error){
      console.log(error.message)
    }
  }

  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
            <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab==='profile'}
              icon={HiUser}
              label={currentUser.isAdmin===false?'User':'Admin'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
            </Link>
            {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
            <Sidebar.Item 
            icon={HiArrowSmRight}
            className='cursor-pointer' onClick={handleSignOut}
          >
            Sign Out
          </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar