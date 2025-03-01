import { NavLink } from "react-router-dom"
import { navLink } from "../../utils/data.jsx"
const Links = () => {
  return (
    <div className="hidden md:flex">
      <div className="w-full flex justify-evenly items-center">
        {
            navLink.map((item , idx)=> (
                <NavLink key={item.name} to={item.href}  className={({isActive})=>{
                    return "text-extraSmall md:text-medium font-semibold px-1.5" +( isActive &&("font-bold text-primary border-b-2 md:border-b-4 border-primary"))

                }}>
                    {item.name}
                </NavLink>
            ))
        }
      </div>
    </div>
  )
}

export default Links
// return "font-bold text-primary border-b-4 border-primary"
// className="text-medium font-semibold px-1.5"