import { createReducer } from "@reduxjs/toolkit";
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
  UPDATE_FILE_SUCCESS,
} from "../constants/file.constant";

const initialState = {
  filesBasedOnTeamId: [],
  singleFile: {},
  fetchFileLoading: false,
  fileMessage: null,
  fileError: null,
};

const fileReducer = createReducer(initialState, (builder) => {
  builder.addCase(FETCH_FILES_BASED_ON_TEAMID, (state, action) => {
    state.fetchFileLoading = true;
  });
  builder.addCase(FETCH_FILES_BASED_ON_TEAMID_SUCCESS, (state, action) => {
    state.fetchFileLoading = false;
    state.filesBasedOnTeamId = action.payload;
  });
  builder.addCase(FETCH_FILES_BASED_ON_TEAMID_FAILURE, (state, action) => {
    state.fetchFileLoading = false;
    state.fileError = action.payload;
  });
  builder.addCase(CREATE_NEW_FILE, (state, action) => {
    state.isFileLoading = true;
  });
  builder.addCase(CREATE_NEW_FILE_SUCCESS, (state, action) => {
    state.isFileLoading = false;
    state.fileMessage = action.payload;
  });
  builder.addCase(CREATE_NEW_FILE_FAILURE, (state, action) => {
    state.isFileLoading = false;
    state.fileError = action.payload;
  });
  builder.addCase(UPDATE_FILE, (state, action) => {
    state.isUpdateFileLoading = true;
  });
  builder.addCase(UPDATE_FILE_SUCCESS, (state, action) => {
    state.isUpdateFileLoading = false;
    state.fileMessage = action.payload;
  });
  builder.addCase(UPDATE_FILE_FAILURE, (state, action) => {
    state.isUpdateFileLoading = false;
    state.fileError = action.payload;
  });
  builder.addCase(GET_FILE_BY_ID, (state, action) => {
    state.fetchFileLoading = true;
  });
  builder.addCase(GET_FILE_BY_ID_SUCCESS, (state, action) => {
    state.fetchFileLoading = false;
    state.singleFile = action.payload;
  });
  builder.addCase(GET_FILE_BY_ID_FAILURE, (state, action) => {
    state.fetchFileLoading = false;
    state.fileError = action.payload;
  });
});

export default fileReducer;
