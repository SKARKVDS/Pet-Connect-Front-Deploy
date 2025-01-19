import type { APIResponse } from "~/services/types";
import type {
  Account,
  InputUserAdd,
  InputUserUpdate,
  InputUserUpdateAdmin,
  User,
  UserToken,
} from "~/services/user/types";

import axios from "../api"
import { routes } from "./routes";

async function getAll() {
  return await axios.get<APIResponse<User[]>>(routes.getAll);
}

async function checkToken(token: string){
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    },
  };

  return await axios.get<APIResponse<null>>(routes.checkToken, config);
}

async function checkTokenAdmin(){
  console.log("checkTokenAdmin")
  console.log(useCookie("token"))
  return await axios.get<APIResponse<null>>(routes.checkTokenAdmin);
}


async function getAccount() {
  return await axios.get<APIResponse<Account>>(routes.account);
}

async function login(email: string, password: string){
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.post<APIResponse<UserToken>>(routes.login, {
    email: email,
    password: password
  }, config);
}

async function updateUser(input: InputUserUpdate) {
  return await axios.put<APIResponse<UserToken>>(routes.update, input);
}

async function updateUserImage(avatar: any){
  console.log(avatar);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.put<APIResponse<Account>>(routes.updateImage, {avatar: avatar}, config);
}

async function updateUserName(userName: string){
  return await axios.put<APIResponse<Account>>(routes.updateUserName, {userName: userName});
}

async function updateUserFirstName(firstName: string){
  return await axios.put<APIResponse<Account>>(routes.updateFirstName, {firstName: firstName});
}

async function updateUserLastName(lastName: string){
  return await axios.put<APIResponse<Account>>(routes.updateLastName, {lastName: lastName});
}

async function updateUserEmail(email: string){
  return await axios.put<APIResponse<Account>>(routes.updateEmail, {email: email});
}

async function updateUserPhoneNumber(phoneNumber: string){
  return await axios.put<APIResponse<Account>>(routes.updatePhoneNumber, {phoneNumber: phoneNumber});
}

async function updateUserPassword(password: string){
  return await axios.put<APIResponse<Account>>(routes.updatePassword, {password: password});
}

async function updateUserAdmin(input: InputUserUpdateAdmin) {
  return await axios.put<APIResponse<User>>(routes.updateAdmin, input);
}

async function deleteUserImageAdmin(userId: number) {
  return await axios.put<APIResponse<User>>(routes.deleteImageAdmin, {id : userId});
}

async function addUser(input: InputUserAdd) {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return await axios.post<APIResponse<UserToken>>(routes.add, input , config);
}



export default {
  getAll,
  checkTokenAdmin,
  checkToken,
  getAccount,
  login,
  updateUser, updateUserAdmin, updateUserImage, updateUserName, updateUserFirstName, updateUserLastName, updateUserEmail, updateUserPassword, updateUserPhoneNumber,
  addUser,
  deleteUserImageAdmin
}