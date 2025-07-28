import React from 'react'
import { Link, NavLink } from 'react-router-dom'

import peopleIcon from '@/assets/icons/people.svg'
import buildingUserIcon from '@/assets/icons/building-user.svg'
import badgeIcon from '@/assets/icons/badge.svg'
import draftIcon from '@/assets/icons/draft.svg'
import timeSquareIcon from '@/assets/icons/time-square.svg'
import typeIcon from '@/assets/icons/type-hierarchy.svg'

interface Link {
  linkName: string,
  path: string,
  icon: string,
  iconAlt: string
}

function Sidebar() {
  const links: Link[]  = [
    {
      linkName: "Employees",
      path: '/employee',
      icon: peopleIcon,
      iconAlt: 'people-icon'
    },
    {
      linkName: "Departments",
      path: '/departments',
      icon: buildingUserIcon,
      iconAlt: 'building-user-icon'
    },
    {
      linkName: "Designations",
      path: '/designations',
      icon: badgeIcon,
      iconAlt: 'badge-icon'
    },
    {
      linkName: "Attendance",
      path: '/attendance',
      icon: draftIcon,
      iconAlt: 'draft-icon'
    },
    {
      linkName: "Employee Types",
      path: '/employee-types',
      icon: typeIcon,
      iconAlt: 'type-icon'
    },
    {
      linkName: "Shifts",
      path: '/shifts',
      icon: timeSquareIcon,
      iconAlt: 'time-square-icon'
    },
  ]
  return (
    <div className='w-60 bg-primary-900 h-screen'>
      <div className='pt-8 px-3 space-y-3'>
        {links.map((link, indx) => (
          <div key={indx}>
            <NavLink className={({isActive}) => `text-text-100 transition-all ease-in-out duration-100 heading-primary-md-semibold !font-normal flex gap-3 hover:bg-primary p-2 rounded-md ${isActive ? 'bg-primary' : ''}`} to={link.path} >
            <img 
            src={link.icon} 
            alt={link.iconAlt}
            className='w-5' /> 
            {link.linkName}
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
