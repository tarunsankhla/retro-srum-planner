import { firestore, firebaseAuth, signInAnonymously } from "firebase.config";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";
import { useAuth } from "context/AuthContext";

function updateBoardData(boarddata, userId, projectId) {
    const doctoupdate = doc(firestore, `users/${userId}`, projectId);
    // {
    //     column1: { 
    //         Like: 2,
    //     }
    //     name: ""
    // }
    updateDoc(doctoupdate, boarddata)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}

// function deleteBoardDataComments(comment,userId,projectId) {
//     const doctoupdate = doc(firestore, `users/${userId}`,projectId);
// [1,2,3,4].filter(i > i!==1)
//     updateDoc(doctoupdate, { boarddata })
//       .then((res) => {
//         console.log(res);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
// }

function deleteProject(userId, projectId) {
    const doctoupdate = doc(firestore, `users/${userId}`);
    updateDoc(doctoupdate, {
        projectId: deleteField()
    }).then((resp) =>
        console.log(resp)).catch(err => { console.log(err) })


}

function AnonymousUser(userDispatch) {
    console.log("anonymous");
    signInAnonymously(firebaseAuth)
        .then((response) => {
            console.log(response);
            // Signed in..
            userDispatch({
                type: "userauth",
                token: response?.user?.accessToken ?? "",
                name: "Anonymous",
                emailId: response?.user?.email ?? "",
                userId: response?.user?.uid ?? "",
                photo: response.user.photoURL ?? ""
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ...
        });

}

export {
    AnonymousUser,
    deleteProject,
    updateBoardData
}