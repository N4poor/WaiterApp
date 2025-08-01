import { combineReducers } from "redux";
import tablesReducer from "./tablesRedux";

const rootReducer = combineReducers({
    tables: tablesReducer,
});

export default rootReducer