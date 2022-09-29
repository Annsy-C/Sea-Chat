import express from 'express';
import rooms from './room';
import messages from './message';
import users from './user';
import auth from './authentication';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use("/rooms", rooms);
app.use("/rooms/:roomId/messages", messages);
app.use("/users", users);
app.use("/auth", auth);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
