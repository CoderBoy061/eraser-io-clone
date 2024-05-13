import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/home/Homepage";
import Signin from "./pages/auth/Signin";
import Signup from "./pages/auth/Signup";
import Dashboard from "./pages/dashboard/Dashboard";
import { useCallback, useEffect } from "react";
import { getUserInfoFunction } from "./redux/actions/user.action";
import NotFound from "./pages/notfound/NotFound";
import { getTeamByUserIdFunc } from "./redux/actions/team.action";
import Workspace from "./pages/workspace/Workspace";

function App() {
  const dispatch = useDispatch();

  const { isAuthenticated, isLoading } = useSelector(
    (state) => state.user
  );
  const fetchData = useCallback(() => {
    dispatch(getUserInfoFunction());
    dispatch(getTeamByUserIdFunc());
  }, [dispatch]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/dashboard"
        element={isAuthenticated ? <Dashboard /> : <Signin />}
      />
      <Route
        path="/workspace/:teamId/:fileId"
        element={isAuthenticated ? <Workspace /> : <Signin />}
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
