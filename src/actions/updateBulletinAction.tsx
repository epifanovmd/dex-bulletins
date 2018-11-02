import Alert from "react-s-alert";
import { fetchBulletinByFilterAction } from "./fetchBulletinByFilterAction";

interface IBulletinType {
  id?: string;
  createdUtc?: string;
  created?: string;
  updatedUtc?: string;
  deletedUtc?: string;
  number: number;
  userId?: string;
  user?: string;
  content: string;
  rating: number;
}

interface IFetchBulletinsParams {
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

export const updateBulletinAction = (
  bulletin: IBulletinType,
  json: IFetchBulletinsParams
): any => (dispatch: any) => {
  // обновление в API
  console.log("обновление в API --> ", bulletin);
  fetch("http://ci2.dextechnology.com:8000/api/Bulletin/Update", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bulletin)
  }).then(response => {
    if (response.ok) {
      console.log(response);
      // загрузить объявления
      dispatch(fetchBulletinByFilterAction(json));
      Alert.success("Изменения сохранены", {
        effect: "slide"
      });
    } else {
      // throw new Error("Something went wrong ...");
      Alert.error("Внутренняя ошибка", {
        effect: "slide"
      });
    }
  });
};
