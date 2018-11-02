import { combineReducers } from "redux";
import bulletins from "./bulletins";
import users from "./users";
import bulletinForUpdate from "./bulletinForUpdate";
import pageBulletins from "./pageBulletins";
import filterParams from "./filterParams";

export default combineReducers({
  bulletins,
  users,
  bulletinForUpdate,
  pageBulletins,
  filterParams
});
