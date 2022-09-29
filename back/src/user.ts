import express, { Router, Request, Response } from 'express';
import pgPool from './pool';
import { hashPassword } from './lib/auth';

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const resQuery = await client.query('SELECT * from users');
        const { rows } = resQuery;
        res.json(rows);
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

router.get("/:userId", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const { userId } = req.params;
        const resQuery = await client.query('SELECT * from users WHERE id = $1', [userId]);
        const { rows } = resQuery;
        res.json(rows);
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

router.post("/", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const { name, email, password } = req.body;
        const hashedPassword = await hashPassword(password);
        await client.query('INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *', [name, email, hashedPassword]);
        res.json({ status: 'post user ok' });
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

export default router;
