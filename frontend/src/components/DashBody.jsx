import React, { useState, useEffect} from "react";
import { Button}   from "../components/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashBody = () => {
    const [users, setUsers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/user/bulk?filter=${filter}`)
        .then(response => {
            const token = localStorage.getItem("token");
            let allUser = response.data.user;
            const myId = JSON.parse(atob(token.split(".")[1])).userId;
            let user = allUser.filter(u => u._id !== myId);
            setUsers(user)

        })
    }, [filter])
    return (
        <>
        <div className="px-4 py-4 font-bold text-xl font-serif text-slate-900 text-center">
            USERS
        </div>
        <div className="my-2">
            <input onChange={(e) => {
                setFilter(e.target.value)
            }} type="text" placeholder="Search users" className="w-full px-3 py-2 border border-gray-800 shadow-grey-700 mb-5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-950"/>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
        </>
    )
}

function User({user}) {
    const navigate = useNavigate();

    return <div className="flex justify-between">
        <div className="flex">   
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-l uppercase font-bold">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div className="font-bold capitalize">
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full">
            <Button onClick={(e) => {
                navigate("/send?id=" + user._id + "&name=" + user.firstName)
            }} label={"Send Money"}>

            </Button>
        </div>
    </div>

}

export default DashBody;