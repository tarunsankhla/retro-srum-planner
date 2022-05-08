import "./Publicboard.css";
import { NewComment, AddFeedback } from "components";
import { CommentCard } from "components";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { AnonymousUser } from "utils/boardService";
import { useAuth } from "context/AuthContext";
import { getProjectData } from "utils/boardService";

export const Publicboard = () => {
  const { userId, projectId } = useParams();
  const navigate = useNavigate();
  console.log(
    {
      userId,
      projectId,
    },
    useParams()
  );
  const { userState, userDispatch } = useAuth();
  const [project, setProject] = useState({});

  const [isModal, setIsModal] = useState(false);
  const [columnName, setColumnName] = useState("");

  const toggleModal = () => {
    setIsModal((isModal) => !isModal);
  };

  useEffect(() => {
    if (userState.token) {
      if (!userState.user.emailId) {
        AnonymousUser(userDispatch);
      } else {
        return;
      }
    } else {
      AnonymousUser(userDispatch);
    }
  }, []);

  useEffect(() => {
    getProjectData(setProject, userId, projectId, userState, navigate);
  }, [projectId, isModal]);

  return (
    <div className="publicboard-wrapper">
      {isModal && (
        <AddFeedback
          toggleModal={toggleModal}
          columnName={columnName}
          userId={userId}
          project={project}
          setProject={setProject}
        />
      )}
      <div className=" flex-row-center flex-justify-space-between pd-point8-lr mg-point6-bot">
        <h1 className="title-lg">{project?.title}</h1>
        <select className="publicboard-sorting">
          <option>Sort by date</option>
          <option>Sort by likes</option>
        </select>
      </div>
      <hr className="break-line" />
      <div className="publicboard-body">
        <div className="publicboard-wentwell">
          <h1 className="publicboard-title">{project?.column1?.name}</h1>
          <NewComment
            toggleModal={toggleModal}
            columnTitle={project?.column1?.name}
            setColumnName={setColumnName}
          />
          <div>
            {project?.column1?.feedbacks?.map((feedback) => (
              <CommentCard
                setProject={setProject}
                key={feedback.id}
                project={project}
                feedback={feedback}
                columnName={"column1"}
                color="went-well"
              />
            ))}
          </div>
        </div>
        <div className="publicboard-improve">
          <h1 className="publicboard-title">{project?.column2?.name}</h1>
          <NewComment
            toggleModal={toggleModal}
            columnTitle={project?.column2?.name}
            setColumnName={setColumnName}
          />
          <div>
            {project?.column2?.feedbacks?.map((feedback) => (
              <CommentCard
                setProject={setProject}
                key={feedback.id}
                feedback={feedback}
                columnName={"column2"}
                project={project}
                color="improve"
              />
            ))}
          </div>
        </div>
        <div className="publicboard-actions">
          <h1 className="publicboard-title">{project?.column3?.name}</h1>
          <NewComment
            toggleModal={toggleModal}
            columnTitle={project?.column3?.name}
            setColumnName={setColumnName}
          />
          <div>
            {project?.column3?.feedbacks?.map((feedback) => (
              <CommentCard
                setProject={setProject}
                feedback={feedback}
                key={feedback.id}
                columnName={"column3"}
                project={project}
                color="action"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
