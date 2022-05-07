import React, { useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./board-card.css";

export default function BoardCard({ projectName, date, projectId }) {
  const { pathname } = useLocation();
  const [showCopied, setShowCopied] = useState(false);

  //   copy URLto clipboard
  const urlClickHandler = () => {
    navigator.clipboard.writeText(`${pathname}/${projectId}`);
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <div className="board-card">
      <Link to={`/publicdashboard/${projectId}`}>
        <div className="board-card-body">
          <h1 className="board-title mg-point6-bot">{projectName}</h1>
          <p className="board-date">{date}</p>
          <hr className="break-line" />
          <p className="p-md">Progress:</p>
          <div className="board-progress">
            <div className="board-progress-completed"></div>
          </div>
        </div>
      </Link>
      <hr className="break-line" />
      <div className="board-card-cta">
        {showCopied && <p className="copied-clipboard">Copied!</p>}
        <button onClick={urlClickHandler} className=" board-card-btn">
          URL
        </button>
        <button className="board-card-btn">Clone</button>
      </div>
    </div>
  );
}
