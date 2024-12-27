import React from "react";
import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="container text-center mt-5">
            <h1>Welcome to What's My Thesis!</h1>
            <p>Start visualizing your VC/PE portfolio thesis today.</p>
            <Link to="/dashboard" className="btn btn-primary btn-lg">
                Go to Dashboard
            </Link>
        </div>
    );
}

export default Home;
