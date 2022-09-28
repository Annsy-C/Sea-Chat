import express, { Router , Request, Response} from 'express';

const router: Router = express.Router();

router.get("/", async (req: Request, res : Response) => {
    try {
        res.json([
            {
                id: '789',
                content: 'premier message',
                date: '28/09/2022',
                author: 'test user 1',
            },
            {
                id: '101112',
                content: 'deuxieme message',
                date: '28/09/2022',
                author: 'test user 2',
            },
        ])
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get("/:messageId", async (req: Request, res : Response) => {
    const {messageId} = req.params;
    try {
        res.json(
            {
                id: messageId,
                content: 'premier message',
                date: '28/09/2022',
                author: 'test user 1',
            }
        )
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post("/", async (req: Request, res : Response) => {
    console.log(req.body)
    try {
        res.json({status: 'post message ok'}
        )
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default router;
