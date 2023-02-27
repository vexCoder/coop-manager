import { Member } from "@coop/database";

export interface ListMembersFilter {
  name?: string;
}

export interface ListMembersParams {
  limit: number;
  page?: number;
  filter?: ListMembersFilter;
}

export interface ListMembersResult {
  members: Member[];
  nextPage?: number;
}
