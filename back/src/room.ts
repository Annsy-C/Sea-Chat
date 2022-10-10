import express, { Request, Response } from 'express';
import expressWs from 'express-ws';
import pgPool from './lib/pool';
import * as ws from 'ws';

const router: expressWs.Router = express.Router();

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
        res.json(rows[0]);
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

const rooms: Record<string, Record<number, ws>> = {};

router.ws('/:roomId/ws', (ws, req) => {
    const { roomId } = req.params;

    if (!rooms[roomId]) {
        rooms[roomId] = {};
    }

    rooms[roomId][req.user_id] = ws;
    console.log("connection established with", req.user_id);

    ws.on('close', () => {
        delete rooms[roomId][req.user_id];
        if (Object.keys(rooms[roomId]).length === 0) {
            delete rooms[roomId];
        }
        console.log('The connection was closed', rooms);
    })

    ws.on('message', (msg) => {
        console.log('Message received', msg, rooms);
        for (const [, userWs] of Object.entries(rooms[roomId])) {
            userWs.send(JSON.stringify({email: req.email, msg}));
        }
    });
});

export default router;
