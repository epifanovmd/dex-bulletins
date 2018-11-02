const initialState: any = {
  userId: "",
  searchText: "",
  startDate: "",
  endDate: ""
};

export default function filterParams(state = initialState, action: any) {
  if (action.type === "SET_FILTER_PARAMS") {
    return action.params;
  }
  return state;
}
