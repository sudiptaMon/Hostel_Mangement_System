import React, { useEffect, useState } from "react";
import axios from "axios";

import {MenuItem} from "../types/Types"
import ManueTable from "../components/ManueTable"
import Navigation from "../components/Navigation"

export default function Menu(){
    const [menu, setMenu] = useState<MenuItem[]>([]);
     useEffect(() => {
    console.log("Inside use effect");
    const fetchMenu = async () => {
        const menuDetails = await axios.get("http://localhost:5000/Student/menu",{ withCredentials: true });
        if(!menuDetails || !menuDetails.data){
            return;
        }
        console.log("Menu Details : ",menuDetails.data);
        let menuTable = menuDetails.data.menuTable;
        console.log(menuTable);
        setMenu(menuTable);
    };
    fetchMenu();
  }, []);

    return(
        <>
        <Navigation/>
        
            <ManueTable messMenu={menu}/>
        
        </>
    )
}