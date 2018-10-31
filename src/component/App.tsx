import * as React from "react";
import { connect } from "react-redux";
import "node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import "./App.css";

import Header from "./Header";
import { fetchBulletin } from "../actions/fetchBulletinAction";
import { fetchUsers } from "./../actions/fetchUsersAction";
import { bulletinByFilterAction } from "./../actions/fetchBulletinByFilterAction";
// import { bulletinByIdForUpdate } from "./../actions/fetchBulletinByIdAction";

interface IMapStateToProps {
  history?: any;
  bulletins: IBulletinType[];
  users: IUserType[];
  bulletinIdForDelete: string[];
  bulletinIdForUpdate: string;
  isDescSortParamsState: boolean;
}

interface IMapDispatchToProps {
  onClearBulletinIdForUpdate: () => void;
  onFetchBulletin: () => void;
  onBulletinByIdForUpdate: (id: any) => void;
  onAddBulletinIdForDelete: (id: string) => void;
  onDelBulletinIdForDelete: (id: string) => void;
  onClearBulletinIdForDelete: () => void;
  onBulletinDelete: (idArr: string[]) => void;
  onGetByFilterSort: (json: any) => void;
  onSetSortParam: (json: any) => void;
}

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

interface IUserType {
  id: string;
  createdUtc: string;
  name: string;
}

class App extends React.Component<IMapStateToProps & IMapDispatchToProps> {
  public render() {
    if (this.props.users.length === 0) {
      this.props.onFetchBulletin();
    }

    const getUserNameById = (id: any) => {
      let data;
      this.props.users.forEach((user: any) => {
        if (user.id === id) {
          data = user.name;
          return;
        }
      });
      return data;
    };

    const bullByIdForUpdate = (e: any) => {
      const id = e.target.parentNode.getAttribute("data-item");
      if (id !== null) {
        let data;

        this.props.bulletins.map(bull => {
          if (bull.id === id) {
            data = bull;
          }
        });

        this.props.onBulletinByIdForUpdate(data);
        this.props.history.push("/updtaebulletin");
      }
    };

    return (
      <div>
        <Header />

        <div className="container pt-5 mt-5">
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col">Номер</th>
                <th scope="col">Создано</th>
                <th scope="col">Объявление</th>
                <th scope="col">Рейтинг</th>
                <th scope="col">Пользователь</th>
              </tr>
            </thead>
            <tbody>
              {this.props.bulletins.map(bulletin => {
                return (
                  <tr
                    data-item={bulletin.id}
                    key={bulletin.id}
                    onClick={bullByIdForUpdate}
                  >
                    <th scope="row">{bulletin.number}</th>
                    <td>{bulletin.createdUtc}</td>
                    <td>{bulletin.content}</td>
                    <td>{bulletin.rating}</td>
                    <td>{getUserNameById(bulletin.userId)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    bulletins: state.bulletins,
    users: state.users,
    bulletinIdForDelete: state.bulletinIdForDelete,
    bulletinIdForUpdate: state.bulletinIdForUpdate
  }),
  dispatch => ({
    onClearBulletinIdForUpdate: (): void => {
      dispatch({ type: "CLEAR_BULLETIN_FOR_UPDATE", payload: null });
    },
    onFetchBulletin: (): void => {
      dispatch(fetchUsers());
      dispatch(fetchBulletin(1, 100));
    },
    onBulletinByIdForUpdate: (id: any): void => {
      setTimeout(() => {
        dispatch({ type: "BULLETIN_FOR_UPDATE", bulletin: id });
      }, 0);
    },

    onGetByFilterSort: (json: any) => {
      dispatch(bulletinByFilterAction(json));
    }
  })
)(App);
