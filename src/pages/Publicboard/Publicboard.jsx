import "./Publicboard.css";
import { NewComment } from "components";
import { CommentCard } from "components";

export const Publicboard = () => {
  return (
    <div className="publicboard-wrapper">
      <div className=" flex-row-center flex-justify-space-between pd-point8-lr mg-point6-bot">
        <h1 className="title-lg">Project Title/ Name</h1>
        <select className="publicboard-sorting">
          <option>Sort by date</option>
          <option>Sort by likes</option>
        </select>
      </div>
      <hr className="break-line" />
      <div className="publicboard-body">
        <div className="publicboard-wentwell">
          <h1 className="publicboard-title">What went well</h1>
          <NewComment />
          <div>
            <CommentCard color="went-well" />
            <CommentCard color="went-well" />
          </div>
        </div>
        <div className="publicboard-improve">
          <h1 className="publicboard-title">What to Improve</h1>
          <NewComment />
          <div>
            <CommentCard color="improve" />
            <CommentCard color="improve" />
          </div>
        </div>
        <div className="publicboard-actions">
          <h1 className="publicboard-title">Action Items</h1>
          <NewComment />
          <div>
            <CommentCard color="action" />
            <CommentCard color="action" />
            <CommentCard color="action" />
          </div>
        </div>
      </div>
    </div>
  );
};
