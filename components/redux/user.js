
const GET_USER = 'GET_USER';

//Action creator
export const getUser = function(user) {
  return {
    type: GET_USER,
    user,
  };
};

//Reducer
export const userReducer = function(state={}, action) {
  switch(action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}

//Thunk
export const setUser = function(user) {
  return (dispatch) => {
    dispatch(getUser(user))
  }
}
