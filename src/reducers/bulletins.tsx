const initialState: any = [];

export default function bulletins(state = initialState, action: any) {
  if (action.type === "FETCH_BULLETIN") {
    return action.bulletins;
  } else if (action.type === "FETCH_BULLETIN_BY_FILTER") {
    return action.data.bulletins;
  }
  return state;
}
