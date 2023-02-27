import { Staff } from "@coop/database";
import { Invoker } from "./preload-utils";
import { LoginParams, LoginReturn } from "./api/auth";
import { ListMembersParams, ListMembersResult } from "./api/members";

export interface Handles {
  data: {
    status: Invoker<[], Staff>;
    members: Invoker<[params: ListMembersParams], ListMembersResult>;
  };
  public: {
    login: Invoker<[params: LoginParams], LoginReturn>;
    getStaffName: Invoker<[username?: string], string>;
  };
}
