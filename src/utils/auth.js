import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const Token = 'Token'
const UID = 'UpharmaID'
const User = 'UserName'
export function SetToken(token) {
  return Cookies.set(Token, token)
}

export function SetUpharmaID(id) {
  return Cookies.set(UID, id)
}
export function SetUserName(Username) {
  return Cookies.set(User, Username)
}

export function GetToken() {
  return Cookies.get(Token)
}
export function GetUpharmaID() {
  return Cookies.get(UID)
}
export function GetUserName() {
  return Cookies.get(User)
}
export function RemoveToken() {
  return Cookies.remove(Token)
}
export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
