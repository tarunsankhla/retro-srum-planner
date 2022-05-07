import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { firestore, collection } from "firebase.config";
import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";

const DashboardContext = createContext([]);

const DashboardProvider = ({ children }) => {
	const [dashboard, setDashboard] = useState({});
	const { userState } = useAuth();
	const [updateData, setUpdateData] = useState(true);

	const getData = async () => {
		const userRef = doc(firestore, `users/${userState.user.userId}`);
		try {
			const res1 = await getDoc(userRef);
			setDashboard(res1.data() ?? {});
		} catch (err) {
			console.log(err);
		}
	};

	console.log(dashboard);
	console.log(updateData);

	useEffect(() => {
		getData();
	}, [updateData]);

	return (
		<DashboardContext.Provider
			value={{ dashboard, setDashboard, setUpdateData }}
		>
			{children}
		</DashboardContext.Provider>
	);
};

const useDashboard = () => useContext(DashboardContext);

export { DashboardProvider, useDashboard };
