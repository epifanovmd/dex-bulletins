const initialState: any = null;

export default function bulletinIdForUpdate(state = initialState, action: any) {
  if (action.type === "BULLETIN_ID_FOR_UPDATE") {
    return action.bulletinId;
  } else if (action.type === "CLEAR_BULLETIN_ID_FOR_UPDATE") {
    return initialState;
  }
  return state;
}
