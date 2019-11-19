
const GET_MOOD = 'GET_MOOD';

//Action creator
export const getMood = function(mood) {
  return {
    type: GET_MOOD,
    mood,
  };
};

//Reducer
export const moodReducer = function(state='', action) {
  switch(action.type) {
    case GET_MOOD:
      return action.mood
    default:
      return state
  }
}

//Thunk
export const setMood = function(mood) {
  return (dispatch) => {
    dispatch(getMood(mood))
  }
}
