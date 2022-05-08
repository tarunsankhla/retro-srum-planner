import { firestore } from "firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import { getProjectData } from "utils/boardService";
import "./addFeedback.css";

export function AddFeedback({
  toggleModal,
  columnName,
  userId,
  project,
  setProject,
}) {
  const [feedback, setFeedBack] = useState({ text: "", name: columnName });

  const columnNumber = () => {
    if (project.column1.name === columnName) {
      return "column1";
    } else if (project.column2.name === columnName) {
      return "column2";
    } else if (project.column3.name === columnName) {
      return "column3";
    }
  };

  const feedbackInputHandler = (e) => {
    setFeedBack((prevFeedback) => ({
      ...prevFeedback,
      [e.target.name]: e.target.value,
      name: columnName,
    }));
  };

  const updateFeedback = () => {
    // console.log(feedback);
    const columnNo = columnNumber();

    const doctoupdate = doc(firestore, `users/${userId}`);

    let columnUpdate = {
      ...project[columnNo],
      feedbacks: [
        ...project[columnNo].feedbacks,
        { id: uuid(), textField: feedback.text, likes: 0, comments: [] },
      ],
      name: columnName,
    };
    let updateObj = { [project.key]: { ...project, [columnNo]: columnUpdate } };

    updateDoc(doctoupdate, updateObj)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log("updated prject data");
    getProjectData(setProject, userId, project.id);
  }, [project.id]);

  return (
    <div className="addfeedback-container">
      <div className="addfeedback-modal">
        <div className="addfeedback-input-wrapper">
          <label className="addfeedback-input-label" htmlFor="comments">
            Column Name: {columnName === "" ? "Column Title" : columnName}
          </label>
          <input
            id="comments"
            className="addfeedback-input"
            onChange={feedbackInputHandler}
            name="text"
            type="text"
            value={feedback.text}
          />
        </div>
        <div className="addfeedback-cta">
          <button
            className="btn primary-btn-md"
            onClick={() => {
              updateFeedback();
              toggleModal();
            }}
          >
            save
          </button>
          <button className="btn primary-outline-btn-md" onClick={toggleModal}>
            close
          </button>
        </div>
      </div>
    </div>
  );
}
