import Alert from "react-s-alert";
import { fetchBulletin } from "./fetchBulletinAction";

export const updateBulletinAction = (bulletin: any): any => (dispatch: any) => {
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
      dispatch(fetchBulletin(1,100));
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
