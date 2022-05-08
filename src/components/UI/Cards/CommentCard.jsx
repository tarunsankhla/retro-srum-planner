import { firestore } from "firebase.config";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProjectData } from "utils/boardService";
import "./CommentCard.css";

export const CommentCard = ({
	color,
	feedback,
	project,
	columnName,
	setProject,
}) => {
	console.log(feedback, "feedback");

	const { userId } = useParams();

	const [flag, setFlag] = useState(false);

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

	useEffect(() => {
		getProjectData(setProject, userId, project.id);
	}, [flag]);

	return (
		<div className={`comment-card-wrapper ${color}`}>
			<i className="fas fa-ellipsis-v card-option-menu"></i>
			<p className="comment-card-text">{feedback?.textField}</p>
			<div className="comment-card-buttons">
				{feedback.likes}
				<i onClick={updateLikes} className="far fa-thumbs-up thumb"></i>
				<i className="far fa-comment comment"></i>
			</div>
		</div>
	);
};
