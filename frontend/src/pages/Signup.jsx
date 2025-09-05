import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // stops from reloading
        try {
            const response = await axios.post("http://localhost:3000/user/signup", {
                firstName,
                lastName,
                username: email,
                password
            });
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            console.log("Sign up failed:", err);
            alert("Incorrect inputs");
        }
    };
    return (
        <div className="flex items-center justify-center h-screen bg-stone-50">
            <div className="bg-stone-300 p-13 rounded-2xl shadow-2xl">
                <div className="flex flex-col items-center justify-center bg-neutral-800 rounded-xl w-[400px] p-10 shadow-lg">
                    <h1 className="py-6 text-center text-xl font-bold text-white">
                        Signup Page
                    </h1>
                    <form className="w-full" onSubmit={handleSubmit}>
                        <input
                         type="text" 
                        id="firstName"
                        name="firstName"
                        autoComplete="firstName"
                        onChange={(e) => {setFirstName(e.target.value)}}
                        placeholder="First Name"
                        className="w-full border py-3 px-4 bg-gray-200 rounded-lg m-2"
                        />
                        <input
                        type="text" 
                        id="lastName"
                        name="lastName"
                        autoComplete="lastName"
                        onChange={(e) => {setLastName(e.target.value)}}
                        placeholder="Last Name"
                        className="w-full border py-3 px-4 bg-gray-200 rounded-lg m-2"
                        />                       
                        <input
                        type="email" 
                        id="email"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => {setEmail(e.target.value)}}
                        placeholder="Email"
                        className="w-full border py-3 px-4 bg-gray-200 rounded-lg m-2"
                        />                        
                        <input
                         type="password" 
                        id="password"
                        name="password"
                        autoComplete="password"
                        onChange={(e) => {setPassword(e.target.value)}}
                        placeholder="Password"
                        className="w-full border py-3 px-4 bg-gray-200 rounded-lg m-2"
                        />
                        <button type="submit" className="w-full bg-neutral-500 text-white rounded-lg m-2 px-4 py-3 hover:bg-emerald-800 transition duration-200">
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default Signup;