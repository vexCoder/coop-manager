import { PrismaClient, Staff } from "@coop/database";
import { BrowserWindow } from "electron";
import jwt from "jsonwebtoken";
import { getConfig } from "./config";
import { getFromLocalStorage } from "./localStorage";

export const verifyToken = async (
  win?: BrowserWindow
): Promise<Staff | null> => {
  const { secret } = getConfig();

  if (!win) throw new Error("Window not found");

  const token = await getFromLocalStorage(win, "token");

  const prisma = new PrismaClient();

  await prisma.$connect();
  const res = await new Promise<Staff | null>((resolve, reject) => {
    jwt.verify(token, secret, async (err: any, decoded: any) => {
      if (err) {
        reject(err);
      }

      const staffId = decoded?.staff as number;

      if (!staffId) reject(new Error("Invalid token"));

      const staff = await prisma.staff.findFirst({
        where: {
          id: staffId,
        },
      });

      if (!staff) reject(new Error("Invalid token"));

      if (!staff?.refresh_token || staff?.refresh_token !== token)
        reject(new Error("Token compromised"));

      return resolve(staff);
    });
  });
  await prisma.$disconnect();

  return res;
};
