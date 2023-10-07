import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import chalk from 'chalk';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users', (req, res) => {
  console.log(chalk.cyan(`GET request sent to /users`));

  const users = [
    {
      id: 4,
      name: 'Terry',
    },
    {
      id: 6,
      name: 'Beth',
    },
    {
      id: 78,
      name: 'John',
    },
    {
      id: 12,
      name: 'Sam',
    },
    {
      id: 9,
      name: 'Bob',
    },
    {
      id: 67,
      name: 'Mary',
    },
  ];

  res.send(JSON.stringify(users));
});

app.post('/users/create', (req, res) => {
  console.log(chalk.green(`POST request sent to /users/create`));

  const name = req.body.name;
  const id = Math.floor(Math.random() * 101);

  const user = {
    id,
    name,
  };

  res.send(JSON.stringify(user));
});

app.listen(port, () => {
  console.log(chalk.blue(`Server listening on port ${port}`));
});
