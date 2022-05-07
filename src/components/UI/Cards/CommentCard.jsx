import "./CommentCard.css";

export const CommentCard = ({ color }) => {
  return (
    <div className={`comment-card-wrapper ${color}`}>
      <i className="fas fa-ellipsis-v card-option-menu"></i>
      <p className="comment-card-text">
        Any comment/suggestion or what to improve
      </p>
      <div className="comment-card-buttons">
        <i className="far fa-thumbs-up thumb"></i>
        <i className="far fa-comment comment"></i>
      </div>
    </div>
  );
};
