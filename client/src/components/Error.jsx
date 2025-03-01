import React from 'react'

const Error = ({error}) => {
    return (<div className="w-full h-screen flex justify-center text-4xl items-center">Error: {error?.message || "Product not found."}</div>)
}

export default Error
