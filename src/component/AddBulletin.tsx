import * as React from "react";
import { connect } from "react-redux";

import { fetchUsers } from "./../actions/fetchUsersAction";
import { addBulletinAction } from "../actions/addBulletinAction";
import { fetchBulletin } from "./../actions/fetchBulletinAction";

interface IMapStateToProps {
  history?: any;
  users: IUserType[];
}

interface IMapDispatchToProps {
  onFetchUsers: () => void;
  onAddBulletin: (bulletin: IBulletinType) => void;
  onBulletinByIdForUpdate: (id: string) => void;
  onAddBulletinIdForDelete: (id: string) => void;
  onDelBulletinIdForDelete: (id: string) => void;
  onClearBulletinIdForDelete: () => void;
  onBulletinDelete: (idArr: string[]) => void;
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

class AddBulletin extends React.Component<
  IMapStateToProps & IMapDispatchToProps
> {
  private bulletinNumber: any = React.createRef();
  private bulletinDate: any = React.createRef();
  private bulletinAuthor: any = React.createRef();
  private bulletinText: any = React.createRef();
  private bulletinRating: any = React.createRef();

  public render() {
    this.props.onFetchUsers();
    const addBulletin = (e: any) => {
      e.preventDefault();
      const bulletinnumber: number = this.bulletinNumber.current.value;
      const bulletincreateDate: string = this.bulletinDate.current.value;
      const bulletinuserName: string = this.bulletinAuthor.current.value;
      const bulletincontent: string = this.bulletinText.current.value;
      const bulletinrating: number = this.bulletinRating.current.value;

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
        createdUtc: bulletincreateDate,
        updatedUtc: bulletincreateDate,
        number: bulletinnumber,
        userId: getUserIdByName(bulletinuserName),
        content: bulletincontent,
        rating: bulletinrating
      };

      this.props.onAddBulletin(bulletin);
      this.props.history.push("/");
    };

    return (
      <div>
        <div className="row justify-content-md-center">
          <div className="col" />
          <div className="col-4 col-md-5 mt-3">
            <form onSubmit={addBulletin}>
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
              <button className="btn btn-primary" type="submit">
                Добавить
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
    users: state.users
  }),
  dispatch => ({
    onFetchUsers: (): void => {
      dispatch(fetchUsers());
      dispatch(fetchBulletin(1,100));
    },
    onAddBulletin: (bulletin: IBulletinType): void => {
      dispatch(addBulletinAction(bulletin));
    }
  })
)(AddBulletin);
