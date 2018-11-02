const initialState: any = [];

export default function bulletins(state = initialState, action: any) {
  if (action.type === "FETCH_BULLETIN_BY_FILTER") {
    return action.data;
  }
  return state;
}
