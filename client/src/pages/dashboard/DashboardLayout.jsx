import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../../components/dashboardComponents/DashboardHeader';
import LeftSidebar from '../../components/dashboardComponents/LeftSidBar';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50" dir="rtl">
      {/* Mobile Menu Button - Only shows on small screens */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed z-50 top-4 left-4 p-2 rounded-lg bg-white shadow-md text-gray-700 hover:bg-gray-100 transition-all lg:hidden"
        aria-label="Toggle sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Sidebar - Hidden on mobile unless sidebarOpen is true */}
      <div className={`fixed lg:relative z-40 h-full transition-all duration-300 transform ${
        sidebarOpen ? 'translate-x-0 w-64' : 'translate-x-full lg:translate-x-0 lg:w-64'
      }`}>
        <LeftSidebar setSidebarOpen={setSidebarOpen} /> {/* Always show full sidebar when visible */}
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-gray-200">
          <DashboardHeader />
        </div>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;