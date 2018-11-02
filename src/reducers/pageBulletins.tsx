const initialState: any = { page: 1, pageSize: 15 };

export default function pageBulletins(state = initialState, action: any) {
  if (action.type === "BULLETIN_SET_PAGE_OR_PAGESIZE") {
    return action.pageOrPageSize;
  }
  return state;
}
