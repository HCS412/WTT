<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - What's My Thesis?</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>
    <header class="bg-primary text-white text-center py-4">
        <h1>Dashboard</h1>
        <p>Your VC/PE Portfolio Insights</p>
    </header>

    <main class="container mt-5">
        <!-- Key Metrics Overview -->
        <div class="row text-center">
            <div class="col-md-3 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Average Check Size</h5>
                        <h3 id="avgCheckSize" class="text-primary">$0</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Initial Allocation</h5>
                        <h3 id="initialAllocation" class="text-success">$0</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Follow-On Reserve</h5>
                        <h3 id="followOnReserve" class="text-warning">$0</h3>
                    </div>
                </div>
            </div>
            <div class="col-md-3 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Portfolio IRR</h5>
                        <h3 id="portfolioIRR" class="text-danger">0%</h3>
                    </div>
                </div>
            </div>
        </div>

        <!-- Charts Section -->
        <div class="row">
            <div class="col-md-6 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Portfolio Allocation</h5>
                        <canvas id="allocationChart"></canvas>
                    </div>
                </div>
            </div>
            <div class="col-md-6 mb-4">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Expected Returns</h5>
                        <canvas id="returnsChart"></canvas>
                    </div>
                </div>
            </div>
        </div>

        <!-- Saved Portfolios Section -->
        <div class="row">
            <div class="col-12">
                <div class="card shadow-sm">
                    <div class="card-body">
                        <h5 class="card-title">Saved Portfolios</h5>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Fund Size</th>
                                    <th>Startups</th>
                                    <th>Reserve (%)</th>
                                    <th>IRR (%)</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody id="savedPortfolios">
                                <!-- Dynamic Rows -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-dark text-white text-center py-3 mt-5">
        <p>&copy; 2024 What's My Thesis? - All rights reserved.</p>
    </footer>

    <script>
        // Example Data for Demo
        const metrics = {
            avgCheckSize: 1000000,
            initialAllocation: 7000000,
            followOnReserve: 3000000,
            portfolioIRR: 25
        };

        const savedPortfolios = [
            { id: 1, fundSize: "$10,000,000", startups: 10, reserve: "30%", irr: "25%" },
            { id: 2, fundSize: "$20,000,000", startups: 15, reserve: "40%", irr: "28%" },
        ];

        // Update Metrics
        document.getElementById("avgCheckSize").textContent = `$${metrics.avgCheckSize.toLocaleString()}`;
        document.getElementById("initialAllocation").textContent = `$${metrics.initialAllocation.toLocaleString()}`;
        document.getElementById("followOnReserve").textContent = `$${metrics.followOnReserve.toLocaleString()}`;
        document.getElementById("portfolioIRR").textContent = `${metrics.portfolioIRR}%`;

        // Populate Saved Portfolios Table
        const savedPortfoliosTable = document.getElementById("savedPortfolios");
        savedPortfolios.forEach((portfolio) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${portfolio.id}</td>
                <td>${portfolio.fundSize}</td>
                <td>${portfolio.startups}</td>
                <td>${portfolio.reserve}</td>
                <td>${portfolio.irr}</td>
                <td>
                    <button class="btn btn-sm btn-info">Edit</button>
                    <button class="btn btn-sm btn-danger">Delete</button>
                </td>
            `;
            savedPortfoliosTable.appendChild(row);
        });

        // Render Allocation Chart
        const allocationChartCtx = document.getElementById("allocationChart").getContext("2d");
        new Chart(allocationChartCtx, {
            type: "pie",
            data: {
                labels: ["Initial Allocation", "Follow-On Reserve"],
                datasets: [{
                    data: [metrics.initialAllocation, metrics.followOnReserve],
                    backgroundColor: ["#36A2EB", "#FF6384"]
                }]
            }
        });

        // Render Returns Chart
        const returnsChartCtx = document.getElementById("returnsChart").getContext("2d");
        new Chart(returnsChartCtx, {
            type: "bar",
            data: {
                labels: ["3x", "5x", "10x"],
                datasets: [{
                    label: "Expected Returns ($)",
                    data: [metrics.avgCheckSize * 3, metrics.avgCheckSize * 5, metrics.avgCheckSize * 10],
                    backgroundColor: "#4CAF50"
                }]
            },
            options: {
                scales: {
                    x: { title: { display: true, text: "Exit Multiples" } },
                    y: { title: { display: true, text: "Expected Returns ($)" }, beginAtZero: true }
                }
            }
        });
    </script>
</body>
</html>
