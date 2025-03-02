import React from 'react'
import Stats from '../../components/dashboardComponents/Stats'
import { FaChevronDown } from "react-icons/fa";
import CustomerTable from '../../components/dashboardComponents/CustomersTable';
import { useGetUsers } from '../../utils/Api/UserEndPoint';

const Customers = () => {


  const { data : userData , error  , isError , isLoading} = useGetUsers();
  
  return (
    <div>
      <Stats/>
      <CustomerTable userData={userData} />
     </div>
  )
}

export default Customers
