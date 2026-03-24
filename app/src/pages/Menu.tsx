import React, { useEffect, useState } from "react";
import api from "../lib/api";

import {MenuItem} from "../types/Types"
import ManueTable from "../components/ManueTable"
import Navigation from "../components/Navigation"

export default function Menu(){
    const [menu, setMenu] = useState<MenuItem[]>([]);
     useEffect(() => {
    console.log("Inside use effect");
    const fetchMenu = async () => {
        const menuDetails = await api.get("/Student/menu");
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