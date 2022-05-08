import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
// import { firestore, collection } from "firebase.config";
// import { addDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { getBoardData } from "utils/boardService";

const DashboardContext = createContext([]);

const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState({});
  const {
    userState: { user },
  } = useAuth();
  const [updateData, setUpdateData] = useState(true);

  // const getData = async () => {
  //   const userRef = doc(firestore, `users/${userState.user.userId}`);
  //   try {
  //     const res1 = await getDoc(userRef);
  //     setDashboard(res1.data() ?? {});
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };


  // to update board data after every new addition
  useEffect(() => {
    getBoardData(setDashboard, user.userId);
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
