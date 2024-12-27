import React from "react";
import PropTypes from "prop-types";

function MetricCard({ label, value, icon, color }) {
    return (
        <div className={`card shadow-sm text-center border-0`}>
            <div className="card-body">
                {/* Icon */}
                {icon && (
                    <div
                        className={`mb-3 rounded-circle d-inline-flex justify-content-center align-items-center`}
                        style={{
                            width: "60px",
                            height: "60px",
                            backgroundColor: color || "#f5f5f5",
                        }}
                    >
                        <i className={`bi ${icon}`} style={{ fontSize: "24px", color: color || "#000" }}></i>
                    </div>
                )}

                {/* Label */}
                <h5 className="card-title text-muted">{label}</h5>

                {/* Value */}
                <h3 className="card-text fw-bold" style={{ color: color || "#333" }}>
                    {value}
                </h3>
            </div>
        </div>
    );
}

// Prop types validation
MetricCard.propTypes = {
    label: PropTypes.string.isRequired, // Label of the metric (e.g., "Average Check Size")
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Metric value
    icon: PropTypes.string, // Optional icon (e.g., "bi-cash" for Bootstrap icons)
    color: PropTypes.string, // Optional custom color for the metric
};

MetricCard.defaultProps = {
    icon: null,
    color: "#007bff", // Default color (Bootstrap Primary Blue)
};

export default MetricCard;
