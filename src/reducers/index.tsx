import { combineReducers } from "redux";
import bulletins from "./bulletins";
import users from "./users";
import bulletinForUpdate from "./bulletinForUpdate";
import pageBulletins from "./pageBulletins";

export default combineReducers({
  bulletins,
  users,
  bulletinForUpdate,
  pageBulletins
});
