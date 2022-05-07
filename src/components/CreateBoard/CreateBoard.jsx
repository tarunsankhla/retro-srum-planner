import React, { useContext, useEffect, useState } from "react";
import "./createboard.css";
import { v4 as uuid } from "uuid";
import { firestore, collection } from "firebase.config";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "context/AuthContext";
import { useDashboard } from "context/DashboardContext";

const initialBoardObject = {
  title: "",
  date: new Date(),
  maxVotes: 5,
  column1: {
    name: "Good features",
    feedbacks: [
      { textField: "comment 1", likes: 5, comments: ["hello", "there"] },
    ],
  },
  column2: {
    name: "Improvements",
    feedbacks: [
      { textField: "comment 1", likes: 5, comments: ["there", "asdljf"] },
    ],
  },
  column3: {
    name: "Add Features",
    feedbacks: [
      { textField: "comment 1", likes: 5, comments: ["thsdfere", "sjdlfj"] },
    ],
  },
};

// const

export function CreateBoard({ toggle }) {
  const [boardObject, setBoardObject] = useState(initialBoardObject);
  const { userState } = useAuth();
  const { dashboard, setUpdateData } = useDashboard();

  const changeHandler = (e) => {
    if (
      e.target.name === "column1" ||
      e.target.name === "column2" ||
      e.target.name === "column3"
    ) {
      let value = {
        name: e.target.value,
        feedbacks: [],
      };
      setBoardObject((boardObj) => ({
        ...boardObj,
        [e.target.name]: value,
      }));
      return;
    } else {
      setBoardObject((boardObj) => ({
        ...boardObj,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const addBoard = async () => {
    boardObject.expiryTime = 30;
    boardObject.userId = userState.user.userId;
    boardObject.id = uuid();
    // const collectionReference = collection(firestore, `users/`);
    const userRef = doc(firestore, `users/${userState.user.userId}`);
    try {
      const response = await setDoc(userRef, {
        ...dashboard,
        [uuid()]: boardObject,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setUpdateData((update) => !update);
  };

  return (
    <div className="createboard-container" onClick={toggle}>
      <div className="createboard-modal" onClick={(e) => e.stopPropagation()}>
        <div className="createboard-title">Create Dashboard</div>
        <div className="createboard-input-wrapper">
          <label htmlFor="" className="createboard-input-label">
            Title
          </label>
          <input
            name="title"
            onChange={changeHandler}
            value={boardObject.title}
            type="text"
            className="createboard-input"
          />
        </div>
        <div className="createboard-input-wrapper">
          <label htmlFor="" className="createboard-input-label">
            Max votes
          </label>
          <input
            name="maxVotes"
            onChange={changeHandler}
            value={boardObject.maxVotes}
            type="number"
            className="createboard-input"
          />
        </div>
        <span className="createboard-input-label">Review Columns</span>
        <div className="createboard-input-wrapper">
          <input
            name="column1"
            onChange={changeHandler}
            value={boardObject.column1.name}
            type="text"
            className="createboard-input"
            placeholder="Enter column name: (default: Good features)"
          />
        </div>
        <div className="createboard-input-wrapper">
          <input
            name="column2"
            onChange={changeHandler}
            value={boardObject.column2.name}
            type="text"
            className="createboard-input"
            placeholder="Enter column name: (default: Improvements)"
          />
        </div>
        <div className="createboard-input-wrapper">
          <input
            name="column3"
            onChange={changeHandler}
            value={boardObject.column3.name}
            type="text"
            className="createboard-input"
            placeholder="Enter column name: (default: Add features or Changes)"
          />
        </div>
        <div className="createboard-cta">
          <button className="btn primary-btn-md" onClick={addBoard}>
            Add
          </button>
          <button onClick={toggle} className="btn primary-outline-btn-md">
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
