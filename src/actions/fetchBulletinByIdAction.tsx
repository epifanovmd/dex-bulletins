import Alert from "react-s-alert";

export const bulletinByIdForUpdate = (id: string): any => (dispatch: any) => {
  fetch(`http://ci2.dextechnology.com:8000/api/Bulletin/GetById/` + id)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        // throw new Error("Something went wrong ...");
        Alert.error("Не удается загрузить объявления, внутренняя ошибка", {
          effect: "slide"
        });
        return;
      }
    })
    .then(data => {
      dispatch({ type: "BULLETIN_BY_ID_FOR_UPDATE", bulletin: data });
    })
    .catch(error => {
      // console.log("ERROR", error);
      Alert.error("Внутренняя ошибка", {
        effect: "slide"
      });
    });
};
