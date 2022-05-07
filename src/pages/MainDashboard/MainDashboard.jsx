import { CreateBoard } from "components";
import BoardCard from "components/BoardCard/BoardCard";
import React, { useState } from "react";
import "./MainDashboard.css";

export const MainDashboard = () => {

    const [isModal,setIsModal] = useState(false);

    const toggleModal = () => {
        setIsModal(s=>!s)
    }

    return (
        <div className="dashboard-container">
            <button className="dashboard-create-board" onClick={toggleModal}>
                <div className="dash-create-icon">+</div>
                Add board
            </button>
            <BoardCard />
            {isModal && <CreateBoard toggle={toggleModal}/>}
        </div>
    );
};
