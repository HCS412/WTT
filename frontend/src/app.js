import React, { useState } from 'react';
import { calculatePortfolio } from './api';

function App() {
    const [inputs, setInputs] = useState({
        fund_size: 10000000,
        num_startups: 10,
        reserve_percent: 0.5,
    });
    const [results, setResults] = useState(null);

    const handleChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: parseFloat(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await calculatePortfolio(inputs);
        setResults(data);
    };

    return (
        <div>
            <h1>What's My Thesis?</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Fund Size ($):
                    <input type="number" name="fund_size" value={inputs.fund_size} onChange={handleChange} />
                </label>
                <label>
                    Number of Startups:
                    <input type="number" name="num_startups" value={inputs.num_startups} onChange={handleChange} />
                </label>
                <label>
                    Reserve Percentage:
                    <input type="number" step="0.1" name="reserve_percent" value={inputs.reserve_percent} onChange={handleChange} />
                </label>
                <button type="submit">Calculate</button>
            </form>

            {results && (
                <div>
                    <h2>Results:</h2>
                    <p>Average Check Size: ${results.avg_check_size.toFixed(2)}</p>
                    <p>Initial Allocation: ${results.initial_allocation.toFixed(2)}</p>
                    <p>Follow-On Reserve: ${results.follow_on_reserve.toFixed(2)}</p>
                </div>
            )}
        </div>
    );
}

export default App;
