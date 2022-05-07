import "./Publicboard.css";
import { AddFeedback, NewComment } from "components";
import { CommentCard } from "components";
import { firestore } from "firebase.config";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export const Publicboard = () => {
	const { userId, projectId } = useParams();

	console.log({ userId, projectId }, useParams());
	const [isModal, setIsModal] = useState(false);
	const [columnName, setColumnName] = useState("");

	const toggleModal = () => {
		setIsModal((isModal) => !isModal);
	};

	const [project, setProject] = useState({});

	const getProjectData = async () => {
		const userRef = doc(firestore, `users/${userId}`);
		try {
			const usersList = await getDoc(userRef);

			const [projectKey, project] = Object.entries(usersList.data()).find(
				([key, value]) => value.id === projectId
			);

			project.key = projectKey;
			setProject(project);
			console.log({ project });
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getProjectData();
	}, [projectId]);

	return (
		<div className="publicboard-wrapper">
			{isModal ? (
				<AddFeedback
					toggleModal={toggleModal}
					columnName={columnName}
					userId={userId}
					project={project}
				/>
			) : null}
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
						<CommentCard color="went-well" />
						<CommentCard color="went-well" />
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
						<CommentCard color="improve" />
						<CommentCard color="improve" />
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
						<CommentCard color="action" />
						<CommentCard color="action" />
						<CommentCard color="action" />
					</div>
				</div>
			</div>
		</div>
	);
};
