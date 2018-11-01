const initialState: any = { page: 1, pageSize: 15 };

export default function pageBulletins(state = initialState, action: any) {
  if (action.type === "BULLETIN_PAGE_PAGESIZE") {
    return action.pageAndSize;
  }
  return state;
}
