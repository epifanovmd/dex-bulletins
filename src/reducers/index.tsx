import { combineReducers } from "redux";
import bulletins from "./bulletins";
import users from "./users";
import bulletinForUpdate from "./bulletinForUpdate";

export default combineReducers({
  bulletins,
  users,
  bulletinForUpdate
});
