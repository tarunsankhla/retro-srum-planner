import "./CommentCard.css";

export const CommentCard = ({ color }) => {
  return (
    <div className={`comment-card-wrapper ${color}`}>
      <i class="fas fa-ellipsis-v card-option-menu"></i>
      <p className="comment-card-text">
        Any comment/suggestion or what to improve
      </p>
      <div className="comment-card-buttons">
        <i class="far fa-thumbs-up thumb"></i>
        <i class="far fa-comment comment"></i>
      </div>
    </div>
  );
};
