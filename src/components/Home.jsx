import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>
                Welcome to Test Company
            </h1>
            <button onClick={() => navigate('/products')}>Browse Products</button>
        </div>
    )
}

export default Home