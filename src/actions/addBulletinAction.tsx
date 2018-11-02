import Alert from "react-s-alert";
import { fetchBulletinByFilterAction } from "./fetchBulletinByFilterAction";

interface IBulletinType {
  id?: string;
  createdUtc: string;
  updatedUtc: string;
  deletedUtc?: string;
  number: number;
  userId: string;
  content: string;
  rating: number;
}
interface IFilterParams {
  userId: string;
  searchText: string;
  startDate: string;
  endDate: string;
}

export const addBulletinAction = (
  bulletin: IBulletinType,
  json: IFilterParams
): any => (dispatch: any) => {
  console.info("Добавение в API", bulletin);
  fetch("http://ci2.dextechnology.com:8000/api/Bulletin/Add", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(bulletin)
  }).then(response => {
    if (response.ok) {
      console.log(response);
      Alert.success("Объявление добавлено успешно", {
        effect: "genie"
      });
      dispatch(fetchBulletinByFilterAction(json));
    } else {
      // throw new Error("Something went wrong ...");
      Alert.error("Объявление не добавлено, внутренняя ошибка", {
        effect: "slide"
      });
    }
  });
};
