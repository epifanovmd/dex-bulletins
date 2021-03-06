import Alert from "react-s-alert";
import { IBulletinType, IFetchBulletinsParams } from "../types/types";
import { fetchBulletinByFilterAction } from "./fetchBulletinByFilterAction";
import { Dispatch  } from "redux";




export const addBulletinAction = (
  bulletin: IBulletinType,
  json: IFetchBulletinsParams
): any  => (dispatch: Dispatch): any => {
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
