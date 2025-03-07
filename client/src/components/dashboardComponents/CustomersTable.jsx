import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useGetUsers, useDeleteUser } from "../../utils/Api/UserEndPoint";
import Loading from "../Loading";
import DeletePopup from "./ActionButtons/DeletePopup";
import UpdatePopup from "./ActionButtons/UpdatePopup";

const UsersTable = () => {
  const { data: users, isLoading, isError, error } = useGetUsers();
  const deleteUserMutation = useDeleteUser();
  // const updateUserMutation = useUpdateUser();

  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openDeletePopup = (user) => {
    setSelectedUser(user);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedUser(null);
  };

  const openUpdatePopup = (user) => {
    setSelectedUser(user);
    setIsUpdatePopupOpen(true);
  };

  const closeUpdatePopup = () => {
    setIsUpdatePopupOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async () => {
    if (selectedUser) {
      await deleteUserMutation.mutateAsync(selectedUser._id);
      closeDeletePopup();
    }
  };

  const handleUpdateUser = async (updatedData) => {
    if (selectedUser) {
      await updateUserMutation.mutateAsync({ id: selectedUser._id, updatedData });
      closeUpdatePopup();
    }
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full bg-white border border-[#EEEEEE]">
        <thead className="text-start">
          <tr className="bg-white text-[#B5B7C0]">
            <th className="py-2 px-4 border-b">الاسم</th>
            <th className="py-2 px-4 border-b">البريد الإلكتروني</th>
            <th className="py-2 px-4 border-b">رقم الهاتف</th>
            <th className="py-2 px-4 border-b">العنوان</th>
            <th className="py-2 px-4 border-b">الدور</th>
            <th className="py-2 px-4 border-b">الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 text-center">
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                {user.firstName} {user.lastName}
              </td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">{user.email}</td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">{user.phone}</td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">{user.address}</td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">{user.roles}</td>
              <td className="py-2 px-4 border-b border-[#EEEEEE]">
                <div className="flex justify-center space-x-2">
                  <button
                    onClick={() => openUpdatePopup(user)}
                    className="rounded-sm bg-[rgba(0,172,79,0.12)] p-2 text-[#00AC4F] hover:text-blue-700"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => openDeletePopup(user)}
                    className="text-red-500 p-2 rounded-sm bg-[rgba(223,4,4,0.12)] hover:text-red-700"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Popup */}
      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={closeDeletePopup}
        onConfirm={handleDeleteUser}
      />

      {/* Update Popup */}
      <UpdatePopup
        isOpen={isUpdatePopupOpen}
        onClose={closeUpdatePopup}
        user={selectedUser}
        onUpdate={handleUpdateUser}
      />
    </div>
  );
};

export default UsersTable;