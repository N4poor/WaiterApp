import axios from 'axios';

//selectors
export const getAllTables = (state) => state.tables;
// actions
const createActionName = actionName => `app/tables/${actionName}`;
const LOAD_TABLES = createActionName('LOAD_TABLES');
const UPDATE_TABLE = createActionName('UPDATE_TABLE');
// action creators
export const loadTables = payload => ({type: LOAD_TABLES, payload});
export const updateTable = payload => ({type: UPDATE_TABLE, payload})

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_TABLES:
      return[...action.payload];

      case UPDATE_TABLE:
        return statePart.map(table =>
          table.id === action.payload.id ? action.payload : table
        );

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

// thunk do aktualizacji pojedynczego stolika
export const saveTableRequest = (table) => (dispatch) => {
  return axios
    .put(`http://localhost:3131/api/tables/${table.id}`, table)
    .then(res => {
      dispatch(updateTable(res.data));
    })
    .catch(err => {
      console.error(err);
      throw err; // można przekazać dalej do obsługi błędów w komponencie
    });
};

export default tablesReducer;