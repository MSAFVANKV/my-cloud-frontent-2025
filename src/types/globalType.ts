import { IUser } from "./userTpes";

export interface GetCurrentUserResponse {
    status: number;
    data: IUser | null;
    message: string;
  }