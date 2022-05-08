import { CreateBoard } from "components";
import BoardCard from "components/BoardCard/BoardCard";
import React, { useEffect, useState } from "react";
import { useDashboard } from "context/DashboardContext";
import "./MainDashboard.css";
import { getBoardData, getProjectData } from "utils/boardService";
import { useAuth } from "context/AuthContext";

export const MainDashboard = () => {
  const [isModal, setIsModal] = useState(false);
  const { dashboard, setDashboard } = useDashboard();
  const { userState, userDispatch } = useAuth();

  const toggleModal = () => {
    setIsModal((s) => !s);
  };
  useEffect(() => {
    getBoardData(setDashboard,userState.user.userId);
  },[])

  return (
    <div className="dashboard-container">
      <button className="dashboard-create-board" onClick={toggleModal}>
        <div className="dash-create-icon">+</div>
        Add board
      </button>
      {Object.entries(dashboard).map(([key, data]) => (
        <BoardCard
          key={key}
          projectName={data.title}
          date={data.expiryTime}
          projectId={data.id}
        />
      ))}
      {isModal && <CreateBoard toggle={toggleModal} />}
    </div>
  );
};
