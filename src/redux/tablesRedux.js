import axios from 'axios';

//selectors
export const getAllTables = (state) => state.tables;
// actions
const createActionName = actionName => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
// action creators
export const loadTables = payload => ({type: LOAD_TABLES, payload});

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
      return[...action.payload];
    default:
      return statePart;
  };
};
// thunk

export const fetchTables = () => {
  return (dispatch) => {
    axios.get('http://localhost:3131/api/tables')
    .then(res => {
      dispatch(loadTables(res.data));
    })
  }
}

export default tablesReducer;