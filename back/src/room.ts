import express, { Router , Request, Response} from 'express';

const router: Router = express.Router();

router.get("/", async (req: Request, res : Response) => {
    try {
        res.json([
            {
                id: '123',
                userCount: 0,
                title:'test',
            },
            {
                id: '456',
                userCount: 0,
                title:'test 2',
            },
        ])
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get("/:roomId", async (req: Request, res : Response) => {
    const {roomId} = req.params;
    try {
        res.json(
            {
                id: roomId,
                title:'test',
                users: [],
                messages: [],
            }
        )
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.delete("/:roomId", async (req: Request, res : Response) => {
    const {roomId} = req.params;
    try {
        res.json({status: 'delete ok'}
        )
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post("/", async (req: Request, res : Response) => {
    console.log(req.body)
    try {
        res.json({status: 'post room ok'}
        )
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default router;
