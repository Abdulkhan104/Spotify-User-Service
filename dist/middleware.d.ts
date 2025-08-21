import { NextFunction, Request, Response } from "express";
import { IUser } from "./model";
export interface AuthenticatedRequest extends Request {
    user?: IUser | null;
}
export declare const isAuth: (req: AuthenticatedRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=middleware.d.ts.map