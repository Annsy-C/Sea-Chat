import express, { Router, Request, Response } from 'express';
import pgPool from './lib/pool';

const router: Router = express.Router();

router.get("/", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const resQuery = await client.query('SELECT * from rooms');
        const { rows } = resQuery;
        res.json(rows);
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

router.get("/:roomId", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const { roomId } = req.params;
        const resQuery = await client.query('SELECT * from rooms WHERE id = $1', [roomId]);
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
        const { name } = req.body;
        await client.query('INSERT INTO rooms(name) VALUES($1) RETURNING *', [name]);
        res.json({ status: 'post room ok' });
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

export default router;
