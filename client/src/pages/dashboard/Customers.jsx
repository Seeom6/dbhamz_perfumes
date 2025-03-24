import React, { useState } from 'react';
import { FaSearch, FaFilter, FaUserEdit, FaTrash, FaUserShield, FaChevronDown } from 'react-icons/fa';
import { useGetUsers, useDeleteUser } from '../../utils/Api/UserEndPoint';

const Customers = () => {
  const { data: users, isLoading, isError, error } = useGetUsers();
  const deleteUserMutation = useDeleteUser();
  
  // State for popups and selected user
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Filter users based on search and filters
  const filteredUsers = users?.filter(user => {
    const matchesSearch = 
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.roles === roleFilter;
    
    return matchesSearch && matchesRole;
  });

  // Stats calculations
  const totalUsers = users?.length || 0;
  const adminUsers = users?.filter(user => user.roles === 'admin').length || 0;
  const regularUsers = totalUsers - adminUsers;

  // Open delete confirmation
  const openDeletePopup = (user) => {
    setSelectedUser(user);
    setIsDeletePopupOpen(true);
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (selectedUser) {
      await deleteUserMutation.mutateAsync(selectedUser._id);
      setIsDeletePopupOpen(false);
      setSelectedUser(null);
    }
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (isError) return <div className="text-red-500 p-4">Error: {error.message}</div>;

  return (
    <div className="p-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">كل المستخدمين</h3>
          <p className="text-2xl font-bold text-indigo-600 mt-1">{totalUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">مدير</h3>
          <p className="text-2xl font-bold text-purple-600 mt-1">{adminUsers}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium"> زبائن</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">{regularUsers}</p>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-lg shadow mb-6 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FaFilter />
              <span>فلتر</span>
              <FaChevronDown className={`transition-transform ${isFiltersOpen ? 'transform rotate-180' : ''}`} />
            </button>
            
            {isFiltersOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 p-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">الحالة</option>
                  <option value="admin">مدير</option>
                  <option value="user">زبون </option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">اسم المستخدم</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">رقم الهاتف</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">العنوان</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">الحالة</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">العمليات</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        {user.profileImage ? (
                          <img className="h-10 w-10 rounded-full" src={user.profileImage} alt="Profile" />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">@{user.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email || 'N/A'}</div>
                    <div className="text-sm text-gray-500">{user.phone}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.address?.street || 'N/A'}, {user.address?.area || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.address?.city || 'N/A'}, {user.address?.country || 'N/A'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.roles === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {user.roles}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-4">
                      <button 
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => {/* Add your update logic here */}}
                      >
                        <FaUserEdit className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900"
                        onClick={() => openDeletePopup(user)}
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4"> تأكيد الحذف ؟</h3>
            <p className="text-gray-600 mb-6">
             هل أنت متأكد من حذف {selectedUser?.firstName} {selectedUser?.lastName} ؟
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsDeletePopupOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                الغاء
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                disabled={deleteUserMutation.isLoading}
              >
                {deleteUserMutation.isLoading ? 'حذف...' : 'حذف'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;