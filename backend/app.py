from flask import Flask, request, jsonify
from flask_cors import CORS
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend integration

# Set up logging
logging.basicConfig(level=logging.INFO)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    try:
        # Parse and validate input data
        data = request.json
        if not data:
            return jsonify({"error": "No input data provided"}), 400

        fund_size = data.get('fund_size')
        num_startups = data.get('num_startups')
        reserve_percent = data.get('reserve_percent', 0.5)
        target_exit_multiple = data.get('target_exit_multiple', 3)
        success_rate = data.get('success_rate', 0.1)

        # Validate required fields
        if not fund_size or not num_startups:
            return jsonify({"error": "Fund size and number of startups are required"}), 400
        if not isinstance(fund_size, (int, float)) or not isinstance(num_startups, int):
            return jsonify({"error": "Invalid input types"}), 400
        if num_startups <= 0 or fund_size <= 0:
            return jsonify({"error": "Fund size and number of startups must be positive"}), 400

        # Perform calculations
        avg_check_size = fund_size / num_startups
        follow_on_reserve = fund_size * reserve_percent
        initial_allocation = fund_size - follow_on_reserve
        avg_exit_value = avg_check_size * target_exit_multiple
        expected_return = success_rate * avg_exit_value * num_startups
        portfolio_IRR = (expected_return - fund_size) / fund_size * 100  # Simplified IRR calculation

        # Log calculations
        logging.info(f"Calculations completed for fund_size={fund_size}, num_startups={num_startups}")

        # Return results
        return jsonify({
            "avg_check_size": round(avg_check_size, 2),
            "initial_allocation": round(initial_allocation, 2),
            "follow_on_reserve": round(follow_on_reserve, 2),
            "avg_exit_value": round(avg_exit_value, 2),
            "expected_return": round(expected_return, 2),
            "portfolio_IRR": round(portfolio_IRR, 2),
        })

    except Exception as e:
        logging.error(f"Error during calculation: {e}")
        return jsonify({"error": "An unexpected error occurred"}), 500


@app.route('/', methods=['GET'])
def index():
    return jsonify({
        "message": "Welcome to What's My Thesis API!",
        "routes": {
            "/api/calculate": "POST - Calculate portfolio metrics",
        }
    })


if __name__ == '__main__':
    app.run(debug=True)
