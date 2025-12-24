import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Complete_profile = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        role: "buyer",
        phone: "",
        address: "",
    });
 const {user} = useUser();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        toast.success("Profile completed successfully!");
        const payload = {
            user_id : user.id,
            email: user?.primaryEmailAddress?.emailAddress,
            ...formData,
        };
        const res = await fetch("http://localhost:5000/api/user",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );

        const data = await res.json();
        if(formData.role == "seller"){
            navigate('/seller');
        }
        else
        navigate('/');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-8 space-y-6"
            >
                <h2 className="text-2xl font-semibold text-gray-900 text-center">
                    Complete Your Profile
                </h2>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm font-medium">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter username"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm font-medium">Role</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm font-medium">
                        Phone Number
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-gray-700 mb-1 text-sm font-medium">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        rows={3}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-pop-pink text-white py-3 rounded-lg text-sm font-medium transition-colors"
                >
                    Save
                </button>
            </form>
        </div>
    );
}

export default Complete_profile
