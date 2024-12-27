import React, { useState } from "react";

function PortfolioForm({ onSubmit }) {
    // Local state for form inputs
    const [formData, setFormData] = useState({
        fundSize: "",
        numStartups: "",
        reservePercent: "",
        exitMultiple: "",
        successRate: "",
    });

    const [error, setError] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        const { fundSize, numStartups, reservePercent, exitMultiple, successRate } = formData;

        // Basic validation
        if (!fundSize || !numStartups || !reservePercent || !exitMultiple || !successRate) {
            setError("All fields are required.");
            return;
        }

        if (isNaN(fundSize) || isNaN(numStartups) || isNaN(reservePercent) || isNaN(exitMultiple) || isNaN(successRate)) {
            setError("All fields must be valid numbers.");
            return;
        }

        if (parseFloat(numStartups) <= 0 || parseFloat(fundSize) <= 0) {
            setError("Fund size and number of startups must be greater than zero.");
            return;
        }

        setError(""); // Clear errors
        onSubmit(formData); // Pass data to the parent component
    };

    return (
        <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4">Portfolio Form</h2>

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fundSize" className="form-label">
                        Fund Size ($)
                    </label>
                    <input
                        type="number"
                        id="fundSize"
                        name="fundSize"
                        value={formData.fundSize}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter fund size (e.g., 10000000)"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="numStartups" className="form-label">
                        Number of Startups
                    </label>
                    <input
                        type="number"
                        id="numStartups"
                        name="numStartups"
                        value={formData.numStartups}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter number of startups (e.g., 10)"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="reservePercent" className="form-label">
                        Reserve Percentage (%)
                    </label>
                    <input
                        type="number"
                        id="reservePercent"
                        name="reservePercent"
                        value={formData.reservePercent}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter reserve percentage (e.g., 50)"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exitMultiple" className="form-label">
                        Target Exit Multiple
                    </label>
                    <input
                        type="number"
                        id="exitMultiple"
                        name="exitMultiple"
                        value={formData.exitMultiple}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter exit multiple (e.g., 3)"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="successRate" className="form-label">
                        Success Rate (%)
                    </label>
                    <input
                        type="number"
                        id="successRate"
                        name="successRate"
                        value={formData.successRate}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Enter success rate (e.g., 10)"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default PortfolioForm;
