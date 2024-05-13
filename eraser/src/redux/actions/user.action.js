import axios from "axios";
import {
  EMAIL_LOGIN_FAILURE,
  EMAIL_LOGIN_REQUEST,
  EMAIL_LOGIN_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GOOGLE_LOGIN_FAILURE,
  GOOGLE_LOGIN_REQUEST,
  GOOGLE_LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "../constants/auth.constant";
import {
  getUserInfoUrl,
  loginUrl,
  loginWithGoogleurl,
  registerUrl,
} from "../api";
// Google login action, this will take email and username from google as parameter and will check if the user is already registered or not
// if the user is already registered then it will store the token in the cookies and will redirect the user to the dashboard
export const googleLoginFunction =
  (email, username, avatar) => async (dispatch) => {
    try {
      dispatch({
        type: GOOGLE_LOGIN_REQUEST,
      });
      const {data} = await axios.post(
        loginWithGoogleurl,
        { email, username, avatar },

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success === true) {
        dispatch({
          type: GOOGLE_LOGIN_SUCCESS,
          payload: data.message,
        });
        // calling the getUserInfoFunction to get the user info
        getUserInfoFunction();
      } else {
        dispatch({
          type: GOOGLE_LOGIN_FAILURE,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: GOOGLE_LOGIN_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const loginUserFunction = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: EMAIL_LOGIN_REQUEST,
    });
    const { data } = await axios.post(
      loginUrl,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (data.success === true) {
      dispatch({
        type: EMAIL_LOGIN_SUCCESS,
        payload: data.message,
      });
    } else {
      dispatch({
        type: EMAIL_LOGIN_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: EMAIL_LOGIN_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const registerUserFunction =
  (email, password, username) => async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_REQUEST,
      });
      const { data } = await axios.post(
        registerUrl,
        { email, password, username },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (data.success === true) {
        dispatch({
          type: REGISTER_SUCCESS,
          payload: data.message,
        });
      } else {
        dispatch({
          type: REGISTER_FAILURE,
          payload: data.message,
        });
      }
    } catch (error) {
      dispatch({
        type: REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getUserInfoFunction = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_REQUEST,
    });
    const { data } = await axios.get(getUserInfoUrl, {
      withCredentials: true,
      headers: {
        
        "Content-Type": "application/json",
      },
    });
    if (data.success === true) {
      dispatch({
        type: GET_USER_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: GET_USER_FAILURE,
        payload: data.message,
      });
    }
  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
