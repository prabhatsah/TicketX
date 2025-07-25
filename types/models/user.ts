import { Role } from "@prisma/client";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}
