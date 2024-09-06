import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';

dotenv.config(); 

const app = express();
const port = process.env.PORT || '8080';

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});