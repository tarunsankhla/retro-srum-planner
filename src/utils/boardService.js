import {
  firestore,
  firebaseAuth,
  signInAnonymously,
  signInWithPopup,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  googleAuthProvider,
} from "firebase.config";
import {
  doc,
  getDoc,
  updateDoc,
  deleteField,
  setDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { Alert } from "./alert";

function updateBoardData(boarddata, userId, projectId) {
  const doctoupdate = doc(firestore, `users/${userId}`, projectId);
  updateDoc(doctoupdate, boarddata);
}

// signin with email password
const signInWithEmail = async (data, userDispatch, navigate) => {
  try {
    const response = await signInWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    });
    navigate("/dashboard", { replace: true });
    Alert("success", "SignIn Successfully!!");
  } catch (err) {
    Alert("error", err.message);
  }
};

// signin with google
const LoginWIthGoogleAuth = async (userDispatch, navigate) => {
  try {
    const response = await signInWithPopup(firebaseAuth, googleAuthProvider);
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    });
    navigate("/dashboard", { replace: true });
    Alert("success", "Logged In Successfully!");
  } catch (err) {
    Alert("error", err.message);
  }
};

const signupWithEmail = async (userDispatch, data, navigate) => {
  try {
    const response = await createUserWithEmailAndPassword(
      firebaseAuth,
      data.email,
      data.password
    );
    userDispatch({
      type: "userauth",
      token: response?.user?.accessToken ?? "",
      name: response?.user?.displayName ?? "",
      emailId: response?.user?.email ?? "",
      userId: response?.user?.uid ?? "",
      photo: response.user.photoURL ?? "",
    });
    navigate("/", { replace: true });
    Alert("success", "SignUp Successfully!!");
  } catch (err) {
    Alert("error", err.message);
  }
};

// get data
const getBoardData = async (setData, userId) => {
  const userRef = doc(firestore, `users/${userId}`);
  try {
    const res1 = await getDoc(userRef);
    setData(res1.data() ?? {});
  } catch (err) {
    Alert("error", err.message);
  }
};

// get project data
const getProjectData = async (
  setProject,
  userId,
  projectId,
  userState,
  navigate
) => {
  const userRef = doc(firestore, `users/${userId}`);

  try {
    const usersList = await getDoc(userRef);
    const [projectKey, project] = Object.entries(usersList.data()).find(
      ([key, value]) => value.id === projectId
    );
    project.key = projectKey;
    let start = project.createdTime;
    let end = new Date().getTime();

    let diff = end - start;
    let seconds = Math.floor(diff / 1000 / 60);
    if (seconds > project.expiryTime) {
      if (userState.user.userId !== project.userId) {
        Alert("error", "Time Expired. Contact owner");
        navigate("/", { replace: true });
      }
    }
    setProject(project);
  } catch (error) {
    Alert("error", error.message);
    navigate("/404", { replace: true });
  }
};

const deleteProject = async (userId, projectId) => {
  const doctoupdate = doc(firestore, `users/${userId}`);
  try {
    await updateDoc(doctoupdate, {
      [projectId]: deleteField(),
    });
    Alert("info", "Project Deleted!!");
  } catch (err) {
    Alert("error", err.message);
  }
};

function cloneProject(boardObj, userId, dashboard) {
  boardObj.userId = userId;
  boardObj.id = uuid();
  boardObj.createdTime = new Date().getTime();
  boardObj.createdOn = new Date().toDateString();
  const userRef = doc(firestore, `users/${userId}`);
  try {
    setDoc(userRef, {
      ...dashboard,
      [uuid()]: boardObj,
    });
  } catch (err) {
    Alert("error", err.message);
  }
}
const AnonymousUser = async (userDispatch) => {
  try {
    signInAnonymously(firebaseAuth).then((response) => {
      userDispatch({
        type: "userauth",
        token: response?.user?.accessToken ?? "",
        name: "Anonymous",
        emailId: response?.user?.email ?? "",
        userId: response?.user?.uid ?? "",
        photo: response.user.photoURL ?? "",
      });
    });
  } catch (error) {
    Alert("error", error.message);
  }
};

const resetPassword = (email) => {
  try {
    sendPasswordResetEmail(firebaseAuth, email);
  } catch (error) {
    Alert("error", error.message);
  }
};

export {
  AnonymousUser,
  getBoardData,
  getProjectData,
  deleteProject,
  cloneProject,
  updateBoardData,
  resetPassword,
  signInWithEmail,
  LoginWIthGoogleAuth,
  signupWithEmail,
};
