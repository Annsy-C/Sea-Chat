import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { verifyPassword } from './lib/auth';
import pgPool from './lib/pool';
import { enableAuth } from './lib/middlewares';

const router: Router = express.Router();

router.post("/", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const { email, password } = req.body;
        const resQuery = await client.query('SELECT * from users WHERE email = $1', [email]);
        const { rows } = resQuery;
        if (rows.length !== 1) {
            throw Error("user not found");
        }
        const user = rows[0];
        if (! await verifyPassword(password, user.password)) {
            throw Error("invalid credentials");
        }
        res.json({
            res: jwt.sign(
                {
                    user_id: user.id,
                    email: user.email,
                },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "24h",
                }
            )
        })
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

router.get("/me", enableAuth, async (req: Request, res: Response) => {

    const client = await pgPool.connect();
    const { user_id } = req;

    try {
        const resQuery = await client.query('SELECT id, email from users WHERE id = $1', [user_id]);
        const { rows } = resQuery;
        res.json(rows[0]);
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

export default router;
