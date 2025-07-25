import type { SessionUser } from "./auth";

declare global {
  namespace Express {
    interface Request {
      userInfo?: SessionUser;
    }
  }
}
