import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";
import {
  IFetchBulletinsParams,
  IFilterParams,
  IUserType
} from "../types/types";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";

import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "react-s-alert/dist/s-alert-css-effects/scale.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";
import "react-s-alert/dist/s-alert-css-effects/flip.css";
import "react-s-alert/dist/s-alert-css-effects/genie.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";

import { fetchBulletinByFilterAction } from "../actions/fetchBulletinByFilterAction";

interface IMapStateToProps {
  users: IUserType[];
  pageBulletins: { page: number; pageSize: number };
  filterParams: IFilterParams;
}

interface IMapDispatchToProps {
  onGetByFilter: (
    Page: number,
    PageSize: number,
    json: IFetchBulletinsParams
  ) => void;
  onSetFilterParams: (Params: IFilterParams) => void;
}

class Header extends React.PureComponent<IMapStateToProps & IMapDispatchToProps> {
  private bulletinDateStart: any = React.createRef();
  private bulletinDateEnd: any = React.createRef();
  private bulletinAuthor: any = React.createRef();
  private searchInput: any = React.createRef();

  public render() {
    const getUserIdByName = (name: string): string => {
      let data: string = "";
      this.props.users.forEach((user: IUserType) => {
        if (user.name === name) {
          data = user.id;
          return;
        }
      });
      return data;
    };

    const getByFilter = () => {
      const param = {
        sortParam: {
          fieldName: this.props.filterParams.sortParam.fieldName,
          isDesc: this.props.filterParams.sortParam.isDesc
        },
        userId:
          this.bulletinAuthor.current.value === "Все"
            ? ""
            : getUserIdByName(this.bulletinAuthor.current.value),
        searchText: this.searchInput.current.value,
        startDate:
          this.bulletinDateStart.current.value === ""
            ? ""
            : this.bulletinDateStart.current.value,
        endDate:
          this.bulletinDateEnd.current.value === ""
            ? ""
            : this.bulletinDateEnd.current.value
      };

      const json: IFetchBulletinsParams = {
        pageFilter: {
          page: 1,
          pageSize: this.props.pageBulletins.pageSize
        },
        sortParams: [
          {
            fieldName: this.props.filterParams.sortParam.fieldName,
            isDesc: this.props.filterParams.sortParam.isDesc
          }
        ],
        userId: param.userId,
        searchText: param.searchText,
        startDate: param.startDate,
        endDate: param.endDate
      };
      this.props.onGetByFilter(1, this.props.pageBulletins.pageSize, json);
      this.props.onSetFilterParams(param);
    };
    const redirectToAddBulletinPage = (): void => {
      if (document.location !== null) {
        document.location.href = "/#addbulletin";
      }
    };

    const getUserNameById = (id: any): string => {
      let data: string = "";
      this.props.users.forEach((user: IUserType) => {
        if (user.id === id) {
          data = user.name;
          return;
        }
      });
      return data;
    };

    return (
      <div>
        <div className="d-flex p-2 fixed-top justify-content-around align-items-start header">
          <div className="m-3">
            <Alert stack={{ limit: 5 }} />
            <button
              type="button"
              className="btn btn-light header__button"
              onClick={redirectToAddBulletinPage}
            >
              Добавить
            </button>
          </div>
          <div className="m-3">
            <label className="px-3 header__label_color">Пользователь</label>
            <select
              defaultValue={getUserNameById(this.props.filterParams.userId)}
              className="header__select_size"
              ref={this.bulletinAuthor}
              onChange={getByFilter}
            >
              <option>Все</option>
              {this.props.users.map((user: any) => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>

            <label className="px-3 header__label_color">От</label>
            <input
              defaultValue={this.props.filterParams.startDate}
              className="header__input-date_width"
              type="date"
              ref={this.bulletinDateStart}
              onChange={getByFilter}
            />

            <label className="px-3 header__label_color">До</label>
            <input
              defaultValue={this.props.filterParams.endDate}
              className="header__input-date_width"
              type="date"
              ref={this.bulletinDateEnd}
              onChange={getByFilter}
            />
          </div>
          <div className="m-3">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">
                  <i className="fa fa-search" />
                </span>
              </div>
              <input
                defaultValue={this.props.filterParams.searchText}
                type="text"
                className="form-control header__search-input"
                placeholder="Общий поиск"
                ref={this.searchInput}
                onChange={debounce(500, getByFilter)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    users: state.users,
    pageBulletins: state.pageBulletins,
    filterParams: state.filterParams
  }),
  dispatch => ({
    onGetByFilter: (
      Page: number,
      PageSize: number,
      json: IFetchBulletinsParams
    ): void => {
      dispatch({
        type: "BULLETIN_SET_PAGE_OR_PAGESIZE",
        pageOrPageSize: { page: Page, pageSize: PageSize }
      });
      dispatch(fetchBulletinByFilterAction(json));
    },
    onSetFilterParams: (Params: IFilterParams) => {
      dispatch({ type: "SET_FILTER_PARAMS", params: Params });
    }
  })
)(Header);
