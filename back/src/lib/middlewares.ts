import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const enableAuth = (req: Request, res: Response, next: NextFunction) => {
    let token: string = req.headers.authorization;

    if (token && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
        if (jwt.verify(token, process.env.TOKEN_KEY)) {
            const decodedToken = jwt.decode(token);
            req.user_id = decodedToken["user_id"];
            req.email = decodedToken["email"];
            return next();
        }
    }
    return (res.redirect("/auth"));
};

export { enableAuth };
