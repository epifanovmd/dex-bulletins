const initialState: any = [];

export default function users(state = initialState, action: any) {
  if (action.type === "FETCH_USERS") {
    return action.users;
  }
  return state;
}
