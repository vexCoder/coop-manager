import { Staff } from "@coop/database";

export interface LoginParams {
  password: string;
}

export interface LoginReturn {
  staff: Staff;
  token: string;
  refreshToken: string;
}
