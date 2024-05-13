import axios from "axios";
import {
  CREATE_NEW_FILE,
  CREATE_NEW_FILE_FAILURE,
  CREATE_NEW_FILE_SUCCESS,
  FETCH_FILES_BASED_ON_TEAMID,
  FETCH_FILES_BASED_ON_TEAMID_FAILURE,
  FETCH_FILES_BASED_ON_TEAMID_SUCCESS,
  GET_FILE_BY_ID,
  GET_FILE_BY_ID_FAILURE,
  GET_FILE_BY_ID_SUCCESS,
  UPDATE_FILE,
  UPDATE_FILE_FAILURE,
} from "../constants/file.constant";
import {
  createFileUrl,
  getFilesBasedOnTeamId,
  getSingleFileUrl,
  updateFileUrl,
} from "../api";

export const getFilesBasedOnTeamIdFunc = (teamId) => async (dispatch) => {
  try {
    dispatch({
      type: FETCH_FILES_BASED_ON_TEAMID,
    });
    const { data } = await axios.get(`${getFilesBasedOnTeamId}/${teamId}`, {
      withCredentials: true,

      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.status === true) {
      dispatch({
        type: FETCH_FILES_BASED_ON_TEAMID_SUCCESS,
        payload: data.files,
      });
    } else {
      dispatch({
        type: FETCH_FILES_BASED_ON_TEAMID_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_FILES_BASED_ON_TEAMID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createNewFileBasedOnTeamId =
  (fileName, teamId) => async (dispatch) => {
    try {
      dispatch({
        type: CREATE_NEW_FILE,
      });
      const { data } = await axios.post(
        createFileUrl,
        {
          fileName: fileName,
          teamId: teamId,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.status === true) {
        dispatch({
          type: CREATE_NEW_FILE_SUCCESS,
          payload: data.message,
        });
      } else {
        dispatch({
          type: CREATE_NEW_FILE_FAILURE,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: CREATE_NEW_FILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateFileUrlFunc =
  (document, draw, teamId, fileId) => async (dispatch) => {
    console.log("updateFileUrlFunc");
    try {
      dispatch({
        type: UPDATE_FILE,
      });
      const { data } = axios.patch(
        `${updateFileUrl}/${teamId}/${fileId}`,
        {
          document: JSON.stringify(document),
          draw: JSON.stringify(draw),
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.status === true) {
        dispatch({
          type: UPDATE_FILE_SUCCESS,
          payload: data.message,
        });
      } else {
        dispatch({
          type: UPDATE_FILE_FAILURE,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: UPDATE_FILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSingleFileFunc = (fileId) => async (dispatch) => {
  try {
    dispatch({
      type: GET_FILE_BY_ID,
    });
    const { data } = await axios.get(`${getSingleFileUrl}/${fileId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (data.status === true) {
      dispatch({
        type: GET_FILE_BY_ID_SUCCESS,
        payload: data.file,
      });
    } else {
      dispatch({
        type: GET_FILE_BY_ID_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_FILE_BY_ID_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
