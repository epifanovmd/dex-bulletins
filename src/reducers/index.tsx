import { combineReducers } from "redux";
import bulletins from "./bulletins";
import users from "./users";
import bulletinForUpdate from "./bulletinForUpdate";
import bulletinIdForUpdate from "./bulletinIdForUpdate";
import bulletinIdForDelete from "./bulletinIdForDelete";

export default combineReducers({
  bulletins,
  users,
  bulletinForUpdate,
  bulletinIdForUpdate,
  bulletinIdForDelete
});
