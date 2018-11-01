import Alert from "react-s-alert";

export const fetchBulletin = (page: number, pageSize: number): any => (
  dispatch: any
) => {

  const json = {
    
      "pageFilter": {
        "page": page,
        "pageSize": pageSize
      }
    
  }
  fetch("http://ci2.dextechnology.com:8000/api/Bulletin/GetByFilters", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(json)
  })
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
      dispatch({ type: "FETCH_BULLETIN", bulletins: data });
    })
    .catch(error => {
      // console.log("ERROR", error);
      Alert.error("Внутренняя ошибка", {
        effect: "slide"
      });
    });
};
