import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Chart from "chart.js/auto";

function ChartContainer({ title, type, data, options }) {
    const chartRef = useRef(null); // Reference to the canvas element
    let chartInstance = null; // Store the Chart.js instance

    useEffect(() => {
        if (chartRef.current) {
            // Destroy previous chart instance to avoid duplicates
            if (chartInstance) {
                chartInstance.destroy();
            }

            // Create the chart
            chartInstance = new Chart(chartRef.current, {
                type: type,
                data: data,
                options: options,
            });
        }

        // Cleanup on component unmount
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [type, data, options]); // Re-run if props change

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                {title && <h5 className="card-title text-center mb-4">{title}</h5>}
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}

// Prop types validation
ChartContainer.propTypes = {
    title: PropTypes.string, // Title displayed above the chart
    type: PropTypes.oneOf(["line", "bar", "pie", "doughnut", "radar", "polarArea"]), // Chart type
    data: PropTypes.object.isRequired, // Chart.js data object
    options: PropTypes.object, // Chart.js options object
};

ChartContainer.defaultProps = {
    title: "",
    options: {},
};

export default ChartContainer;
