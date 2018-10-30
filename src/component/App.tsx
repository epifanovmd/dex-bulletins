import * as React from "react";
import { connect } from "react-redux";
import { BootstrapTable, TableHeaderColumn } from "react-bootstrap-table";
import "node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css";

import "./App.css";

import Header from "./Header";
import { fetchBulletin } from "../actions/fetchBulletinAction";
import { fetchUsers } from "./../actions/fetchUsersAction";
import { bulletinByIdForUpdate } from "./../actions/fetchBulletinByIdAction";
import { bulletinByFilterAction } from "./../actions/fetchBulletinByFilterAction";
import { deleteBuleetinsByIdAction } from "./../actions/deleteBuleetinsByIdAction";

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
  onBulletinByIdForUpdate: (id: string) => void;
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
  private btnBulletinDel: any = React.createRef();
  public render() {
    if (this.props.bulletinIdForUpdate !== null) {
      this.props.onClearBulletinIdForUpdate();
    }

    if (this.props.users.length === 0) {
      this.props.onFetchBulletin();
    }

    const deleteBulletins = (id: any, el: any) => {
      const matches = document.querySelectorAll("tbody");
      const nodesArray = Array.prototype.slice.call(matches[0].childNodes);
      const btn: any = this.btnBulletinDel.current;
      if (el.target.checked) {
        this.props.onAddBulletinIdForDelete(id);
        btn.style.visibility = "visible";
      } else {
        this.props.onDelBulletinIdForDelete(id);

        for (const item of nodesArray) {
          if (item.childNodes[0].childNodes[0].checked) {
            return;
          }
        }

        btn.style.visibility = "hidden";
      }
    };

    const clearCheckBox = () => {
      const btn: any = this.btnBulletinDel.current;

      const matches = document.querySelectorAll("tbody");
      const nodesArray = Array.prototype.slice.call(matches[0].childNodes);
      for (const item of nodesArray) {
        if (item.childNodes[0].childNodes[0].checked) {
          item.childNodes[0].childNodes[0].checked = false;
        }
      }

      btn.style.visibility = "hidden";
    };

    const bullByIdForUpdate = (id: string): void => {
      if (id !== null) {
        this.props.onBulletinByIdForUpdate(id);
        this.props.history.push("/updtaebulletin");
      }
    };

    const bulletinDelete = (): void => {
      this.props.onBulletinDelete(this.props.bulletinIdForDelete);
      this.props.onClearBulletinIdForDelete();
      clearCheckBox();
    };

    const options: any = {
      onRowClick: onClick,
      page: 1, // which page you want to show as default
      sizePerPageList: [
        {
          text: "10",
          value: 10
        },
        {
          text: "25",
          value: 25
        },
        {
          text: "50",
          value: 50
        },
        {
          text: "All",
          value: this.props.bulletins.length
        }
      ], // you can change the dropdown list for size per page
      sizePerPage: 10, // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5, // the pagination bar size.
      prePage: "Предыдущаяя", // Previous page button text
      nextPage: "Следующая", // Next page button text
      firstPage: "Первая", // First page button text
      lastPage: "Последняя", // Last page button text
      // paginationShowsTotal: this.renderShowsTotal, // Accept bool or function
      paginationPosition: "both", // default is bottom, top and both is all available
      // hideSizePerPage: true, // You can hide the dropdown for sizePerPage
      alwaysShowAllBtns: true // Always show next and previous button
      // withFirstAndLast: false > Hide the going to First and Last page button
    };

    function onRowSelect(row: any, isSelected: any, e: any): any {
      deleteBulletins(row.id, e);
    }

    function onSelectAll1(isSelected: any, rows: any): any {
      rows.map((item: any) => {
        console.log(item.id);
      });
    }

    function onClick(row: any): any {
      bullByIdForUpdate(row.id);
    }

    const selectRowProp: any = {
      mode: "checkbox",
      onSelect: onRowSelect,
      onSelectAll: onSelectAll1
    };

    return (
      <div>
        <Header />

        <div className="container">
          <BootstrapTable
            version="4"
            data={this.props.bulletins}
            pagination={true}
            selectRow={selectRowProp}
            options={options}
          >
            <TableHeaderColumn
              width="95px"
              dataField="number"
              isKey={true}
              dataSort={true}
            >
              Номер
            </TableHeaderColumn>
            <TableHeaderColumn
              width="150px"
              dataField="created"
              dataSort={true}
            >
              Дата
            </TableHeaderColumn>
            <TableHeaderColumn dataField="content" dataSort={true}>
              Объявление
            </TableHeaderColumn>
            <TableHeaderColumn width="110px" dataField="rating" dataSort={true}>
              Рейтинг
            </TableHeaderColumn>
            <TableHeaderColumn width="150px" dataField="user" dataSort={true}>
              Пользователь
            </TableHeaderColumn>
          </BootstrapTable>

          <div className="d-flex pb-4 mx-auto flex-row-reverse">
            <button
              className="btn btn-danger"
              ref={this.btnBulletinDel}
              onClick={bulletinDelete}
              style={{ visibility: "hidden" }}
            >
              Удалить
            </button>
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
    isDescSortParamsState: state.isDescSortParamsState
  }),
  dispatch => ({
    onClearBulletinIdForUpdate: (): void => {
      dispatch({ type: "CLEAR_BULLETIN_BY_ID_FOR_UPDATE", payload: null });
      dispatch({ type: "CLEAR_BULLETIN_ID_FOR_UPDATE", payload: null });
    },
    onFetchBulletin: (): void => {
      dispatch(fetchUsers());
      dispatch(fetchBulletin());
    },
    onBulletinByIdForUpdate: (id: string): void => {
      dispatch(bulletinByIdForUpdate(id));
      dispatch({ type: "BULLETIN_ID_FOR_UPDATE", bulletinId: id });
    },
    onAddBulletinIdForDelete: (id: string): void => {
      dispatch({ type: "ADD_BULLETIN_ID_FOR_DELETE", id });
    },
    onDelBulletinIdForDelete: (id: string): void => {
      dispatch({ type: "DELETE_BULLETIN_ID_FOR_DELETE", id });
    },
    onClearBulletinIdForDelete: () => {
      dispatch({ type: "CLEAR_BULLETIN_ID_FOR_DELETE", payload: null });
    },
    onBulletinDelete: (idArr: string[]) => {
      dispatch(deleteBuleetinsByIdAction(idArr));
    },
    onGetByFilterSort: (json: any) => {
      dispatch(bulletinByFilterAction(json));
    },
    onSetSortParam: (isDescSortParamsState: boolean) => {
      dispatch({ type: "ADD_BULLETIN_SORT_STATE", isDescSortParamsState });
    }
  })
)(App);
