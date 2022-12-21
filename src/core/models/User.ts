import {makeObservable, observable} from "mobx";
import moment from "moment";

import {BaseModel} from "./BaseModel";

export class User extends BaseModel {
  id: string = undefined as any;
  firstName: string = undefined as any;
  lastName: string = undefined as any;
  email: string = undefined as any;
  imageUrl: string = undefined as any;
  imageData: string = undefined as any;

  createdAt: moment.Moment = undefined as any;

  public constructor() {
    super();

    makeObservable(this, {
      id: observable,
      firstName: observable,
      lastName: observable,
      email: observable,
      imageUrl: observable,
      imageData: observable,
      createdAt: observable,
    });
  }

  static fixObjectFromJSON(object: User, json: any) {
    if (json.createdAt) object.createdAt = moment(json.createdAt);
  }
}
