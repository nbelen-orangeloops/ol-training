import {makeObservable, observable} from "mobx";
import moment from "moment";

import {BaseModel} from "./BaseModel";

export class AccessToken extends BaseModel {
  token: string = undefined as any;
  refreshToken: string = undefined as any;

  expiresAt: moment.Moment | undefined = undefined as any;

  public constructor() {
    super();
    makeObservable(this, {
      token: observable,
      refreshToken: observable,
      expiresAt: observable,
    });
  }

  static fixObjectFromJSON(object: AccessToken, json: any) {
    object.expiresAt = json.expiresAt ? moment(json.expiresAt) : undefined;
  }
}
