import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { getBoardData } from "utils/boardService";

const DashboardContext = createContext([]);

const DashboardProvider = ({ children }) => {
  const [dashboard, setDashboard] = useState({});
  const {
    userState: { user },
  } = useAuth();
  const [updateData, setUpdateData] = useState(true);

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
