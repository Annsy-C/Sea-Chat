import express, { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const router: Router = express.Router();

async function hash(password) {
    return new Promise((resolve, reject) => {
        const salt = crypto.randomBytes(16).toString('hex');
        
        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if(err) {
                reject(err);
            }
            resolve(salt + ':' + derivedKey.toString('hex'));
        })
    });
}

router.post("/", async (req: Request, res: Response) => {

    try {
        const hashedPassword = await hash('mdp test');
        console.log (hashedPassword);
        res.json({
            res: jwt.sign(
                { user_id: '123' },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            )
        })
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default router;
