import  React, {useState} from "react";
import Navbar from '../components/Navbar';
import Dashbody from "../components/DashBody";
import Profile from "../components/Profile";
import axios from "axios";
import { useNavigate }  from "react-router-dom";


 const Dashboard = () => {
    return (
        <>
            <div className="bg-zinc-200 min-h-screen">
                <Navbar />
                <Profile/>
                <Dashbody />
            </div>
        </>
    )

}

export default Dashboard;