export interface IFetchBulletinsParams {
  pageFilter?: { page: number; pageSize: number };
  sortParams?: [
    {
      fieldName: string;
      isDesc: boolean;
    }
  ];
  userId?: string;
  searchText?: string;
  startDate?: string;
  endDate?: string;
}

export interface IBulletinsType {
  bulletins: IBulletinType[];
  count: number;
}
export interface IBulletinType {
  id?: string;
  createdUtc: string;
  updatedUtc: string;
  deletedUtc?: string;
  created?: string;
  number: number;
  userId: string;
  user?: string;
  content: string;
  rating: number;
}

export interface IUserType {
  id: string;
  createdUtc: string;
  name: string;
}
export interface IFilterParams {
  sortParam: {
    fieldName: string;
    isDesc: boolean;
  };
  userId: string;
  searchText: string;
  startDate: string;
  endDate: string;
}
