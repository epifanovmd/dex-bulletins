import * as React from "react";
import { connect } from "react-redux";
import "node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import "./App.css";

import Header from "./Header";
import { fetchBulletin } from "../actions/fetchBulletinAction";
import { fetchUsers } from "./../actions/fetchUsersAction";

interface IMapStateToProps {
  history?: any;
  bulletins: IBulletinsType;
  users: IUserType[];
  bulletinIdForDelete: string[];
  bulletinIdForUpdate: string;
  pageBulletins: { page: number; pageSize: number };
}

interface IMapDispatchToProps {
  onFetchBulletin: (page: number, pageSize: number) => void;
  onBulletinByIdForUpdate: (id: any) => void;
  onAddBulletinIdForDelete: (id: string) => void;
  onDelBulletinIdForDelete: (id: string) => void;
  onClearBulletinIdForDelete: () => void;
  onBulletinDelete: (idArr: string[]) => void;
  onSetSortParam: (json: any) => void;
}
interface IBulletinsType {
  bulletins: IBulletinType[];
  count: number;
}
interface IBulletinType {
  id?: string;
  createdUtc: string;
  updatedUtc: string;
  deletedUtc?: string;
  created?: string;
  number: number;
  userId: string;
  user?: string;
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
    console.log("Bulletins -", this.props.bulletins);
    if (this.props.users.length === 0) {
      this.props.onFetchBulletin(
        this.props.pageBulletins.page,
        this.props.pageBulletins.pageSize
      );
    }
    const bullByIdForUpdate = (e: any) => {
      const id = e.target.parentNode.getAttribute("data-item");
      if (id !== null) {
        let data;

        this.props.bulletins.bulletins.map(bull => {
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
              {this.props.bulletins.bulletins !== undefined
                ? this.props.bulletins.bulletins.map(bulletin => {
                    return (
                      <tr
                        data-item={bulletin.id}
                        key={bulletin.id}
                        onClick={bullByIdForUpdate}
                      >
                        <th scope="row">{bulletin.number}</th>
                        <td>
                          {bulletin.created !== undefined
                            ? bulletin.created.split("T")[0]
                            : null}
                        </td>
                        <td>{bulletin.content}</td>
                        <td>{bulletin.rating}</td>
                        <td>{bulletin.user}</td>
                      </tr>
                    );
                  })
                : null}
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
    bulletinIdForUpdate: state.bulletinIdForUpdate,
    pageBulletins: state.pageBulletins
  }),
  dispatch => ({
    onFetchBulletin: (page: number, pageSize: number): void => {
      dispatch(fetchUsers());
      dispatch(fetchBulletin(page, pageSize));
    },
    onBulletinByIdForUpdate: (id: any): void => {
      dispatch({ type: "BULLETIN_FOR_UPDATE", bulletin: id });
    }
  })
)(App);
