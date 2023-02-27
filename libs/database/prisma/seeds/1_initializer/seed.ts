import { PrismaClient, Staff, StaffRole } from "../../../dist/generated";
import { SeedSchema } from "../../types";
import argon from "argon2";

const schema: SeedSchema<Staff> = {
  model: "staff",
  env: "dev",
  async custom(prisma: PrismaClient) {
    const adminpass = process.env.ADMIN_PASSWORD ?? "adminpass";
    const hashedpassword = await argon.hash(adminpass);
    await prisma.staff.upsert({
      where: { username: "admin" },
      update: {},
      create: {
        username: "admin",
        password: hashedpassword,
        first_name: "Admin",
        last_name: "Admin",
        role: StaffRole.ADMIN,
      },
    });
  },
};
export default schema;
