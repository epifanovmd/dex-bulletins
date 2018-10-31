const initialState: any = null;

export default function bulletinForUpdate(state = initialState, action: any) {
  if (action.type === "BULLETIN_FOR_UPDATE") {
    return action.bulletin;
  } else if (action.type === "CLEAR_BULLETIN_FOR_UPDATE") {
    return initialState;
  }
  return state;
}
