import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userType } from "../App"
type loginProps = {
  setAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
}

export default function Login({ setAuth, setUser }: loginProps) {
  const [user, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errmessage, setErrmessage] = useState("");
  const [role, setRole] = useState("Student");
  const navigate = useNavigate();



  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:5000/${role}/login`, {
        username: user,
        password
      }, {
        withCredentials: true
      })
      if (response.data.status) {
        setAuth(true);
        setUser(response.data.response);
        navigate(`/${role}/home`)
      } else {
        setErrmessage("Invalid username/password")
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setErrmessage("Invalid username or password.");
    }
  };

  const handleChange = () => {
    setRole((prev) => {
      if (prev === "Student") {
        return "Admin";
      } else {
        return "Student";
      }
    });
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-50">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">uHostel</h1>

      <form onSubmit={handleForm} className="bg-white p-8 border border-gray-300 rounded-lg shadow-lg w-full max-w-sm">

        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-gray-800 font-semibold">{role}</span>
            <h2 className="font-semibold text-gray-800 inline ml-2">Log In</h2>
          </div>
          <div className="flex justify-center items-center cursor-pointer" onClick={handleChange}>
            <i className="fas fa-right-left w-5 h-5 text-gray-500 mr-2"></i>
            {/* <span className="text-gray-700">Change</span> */}
          </div>
        </div>


        <input
          type="text"
          placeholder="Username"
          id="username"
          value={user}
          onChange={(e) => { setUsername(e.target.value); setErrmessage("") }}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value); setErrmessage("") }}
          className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <span className="text-sm text-gray-600">
          Forget your password? <a href="/" className="text-blue-600 hover:underline">Click Here</a>
        </span>
        <button
          type="submit"
          className="w-full p-3 mt-4 bg-green-500 text-white rounded-md border border-green-600 hover:bg-green-600 transition-colors duration-200"
        >
          Login
        </button>
      </form>

      {errmessage && <p className="mt-4 text-red-600">{errmessage}</p>}
    </div>
  );
}
