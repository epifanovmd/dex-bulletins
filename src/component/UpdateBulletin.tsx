import * as React from "react";
import { connect } from "react-redux";
import {
  IBulletinType,
  IFetchBulletinsParams,
  IFilterParams,
  IUserType
} from "../types/types";

import { updateBulletinAction } from "./../actions/updateBulletinAction";
import { deleteBuleetinByIdAction } from "./../actions/deleteBuleetinsByIdAction";

interface IMapStateToProps {
  history?: any;
  bulletinForUpdate: IBulletinType;
  users: any;
  bulletinIdForUpdate: string;
  pageBulletins: { page: number; pageSize: number };

  filterParams: IFilterParams;
}

interface IMapDispatchToProps {
  onUpdateBulletin: (
    bulletin: IBulletinType,
    json: IFetchBulletinsParams
  ) => void;
  onDeleteBulletin: (id: string, json: IFetchBulletinsParams) => void;
}

class UpdateBulletin extends React.Component<
  IMapStateToProps & IMapDispatchToProps
> {
  private bulletinNumber: any = React.createRef();
  private bulletinDate: any = React.createRef();
  private bulletinAuthor: any = React.createRef();
  private bulletinText: any = React.createRef();
  private bulletinRating: any = React.createRef();

  public componentDidMount() {
    if (this.props.bulletinForUpdate === null) {
      this.props.history.push("/");
    }
    if (
      this.props.bulletinForUpdate !== null &&
      this.bulletinNumber.current !== null &&
      this.props.bulletinForUpdate.created !== undefined
    ) {
      this.bulletinNumber.current.value = this.props.bulletinForUpdate.number;
      this.bulletinDate.current.value = this.props.bulletinForUpdate.created.split(
        "T"
      )[0];
      this.bulletinAuthor.current.value = this.props.bulletinForUpdate.user;

      this.bulletinText.current.value = this.props.bulletinForUpdate.content;
      this.bulletinRating.current.value = this.props.bulletinForUpdate.rating;
    }
  }

  public render() {
    const jsonParams: IFetchBulletinsParams = {
      pageFilter: {
        page: this.props.pageBulletins.page,
        pageSize: this.props.pageBulletins.pageSize
      },
      sortParams: [
        {
          fieldName: this.props.filterParams.sortParam.fieldName,
          isDesc: this.props.filterParams.sortParam.isDesc
        }
      ],
      userId: this.props.filterParams.userId,
      searchText: this.props.filterParams.searchText,
      startDate: this.props.filterParams.startDate,
      endDate: this.props.filterParams.endDate
    };

    const updateBulletin = (e: any) => {
      e.preventDefault();
      const numberbulletin = this.bulletinNumber.current.value;
      const createDate = this.bulletinDate.current.value;
      const userName = this.bulletinAuthor.current.value;
      const contentbulletin = this.bulletinText.current.value;
      const ratingbulletin = this.bulletinRating.current.value;

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

      const bulletin: IBulletinType = {
        id: this.props.bulletinForUpdate.id,
        createdUtc: this.props.bulletinForUpdate.createdUtc,
        updatedUtc: createDate,
        deletedUtc: this.props.bulletinForUpdate.deletedUtc,
        number: numberbulletin,
        userId: getUserIdByName(userName),
        content: contentbulletin,
        rating: ratingbulletin
      };
      this.props.onUpdateBulletin(bulletin, jsonParams);
      this.props.history.push("/");
    };

    const deleteBulletin = (e: any) => {
      e.preventDefault();

      if (this.props.bulletinForUpdate.id !== undefined) {
        this.props.onDeleteBulletin(
          this.props.bulletinForUpdate.id,
          jsonParams
        );
      }
      this.props.history.push("/");
    };
    return (
      <div>
        <div className=" d-flex justify-content-md-center">
          <div className="col" />
          <div className="col-3 col-md-4 mt-3">
            <form onSubmit={updateBulletin}>
              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Номер
                  </span>
                </div>
                <input
                  required={true}
                  ref={this.bulletinNumber}
                  type="number"
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>

              <div className="pb-3">
                <label className="pr-2">Дата</label>
                <input required={true} type="date" ref={this.bulletinDate} />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">Пользователь</label>
                </div>
                <select ref={this.bulletinAuthor} className="custom-select">
                  {this.props.users.map((user: IUserType) => (
                    <option key={user.id}>{user.name}</option>
                  ))}
                </select>
              </div>

              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">Текст</span>
                </div>
                <textarea
                  required={true}
                  className="form-control"
                  aria-label="With textarea"
                  ref={this.bulletinText}
                />
              </div>
              <p />

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Рейтинг
                  </span>
                </div>
                <input
                  required={true}
                  type="number"
                  step="any"
                  min="1"
                  max="10"
                  ref={this.bulletinRating}
                  className="form-control"
                  aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div>
              <button className="btn btn-danger mr-2" onClick={deleteBulletin}>
                Удалить
              </button>
              <button className="btn btn-primary" type="submit">
                Сохранить
              </button>
            </form>
          </div>

          <div className="col" />
        </div>
      </div>
    );
  }
}

export default connect(
  (state: any) => ({
    bulletinForUpdate: state.bulletinForUpdate,
    users: state.users,
    pageBulletins: state.pageBulletins,
    filterParams: state.filterParams
  }),
  dispatch => ({
    onUpdateBulletin: (
      bulletin: IBulletinType,
      json: IFetchBulletinsParams
    ): void => {
      dispatch(updateBulletinAction(bulletin, json));
      dispatch({ type: "CLEAR_BULLETIN_FOR_UPDATE", bulletin });
    },
    onDeleteBulletin: (id: string, json: IFetchBulletinsParams) => {
      dispatch(deleteBuleetinByIdAction(id, json));
    }
  })
)(UpdateBulletin);
