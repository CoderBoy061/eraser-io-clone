import { getTeamByUserIdFunc } from "@/redux/actions/team.action";
import { CLEAR_ERRORS } from "@/redux/constants/team.constant";
import DashboardHeader from "@/resueableComponents/DashboardHeader";
import Sidebar from "@/resueableComponents/Sidebar";
import Table from "@/resueableComponents/Table";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
const Dashboard = () => {
  const dispatch = useDispatch();
  const { teams, loading, error, message } = useSelector((state) => state.team);
  const { filesBasedOnTeamId, fetchFileLoading, isFileLoading, fileMessage, fileError } =
    useSelector((state) => state.file);

  //this is for team data
  useEffect(() => {
    if (message) {
      dispatch(getTeamByUserIdFunc());
      toast.success(message);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }
    if (error) {
      toast.error(error);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }
  }, [teams, error, message]);

  //this is for file data
  useEffect(() => {
    if (fileMessage) {
      toast.success(fileMessage);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }
    if (fileError) {
      toast.error(fileError);
      dispatch({
        type: CLEAR_ERRORS,
      });
    }
  }, [ fileMessage, fileError]);
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  if (isFileLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  console.log(filesBasedOnTeamId);
  return (
    <div className="grid grid-cols-4">
      <div className="bg-white h-screen w-72 fixed">
        <Sidebar teams={teams} />
      </div>
      <div className="col-span-4 ml-72">
        <DashboardHeader />
        <Table filesBasedOnTeamId={filesBasedOnTeamId}  />
      </div>
    </div>
  );
};

export default Dashboard;
