import Alert from "react-s-alert";
import { fetchBulletin } from "./fetchBulletinAction";

export const deleteBuleetinByIdAction = (
  id: any,
  page: number,
  pageSize: number
): any => (dispatch: any) => {
  console.info("удаление в API", id);
  fetch(
    `curl -X POST 'http://ci2.dextechnology.com:8000/api/Bulletin/Delete/` + id
  )
    .then(response => {
      if (response.ok) {
        console.log(response);
        Alert.success("Объявление удалено успешно", {
          effect: "slide"
        });
        dispatch(fetchBulletin(page, pageSize));
      } else {
        // throw new Error("Something went wrong ...");
        Alert.error("Внутренняя ошибка", {
          effect: "slide"
        });
      }
    })
    .catch(error => {
      console.log("ERROR", error);
      Alert.error("Внутренняя ошибка", {
        effect: "slide"
      });
    });
};
