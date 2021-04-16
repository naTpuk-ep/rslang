const defaultState = {
  score: 0,
};

const scoreReducer = (state = defaultState, action: any): any => {
  switch (action.type) {
    case "FETCH_SCORE":
      return {
        ...state,
        score: action.payload.score,
      };
    case "UPDATE_SCORE":
      return {
        ...state,
        score: action.payload.score,
      };
    default:
      return state;
  }
};

export default scoreReducer;
