import axios from "axios";
import {
  CREATE_TEAM_FAILURE,
  CREATE_TEAM_REQUEST,
  CREATE_TEAM_SUCCESS,
  GET_TEAM_FAILURE,
  GET_TEAM_REQUEST,
  GET_TEAM_SUCCESS,
} from "../constants/team.constant";
import { createTeamUrl, getTeamByUserId } from "../api";

export const createTeamFunc = (teamData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_TEAM_REQUEST,
    });
    const { data } = await axios.post(
      createTeamUrl,
      { name: teamData },

      {
        withCredentials: true,

        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.status === true) {
      //after creating team we need to get the team by user id
      // getTeamByUserIdFunc();
      dispatch({
        type: CREATE_TEAM_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: CREATE_TEAM_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: CREATE_TEAM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getTeamByUserIdFunc = () => async (dispatch) => {
  console.log("getTeamByUserIdFunc");
  try {
    dispatch({
      type: GET_TEAM_REQUEST,
    });
    const { data } = await axios.get(getTeamByUserId, {
      withCredentials: true,
    });
    if (data.status === true) {
      dispatch({
        type: GET_TEAM_SUCCESS,
        payload: data.teams,
      });
    } else {
      dispatch({
        type: GET_TEAM_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_TEAM_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
