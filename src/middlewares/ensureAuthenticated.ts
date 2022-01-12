import { Request, Response, NextFunction, response } from 'express';
import { verify } from 'jsonwebtoken';
interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;
    if (!authToken) {
        console.log(authToken);
        return response.status(401).send({
            errorCode: 'Token invalid'
        });
    }
    const [scheme, token] = authToken.split(" ");
    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ Error: "Token malformatted" })
    }
    try {
        const { sub } = verify(token, process.env.JWT_TOKEN_ID) as IPayload;
        req.user_id = sub;
        return next();
    } catch (err) {
        return res.status(401).send({ errorCode: 'Token expired' });
    }

}