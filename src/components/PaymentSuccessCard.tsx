import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";

const PaymentSuccessCard = () => {
   const {user}= useUser();
  const clearcart = useCartStore((state) => state.clearcart);

  useEffect(()=>{
     clearcart(user.id);
  }, [] );
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[320px] rounded-xl bg-white p-8 text-center shadow-lg">
        
        {/* Tick Icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
          <span className="text-3xl font-bold text-white">✓</span>
        </div>

        {/* Title */}
        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Payment Successful
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-600">
          Thank you! Your payment has been completed successfully.
        </p>

     
        <button onClick={()=>navigate("/")}
        className="mt-6 w-full rounded-lg bg-green-500 py-2 text-white hover:bg-green-600 transition">
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
