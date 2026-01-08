import React from 'react'

const ShimmerCard = () => {
    return (
        <div className="animate-pulse">
            {/* image */}
            <div className="bg-gray-200 rounded-lg h-48 w-full mb-3"></div>

            {/* title */}
            <div className="bg-gray-200 h-4 w-3/4 rounded mb-2"></div>

            {/* price */}
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
        </div>
    );
}

export default ShimmerCard
