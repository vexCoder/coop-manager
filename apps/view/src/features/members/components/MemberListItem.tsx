import { Member } from "@coop/database";
import { fastMemo } from "@utils/fastMemo";

type MemberListItemProps = {
  member: Member;
};

export const MemberListItem = fastMemo(({ member }: MemberListItemProps) => {
  return (
    <div className="flex cursor-pointer items-center border-b border-base-200 p-1 px-4 transition-colors hover:bg-base-200">
      <div className="avatar pr-2">
        <div className="w-8 rounded-full">
          <img src="https://picsum.photos/200" alt="random" />
        </div>
      </div>
      <p className="flex-grow text-xs">{`${member.first_name} ${member.last_name}`}</p>
      <p className="text-xs">{`${member.contact_num}`}</p>
    </div>
  );
});
