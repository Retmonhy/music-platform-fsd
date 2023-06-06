import { IUser } from "@shared/types";

export class User {
  id: string;
  email: string;
  firstname: string;
  surname: string;
  isActivated: boolean;
  tracks: string[];
  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.firstname = user.firstname;
    this.surname = user.surname;
    this.isActivated = user.isActivated;
    this.tracks = user.tracks;
  }
  get fullname() {
    return this.surname + " " + this.firstname;
  }
}
