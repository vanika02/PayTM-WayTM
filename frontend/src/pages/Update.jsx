import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        const response = await axios.put("http://localhost:3000/user/update", {
            password,
            firstName,
            lastName
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });

        if (response.status === 200) {
            alert("Update Successful");
            navigate("/dashboard");     
        } else {
            alert("Update Failed");
        }
    };
    return (
        <div className='flex items-center justify-center h-screen bg-stone-50'>
            <div className='bg-stone-300 p-13 rounded-2xl shadow-2xl'>
                <div className='flex flex-col items-center justify-center bg-neutral-500 rounded-xl w-[400px] p-12 shadow-lg'>
                    <h1 className='py-6 text-center font-bold text-white text-xl'>Update</h1>
                    <form onSubmit={handleSubmit} className='w-full'>

                    <input type="text" 
                    id='firstName'
                    autoComplete='firstName'
                    onChange={(e) => {setFirstName(e.target.value)}}
                    placeholder='Enter First Name'
                    required
                    className='w-full bg-gray-200 border py-4 px-3 m-2 rounded-lg'/>
                                                     
                    <input type="text" 
                    id='lastName'
                    autoComplete='lastName'
                    onChange={(e) => {setLastName(e.target.value)}}
                    placeholder='Enter Last Name'
                    required
                    className='w-full border py-4 px-3 rounded-lg bg-gray-200 m-2'/>

                    <input type="password" 
                    id='password'
                    autoComplete='password'
                    onChange={(e) => {setPassword(e.target.value)}}
                    placeholder='Enter Password'
                    required
                    className=' w-full bg-gray-200 border py-4 px-3 m-2 rounded-lg'/>

                    <button className=' w-full border bg-gray-200 hover:bg-emerald-800 transition-200 py-4 px-3 m-2 rounded-lg'>
                        Update
                    </button>
                    </form>
                </div>
            </div>
        </div>
    )
        

    }

export default Update;