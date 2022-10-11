import express from 'express';
import cors from 'cors';
import messages from './message';
import users from './user';
import auth from './authentication';
import { enableAuth } from './lib/middlewares';
import expressWs from 'express-ws';

const app = expressWs(express()).app;
const port = process.env.PORT || 3000;

import rooms from './room';

app.use(cors({
  "origin": `${process.env.FRONT_URL}`,
}));

app.use(express.json());

app.use("/auth", auth);
app.use("/users", users);
app.use("/rooms", enableAuth, rooms);
app.use("/rooms/:roomId/messages", enableAuth, messages);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
