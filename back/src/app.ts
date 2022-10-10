import express from 'express';
import cors from 'cors';
import rooms from './room';
import messages from './message';
import users from './user';
import auth from './authentication';
import { enableAuth } from './lib/middlewares';

const app = express();
const port = 3000;

app.use(cors({
  "origin": "http://localhost:3001",
}));

app.use(express.json());

app.use("/auth", auth);
app.use("/users", users);
app.use("/rooms", enableAuth, rooms);
app.use("/rooms/:roomId/messages", enableAuth, messages);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
