const baseUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;
//==================================user/auth related apis are here==========================================
export const googleLoginUrl = `https://www.googleapis.com/oauth2/v1/userinfo?access_token`;

export const loginWithGoogleurl = `${baseUrl}/user/google-login`;

export const registerUrl = `${baseUrl}/user/register`;

export const loginUrl = `${baseUrl}/user/login`;

export const getUserInfoUrl = `${baseUrl}/user/get/info`;
//==================================user/auth related apis are here==========================================

//==================================team related apis are here===============================================

export const createTeamUrl = `${baseUrl}/team/create/team`;

export const getTeamByUserId = `${baseUrl}/team/get/teams`;

export const deleteTeamUrl = `${baseUrl}/team/delete/team`;

export const updateTeamUrl = `${baseUrl}/team/update/team`;

export const addMemberToTeamUrl = `${baseUrl}/team/add/members`;


//==================================team related apis are here===============================================

//==================================file related apis are here===============================================

export const getFilesBasedOnTeamId = `${baseUrl}/file/get/file`;
export const createFileUrl = `${baseUrl}/file/upload/file`;

export const updateFileUrl = `${baseUrl}/file/update/file`;

export const getSingleFileUrl = `${baseUrl}/file/get`;
//==================================file related apis are here===============================================


