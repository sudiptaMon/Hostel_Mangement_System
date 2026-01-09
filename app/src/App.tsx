import Login from "./pages/Login";
import Home from "./pages/Home";
import Getpass from "./pages/Getpass";
import { Route, Routes, useNavigate } from "react-router-dom";
import GatepassHistory from "./pages/GetpassHistory";
import Manu from "./pages/Menu";
import Fees from "./pages/Fees";
import CreateUser from "./pages/Admin/CreateUser";
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Logout from "./pages/Logout";
import AdminGatepass from "./pages/Admin/AdminGatepass";
import AddManu from "./pages/Admin/AddManu";

export type userType = {
  _id: string;
  name: string;
  username: string;
  email: string;
  room: string;
  batch: string;
  role: string;
}
type contextType = {
  isAuth?: boolean;
  isStudent?: boolean;
  isAdmin?: boolean;
}

const context = createContext<contextType>({});
function App() {
  const [userData, setUser] = useState<userType | null>(null);
  const [isAuth, setAuth] = useState(false);
  const [isStudent, setStudent] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const authentication = async () => {
      try {
        let response = await axios.get("http://localhost:5000/authenticate", {
          withCredentials: true
        });
        if (response.data.isAuthenticated) {
          setAuth(true);
          setUser(response.data.user);
          if (response.data.user.role === "Student") {
            setStudent(true);
          } else {
            setAdmin(true);
          }
        } else {
          navigate("/");
        }
      } catch (err) {
        console.log(err);

      }
    }
    authentication();
  }, [navigate])
  // console.log(isAuth);
  return (
    <>
      <context.Provider value={{ isAuth, isStudent, isAdmin }}>
        <Routes>
          <Route path="/" element={isAuth ? <Home user={userData} /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>

          <Route path="/logout" element={<Logout setAuth={setAuth} setUser={setUser} setStudent={setStudent} setAdmin={setAdmin} />}></Route>
          <Route path="/Student">
            <Route path="home" element={isAuth && isStudent ? <Home user={userData} /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="gatepass" element={isAuth && isStudent ? <GatepassHistory /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="apply-gatepass" element={isAuth && isStudent ? <Getpass /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="manu" element={isAuth && isStudent ? <Manu /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="fees" element={isAuth && isStudent ? <Fees /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="complaints" element={isAuth && isStudent ? <Fees /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="fine" element={isAuth && isStudent ? <Fees/> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
          </Route>
          <Route path="/Admin">
            <Route path="home" element={isAdmin && isAuth ? <Home user={userData} /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="userentry" element={isAdmin && isAuth ? <CreateUser /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="gatepass" element={isAdmin && isAuth ? <AdminGatepass /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
            <Route path="manu" element={isAuth && isAdmin ? <AddManu /> : <Login setAuth={setAuth} setUser={setUser} />}></Route>
          </Route>
          <Route path="*" element={<Login setAuth={setAuth} setUser={setUser} />}>

          </Route>
        </Routes>
      </context.Provider>
    </>
  );
}

export default App;
export { context };