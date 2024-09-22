import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userType } from "../App";
type logoutProps = {
    setAuth: React.Dispatch<React.SetStateAction<boolean>>;
    setUser: React.Dispatch<React.SetStateAction<userType | null>>;
    setStudent: React.Dispatch<React.SetStateAction<boolean>>;
    setAdmin: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Logout({ setAuth, setUser, setStudent, setAdmin }: logoutProps) {
    const navigate = useNavigate();
    useEffect(() => {
        const logout = async () => {
            try {
                await axios.get("http://localhost:5000/logout", { withCredentials: true });
                setAuth(false);
                setUser(null);
                setStudent(false);
                setAdmin(false);

            } catch (error) {
                console.log("Logout failed " + error);

            }
            navigate("/");
        }
        logout();
    }, [navigate])
    return (
        <div className="bg-[#dadef9] min-h-screen">

            <div className="flex bg-white w-[90%] h-fit p-4 items-center justify-center my-5 mx-auto rounded-md shadow-lg">
                <p>LOGGING OUT .....</p>
            </div>

        </div>


    )
}


