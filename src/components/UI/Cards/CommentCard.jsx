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

	const toggleEdit = () => setIsEdit(s => !s)

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

	const deleteComment = (e)=>{
		e.preventDefault();
		
		if(userState.user.userId !== feedback.userId && userState.user.userId !== userId){
			alert("you are not valid to enter");
			return
		  }

		const doctoupdate = doc(firestore, `users/${userId}`);
		let columnUpdate = {
			...project[columnName],
			feedbacks: [
				...project[columnName].feedbacks.filter((currfeedback) =>
					currfeedback.id !== feedback.id
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
	}

	const editComment = (e) =>{
		setIsEdit(s => !s)
	}

	useEffect(() => {
		getProjectData(setProject, userId, project.id, userState, navigate);
	}, [flag,isEdit]);

	return (
		<div className={`comment-card-wrapper ${color}`}>
			<i className="fas fa-ellipsis-v card-option-menu" onClick={editComment}></i>
			<p className="comment-card-text">{feedback?.textField}</p>
			<div className="comment-card-buttons">
				{feedback.likes}
				<i onClick={updateLikes} className="far fa-thumbs-up thumb"></i>
				<i className="far fa-comment comment"></i>
				<i class="fas fa-trash" onClick={deleteComment}></i>
			</div>
			{isEdit && <AddFeedback
			toggleModal={toggleEdit}
			columnName={project[columnName].name}
			userId={userId}
			project={project}
			isEdit={isEdit}
			feedbackObj={feedback}
			setProject={setProject}/>}
		</div>
	);
};
