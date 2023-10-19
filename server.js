import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3001; // You can choose any available port

app.use(cors())

app.use((req, res) => {
  const url = 'http://209.192.230.164:28162/fs/server-data/Lua/timestamp_economy.log';
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + Buffer.from('uAIlqSG72NJL:YZBIEItgslZb').toString('base64'),
      'Cache-Control': 'no-cache',
    },
  })
    .then(response => response.text())
    .then(data => {
      res.send(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching data');
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });