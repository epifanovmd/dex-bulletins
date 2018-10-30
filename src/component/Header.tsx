import * as React from "react";
import { connect } from "react-redux";
import { debounce } from "throttle-debounce";

import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";

import "react-s-alert/dist/s-alert-css-effects/slide.css";
import "react-s-alert/dist/s-alert-css-effects/scale.css";
import "react-s-alert/dist/s-alert-css-effects/bouncyflip.css";
import "react-s-alert/dist/s-alert-css-effects/flip.css";
import "react-s-alert/dist/s-alert-css-effects/genie.css";
import "react-s-alert/dist/s-alert-css-effects/jelly.css";
import "react-s-alert/dist/s-alert-css-effects/stackslide.css";

import "./Header.css";
import { bulletinByFilterAction } from "../actions/fetchBulletinByFilterAction";
interface IStateProps {
  users: IUserType[];
}

interface IDispatchProps {
  onGetByFilter: (json: IBulletinByFilter) => void;
}

interface IPageFilter {
  page: number;
  pageSize: number;
}

interface IBulletinByFilter {
  pageFilter: IPageFilter;
  userId: string;
  searchText: string;
  startDate: string;
  endDate: string;
}

interface IUserType {
  id: string;
  createdUtc: string;
  name: string;
}

class Header extends React.Component<IStateProps & IDispatchProps> {
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
      const json: IBulletinByFilter = {
        pageFilter: {
          page: 1,
          pageSize: 100
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
      this.props.onGetByFilter(json);
    };
    const redirectToAddBulletinPage = (): void => {
      if (document.location !== null) {
        document.location.href = "/#addbulletin";
      }
    };

    return (
      <div>
        <div className="d-flex p-2 fixed-top justify-content-around align-items-start">
          <div className="m-3">
            <Alert stack={{ limit: 5 }} />
            <button
              type="button"
              className="btn btn-light"
              onClick={redirectToAddBulletinPage}
            >
              Добавить
            </button>
          </div>
          <div className="m-3">
            <label className="px-3 lblColor">Пользователь</label>
            <select
              className=""
              id="size"
              ref={this.bulletinAuthor}
              onChange={getByFilter}
            >
              <option>Все</option>
              {this.props.users.map((user: any) => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>

            <label className="px-3 lblColor">От</label>
            <input
              className=""
              id="size"
              type="date"
              ref={this.bulletinDateStart}
              onChange={getByFilter}
            />

            <label className="px-3 lblColor">До</label>
            <input
              id="size"
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
                type="text"
                className="form-control"
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
    users: state.users
  }),
  dispatch => ({
    onGetByFilter: (json: IBulletinByFilter): void => {
      dispatch(bulletinByFilterAction(json));
    }
  })
)(Header);
