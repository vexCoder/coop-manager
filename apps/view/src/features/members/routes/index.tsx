import { Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Member } from "./Member";
import { MemberList } from "./MemberList";

export const MemberRoutes = () => {
  return (
    <>
      <Helmet>
        <title>Members</title>
      </Helmet>
      <Routes>
        <Route path="" element={<MemberList />} />
        <Route path=":id" element={<Member />} />
      </Routes>
    </>
  );
};
