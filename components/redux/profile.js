
const GET_PROFILE = 'GET_PROFILE';

//Action creator
export const getProfile = function(profile) {
  return {
    type: GET_PROFILE,
    profile,
  };
};

//Reducer
export const profileReducer = function(state={}, action) {
  switch(action.type) {
    case GET_PROFILE:
      return action.profile
    default:
      return state
  }
}

//Thunk
export const setProfile = function(profile) {
  return (dispatch) => {
    dispatch(getProfile(profile))
  }
}
