import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo1 from "../assets/public/logo-black.png";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createTeamFunc } from "../redux/actions/team.action.js";
import {
  createNewFileBasedOnTeamId,
  getFilesBasedOnTeamIdFunc,
} from "../redux/actions/file.action.js";
import { toast } from "sonner";

const Sidebar = ({ teams }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [teamName, setTeamName] = useState("");
  const [fileName, setFileName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("Teams");

  //======================================= function for creating a new team==============================================
  const createNewTeam = () => {
    console.log(teamId);
    if (teamName.trim() === "") return toast.error("Please enter team name");
    dispatch(createTeamFunc(teamName));
  };

  const createNewFile = () => {
    //first we need to check if the user selected a team or not from the dropdown list
    //if not then we need to show a toast message to select a team
    //if the user do not have any team then we need to show a toast message to create a team first and then create a file
    if (teamId === "" || teamId.trim() === "" || teamId === undefined)
      return toast.error("Please select a team first");
    if (teams.length === 0 || teams === undefined || teams === null)
      return toast.error("Please create a team first");
    if (fileName.trim() === "") return toast.error("Please enter file name");

    dispatch(createNewFileBasedOnTeamId(fileName, teamId));
  };

  //================================function for fetching the files based on the selected team id==========================
  const fetchFilesBasedOnTeamId = async () => {
    if (teamId && teamId.trim() !== "") {
      dispatch(getFilesBasedOnTeamIdFunc(teamId));
    }
  };
  //=====================================this is for fetching files based on teamId==========================================
  useEffect(() => {
    fetchFilesBasedOnTeamId();
  }, [teamId]);
  return (
    <div className="flex h-screen flex-col justify-between border-e bg-white">
      <div className="px-4 py-6">
        <span
          className="grid h-10 w-32 place-content-center cursor-pointer rounded-lg  text-xs text-gray-600"
          onClick={() => navigate("/")}
        >
          <img src={logo1} alt="" />
        </span>

        <ul className="mt-6 space-y-1">
          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> {selectedTeam} </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>
              {teams &&
                teams?.map((team, index) => (
                  <ul className="mt-2 space-y-1 px-4" key={index}>
                    <li
                      onClick={() => {
                        setSelectedTeam(team?.name);
                        setTeamId(team?._id);
                      }}
                      className=" cursor-pointer"
                    >
                      <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                        {team?.name}
                      </a>
                    </li>
                  </ul>
                ))}

              {/* <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a
                    
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    BMy Team 1
                  </a>
                </li>

                <li>
                  <a
                    
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                  >
                    My Team 2
                  </a>
                </li>
              </ul> */}
            </details>
          </li>
          <Dialog>
            <DialogTrigger className="w-full">
              <li>
                <a className="block rounded-lg px-4 py-2 mt-4 mb-4 text-sm font-medium  text-white bg-indigo-600 hover:bg-gray-100 hover:text-gray-700">
                  Create New Team
                </a>
              </li>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new Team</DialogTitle>
                <DialogDescription className="mt-6">
                  Team allows you to create your files and store your diagrams.
                  Inside onetime you can create multiple projects.
                </DialogDescription>
              </DialogHeader>
              <Input
                placeholder="Enter team name"
                onChange={(e) => setTeamName(e.target.value)}
              />
              <div onClick={() => createNewTeam()}>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create New Team
                </button>
              </div>
            </DialogContent>
          </Dialog>

          <li>
            <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
              Upgrade Plan
            </a>
          </li>

          <li>
            <details className="group [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                <span className="text-sm font-medium"> Account </span>

                <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </summary>

              <ul className="mt-2 space-y-1 px-4">
                <li>
                  <a className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
                    Go to Profile
                  </a>
                </li>

                <li>
                  <form action="#">
                    <button
                      type="submit"
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </form>
                </li>
              </ul>
            </details>
          </li>
          <Dialog>
            <DialogTrigger className="w-full">
              <li className="w-full">
                <a className="block rounded-lg px-4 py-2 mt-8 text-sm font-medium text-white bg-indigo-600 hover:bg-gray-100 hover:text-gray-700">
                  Create New File
                </a>
              </li>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new File</DialogTitle>
                <DialogDescription className="mt-6">
                  Create a new file to start your journey. After creating a file
                  you can start drawing your diagrams. Hurry up!
                </DialogDescription>
              </DialogHeader>
              <Input
                placeholder="Enter file name"
                onChange={(e) => setFileName(e.target.value)}
              />
              <div onClick={() => createNewFile()}>
                <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Create New File
                </button>
              </div>
            </DialogContent>
          </Dialog>
        </ul>
      </div>

      <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
        <a className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
          <img
            alt=""
            src={user?.avatar}
            className="size-10 rounded-full object-cover"
          />

          <div>
            <p className="text-xs">
              <strong className="block font-medium">{user?.username}</strong>

              <span>{user?.email}</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Sidebar;
