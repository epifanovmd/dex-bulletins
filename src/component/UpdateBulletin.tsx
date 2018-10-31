import * as React from "react";
import { connect } from "react-redux";
import { updateBulletinAction } from "./../actions/updateBulletinAction";
import { deleteBuleetinByIdAction } from "./../actions/deleteBuleetinsByIdAction";

interface IMapStateToProps {
  history?: any;
  bulletinForUpdate: IBulletinType;
  users: any;
  bulletinIdForUpdate: string;
}

interface IMapDispatchToProps {
  onUpdateBulletin: (bulletin: IBulletinType) => void;
  onDeleteBulletin: (Id: string) => void;
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

class UpdateBulletin extends React.Component<
  IMapStateToProps & IMapDispatchToProps
> {
  private bulletinNumber: any = React.createRef();
  private bulletinDate: any = React.createRef();
  private bulletinAuthor: any = React.createRef();
  private bulletinText: any = React.createRef();
  private bulletinRating: any = React.createRef();

  public render() {
    const getUserNameById = (id: string): string => {
      let data: string = "";
      this.props.users.forEach((user: IUserType) => {
        if (user.id === id) {
          data = user.name;
          return;
        }
      });
      return data;
    };

    // if (this.props.bulletinForUpdate !== null) {
    //   this.bulletinNumber.current.value = this.props.bulletinForUpdate.number;
    //   this.bulletinDate.current.value = this.props.bulletinForUpdate.updatedUtc.split(
    //     "T"
    //   )[0];
    //   this.bulletinAuthor.current.value = getUserNameById(
    //     this.props.bulletinForUpdate.userId
    //   );
    //   this.bulletinText.current.value = this.props.bulletinForUpdate.content;
    //   this.bulletinRating.current.value = this.props.bulletinForUpdate.rating;
    // }

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
      this.props.onUpdateBulletin(bulletin);
      this.props.history.push("/");
    };

    const deleteBulletin = (e: any) => {
      e.preventDefault();
      if (this.props.bulletinForUpdate.id !== undefined) {
        this.props.onDeleteBulletin(this.props.bulletinForUpdate.id);
      }
      this.props.history.push("/");
    };
    console.log(this.props.bulletinForUpdate);

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
                  value={
                    this.props.bulletinForUpdate !== null
                      ? this.props.bulletinForUpdate.number
                      : ""
                  }
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
                <input
                  required={true}
                  // type="text"
                  value={
                    this.props.bulletinForUpdate !== null
                      ? this.props.bulletinForUpdate.updatedUtc.split("T")[0]
                      : ""
                  }
                  type="date"
                  ref={this.bulletinDate}
                />
              </div>

              <div className="input-group mb-3">
                <div className="input-group-prepend">
                  <label className="input-group-text">Пользователь</label>
                </div>
                <select
                  ref={this.bulletinAuthor}
                  value={
                    this.props.bulletinForUpdate !== null
                      ? getUserNameById(this.props.bulletinForUpdate.userId)
                      : ""
                  }
                  className="custom-select"
                >
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
                  value={
                    this.props.bulletinForUpdate !== null
                      ? this.props.bulletinForUpdate.content
                      : ""
                  }
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
                  value={
                    this.props.bulletinForUpdate !== null
                      ? this.props.bulletinForUpdate.rating
                      : ""
                  }
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
    users: state.users
  }),
  dispatch => ({
    onUpdateBulletin: (bulletin: IBulletinType): void => {
      dispatch(updateBulletinAction(bulletin));
      // dispatch({ type: "CLEAR_BULLETIN_FOR_UPDATE", bulletin });
    },
    onDeleteBulletin: (Id: string) => {
      dispatch(deleteBuleetinByIdAction(Id));
    }
  })
)(UpdateBulletin);
