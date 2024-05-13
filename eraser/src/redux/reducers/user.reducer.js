import { createReducer } from "@reduxjs/toolkit";
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
  CLEAR_ERRORS,
} from "../constants/auth.constant";
const initialState = {
  isAuthenticated: false,
  user: null,
  isLoggedInSuccess: false,
};

const userReducer = createReducer(initialState, (builder) => {
  builder.addCase(GOOGLE_LOGIN_REQUEST, (state) => {
    state.isLoading = true;
  });
  builder.addCase(GOOGLE_LOGIN_SUCCESS, (state, action) => {
    state.isLoading = false;
    state.isLoggedInSuccess = true;
    state.isAuthenticated = true;
    state.message = action.payload;
  });
  builder.addCase(GOOGLE_LOGIN_FAILURE, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  builder.addCase(EMAIL_LOGIN_REQUEST, (state) => {
    state.isLoading = true;
  });
  builder.addCase(EMAIL_LOGIN_SUCCESS, (state, action) => {
    state.isLoading = false;
    state.isLoggedInSuccess = true;
    state.message = action.payload;
  });
  builder.addCase(EMAIL_LOGIN_FAILURE, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  builder.addCase(REGISTER_REQUEST, (state) => {
    state.isLoading = true;
  });
  builder.addCase(REGISTER_SUCCESS, (state, action) => {
    state.isLoading = false;
    state.isLoggedInSuccess = true;
    state.message = action.payload;
  });
  builder.addCase(REGISTER_FAILURE, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });

  builder.addCase(GET_USER_REQUEST, (state) => {
    state.isLoading = true;
  });
  builder.addCase(GET_USER_SUCCESS, (state, action) => {
    state.isLoading = false;
    state.isAuthenticated = true;
    state.user = action.payload.user;
  });
  builder.addCase(GET_USER_FAILURE, (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  });
  builder.addCase(CLEAR_ERRORS, (state) => {
    state.error = null;
    state.message = null;
  });
});

export default userReducer;
