import { AddFeedback } from "components";
import { useAuth } from "context/AuthContext";
import { firestore } from "firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProjectData } from "utils/boardService";
import "./CommentCard.css";

export const CommentCard = ({
  color,
  feedback,
  project,
  columnName,
  setProject,
}) => {
  const { userState } = useAuth();
  const navigate = useNavigate();

  const { userId } = useParams();

  const [flag, setFlag] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);

  const toggleEdit = () => setIsEdit((s) => !s);

  const toggleFlag = () => {
    setFlag((f) => !f);
  };

  const updateLikes = (e) => {
    e.preventDefault();

    const doctoupdate = doc(firestore, `users/${userId}`);

    let columnUpdate = {
      ...project[columnName],
      feedbacks: [
        ...project[columnName].feedbacks.map((currfeedback) =>
          currfeedback.id === feedback.id
            ? { ...currfeedback, likes: currfeedback.likes + 1 }
            : currfeedback
        ),
      ],
    };

    let updateObj = {
      [project.key]: { ...project, [columnName]: columnUpdate },
    };

    updateDoc(doctoupdate, updateObj)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      toggleFlag();
    }, 100);
  };

  const deleteComment = (e) => {
    e.preventDefault();

    if (
      userState.user.userId !== feedback.userId &&
      userState.user.userId !== userId
    ) {
      alert("you are not valid to enter");
      return;
    }

    const doctoupdate = doc(firestore, `users/${userId}`);
    let columnUpdate = {
      ...project[columnName],
      feedbacks: [
        ...project[columnName].feedbacks.filter(
          (currfeedback) => currfeedback.id !== feedback.id
        ),
      ],
    };

    let updateObj = {
      [project.key]: { ...project, [columnName]: columnUpdate },
    };

    updateDoc(doctoupdate, updateObj)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });

    setTimeout(() => {
      toggleFlag();
    }, 200);
  };

  const editComment = (e) => {
    setIsEdit((s) => !s);
  };

  const addNewCommentHandler = (e) => {
    setShowCommentBox(true);
  };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getProjectData(setProject, userId, project.id, userState, navigate);
  }, [flag, isEdit]);

  return (
    <div className={`comment-card-wrapper ${color}`}>
      <i class="far fa-trash-alt trash" onClick={deleteComment}></i>
      <p className="comment-card-text">{feedback?.textField}</p>
      {showCommentBox && (
        <form
          onSubmit={(e) => commentSubmitHandler(e)}
          className="comment-card-comments"
        >
          <textarea
            className="comment-textarea"
            type="text"
            name="text"
            placeholder="comments"
          />
          <div className="comment-cta-buttons">
            <button
              onClick={() => setShowCommentBox(false)}
              className="btn secondary-outline-btn-sm"
            >
              Cancel
            </button>
            <button type="submit" className="btn primary-btn-sm">
              Post
            </button>
          </div>
        </form>
      )}

      <div className="comment-card-buttons">
        {feedback.likes}
        <i onClick={updateLikes} className="far fa-thumbs-up thumb"></i>
        <i
          onClick={(e) => {
            addNewCommentHandler(e);
          }}
          className="far fa-comment comment"
        ></i>
        <i className="fas fa-pen pen-edit" onClick={editComment}></i>
      </div>
      {isEdit && (
        <AddFeedback
          toggleModal={toggleEdit}
          columnName={project[columnName].name}
          userId={userId}
          project={project}
          isEdit={isEdit}
          feedbackObj={feedback}
          setProject={setProject}
        />
      )}
    </div>
  );
};
