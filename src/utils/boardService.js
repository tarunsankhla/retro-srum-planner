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
	updateDoc(doctoupdate, boarddata)
		.then((res) => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		});
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
		navigate("/dashboard");
	} catch (err) {
		console.log("login eror", err);
	}
	Alert("success", "SignIn Successfully!!");
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
		navigate("/dashboard");
	} catch (err) {
		console.log("login gauth err", err);
	}
	Alert("success", "Logged In Successfully!");
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
		navigate("/");
	} catch (err) {
		console.log("sign up err", err);
		Alert("error", err.message);
	}
	Alert("success", "SignUp Successfully!!");
};

// get data
const getBoardData = async (setData, userId) => {
	const userRef = doc(firestore, `users/${userId}`);
	try {
		const res1 = await getDoc(userRef);
		setData(res1.data() ?? {});
		console.log(res1.data(), "huva");
	} catch (err) {
		console.log(err);
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
		console.log(seconds, project.expiryTime);
		if (seconds > project.expiryTime) {
			console.log("projectId", userId, project.userId);
			if (userState.user.userId !== project.userId) {
				// alert("Time expired");
				Alert("error", "Time Expired. Contact owner");
				navigate("/");
			}
		}
		setProject(project);
		console.log({ project });
	} catch (error) {
		console.log(error);
		Alert("error", error.message);
		navigate("/404");
	}
};

function deleteProject(userId, projectId) {
	const doctoupdate = doc(firestore, `users/${userId}`);
	updateDoc(doctoupdate, {
		[projectId]: deleteField(),
	})
		.then((resp) => console.log(resp))
		.catch((err) => {
			console.log(err);
			Alert("error", err.message);
		});

	Alert("info", "Dashboard Deleted!!");
}

function cloneProject(boardObj, userId, dashboard) {
	boardObj.userId = userId;
	boardObj.id = uuid();
	boardObj.createdTime = new Date().getTime();
	boardObj.createdOn = new Date().toDateString();
	const userRef = doc(firestore, `users/${userId}`);
	console.log(boardObj);
	try {
		setDoc(userRef, {
			...dashboard,
			[uuid()]: boardObj,
		});
	} catch (err) {
		console.log(err);
		Alert("error", err.message);
	}
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
				photo: response.user.photoURL ?? "",
			});
		})
		.catch((error) => {
			const errorCode = error.code;
			const errorMessage = error.message;
			Alert("error", error.message);
			// ...
		});
}

const resetPassword = (email) => {
	try {
		sendPasswordResetEmail(firebaseAuth, email);
	} catch (error) {
		console.log(error);
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
