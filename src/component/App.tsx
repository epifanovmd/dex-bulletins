import * as React from "react";
import { connect } from "react-redux";

import "./App.css";

import Header from "./Header";
// import { fetchBulletin } from "../actions/fetchBulletinAction";
import { fetchUsers } from "./../actions/fetchUsersAction";
import { fetchBulletinByFilterAction } from "./../actions/fetchBulletinByFilterAction";

interface IMapStateToProps {
  history?: any;
  bulletins: IBulletinsType;
  users: IUserType[];
  pageBulletins: { page: number; pageSize: number };
  filterParams: IFilterParams;
}
interface IFilterParams {
  userId: string;
  searchText: string;
  startDate: string;
  endDate: string;
}

interface IMapDispatchToProps {
  onFetchBulletin: (json: any) => void;
  onBulletinForUpdate: (Bulletin: any) => void;
  onChangePage_Size: (Page: number, PageSize: number, json: any) => void;
  onSetFetchBulletinsParam: (param: any) => void;
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
    const setFetchBulletinsParams = (
      Page: number,
      PageSize: number,
      FieldName: string,
      IsDesc: boolean
    ) => {
      const jsonParams = {
        pageFilter: {
          page: Page,
          pageSize: PageSize
        },
        sortParams: [
          {
            fieldName: FieldName,
            isDesc: IsDesc
          }
        ],
        userId: this.props.filterParams.userId,
        searchText: this.props.filterParams.searchText,
        startDate: this.props.filterParams.startDate,
        endDate: this.props.filterParams.endDate
      };

      return jsonParams;
    };

    if (this.props.users.length === 0) {
      this.props.onFetchBulletin(
        setFetchBulletinsParams(
          this.props.pageBulletins.page,
          this.props.pageBulletins.pageSize,
          "number",
          false
        )
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
          1,
          this.props.bulletins.count,
          setFetchBulletinsParams(
            1,
            this.props.bulletins.count,
            "number",
            false
          )
        );
      } else {
        this.props.onChangePage_Size(
          1,
          this.selectPageSize.current.value,
          setFetchBulletinsParams(
            1,
            this.selectPageSize.current.value,
            "number",
            false
          )
        );
      }
    };
    const paginationOnClick = (e: any) => {
      if (String(e.target.text) === "<<") {
        this.props.onChangePage_Size(
          this.props.pageBulletins.page - 1,
          this.props.pageBulletins.pageSize,
          setFetchBulletinsParams(
            this.props.pageBulletins.page - 1,
            this.props.pageBulletins.pageSize,
            "number",
            false
          )
        );
      } else if (String(e.target.text) === ">>") {
        this.props.onChangePage_Size(
          Number(this.props.pageBulletins.page) + 1,
          this.props.pageBulletins.pageSize,
          setFetchBulletinsParams(
            this.props.pageBulletins.page + 1,
            this.props.pageBulletins.pageSize,
            "number",
            false
          )
        );
      } else {
        this.props.onChangePage_Size(
          e.target.text,
          this.props.pageBulletins.pageSize,
          setFetchBulletinsParams(
            e.target.text,
            this.props.pageBulletins.pageSize,
            "number",
            false
          )
        );
      }
    };

    const paginationPages = () => {
      const items = [];
      const countPage = Math.ceil(
        this.props.bulletins.count / this.props.pageBulletins.pageSize
      );
      for (let num = 1; num <= countPage; num++) {
        items.push(
          num === Number(this.props.pageBulletins.page) ? (
            <li key={num} className="page-item active">
              <a onClick={paginationOnClick} className="page-link">
                {num}
              </a>
            </li>
          ) : (
            <li key={num} className="page-item">
              <a onClick={paginationOnClick} className="page-link">
                {num}
              </a>
            </li>
          )
        );
      }
      return items;
    };

    const paginationBasic = (
      <div>
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            {Number(this.props.pageBulletins.page) === 1 ? (
              <li className="page-item disabled">
                <a className="page-link" aria-label="Previous">
                  {"<<"}
                </a>
              </li>
            ) : (
              <li onClick={paginationOnClick} className="page-item">
                <a className="page-link" aria-label="Previous">
                  {"<<"}
                </a>
              </li>
            )}
            {paginationPages()}
            {Number(this.props.pageBulletins.page) ===
            Math.ceil(
              this.props.bulletins.count / this.props.pageBulletins.pageSize
            ) ? (
              <li className="page-item disabled">
                <a className="page-link" aria-label="Next">
                  {">>"}
                </a>
              </li>
            ) : (
              <li onClick={paginationOnClick} className="page-item">
                <a className="page-link" aria-label="Next">
                  {">>"}
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );

    return (
      <div>
        <Header />

        <div className="container-fluid px-0 pt-5 mt-5 color_">
          <table className="table table-striped">
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
          <div className="d-flex justify-content-between pb-5 mb-5">
            <div className="p-0">
              <select ref={this.selectPageSize} onChange={changePageSize}>
                <option>15</option>
                <option>25</option>
                <option>50</option>
                <option>100</option>
                <option>Все</option>
              </select>
            </div>
            <div className="p-0">
              <div>{paginationBasic}</div>
            </div>
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
    pageBulletins: state.pageBulletins,
    filterParams: state.filterParams
  }),
  dispatch => ({
    onFetchBulletin: (json: any): void => {
      dispatch(fetchUsers());
      dispatch(fetchBulletinByFilterAction(json));
    },
    onBulletinForUpdate: (Bulletin: any): void => {
      dispatch({ type: "BULLETIN_FOR_UPDATE", bulletin: Bulletin });
    },
    onChangePage_Size: (Page: number, PageSize: number, json: any) => {
      dispatch({
        type: "BULLETIN_SET_PAGE_OR_PAGESIZE",
        pageOrPageSize: { page: Page, pageSize: PageSize }
      });
      dispatch(fetchBulletinByFilterAction(json));
    },
    onSetFetchBulletinsParam: (param: any) => {
      dispatch({ type: "SET_FETCH_BULLETINS_PARAM", json: param });
    }
  })
)(App);
