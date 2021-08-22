import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization;

    if(!authToken) {
        return res.sendStatus(401).end();
        // return res.sendStatus(401).json({ message: "Token missing!" });
    }
    
    // Vai ignorar o Bearer que vem no authToken e pegar só o token.
    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, "d4eabba9c596b156ed15bf551ca41048") as IPayload;

        req.user_id = sub;

        return next();
    } catch(err) {
        return res.sendStatus(401).end();
    }

}
