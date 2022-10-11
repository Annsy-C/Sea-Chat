import express, { Router, Request, Response } from 'express';
import pgPool from './lib/pool';

const router: Router = express.Router({
    mergeParams: true,
});

router.get("/", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const { roomId } = req.params;
        const resQuery = await client.query(
            'SELECT m.content, m.id, m.created_at, u.name, u.email, u.id AS user_id from messages AS m JOIN users AS u ON m.author=u.id WHERE m.room = $1', [roomId]);
        const { rows } = resQuery;
        res.json(rows);
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

router.get("/:messageId", async (req: Request, res: Response) => {

    const client = await pgPool.connect();

    try {
        const { messageId } = req.params;
        const resQuery = await client.query('SELECT * from messages WHERE id = $1', [messageId]);
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
        const { content } = req.body;
        const { roomId } = req.params;
        const author = req.user_id;
        await client.query('INSERT INTO messages(room, content, author) VALUES($1, $2, $3) RETURNING *', [roomId, content, author]);
        res.json({ status: 'post message ok' });
    } catch (e) {
        res.status(500).send(e.toString());
    } finally {
        client.release();
    }
});

export default router;
