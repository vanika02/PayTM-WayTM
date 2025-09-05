import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // stops form reload
        try {
            const response = await axios.post("http://localhost:3000/user/signin", {
                username,
                password
            });

            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.log("Sign in failed:", err);
            alert("Invalid Credentials");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-stone-50">
            {/* Green box wrapping the white box */}
            <div className="bg-stone-300 p-10 rounded-2xl shadow-2xl">
                {/* White box inside */}
                <div className="flex flex-col items-center justify-center bg-neutral-800 rounded-xl w-[400px] p-6 shadow-lg">
                    <h1 className="py-6 text-center text-xl font-bold text-white">SIGNIN</h1>
                    
                    <form className="w-full" onSubmit={handleSubmit}>
                        <input 
                            id="username"
                            name="username"
                            autoComplete="username"
                            onChange={(e) => {setUsername(e.target.value)}}
                            type="text" 
                            placeholder="User Name" 
                            className="w-full border py-3 px-4 bg-gray-200 rounded-lg m-2"
                        />
                        <input 
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            onChange={(e) => {setPassword(e.target.value)}}
                            type="password" 
                            placeholder="Password" 
                            className="w-full border py-3 px-4 bg-gray-200 rounded-lg m-2"
                        />
                        <button 
                            type="submit" 
                            className="w-full bg-neutral-500 text-white py-3 rounded-lg mt-4 hover:bg-emerald-800 transition duration-200"
                        >
                            Sign In
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signin;
