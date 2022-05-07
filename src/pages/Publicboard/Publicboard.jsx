import "./Publicboard.css";
import {NewComment} from "components";
import {CommentCard} from "components";
import {firestore} from "firebase.config";
import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {doc, getDoc} from "firebase/firestore";
import {ROUTES} from "utils/routes";
import {AnonymousUser} from "utils/boardService";
import {useAuth} from "context/AuthContext";

export const Publicboard = () => {
    const {userId, projectId} = useParams();
    console.log({
        userId,
        projectId
    }, useParams());
    const {userState, userDispatch} = useAuth();
    const [project, setProject] = useState({});

    const getProjectData = async () => {
        const userRef = doc(firestore, `users/${userId}`);
        try {
            const usersList = await getDoc(userRef);

            const project = Object.values(usersList.data()).find((project) => project.id === projectId);
            setProject(project);
        } catch (error) {
            console.log(error);
        }
    };

	useEffect(() => {
		if (!!localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN)) {
            var user = localStorage.getItem(ROUTES.VAR_ENCODE_TOKEN)?.user?.emailId
            if (! user) {
                AnonymousUser(userDispatch);
            }
        }
    }, []);

    useEffect(() => {
        getProjectData();
    }, [projectId]);

    return (
        <div className="publicboard-wrapper">
            <div className=" flex-row-center flex-justify-space-between pd-point8-lr mg-point6-bot">
                <h1 className="title-lg">
                    {
                    project?.title
                }</h1>
                <select className="publicboard-sorting">
                    <option>Sort by date</option>
                    <option>Sort by likes</option>
                </select>
            </div>
            <hr className="break-line"/>
            <div className="publicboard-body">
                <div className="publicboard-wentwell">
                    <h1 className="publicboard-title">
                        {
                        project?.column1?.name
                    }</h1>
                    <NewComment/>
                    <div>
                        <CommentCard color="went-well"/>
                        <CommentCard color="went-well"/>
                    </div>
                </div>
                <div className="publicboard-improve">
                    <h1 className="publicboard-title">
                        {
                        project?.column2?.name
                    }</h1>
                    <NewComment/>
                    <div>
                        <CommentCard color="improve"/>
                        <CommentCard color="improve"/>
                    </div>
                </div>
                <div className="publicboard-actions">
                    <h1 className="publicboard-title">
                        {
                        project?.column3?.name
                    }</h1>
                    <NewComment/>
                    <div>
                        <CommentCard color="action"/>
                        <CommentCard color="action"/>
                        <CommentCard color="action"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
