import pg from 'pg';
const { Client } = pg;
import express from 'express';
const app = express();
const port = 3000;
 
const client = new Client({
  user: 'postgres',
  password: 'abcd',
  host: 'localhost',
  port: 5432,
  database: 'brainstorm',
})


client.connect();
app.set('view engine', 'ejs');

client.query("INSERT INTO articles(title, bio) VALUES('valeur 1', 'valeur 2')");
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/test", (req, res) => {
  res.render("tests/first.ejs");
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Application exemple à l'écoute sur le port ${port}!`);
});