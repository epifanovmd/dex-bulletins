import Alert from "react-s-alert";

export const fetchUsers = (): any => (dispatch: any) => {
  fetch(`http://ci2.dextechnology.com:8000/api/User/GetByPage/1/100`)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        // throw new Error("Something went wrong ...");
        Alert.error("Внутренняя ошибка", {
          effect: "slide"
        });
        return;
      }
    })
    .then(data => {
      dispatch({ type: "FETCH_USERS", users: data });
    })
    .catch(error => {
      // console.log("ERROR", error);
      Alert.error("Внутренняя ошибка", {
        effect: "slide"
      });
    });
};
