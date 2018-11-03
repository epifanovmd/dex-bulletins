import Alert from "react-s-alert";
import { IBulletinType, IFetchBulletinsParams } from "../types/types";

import { fetchBulletinByFilterAction } from "./fetchBulletinByFilterAction";

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
