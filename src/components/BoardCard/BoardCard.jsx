import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./board-card.css";
import { useAuth } from "context/AuthContext";
import { useDashboard } from "context/DashboardContext";
import { cloneProject, deleteProject } from "utils/boardService";

export default function BoardCard({
  Projectkey,
  projectName,
  date,
  createdOn,
  projectId,
  boardData,
  randtoggle,
}) {
  const [showCopied, setShowCopied] = useState(false);
  const { userState } = useAuth();
  const { dashboard } = useDashboard();
  const {
    userState: {
      user: { userId },
    },
  } = useAuth();

  // copy URLto clipboard
  const urlClickHandler = () => {
    navigator.clipboard.writeText(
      `retroplanner.netlify.app/publicdashboard/${userId}/${projectId}`
    );
    setShowCopied(true);
    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  const cloneClickHandler = () => {
    let boardObj = {
      ...boardData,
    };
    cloneProject(boardObj, userState.user.userId, dashboard);
    randtoggle((prev) => !prev);
  };

  const deleteProjectHandler = (projectkey) => {
    deleteProject(userState.user.userId, projectkey);
    randtoggle((prev) => !prev);
  };
  const getDate = () => {
    let start = boardData.createdTime;
    let end = new Date().getTime();

    let diff = end - start;
    let seconds = Math.floor(diff / 1000 / 60);
    if (seconds > boardData.expiryTime) {
      return `Already Expired`;
    }
    return `Expiry in ${date}mins`;
  };
  return (
    <div className="board-card">
      <Link to={`/publicdashboard/${userId}/${projectId}`}>
        <div className="board-card-body">
          <h1 className="board-title mg-point6-bot">{projectName}</h1>
          <p className="board-date">{getDate()}</p>
          <p className="board-date">{createdOn}</p>
        </div>
      </Link>
      <hr className="break-line" />
      <div className="board-card-cta">
        {showCopied && <p className="copied-clipboard">Copied!</p>}
        <button onClick={urlClickHandler} className=" board-card-btn">
          URL
        </button>
        <button
          className="btn icon-btn-md abslt-btn"
          onClick={() => deleteProjectHandler(Projectkey)}
        >
          <i className="far fa-trash-alt"></i>
        </button>
        <button className="board-card-btn" onClick={cloneClickHandler}>
          Clone
        </button>
      </div>
    </div>
  );
}
