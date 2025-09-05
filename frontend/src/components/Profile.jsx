import React, {useState, useEffect} from "react";
import axios from "axios";

const Profile = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token  = localStorage.getItem("token");
        if (!token){
            return;
        }
        axios.get("http://localhost:3000/user", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setCurrentUser(response.data.user);
        }   
        ).catch(err => {
            console.log("Error while fetching user", err);
        });

    }, [])

    if (!currentUser) {
        return(
        <h1>
            Loading...
        </h1>
        ) 
    }
    return (
        <div className="flex-flex-col itmes-start justify-start bg-green-500 w-full min-h-[50vh] py-10">
            <div className="text-slate-900 font-bold font-serif text-xl px-4 py-6 text-left  mb-2 mt-6">
                <div className="py-4">Hello {currentUser.firstName}</div>
                <div>User Name: {currentUser.username}</div>
                <div>Last Name: {currentUser.lastName}</div>
                <div>Balance: {currentUser.balance}</div>
            </div>
        </div>
    )
}

export default Profile;