import { Response } from "express";
import { AuthenticatedRequest } from "../types/index.js";
export declare const sendMessage: (req: AuthenticatedRequest, res: Response) => Promise<void | Response>;
export declare const getMessages: (req: AuthenticatedRequest, res: Response) => Promise<void | Response>;
//# sourceMappingURL=message.controller.d.ts.map