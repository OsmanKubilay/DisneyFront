import adminCategory from "./Redux/adminCategory";
import adminMovie from "./Redux/adminMovie";
import adminSeries from "./Redux/adminSeries";
import adminUser from "./Redux/adminUser";
import adminRole from "./Redux/adminRole";
import { combineReducers } from "redux";

export default combineReducers({
  adminCategory,
  adminMovie,
  adminSeries,
  adminUser,
  adminRole,
});
