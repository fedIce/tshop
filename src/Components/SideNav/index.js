import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const menus = [
    {
        title: 'New In 🌟',
        icon: '💡',
        url:'/shop/newin'
    },
    {
        title: 'Clothing',
        icon: '👕',
        url:'/shop/clothes'
    },
    {
        title: 'Shoes',
        icon: '👢',
        url:'/shop/shoes'
    },
    {
        title: 'Accessories',
        icon: '⌚',
        url:'/shop/accessories'
    },
    {
        title: 'ActiveWear',
        icon: '🥊',
        url:'/shop/activewear'
    },
    {
        title: 'Outlet',
        icon: '👜',
        url:'/shop/outlet'
    }
]

const SideNav = () => {

    const location = useLocation()
    

    const SideNavItem = ({url,title, icon}) => {
        const active = location.pathname.includes(url.split('/')[2])
        return (
            <Link to={url} className={`w-[80%] p-2 rounded-lg text-gray-500 hover:bg-gray-200 hover: hover:text-white hover:cursor-pointer ${active && 'bg-gray-200'}`}>
                <span className='text-md '>{icon}</span>
                <span className='text-sm ml-2'>{title}</span>
            </Link>
        )
    }
  return (
    <div className='w-full h-[80%] flex flex-col pl-5'>
        <div className='title-text'>Explore</div>
        <div className='flex flex-col space-y-5 text-gray-500 font-medium  h-full relative'>
            {
                menus.map((item, indx) => {
                    return <SideNavItem key={indx} url={item.url} title={item.title} icon={item.icon} />
                })
            } 
            <div className='w-[80%] p-2 absolute bottom-0 rounded-lg text-gray-500 hover:bg-gray-200 hover: hover:text-white'>
                <span className='text-md '>💬</span>
                <span className='text-sm ml-2'>Help Center</span>
            </div>          
        </div>
    </div>
  )
}

export default SideNav