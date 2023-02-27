import { PrismaClient } from "@coop/database";
import argon2 from "argon2";
import { Expose } from "class-transformer";
import jwt from "jsonwebtoken";
import { LoginParams, LoginReturn } from "../../types/api/auth";
import { API, APIHandler } from "../decorators/API";
import { UseMiddlewares } from "../decorators/UseMiddlewares";
import { getConfig } from "../utils/config";
import { saveToLocalStorage } from "../utils/localStorage";
import { connectPrisma, functionPerf } from "../utils/middlewares";

const prisma = new PrismaClient();

@API("public")
class PublicHandler extends APIHandler {
  @Expose()
  @UseMiddlewares(connectPrisma, functionPerf)
  async login(params: LoginParams): Promise<LoginReturn> {
    const config = getConfig();
    // use 1 staff for now

    console.log(params);

    const staff = await prisma.staff.findFirst({
      where: {
        username: "admin",
      },
    });

    if (!staff) throw new Error("Staff not found");

    const validate = await argon2.verify(staff.password, params.password);

    if (!validate) throw new Error("Invalid password");

    if (!this.app.win) throw new Error("Window not found");

    const token = jwt.sign({ staff: staff.id }, config.secret, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ staff: staff.id }, config.secret, {
      expiresIn: "1d",
    });

    await saveToLocalStorage(this.app.win, "token", refreshToken);

    await prisma.staff.update({
      where: {
        id: staff.id,
      },
      data: {
        refresh_token: refreshToken,
      },
    });

    return { staff, token, refreshToken };
  }

  @Expose()
  @UseMiddlewares(connectPrisma, functionPerf)
  async getStaffName(username: string) {
    const staff = await prisma.staff.findFirst({
      where: {
        username,
      },
    });

    if (!staff) throw new Error("Staff not found");

    const name = `${staff?.first_name} ${staff?.last_name}`;

    return name;
  }
}

export default PublicHandler;
