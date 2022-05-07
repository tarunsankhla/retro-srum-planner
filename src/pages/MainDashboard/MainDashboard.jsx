import BoardCard from "components/BoardCard/BoardCard";
import React from "react";
import "./MainDashboard.css";

export const MainDashboard = () => {
    return (
        <div className="dashboard-container">
            <button className="dashboard-create-board">
                <div className="dash-create-icon">+</div>
                Add board
            </button>
            <BoardCard/>
        </div>
    );
};
