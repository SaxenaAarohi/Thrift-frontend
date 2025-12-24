import React from "react";

const PaymentCancelCard = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-[320px] rounded-xl bg-white p-8 text-center shadow-lg">

        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500">
          <span className="text-3xl font-bold text-white">✕</span>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-gray-800">
          Payment Cancelled
        </h2>

        <p className="text-sm text-gray-600">
          Your payment was cancelled or failed. Please try again.
        </p>

        <button className="mt-6 w-full rounded-lg bg-red-500 py-2 text-white hover:bg-red-600 transition">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentCancelCard;
