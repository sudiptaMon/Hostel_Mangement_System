import axios from "axios";
import { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";

export default function CreateUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [batch, setBatch] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  async function handleForm(e: any) {
    e.preventDefault();
    
    try {
      const res = await axios.post(
        "http://localhost:5000/Admin/createuser",
        { name, email, password, username, room, batch },
        { withCredentials: true }
      );
      // console.log(res);
      if (res.data?.added) {
        setMessage("User Successfully Added");
      } else {
        setMessage(res.data?.username ? `"${res.data.username}" - ${res.data.message}` : "Error: User could not be created.");
      }

      setEmail("");
      setPassword("");
      setUsername("");
      setRoom("");
      setBatch("");
      setName("");
    } catch (error) {
      console.error("Error creating user:", error);
      setMessage("Failed to create user. Please try again.");
    }
  }

  return (
    <>
      <Navigation />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md" onSubmit={handleForm}>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
            Create User
          </h2>
          
          {message && <p className="text-center text-green-600 mb-4">{message}</p>}

          <div className="mb-4">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="userid"
              placeholder="Email"
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="roomno"
              placeholder="Room Number"
              value={room}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setRoom(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <input
              type="text"
              id="batch"
              placeholder="Batch"
              value={batch}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setBatch(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            Create  
          </button>
        </form>
      </div>
    </>
  );
}
