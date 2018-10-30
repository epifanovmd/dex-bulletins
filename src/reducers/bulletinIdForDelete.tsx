const initialState: any = [];

export default function bulletinIdForDelete(state = initialState, action: any) {
  if (action.type === "ADD_BULLETIN_ID_FOR_DELETE") {
    return [...state, action.id];
  } else if (action.type === "DELETE_BULLETIN_ID_FOR_DELETE") {
    const newstate: any = [];
    state.forEach((element: any) => {
      if (element !== action.id) {
        newstate.push(element);
      }
    });
    return newstate;
  } else if (action.type === "CLEAR_BULLETIN_ID_FOR_DELETE") {
    return initialState;
  }
  return state;
}
