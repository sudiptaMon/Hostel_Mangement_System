import { Link } from "react-router-dom";
import { useContext } from "react";
import { context } from "../App";

export default function Navigation() {
  let myContext = useContext(context);
  // console.log(myContext);
  return (
    <div className="flex items-center justify-between p-3 w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <img src="" alt="Logo" className="h-8 w-8" />
        {/* <h4 className="text-xl font-semibold text-gray-800">uHostel</h4> */}
      </div>
      {myContext.isStudent &&
        <ul className="flex space-x-6 text-lg font-medium text-gray-700">
          <Link to="/Student/home">
            <li className="hover:text-blue-600 transition-colors duration-200">Home</li>
          </Link>
          <Link to="/Student/gatepass">
            <li className="hover:text-blue-600 transition-colors duration-200">Gatepass</li>
          </Link>
          <Link to="/Student/fees">
            <li className="hover:text-blue-600 transition-colors duration-200">Fees</li>
          </Link>
          <Link to="/Student/manu">
            <li className="hover:text-blue-600 transition-colors duration-200">Manu</li>
          </Link>
          <Link to="/Student/fines">
            <li className="hover:text-blue-600 transition-colors duration-200">Fines</li>
          </Link>
          <Link to="/logout">
            <li className="hover:text-red-600 transition-colors duration-200">Logout</li>
          </Link>
        </ul>
      }
      {myContext.isAdmin &&
        <ul className="flex space-x-6 text-lg font-medium text-gray-700">
          <Link to="/Admin/home">
            <li className="hover:text-blue-600 transition-colors duration-200">Home</li>
          </Link>
          <Link to="/Admin/userentry">
            <li className="hover:text-blue-600 transition-colors duration-200">New Entry</li>
          </Link>
          <Link to="/Admin/gatepass">
            <li className="hover:text-blue-600 transition-colors duration-200">gatepass</li>
          </Link>
          <Link to="/Admin/fees">
            <li className="hover:text-blue-600 transition-colors duration-200">Fees</li>
          </Link>
          <Link to="/Admin/manu">
            <li className="hover:text-blue-600 transition-colors duration-200">Manu</li>
          </Link>
          <Link to="/Admin/fines">
            <li className="hover:text-blue-600 transition-colors duration-200">Fines</li>
          </Link>
          <Link to="/logout">
            <li className="hover:text-red-600 transition-colors duration-200">Logout</li>
          </Link>
        </ul>
      }
    </div>
  );
}
