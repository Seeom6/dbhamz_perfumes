// Links.jsx
import { NavLink } from "react-router-dom";
import { navLink } from "../../utils/data.jsx";

const Links = () => {
  return (
    <div className="h-full flex items-center justify-center space-x-6">
      {navLink.map((item) => (
        <NavLink 
          key={item.name}
          to={item.href}
          className={({ isActive }) => 
            `text-sm font-medium px-1 py-2 transition-colors hover:text-primary ${
              isActive ? "text-primary border-b-2 border-primary font-semibold" : "text-gray-700"
            }`
          }
          end
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default Links;