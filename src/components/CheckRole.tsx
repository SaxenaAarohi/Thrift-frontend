import { useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const CheckRole = () => {
    const navigate = useNavigate();
    const { user,isLoaded,isSignedIn } = useUser();

    useEffect(() => {
      if (!isLoaded) return;
    if (!isSignedIn) {
      navigate("/", { replace: true });
      return;
    }

    if (!user) return;

        async function checkrole() {
            try {
                const res = await fetch(`http://localhost:5000/api/user/checkrole/${user?.id}`);
                const data = await res.json();

                if (data.role === "seller") {
                    navigate('/seller', { replace: true });
                }
                else
                    navigate('/', { replace: true });
            } catch (err) {
                console.error("Error fetching user role:", err);
                return;
            }
        }
        checkrole();
    }, [isLoaded, user,isSignedIn]);

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {/* Spinner */}
            <div className="w-12 h-12 border-4 border-slate-300 border-t-pop-pink rounded-full animate-spin"></div>

            {/* Text */}
            <p className="text-slate-600 text-sm font-medium">
                Loading...
            </p>
        </div>
    )
}

export default CheckRole
