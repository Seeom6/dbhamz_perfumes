import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import LeftSidBar from '../../components/dashboardComponents/LeftSidBar'
import DashboardHeader from '../../components/dashboardComponents/DashboardHeader'

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='w-full bg-[#FAFBFF] flex justify-between items-start lg:gap-9 px-4 md:px-4'>
      <LeftSidBar setSidebarOpen={setSidebarOpen}  sidebarOpen={sidebarOpen}/>
      <div className='w-full mt-10'>
      <DashboardHeader setSidebarOpen={setSidebarOpen}  sidebarOpen={sidebarOpen}/> 
      <Outlet/>
      </div>
    </div>
  )
}

export default Dashboard
