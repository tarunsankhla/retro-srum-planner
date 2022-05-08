import { AddFeedback } from "components";
import { useAuth } from "context/AuthContext";
import { firestore } from "firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getProjectData } from "utils/boardService";
import "./CommentCard.css";
import { v4 as uuid } from "uuid";

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
  const [showCommentBox, setShowCommentBox] = useState(false); // By saurabh
  const [isComment, setIsComment] = useState(false);
  const [commentText, setCommentText] = useState("");

  const [isCommentEditable, setIsCommentEditabe] = useState({
    commentId: "",
    commentText: "",
  });

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
    }, 200);
  };

  const deleteFeedback = (e) => {
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

  const editFeedback = (e) => {
    setIsEdit((s) => !s);
  };

  const toggleComment = () => {
    setIsComment((flag) => !flag);
  };

  const addComment = (e) => {
    e.preventDefault();
    const doctoupdate = doc(firestore, `users/${userId}`);

    const currentComment = {
      id: uuid(),
      userId: userState.user.userId,
      text: commentText,
    };

    let columnUpdate = {
      ...project[columnName],
      feedbacks: [
        ...project[columnName].feedbacks.map((currfeedback) =>
          currfeedback.id === feedback.id
            ? {
                ...currfeedback,
                comments: [...currfeedback.comments, currentComment],
              }
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
    }, 200);
    setCommentText("");
  };

  const deleteComment = (deleteId, commentUserId) => {
    if (
      userState.user.userId !== commentUserId &&
      userState.user.userId !== userId
    ) {
      alert("you are not valid uuser to delete");
      return;
    }

    const doctoupdate = doc(firestore, `users/${userId}`);

    let columnUpdate = {
      ...project[columnName],
      feedbacks: [
        ...project[columnName].feedbacks.map((currfeedback) =>
          currfeedback.id === feedback.id
            ? {
                ...currfeedback,
                comments: currfeedback.comments.filter(
                  (comment) => comment.id !== deleteId
                ),
              }
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
    }, 200);
  };

  const editComment = (editComment, e) => {
    e.preventDefault();
    if (
      userState.user.userId !== editComment.userId &&
      userState.user.userId !== userId
    ) {
      alert("you are not valid to edit comment");

      setIsCommentEditabe((s) => ({ ...s, commentId: "", commentText: "" }));
      return;
    }
    const doctoupdate = doc(firestore, `users/${userId}`);

    let columnUpdate = {
      ...project[columnName],
      feedbacks: [
        ...project[columnName].feedbacks.map((currfeedback) =>
          currfeedback.id === feedback.id
            ? {
                ...currfeedback,
                comments: currfeedback.comments.map((comment) =>
                  comment.id === editComment.id
                    ? { ...comment, text: isCommentEditable.commentText }
                    : comment
                ),
              }
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
    }, 200);

    setIsCommentEditabe((s) => ({ ...s, commentId: "", commentText: "" }));
  };

  useEffect(() => {
    getProjectData(setProject, userId, project.id, userState, navigate);
  }, [flag, isEdit]);

  return (
    <div className={`comment-card-wrapper ${color}`}>
      <i class="far fa-trash-alt trash" onClick={deleteFeedback}></i>
      <p className="comment-card-text">{feedback?.textField}</p>

      {isComment && (
        <form onSubmit={addComment} className="comment-card-comments">
          <textarea
            className="comment-textarea"
            type="text"
            name="text"
            placeholder="comments"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <div className="comment-cta-buttons">
            <button
              onClick={toggleComment}
              className="btn secondary-outline-btn-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn primary-btn-sm"
              onClick={addComment}
            >
              Post
            </button>
          </div>
        </form>
      )}

      <div className="comment-card-buttons">
        {feedback.likes}
        <i onClick={updateLikes} className="far fa-thumbs-up thumb"></i>
        {feedback.comments.length}
        <i onClick={toggleComment} className="far fa-comment comment"></i>
        <i className="fas fa-pen pen-edit" onClick={editFeedback}></i>
      </div>

      {isComment &&
        feedback.comments.map((comment) => {
          return isCommentEditable.commentId !== comment.id ? (
            <div key={comment.id}>
              {comment.text}
              <button
                onClick={() =>
                  setIsCommentEditabe({
                    commentId: comment.id,
                    commentText: comment.text,
                  })
                }
              >
                edit
              </button>
              <button onClick={() => deleteComment(comment.id, comment.userId)}>
                delete
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => editComment(comment, e)}
              className="comment-card-comments"
            >
              <textarea
                className="comment-textarea"
                type="text"
                name="text"
                placeholder="comments"
                value={isCommentEditable.commentText}
                onChange={(e) =>
                  setIsCommentEditabe((prevObj) => ({
                    ...prevObj,
                    commentText: e.target.value,
                  }))
                }
              />
              <div className="comment-cta-buttons">
                <button
                  onClick={() =>
                    setIsCommentEditabe((s) => ({
                      ...s,
                      commentId: "",
                      commentText: "",
                    }))
                  }
                  className="btn secondary-outline-btn-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn primary-btn-sm"
                  onClick={(e) => editComment(comment, e)}
                >
                  Post
                </button>
              </div>
            </form>
          );
        })}
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
