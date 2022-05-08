import { firestore } from "firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { useState, useEffect } from "react";
import { getProjectData } from "utils/boardService";
import "./addFeedback.css";
import { useAuth } from "context/AuthContext";
import { useNavigate } from "react-router";

export function AddFeedback({
  toggleModal,
  columnName,
  userId,
  project,
  setProject,
  isEdit = false,
  feedbackObj = { textField: "" },
}) {
  const initialFeedback = { text: feedbackObj.textField, name: columnName };
  const [feedback, setFeedBack] = useState(initialFeedback);
  const [error,setError] = useState("")
  const { userState } = useAuth();
  const navigate = useNavigate();

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

  const updateFeedback = (e) => {
    e.preventDefault();

    if(feedback.text.trim() === ""){
      setError("Please enter some comment");
      return 
    }else{
      setError("")
    }

    const columnNo = columnNumber();

    const doctoupdate = doc(firestore, `users/${userId}`);

    let columnUpdate = {
      ...project[columnNo],
      feedbacks: !isEdit
        ? [
            ...project[columnNo].feedbacks,
            { id: uuid(), textField: feedback.text, likes: 0, comments: [] },
          ]
        : [
            ...project[columnNo].feedbacks.map((currentFeedback) => {
              return currentFeedback.id === feedbackObj.id
                ? { ...currentFeedback, textField: feedback.text }
                : currentFeedback;
            }),
          ],
      name: columnName,
    };
    let updateObj = { [project.key]: { ...project, [columnNo]: columnUpdate } };

    updateDoc(doctoupdate, updateObj)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
      
      toggleModal();
  };

  useEffect(() => {
    getProjectData(setProject, userId, project.id, userState, navigate);
  }, [project.id]);

  return (
    <div className="addfeedback-container">
      <form
        onSubmit={(e) => {
          updateFeedback(e);
          toggleModal();
        }}
        className="addfeedback-modal"
      >
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
          {error && <span className="error-text">{error}</span>}
        </div>
        <div className="addfeedback-cta">
          <button
            className="btn primary-btn-md"
            onClick={(e) => {
              updateFeedback(e);
            }}
          >
            save
          </button>
          <button className="btn primary-outline-btn-md" onClick={toggleModal}>
            close
          </button>
        </div>
      </form>
    </div>
  );
}
