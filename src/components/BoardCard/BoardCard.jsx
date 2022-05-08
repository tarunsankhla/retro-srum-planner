import React, {useState} from "react";
import {useLocation} from "react-router";
import {Link} from "react-router-dom";
import {v4 as uuid} from "uuid";
import {firestore} from "firebase.config";
import {deleteField, doc, setDoc, updateDoc} from "firebase/firestore";
import "./board-card.css";
import {useAuth} from "context/AuthContext";
import {useDashboard} from "context/DashboardContext";
import {cloneProject, deleteProject} from "utils/boardService";

export default function BoardCard({
    Projectkey,
    projectName,
    date,
    createdOn,
    projectId,
    boardData,
    randtoggle
}) {
    const {pathname} = useLocation();
    const [showCopied, setShowCopied] = useState(false);
    const {userState} = useAuth();
    const {dashboard, setUpdateData} = useDashboard();
    console.log(Projectkey)
    const {
        userState: {
            user: {
                userId
            }
        }
    } = useAuth();

    // copy URLto clipboard
    const urlClickHandler = () => {
        navigator.clipboard.writeText(`retroplanner.netlify.app/publicdashboard/${userId}/${projectId}`);
        setShowCopied(true);
        setTimeout(() => {
            setShowCopied(false);
        }, 2000);
    };

    const cloneClickHandler = () => {
        console.log(boardData);
        let boardObj = {
            ...boardData
        }
        cloneProject(boardObj, userState.user.userId, dashboard);
        randtoggle(prev => !prev);
    }

    const deleteProjectHandler = (projectkey) => {
        // console.log(userState.user.userId)
        // const deleteRef = doc(firestore, `users/${userState.user.userId}`);
        // try {
        //     await updateDoc(deleteRef, {[projectkey]: deleteField()})
        //     console.log("delete", projectkey);
        // } catch (err) {
        //       console.log(err);
        // }
        deleteProject(userState.user.userId, projectkey)
        randtoggle(prev => !prev);
    }
    return (
        <div className="board-card">
            <Link to={
                `/publicdashboard/${userId}/${projectId}`
            }>
                <div className="board-card-body">
                    <h1 className="board-title mg-point6-bot">
                        {projectName}</h1>
                    <p className="board-date">Expiry in {date}
                        mins
                    </p>
                    <p className="board-date">
                        {createdOn}</p>
                    {/* <hr className="break-line" /> */}
                    {/* <p className="p-md"></p> */}
                    {/* <div className="board-progress">
            <div className="board-progress-completed"></div>
          </div> */} </div>
            </Link>
            <hr className="break-line"/>
            <div className="board-card-cta">
                {
                showCopied && <p className="copied-clipboard">Copied!</p>
            }
                <button onClick={urlClickHandler}
                    className=" board-card-btn">
                    URL
                </button>
                <button className="btn icon-btn-md abslt-btn"
                    onClick={
                        () => deleteProjectHandler(Projectkey)
                }>
                    <i className="far fa-trash-alt"></i>
                </button>
                <button className="board-card-btn"
                    onClick={cloneClickHandler}>Clone</button>
            </div>
        </div>
    );
}
