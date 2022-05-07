import React from "react";
import "./board-card.css";

export default function BoardCard() {
    return (
        <div className="board-card">
            <div className="board-title">My first card</div>
            <div className="board-date">6th May</div>
            <hr />
            Progress:
            <div className="board-progress">
                <div className="board-progress-completed">

                </div>
            </div>
            <hr />
            <div className="board-card-cta">
                <button className="board-card-btn">URL</button>
                <button className="board-card-btn">Clone</button>
            </div>
        </div>
    );
}
