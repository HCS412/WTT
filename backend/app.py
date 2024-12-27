from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/api/calculate', methods=['POST'])
def calculate():
    data = request.json
    fund_size = data.get('fund_size', 0)
    num_startups = data.get('num_startups', 1)
    reserve_percent = data.get('reserve_percent', 0.5)

    avg_check_size = fund_size / num_startups
    follow_on_reserve = fund_size * reserve_percent
    initial_allocation = fund_size - follow_on_reserve

    return jsonify({
        "avg_check_size": avg_check_size,
        "initial_allocation": initial_allocation,
        "follow_on_reserve": follow_on_reserve
    })

if __name__ == '__main__':
    app.run(debug=True)
