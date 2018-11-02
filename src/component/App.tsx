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
  onBulletinForUpdate: (Bulletin: any) => void;
  onChangePage_Size: (Page: number, PageSize: number) => void;
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
  private selectPageSize: any = React.createRef();
  public render() {
    if (this.props.users.length === 0) {
      this.props.onFetchBulletin(
        this.props.pageBulletins.page,
        this.props.pageBulletins.pageSize
      );
    }
    const bullForUpdate = (e: any) => {
      const id = e.target.parentNode.getAttribute("data-item");
      if (id !== null) {
        let data;

        this.props.bulletins.bulletins.map(bull => {
          if (bull.id === id) {
            data = bull;
          }
        });

        this.props.onBulletinForUpdate(data);
        this.props.history.push("/updtaebulletin");
      }
    };
    const changePageSize = (e: any) => {
      if (this.selectPageSize.current.value === "Все") {
        this.props.onChangePage_Size(
          this.props.pageBulletins.page,
          this.props.bulletins.count
        );
      } else {
        this.props.onChangePage_Size(
          this.props.pageBulletins.page,
          this.selectPageSize.current.value
        );
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
                        onClick={bullForUpdate}
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
          <p>Текущая страница: {this.props.pageBulletins.page}</p>
          <p>
            Колличество страниц:{" "}
            {Math.ceil(
              this.props.bulletins.count / this.props.pageBulletins.pageSize
            )}
          </p>

          <select ref={this.selectPageSize} onChange={changePageSize}>
            <option>15</option>
            <option>25</option>
            <option>50</option>
            <option>100</option>
            <option>Все</option>
          </select>
          <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />
            Numquam facilis maxime, earum id aliquam, ratione <br />
            nemo debitis nobis eum placeat amet nostrum delectus, <br />
            possimus ut repudiandae at perferendis iusto aut. <br />
          </div>
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
    onBulletinForUpdate: (Bulletin: any): void => {
      dispatch({ type: "BULLETIN_FOR_UPDATE", bulletin: Bulletin });
    },
    onChangePage_Size: (Page: number, PageSize: number) => {
      dispatch({
        type: "BULLETIN_SET_PAGE_OR_PAGESIZE",
        pageOrPageSize: { page: Page, pageSize: PageSize }
      });
      dispatch(fetchBulletin(Page, PageSize));
    }
  })
)(App);
