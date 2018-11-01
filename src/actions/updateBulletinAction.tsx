import Alert from "react-s-alert";
import { fetchBulletin } from "./fetchBulletinAction";

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

export const updateBulletinAction = (
  bulletin: IBulletinType,
  page: number,
  pageSize: number
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
      dispatch(fetchBulletin(page, pageSize));
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
