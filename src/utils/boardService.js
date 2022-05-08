import { firestore, firebaseAuth, signInAnonymously } from "firebase.config";
import { doc, getDoc, updateDoc, deleteField } from "firebase/firestore";

function updateBoardData(boarddata, userId, projectId) {
  const doctoupdate = doc(firestore, `users/${userId}`, projectId);
  updateDoc(doctoupdate, boarddata)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

// get data
const getBoardData = async (setData, userId) => {
  const userRef = doc(firestore, `users/${userId}`);
  try {
    const res1 = await getDoc(userRef);
    setData(res1.data() ?? {});
    console.log(res1.data(), "huva");
  } catch (err) {
    console.log(err);
  }
};

// get project data
const getProjectData = async (setProject, userId, projectId) => {
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

function deleteProject(userId, projectId) {
  const doctoupdate = doc(firestore, `users/${userId}`);
  updateDoc(doctoupdate, {
    projectId: deleteField(),
  })
    .then((resp) => console.log(resp))
    .catch((err) => {
      console.log(err);
    });
}

function AnonymousUser(userDispatch) {
  console.log("anonymous");
  signInAnonymously(firebaseAuth)
    .then((response) => {
      console.log(response);
      // Signed in..
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken,
        name: "Anonymous",
        emailId: response?.user?.email,
        userId: response?.user?.uid,
        photo: response.user.photoURL,
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
  getBoardData,
  getProjectData,
  deleteProject,
  updateBoardData,
};
