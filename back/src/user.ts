import express, { Router , Request, Response} from 'express';

const router: Router = express.Router();

router.get("/", async (req: Request, res : Response) => {
    try {
        res.json([
            {
                id: '131415',
                name: 'test user 1',
                email: 'test1@gmail.com',
                mdp: 'TEST1!',
            },
            {
                id: '161718',
                name: 'test user 2',
                email: 'test2@gmail.com',
                mdp: 'TEST2!',
            },
        ])
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.get("/:userId", async (req: Request, res : Response) => {
    const {userId} = req.params;
    try {
        res.json(
            {
                id: userId,
                name: 'test user 1',
                email: 'test1@gmail.com',
                mdp: 'TEST1!',
            }
        )
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

router.post("/", async (req: Request, res : Response) => {
    console.log(req.body)
    try {
        res.json({status: 'post user ok'}
        )
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default router;
