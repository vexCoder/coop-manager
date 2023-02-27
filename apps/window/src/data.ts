import { Member, Prisma, PrismaClient } from "@coop/database";
import PublicHandler from "./api/public";
import type { Application } from "./app";
import Handler from "./handler";
import { verifyToken } from "./utils/auth";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const registerDataHandlers = (_app: Application) => {
  const prisma = new PrismaClient();

  Handler.registerInvokeApi(_app, PublicHandler);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Handler.registerInvokeHandle("data", "status", async (_evt) => {
    const test = true;

    if (test) return undefined;
    const staff = await verifyToken(_app.win);

    if (!staff) throw new Error("Invalid token");

    return staff;
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Handler.registerInvokeHandle("data", "members", async (_evt, params) => {
    const getSql = (page: number = 0, limit: number = 1) =>
      Prisma.sql`SELECT * FROM public.\"Member\" ORDER BY id ASC LIMIT ${limit} OFFSET ${
        page * limit
      }`;

    const members = (await prisma.$queryRaw(
      getSql(params.page, params.limit)
    )) as Member[];

    const nextCount = (await prisma.$executeRaw(
      getSql((params.page || 0) + 1, params.limit)
    )) as number;

    return {
      members,
      nextPage: nextCount ? (params?.page || 0) + 1 : undefined,
    };
  });
};
